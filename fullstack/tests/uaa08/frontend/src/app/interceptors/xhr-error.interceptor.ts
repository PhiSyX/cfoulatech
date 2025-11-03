import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';

import { FlashMessageService } from '~/services/flash-message.service';

/**
 * Affiche les messages d'erreurs des réponses HTTP dans un `toast` en tant que
 * flash message.
 */
export const xhrErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const flashMessage = inject(FlashMessageService);

  return next(req).pipe(catchError((errorResponse) => {
    const errorMessage = (
      errorResponse.error?.detail ||
      errorResponse.error?.message || 
      errorResponse.message
    );
    flashMessage.error(errorMessage);
    throw errorResponse;
  }));
};
