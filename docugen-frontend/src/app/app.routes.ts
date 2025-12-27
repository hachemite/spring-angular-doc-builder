import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component/login.component';
import { RegisterComponent } from './features/auth/register.component/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './core/guard/auth-guard';
import { adminGuard } from './core/guard/admin-guard';
import { TemplateBuilderComponent } from './features/admin/template-builder.component/template-builder.component';
import { DynamicDocumentFormComponent } from './features/dashboard/dynamic-document-form.component/dynamic-document-form.component';
// 1. IMPORT THE NEW COMPONENT
import { AdminTemplateListComponent } from './features/admin/admin-template-list.component/admin-template-list.component';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  // --- ADMIN ROUTES ---
  {
    // 2. The List View (Main Entry for Admin)
    path: 'admin/templates',
    component: AdminTemplateListComponent,
    canActivate: [adminGuard]
  },
  {
    // Create New
    path: 'admin/builder',
    component: TemplateBuilderComponent,
    canActivate: [adminGuard]
  },
  {
    // Edit Existing
    path: 'admin/builder/:id',
    component: TemplateBuilderComponent,
    canActivate: [adminGuard]
  },

  // --- DOCUMENT ROUTE ---
  {
    path: 'document/:id',
    component: DynamicDocumentFormComponent,
    canActivate: [authGuard]
  }
];
