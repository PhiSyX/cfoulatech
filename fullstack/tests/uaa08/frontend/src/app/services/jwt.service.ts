import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface JwtPayload {
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root',
})
export class JwtService
{
  private token: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor()
  {
  }

  getToken(
    { fromSession }:
    { fromSession: boolean } =
    { fromSession: false },
  ): string | null
  {
    if (fromSession) return sessionStorage.getItem('immauweb.token');
    return this.token.value;
  }

  setToken(token: string): void
  {
    this.token.next(token);
    sessionStorage.setItem('immauweb.token', token);
  }

  getPayload(): JwtPayload | null
  {
    function parseJwt (token: string): JwtPayload
    {
      const base64Url = token.split('.')[1];
      const b64 = base64Url.replaceAll('-', '+').replaceAll('_', '/');
      const jsonPayload = decodeURIComponent(
        window.atob(b64).split('').map(
          (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join('')
      );
      return JSON.parse(jsonPayload);
    }

    try {
      return parseJwt(sessionStorage.getItem('immauweb.token')!);
    } catch {
      return null;
    }
  }

  unset()
  {
    this.token.next(null);
    sessionStorage.removeItem('immauweb.token');
  }

  hasToken()
  {
    return this.token.value !== null;
  }

  isExpired()
  {
    const payload = this.getPayload();
    if (!payload) return true;
    const { exp } = payload;
    const now = Math.floor(Date.now() / 1000);
    return now > exp;
  }
}
