import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { FlashMessageService } from '~/services/flash-message.service';
import { JwtService } from '~/services/jwt.service';
import { UserService } from '~/services/user.service';

export const adminOnlyGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const userService = inject(UserService);
  const flashMessage = inject(FlashMessageService);
  const router = inject(Router);

  if (jwtService.isExpired()) {
    flashMessage.info(
      "Votre session a expiré après une longue période d'inactivité",
      10_000,
    );

    const currentUrl = state.url;
    return router.createUrlTree([`/login`], {
      queryParams: { returnTo: currentUrl },
    });
  }

  const user = userService.get({ fromSession: true });

  if (user?.roles.includes('ROLE_ADMIN')) {
    return true;
  }

  flashMessage.info(
    "Il s'agit d'une page réservée aux utilisateurs avec des permissions plus forte.",
    10_000,
  );

  if (user) {
    return router.createUrlTree(['/']);
  }

  return router.createUrlTree(['/login']);
};
