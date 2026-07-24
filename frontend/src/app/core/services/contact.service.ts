import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, ContactMessage } from '../models/contact-message.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/contact`;

  enviarMensagem(payload: ContactMessage): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, payload);
  }
}
