import { CanActivateFn ,Router} from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../../services/auth/auth';

export const authGuard: CanActivateFn = (route, state) => {
const authService = inject(Auth);
const router = inject(Router);
if (authService.isAuthenticated()) {
    // 2. Si está autenticado, redirigir a una ruta de acceso (ej. dashboard)
    console.log('Usuario ya autenticado. Redirigiendo a /dashboard');
    router.navigate(['/dashboard']); 
    return false; // Bloquear el acceso a la ruta actual (login/register)
  }
  return true;
};
