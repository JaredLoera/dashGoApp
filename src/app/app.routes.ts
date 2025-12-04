import { Routes } from '@angular/router';
import { MainComponent } from './dashboard/main/main.component';
import { LoginComponent } from './login/login.component';
import { ReportsComponent } from './dashboard/reports/reports.component';
import { LayoutComponent } from './dashboard/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: MainComponent },
      { path: 'reports', component: ReportsComponent }
    ]
  }

];
