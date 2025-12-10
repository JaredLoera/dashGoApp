import { Routes } from '@angular/router';
import { MainComponent } from './dashboard/main/main.component';
import { LoginComponent } from './login/login.component';
import { ReportsComponent } from './dashboard/reports/reports.component';
import { LayoutComponent } from './dashboard/layout/layout.component';
import { UsersComponent } from './dashboard/users/users.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { authGuard } from './core/guards/auth/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [authGuard]
  },
  // Ruta para la verificación de código con correo en url
  {
    path: 'verify-code/:email',
    component: VerifyCodeComponent
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'users', component: UsersComponent }
    ]
  }

];
