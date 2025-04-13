import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  private apiUrl = 'http://localhost:5104/receipt'; // Update this as needed

  constructor(private http: HttpClient) {}

  submitReceipt(data: FormData): Observable<HttpEvent<any>> {
    const request = this.formDataToJson(data);
    return this.http.post(this.apiUrl, request, {
      reportProgress: true,
      observe: 'events',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    });
  }

  formDataToJson(formData: FormData): any {
    const jsonObject: any = {};
    
    formData.forEach((value, key) => {
      // Handle file differently
      if (value instanceof File) {
        // Skip files initially (we'll process them separately)
        // jsonObject[key] = value;
      } else {
        jsonObject[key] = value;
      }
    });
    
    return jsonObject;
  }
}
