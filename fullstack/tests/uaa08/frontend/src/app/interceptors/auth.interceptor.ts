import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

import { AuthService } from '~/services/auth.service';

/**
 * Redirection vers la page de login si le JSON Web Token a été invalidé ou expiré.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(catchError((err: HttpErrorResponse) => {
    if (
      err.error?.message?.startsWith('Invalid JWT') ||
      err.error?.message?.startsWith('Expired JWT')
    ) {
      router.navigate(['/login']);
    } else if (
      err.error?.code === 401 &&
      err.error?.message === 'Identifiants invalides.' &&
      !window.location.pathname.startsWith('/login')
    ) {
      authService.logout();
      router.navigate(['/login']);
    }

    throw err;
  }));
};
