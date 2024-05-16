import { Injectable } from "@angular/core";
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

@Injectable({
  providedIn: "root"
})
export class AzureStorageService {

  containerName = "pagos";
  private accountName = "blobsimposio";

  constructor() {}

  
  public uploadImage(sas: string, content: Blob, name: string, handler: () => void){
    const blockBlobClient = this.containerClient(sas).getBlockBlobClient(name);
    blockBlobClient
      .uploadData(content, { blobHTTPHeaders: { blobContentType: content.type } })
      .then(() => handler())
  }
  

  private containerClient(sas: string): ContainerClient {
    let token = ""
    if(sas){
      token = sas;
    }
    return new BlobServiceClient(`https://${this.accountName}.blob.core.windows.net?${sas}`)
            .getContainerClient(this.containerName);
  }
}