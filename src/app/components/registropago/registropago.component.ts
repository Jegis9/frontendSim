import { Component, inject } from '@angular/core';
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
export class RegistropagoComponent {
  private sasToken  = "sp=racwdli&st=2024-05-16T01:04:23Z&se=2024-05-28T09:04:23Z&sv=2022-11-02&sr=c&sig=0qsSg9C4TOJOUB7bNf6Rk2OO77tfwI8GXsvCfdBiyug%3D";
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

  async onSubmit() {
    
    if(this.registroForm.valid && this.selectedFile && this.validateFile(this.selectedFile)){
      const carnet1 = this.registroForm.get('carnet1')?.value;
      const carnet2 = this.registroForm.get('carnet2')?.value;
      const carnet3 = this.registroForm.get('carnet3')?.value;
      const fechahoraControl = this.registroForm.get('fechahoraControl')?.value;
      const fechaHora = fechahoraControl ? this.formatDate(fechahoraControl) : '';
      const carnetCompleto = `${carnet1}-${carnet2}-${carnet3}`;


      const detallePagoId = await this.obtenerDetalle(carnetCompleto);
      if (detallePagoId === 0 || detallePagoId === null) {
        Swal.fire('Error', 'Usted no Ha registrado su detalle de pago', 'error');
        return;
      }

      const pagoExiste = await this.verificarPago(detallePagoId);

      if (pagoExiste || pagoExiste === null) {
        Swal.fire('Error', 'Usted ya ha registrado su pago, espere a que le confirmen su pago', 'error');
        return;
      }


      try {
        this.subirImagen(this.selectedFile, carnetCompleto);
      } catch (error) {
          console.error('Error during file upload:', error);
      }

      const imageUrl = `https://blobsimposio.blob.core.windows.net/pagos/${carnetCompleto}${this.selectedFile?.name}`;
      this.pagoService.crear(carnetCompleto, detallePagoId, imageUrl, fechaHora).subscribe(
        response => {
          console.log('Pago registrado:', response);
          Swal.fire('Pago registrado', 'El pago ha sido registrado exitosamente', 'success');
        },
        error => {
          console.error('Error al registrar pago:', error);
          Swal.fire('Error', 'Ha ocurrido un error al registrar el pago', 'error');
        }
      );

    }
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
