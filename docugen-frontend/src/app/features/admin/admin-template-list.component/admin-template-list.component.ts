import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DocumentService } from '../../../core/service/document';

// Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-admin-template-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  // CRITICAL: This MUST match the HTML file name exactly
  templateUrl: './admin-template-list.component.html',
  styles: [`
    table { width: 100%; }
    .action-cell { display: flex; gap: 8px; justify-content: flex-end; }
  `]
})
export class AdminTemplateListComponent implements OnInit {
  private docService = inject(DocumentService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  templates: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'active', 'actions'];
  loading = true;

  ngOnInit() {
    this.loadTemplates();
  }

  loadTemplates() {
    this.loading = true;
    this.docService.getTemplates().subscribe({
      next: (data) => {
        this.templates = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error loading templates', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  // Navigate to Builder with ID
  editTemplate(id: number) {
    this.router.navigate(['/admin/builder', id]);
  }

  deleteTemplate(id: number) {
    // Simple Window Confirm
    if (confirm('Are you sure you want to delete this template? This action cannot be undone.')) {

      this.docService.deleteTemplate(id).subscribe({
        next: () => {
          // Optimistic UI Update: Remove from array without reloading page
          this.templates = this.templates.filter(t => t.id !== id);
          this.snackBar.open('Template deleted successfully', 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Failed to delete template', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
