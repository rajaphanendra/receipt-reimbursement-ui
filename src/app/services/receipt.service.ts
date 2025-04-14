import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  private apiUrl = 'http://localhost:5267/api/receipt';

  constructor(private http: HttpClient) {}

  submitReceipt(data: FormData): Observable<HttpEvent<any>> {
    return this.http.post<any>(this.apiUrl, data);
  }

  getReceipts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}