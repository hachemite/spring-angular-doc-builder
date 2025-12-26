import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // Generate document using dynamic template
  generateDocument(data: any): Observable<string> {
    return this.http.post(`${this.apiUrl}/documents/generate-dynamic`, data, { responseType: 'text' });
  }

  // Admin: Create new template
  createTemplate(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/templates`, data);
  }

  // Get template details by ID (for form building)
  getTemplateById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/templates/${id}`);
  }

  // Get all active templates (for dashboard list)
  getTemplates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/templates`);
  }
}
