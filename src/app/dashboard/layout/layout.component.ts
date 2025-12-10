import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/core/interfaces/user';
import { RouterLink, RouterOutlet } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [RouterLink, RouterOutlet],

})
export class LayoutComponent implements OnInit {

  userProfile: user | null = null;
  constructor(private router: Router) { }

  ngOnInit() {
    this.loadProfile();
  }

  private loadProfile(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.userProfile = JSON.parse(userData);
    }
  }
  logout(): void {
    // 1. Eliminar el token
    localStorage.removeItem(environment.storageNames.token);
    
    // 2. Eliminar la información del usuario
    localStorage.removeItem(environment.storageNames.user);
    localStorage.removeItem(environment.typeProfile);
    
    // 3. Redirigir al login
    this.router.navigate(['/']);
  }

}
