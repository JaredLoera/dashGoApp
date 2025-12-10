import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Auth } from 'src/app/core/services/auth/auth';
import { token } from 'src/app/core/interfaces/token';
import { User } from '../core/services/user/user';
import { user } from '../core/interfaces/user';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css'],
})
export class VerifyCodeComponent  implements OnInit {

  userProfile: user | null = null;

  email: string = this.route.snapshot.paramMap.get('email') || '';
  codeInputs = ['', '', '', '', '', ''];

  constructor(private authService: Auth, private userService: User, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {}


  onInputChange(event: any, index: number) {
  const value = event.target.value;

  // guardar el valor
  this.codeInputs[index] = value;

  // mover el cursor automáticamente
  if (value && index < 5) {
    const next = document.getElementById('code-' + (index + 1));
    next?.focus();
  }
}

  login():void{
      const finalCode = this.codeInputs.join(''); // "123456"
      this.authService.loginWithCode(this.email,finalCode).subscribe({
          next: (token: token) => {
            this.authService.setToken(token.token);
            console.log('Login exitoso, token almacenado');
            this.userService.getUserProfile().subscribe(
              {
                next: (user) => {
                  this.userProfile = user;
                  localStorage.setItem(environment.storageNames.user, JSON.stringify(user));
                  localStorage.setItem(environment.typeProfile, this.userProfile.roleId!.toString());
                  if (this.userProfile.roleId === 1) {
                    if (environment.device == 0) {
                      this.router.navigate(['/dashboard']);
                    } else {
                      this.router.navigate(['/not-allowed-device']);
                    }
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
