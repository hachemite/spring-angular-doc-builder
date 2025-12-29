import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component/login.component';
import { RegisterComponent } from './features/auth/register.component/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TemplateBuilderComponent } from './features/admin/template-builder.component/template-builder.component';
import { DynamicDocumentFormComponent } from './features/dashboard/dynamic-document-form.component/dynamic-document-form.component';
import { AdminTemplateListComponent } from './features/admin/admin-template-list.component/admin-template-list.component';
// 1. Import Landing Page
import { LandingPageComponent } from './features/landing-page/landing-page.component/landing-page.component';

import { authGuard } from './core/guard/auth-guard';
import { adminGuard } from './core/guard/admin-guard';

export const routes: Routes = [
  // 2. Set Default Route to Landing Page
  { path: '', component: LandingPageComponent, pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  // Admin Routes
  {
    path: 'admin/templates',
    component: AdminTemplateListComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'admin/builder',
    component: TemplateBuilderComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'admin/builder/:id',
    component: TemplateBuilderComponent,
    canActivate: [adminGuard]
  },

  // Document Route
  {
    path: 'document/:id',
    component: DynamicDocumentFormComponent,
    canActivate: [authGuard]
  }
];
