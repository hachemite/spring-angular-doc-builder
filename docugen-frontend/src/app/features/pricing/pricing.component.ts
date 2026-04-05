import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../core/service/payement'; // Assumes the file is named payement.ts
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Added this line

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule], // Added MatSnackBarModule
  template: `
    <div class="min-h-screen bg-slate-50 py-24 px-4">
      <div class="max-w-7xl mx-auto text-center">
        <h2 class="text-4xl font-black text-slate-900 mb-4">Upgrade to Pro</h2>
        <p class="text-xl text-slate-500 mb-16">Unlock unlimited AI generation and premium legal templates.</p>

        <div class="max-w-lg mx-auto bg-white rounded-3xl shadow-xl border border-brand-100 overflow-hidden transform transition-all hover:-translate-y-2">
          <div class="bg-brand-600 p-8 text-white">
            <h3 class="text-2xl font-bold mb-2">Pro Plan</h3>
            <div class="text-5xl font-black mb-2">$15<span class="text-xl font-normal opacity-80">/month</span></div>
            <p class="text-brand-100">Cancel anytime.</p>
          </div>

          <div class="p-8">
            <ul class="space-y-4 text-left mb-8">
              <li class="flex items-center gap-3 text-slate-700">
                <mat-icon class="text-green-500">check_circle</mat-icon> Unlimited AI Template Generation
              </li>
              <li class="flex items-center gap-3 text-slate-700">
                <mat-icon class="text-green-500">check_circle</mat-icon> Access to Premium Legal Library
              </li>
              <li class="flex items-center gap-3 text-slate-700">
                <mat-icon class="text-green-500">check_circle</mat-icon> Priority Email Delivery
              </li>
            </ul>

            <button
              (click)="checkout()"
              [disabled]="loading"
              class="w-full py-4 bg-brand-600 text-white rounded-xl font-bold text-lg hover:bg-brand-700 transition-colors flex justify-center items-center gap-2">
              <span *ngIf="!loading">Upgrade Now</span>
              <mat-spinner *ngIf="loading" diameter="24" class="text-white-important"></mat-spinner>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PricingComponent {
  private paymentService = inject(PaymentService);
  private snackBar = inject(MatSnackBar); // Injected here
  loading = false;

  checkout() {
    this.loading = true;
    this.paymentService.createCheckoutSession().subscribe({
      next: (response: any) => { // Added type
        window.location.href = response.url;
      },
      error: (err: any) => { // Added type
        console.error('Checkout failed', err);
        this.snackBar.open('Could not initiate payment. Try again later.', 'Close');
        this.loading = false;
      }
    });
  }
}