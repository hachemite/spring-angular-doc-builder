import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

// Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from './core/service/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary" class="navbar">
      <button mat-icon-button class="menu-icon" aria-label="Menu icon">
        <mat-icon>description</mat-icon>
      </button>

      <span class="logo" routerLink="/">DocuGen Pro</span>

      <span class="spacer"></span>

      <div *ngIf="!isLoggedIn" class="nav-buttons">
        <button mat-button routerLink="/login">Login</button>
        <button mat-raised-button color="accent" routerLink="/register">Get Started</button>
      </div>

      <div *ngIf="isLoggedIn" class="nav-buttons">
        <button *ngIf="isAdmin" mat-button routerLink="/admin/templates">
          <mat-icon>settings</mat-icon> Admin Templates
        </button>

        <button mat-button routerLink="/dashboard">
          <mat-icon>dashboard</mat-icon> Dashboard
        </button>

        <button mat-icon-button (click)="logout()" title="Logout">
          <mat-icon>logout</mat-icon>
        </button>
      </div>
    </mat-toolbar>

    <div class="main-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.css'
})
export class App {
  private authService = inject(AuthService);
  private router = inject(Router);

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
  }
}
