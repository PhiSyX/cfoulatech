import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlashMessageService
{
  private _flashes: BehaviorSubject<Map<string, {
    type: string;
    value: string
  }>> = new BehaviorSubject(new Map());

  constructor()
  {
  }

  all(): Observable<Map<string, { type: string; value: string }>>
  {
    return this._flashes.asObservable();
  }

  error(reason: string, duration?: number)
  {
    return this.set('error', reason, 'error',duration);
  }

  success(reason: string, duration?: number)
  {
    return this.set('success', reason, 'success',duration);
  }

  warning(reason: string, duration?: number)
  {
    return this.set('warning', reason, 'warning',duration);
  }

  info(reason: string, duration?: number)
  {
    return this.set('info', reason, 'info', duration);
  }

  get(key: string): Observable<{ type: string; value: string } | null>
  {
    return of(this._flashes.value.get(key) ?? null);
  }

  set(key: string, value: string, ty: string = "info", duration = 3000): void
  {
    this._flashes.value.set(key, { type: ty, value });
    this._flashes.next(new Map(this._flashes.value));

    // @ts-expect-error
    window.Toastify({
      text: value,
      className: `toast-${ty}`,
      gravity: "bottom",
      close: true,
      duration,
    }).showToast();
  }

  unset(key: string): void
  {
    if (!this._flashes.value.delete(key)) {
      return;
    }

    this._flashes.next(new Map(this._flashes.value));
  }

  clear()
  {
    this._flashes.next(new Map());
  }
}
