import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { token } from '../core/interfaces/token';
import { Auth } from '../core/services/auth/auth';
import { User } from '../core/services/user/user';
import { user } from '../core/interfaces/user';
import { Router } from '@angular/router';
import { IonContent, IonInput, IonButton } from "@ionic/angular/standalone";
import { responseMessage } from '../core/interfaces/responseMessage';

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
  errorMessage: string = '';

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
  this.errorMessage = '';
  this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!).subscribe({
      next: (response: responseMessage) => {
        //envair a url de verificacion
        this.router.navigate([`/verify-code/${this.loginForm.value.email}`]);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Ocurrió un error';
        console.error('Error during login:', error);
      }
    });
  }
}
