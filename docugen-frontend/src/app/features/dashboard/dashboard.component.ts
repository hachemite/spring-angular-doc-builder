import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router'; // ✅ ADDED RouterLink here
import { DocumentService } from '../../core/service/document';
import { AuthService } from '../../core/service/auth';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, // ✅ ADDED THIS HERE so <a routerLink="..."> works
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule 
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  private docService = inject(DocumentService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute); // Injected
  private snackBar = inject(MatSnackBar); // Injected
  private authService = inject(AuthService);

  templates: any[] = [];
  loading = true;
  get isPro(): boolean {
    return this.authService.isPro();
  }

ngOnInit() {
    this.loadTemplates();

    // Check if the user just returned from Stripe
    this.route.queryParams.subscribe(params => {
      if (params['success'] === 'true') {
        // You might want to force a token refresh here in the future
        // so the frontend knows they are PRO immediately without logging out and back in.
this.snackBar.open('🎉 Payment successful! Please log back in to activate your PRO features.', 'Close', { 
          duration: 10000, 
          panelClass: ['success-snackbar'] 
        });
        this.authService.logout();
      }
    });
  }

  loadTemplates() {
    this.loading = true;
    this.docService.getTemplates().subscribe({
      next: (data: any[]) => { // Added type
        this.templates = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => { // Added type
        console.error('Error fetching templates', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

openTemplate(template: any) {
    if (template.premium && !this.authService.isPro()) {
      this.snackBar.open('This is a Pro template. Upgrade to unlock!', 'Upgrade', { duration: 5000 })
        .onAction().subscribe(() => {
          this.router.navigate(['/pricing']);
        });
      return; // Stop execution
    }
    this.router.navigate(['/document', template.id]);
  }
}