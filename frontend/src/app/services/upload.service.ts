import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, catchError, of, tap } from 'rxjs';
import { UPLOAD_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient, private toastrService: ToastrService) { }

  getImage(event: any): File | null {
    const files = event.target.files;

    if (!files || files.length <= 0) {
      this.toastrService.warning('Upload file is not selected!', 'File Upload');
      return null;
    }

    console.log('Selected Files:', files);

    const file = files[0];

    if(file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')
    {
      return file;
    }
    else
    {
      this.toastrService.error('Only JPG, JPEG, PNG type is allowed', 'File Type Error');
      return null;
    }

    // if (file.type !== 'image/jpeg') {
    //   this.toastrService.error('Only JPG type is allowed', 'File Type Error');
    //   return null;
    // }

    // return file;

  }

  uploadImage(event: any): Observable<any> {
    
    // let toastId = null;

    const image = this.getImage(event);
    if (!image) return EMPTY;

    const formData = new FormData();
    formData.append('image', image, image.name);

    return this.http.post(UPLOAD_URL, formData);

  }

}
