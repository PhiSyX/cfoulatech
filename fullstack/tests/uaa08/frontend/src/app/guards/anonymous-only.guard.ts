import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { FlashMessageService } from '~/services/flash-message.service';
import { UserService } from '~/services/user.service';
import { JwtService } from '~/services/jwt.service';

export const anonymousOnlyGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const jwtService = inject(JwtService);

  const user = userService.get({ fromSession: true });
  const token = jwtService.getToken({ fromSession: true });

  if (!token || !user) {
    return true;
  }

  const flashMessage = inject(FlashMessageService);
  const router = inject(Router);

  flashMessage.warning(
    "Vous êtes déjà connecté pour pouvoir accéder à cette page",
  );
  return router.createUrlTree(['/account']);
};
