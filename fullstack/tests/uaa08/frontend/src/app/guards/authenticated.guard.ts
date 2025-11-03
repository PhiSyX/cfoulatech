import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { FlashMessageService } from '~/services/flash-message.service';
import { JwtService } from '~/services/jwt.service';
import { UserService } from '~/services/user.service';

export const isAuthenticatedFullyGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const userService = inject(UserService);
  const flashMessage = inject(FlashMessageService);
  const router = inject(Router);

  const user = userService.get({ fromSession: true });

  if (!jwtService.isExpired() && user) {
    return true;
  }

  if (jwtService.isExpired()) {
    flashMessage.info(
      "Votre session a expiré après une longue période d'inactivité",
      10_000,
    );
  }

  if (!user) {
    flashMessage.error(
      'Vous devez être connecté pour accéder à cette partie du site',
      10_000,
    );
  }

  const currentUrl = state.url;
  return router.createUrlTree([`/login`], {
    queryParams: { returnTo: currentUrl },
  });
};
