import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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


  // FIXED: Generate Template from AI Description
  generateTemplateFromAi(description: string): Observable<any> {
    // Send as plain text with proper content type
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain'
    });


    return this.http.post(
      `${this.apiUrl}/admin/templates/ai/generate`,
      description,  // Send raw string
      { headers }
    );
  }


  updateTemplate(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/templates/${id}`, data);
  }

  // Delete template
  deleteTemplate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/templates/${id}`);
  }
}
