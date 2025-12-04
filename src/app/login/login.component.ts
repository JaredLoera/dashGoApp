import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { token } from '../core/interfaces/token';
import { Auth } from '../core/services/auth/auth';
import { User } from '../core/services/user/user';
import { user } from '../core/interfaces/user';
import { Router } from '@angular/router';
import { IonContent, IonInput, IonButton } from "@ionic/angular/standalone";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [IonButton,
    IonInput,
    IonContent,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class LoginComponent implements OnInit {

  constructor(private authService: Auth, private router: Router, private userService: User) { }

  ngOnInit() { }
  userProfile: user | null = null;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  async login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!).subscribe({
      next: (token: token) => {
        this.authService.setToken(token.token);
        console.log('Login exitoso, token almacenado');
        this.userService.getUserProfile().subscribe(
          {
            next: (user) => {
              this.userProfile = user;
              localStorage.setItem(environment.storageNames.user, JSON.stringify(user));
              localStorage.setItem(environment.typeProfile, this.userProfile.roleId.toString());
              if (this.userProfile.roleId==1) {
                this.router.navigate(['/dashboard']);
              } else {
                this.router.navigate(['/not-allowed-device']);
              }
            },
            error: (error) => {
              console.error('Error fetching user profile', error);
            }
          }
        );
        (document.activeElement as HTMLElement)?.blur();

      },
      error: (error) => {
        console.error('Error en el login', error);
      }
    });
  }
}
