import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component/login.component';
import { RegisterComponent } from './features/auth/register.component/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './core/guard/auth-guard';
import { adminGuard } from './core/guard/admin-guard';
import { TemplateBuilderComponent } from './features/admin/template-builder.component/template-builder.component';
import { DynamicDocumentFormComponent } from './features/dashboard/dynamic-document-form.component/dynamic-document-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/builder',
    component: TemplateBuilderComponent,
    canActivate: [adminGuard] // Now properly restricted to admins only
  },
  {
    path: 'document/:id',
    component: DynamicDocumentFormComponent,
    canActivate: [authGuard]
  }
];
