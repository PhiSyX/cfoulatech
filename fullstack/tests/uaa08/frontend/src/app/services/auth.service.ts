import { Injectable } from '@angular/core';
import { catchError, mergeMap, Observable, tap, throwError } from 'rxjs';

import { ApiPlatform } from '~/api/api-platform';
import { ChangePasswordForm } from '~/form/change-password.form';
import { RequestResetPasswordForm } from '~/form/request-reset-password.form';
import { Utilisateur } from '~/models/user';
import { JwtService } from './jwt.service';
import { UserService } from './user.service';

interface UserCredential
{
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService
{

  constructor(
    private apiPlatform: ApiPlatform,
    private jwtService: JwtService,
    private userService: UserService,
  )
  {
  }

  user(): UserService
  {
    return this.userService;
  }

  currentUser(): Observable<Utilisateur | null>
  {
    if (this.userService.get() === null) {
      try {
        const maybeToken = this.jwtService.getToken({ fromSession: true });
        const maybeUser = this.userService.get({ fromSession: true });
        if (maybeToken && maybeUser) {
          this.jwtService.setToken(maybeToken);
          this.userService.set(maybeUser, { saveSession: false })
        } else {
          return this.check();
        }
      } catch {
      }
    }

    return this.userService.observable();
  }

  check(): Observable<Utilisateur>
  {
    const token = this.jwtService.getToken({ fromSession: true });

    if (!token) {
      return throwError(() => new Error('Le jeton utilisateur est manquant !'));
    }

    return this.userService.me().pipe(catchError((err) => {
      this.jwtService.unset();
      throw err
    }));
  }

  login(credentials: UserCredential)
  {
    return this.apiPlatform.post<{ token: string }>("/api/login", credentials)
      .pipe(
        tap((res) => this.jwtService.setToken(res.token)),
        mergeMap(() => this.check()),
      );
  }

  logout()
  {
    this.jwtService.unset();
    this.userService.unset();
  }

  requestResetPassword(data: RequestResetPasswordForm)
  {
    return this.apiPlatform.post<{ redirectTo: string }>(
      '/api/reset-password',
      data,
    );
  }

  resetPassword(data: ChangePasswordForm)
  {
    return this.apiPlatform.post<{ redirectTo: string }>(
      `/api/reset-password/reset/${data.token}`,
      data,
    );
  }
}
