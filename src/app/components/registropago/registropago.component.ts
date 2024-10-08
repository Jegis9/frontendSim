import { AfterViewInit, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddPagoService } from '../../services/addPago/add-pago.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { AzureStorageService } from '../../azure-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registropago',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registropago.component.html',
  styleUrl: './registropago.component.css'
})
export class RegistropagoComponent implements AfterViewInit{



  ngAfterViewInit(): void {
    // Inicializa el reCAPTCHA
    setTimeout(() => {
      window['grecaptcha'].render('tu-recaptcha-element', {
        sitekey: '6LdDpt8pAAAAADLz_MpgfTqem-XnmTnuLgjJai4B'
      });
    }, 0);
  }

  autoFocusNext(nextElementId: string, maxLength: number) {
    const currentElement = document.activeElement as HTMLInputElement;
    if (currentElement.value.length >= maxLength) {
      const nextElement = document.getElementById(nextElementId) as HTMLInputElement;
      if (nextElement) {
        nextElement.focus();
      }
    }
  }

    /*VERIFICA CAPTCHA INICIO*/
    verificarCaptcha(): boolean {
      const response = window['grecaptcha'].getResponse();
      if (!response) {
        Swal.fire({
          icon: 'warning',
          title: '¡Cuidado!',
          text: 'Primero debes de marcar ReCaptcha',
          confirmButtonColor: '#3366ff', 
          confirmButtonText: 'Entendido'
        });
        return false;
      }
      return true;
    }
      /*VERIFICA CAPTCHA FIN*/

  private sasToken  = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacuptfx&se=2024-11-01T04:44:46Z&st=2024-07-31T20:44:46Z&sip=0.0.0.0-255.255.255.255&spr=https&sig=zNe3cH52M2iY9xrF1wU0Nz20onxDzbOWjHuWc5zf67k%3D";
  selectedFile: File | null = null;
  detallePagoId: number = 0;
  registroForm = new FormGroup({
    carnet1: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]*')]),
    carnet2: new FormControl('' , [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern('[0-9]*')]),
    carnet3: new FormControl('' , [Validators.required, Validators.minLength(3), Validators.maxLength(6), Validators.pattern('[0-9]*')]),
    fechahoraControl: new FormControl('', Validators.required),
    imagen: new FormControl<File | null>(null, Validators.required)  // Este será manejado especialmente para archivos
  });

    constructor(
    private http: HttpClient, 
    private blobService: AzureStorageService,
    private pagoService: AddPagoService,
  ) { }

  async create() {
    
    //console.log("arriba de la validacion");
        /*VERIFICA CAPTCHA INICIO ANTES*/
        if (!this.verificarCaptcha()) {
          return;
        }
          /*VERIFICA CAPTCHA INICIO ANTES*/

          //console.log("debajo de la validacion");

    if(this.registroForm.valid && this.selectedFile && this.validateFile(this.selectedFile)){
      const carnet1 = this.registroForm.get('carnet1')?.value;
      const carnet2 = this.registroForm.get('carnet2')?.value;
      const carnet3 = this.registroForm.get('carnet3')?.value;
      const fechahoraControl = this.registroForm.get('fechahoraControl')?.value;
      const fechaHora = fechahoraControl ? this.formatDate(fechahoraControl) : '';
      const carnetCompleto = `${carnet1}-${carnet2}-${carnet3}`;

      //console.log("Entre al IF");


      const detallePagoId = await this.obtenerDetalle(carnetCompleto);
      if (detallePagoId === 0 || detallePagoId === null) {
        Swal.fire('Error', 'Usted no Ha registrado su detalle de pago', 'error');
        return;
      }

      //console.log("encontro el detalle de pago");

      const pagoExiste = await this.verificarPago(detallePagoId);

      if (pagoExiste || pagoExiste === null) {
        Swal.fire('Error', 'Usted ya ha registrado su pago, espere a que le confirmen su pago', 'error');
        return;
      }


      try {
        this.subirImagen(this.selectedFile, carnetCompleto);
        //Swal.fire('Error', 'si se subio la imagen', 'error');
      } catch (error) {
          console.error('Error during file upload:', error);
      }

      const imageUrl = `https://simposio.blob.core.windows.net/pagos/${carnetCompleto}${this.selectedFile?.name}`;
      this.pagoService.crear(carnetCompleto, detallePagoId, imageUrl, fechaHora).subscribe(
        response => {
          //console.log('Pago registrado:', response);
          Swal.fire('Pago registrado', 'El pago ha sido registrado exitosamente', 'success');
        },
        error => {
          //console.error('Error al registrar pago:', error);
          Swal.fire('Error', 'Ha ocurrido un error al registrar el pago', 'error');
        }
      );

    }

    console.log("NO al IF");
  }

  obtenerDetalle(carnet: string): Promise<number> {
    return this.pagoService.obtenerDetalle(carnet).toPromise()
      .then(data => data ?? 0)
      .catch(error => {
        console.error('Error al obtener detalle de pago:', error);
        throw new Error('Error al obtener detalle de pago');
      });
  }

  verificarPago(detallePagoId: number): Promise<boolean> {
    return this.pagoService.obtenerPago(detallePagoId).toPromise()
      .then(response => {
        if(response === null || response === 0){
          return false;
        }
        return true;
      })
      .catch(error => {
        if (error.status === 404) {
          return false; // El pago no existe
        }
        console.error('Error al verificar pago:', error);
        throw new Error('Error al verificar pago');
      });
  }


public subirImagen(file: File, carnet: string){
  this.blobService.uploadImage(this.sasToken, file, `${carnet}${file.name}`, () => {

  })
}

validateFile(file: File): boolean {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  return allowedTypes.includes(file.type);
}

onFileSelect(event: Event) {
  const element = event.target as HTMLInputElement;
  if (element.files && element.files.length > 0) {
      const file = element.files[0];
      this.selectedFile = file;
  }
}

  enviarDatos(formData: FormData) {

    this.http.post('https://apisimposio.shop/Participante/AddPago/', formData).subscribe(
      response => console.log('Pago registrado:', response),
      error => console.error('Error al registrar pago:', error)
    );
  }

  public formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  }

}
