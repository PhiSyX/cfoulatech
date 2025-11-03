import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';

import { PhotoResource } from '~/api/resource/photo.resource';
import { UtilisateurResource } from '~/api/resource/user.resource';
import { UserApi } from '~/api/user.api';
import { UtilisateurCreateForm, UtilisateurUpdateForm } from '~/form/utilisateur.form';
import { Utilisateur } from '~/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService
{
  private _currentUser: BehaviorSubject<Utilisateur | null> = new BehaviorSubject<Utilisateur | null>(null);

  constructor(private api: UserApi)
  {
  }

  get(
    { fromSession }:
    { fromSession: boolean } =
    { fromSession: false },
  )
  {
    if (fromSession) {
      const user = localStorage.getItem('immauweb.user');
      return (user ? JSON.parse(user) : null) as Utilisateur | null;
    }
    return this._currentUser.value;
  }

  observable()
  {
    return this._currentUser.asObservable();
  }

  set(
    user: Utilisateur,
    { saveSession }:
    { saveSession: boolean } =
    { saveSession: true },
  ): void
  {
    this._currentUser.next(user);
    if (!saveSession) return;
    this.saveToStorage(user);
  }

  unset()
  {
    this._currentUser.next(null);
    localStorage.removeItem('immauweb.user');
  }

  create(newUser: UtilisateurCreateForm): Observable<UtilisateurResource>
  {
    return this.api.post(newUser);
  }

  uploadAvatar(user: Pick<Utilisateur, "id">, avatar: File): Observable<PhotoResource>
  {
    return this.api.avatar().post(user.id, avatar);
  }

  deleteAvatar(user: Utilisateur): Observable<Utilisateur>
  {
    return this.api.avatar().delete(user.id).pipe(tap(user => this.set(user)));
  }

  saveToStorage(
    user: Pick<
      Utilisateur,
      | "userIdentifier"
      | "id"
      | "email"
      | "photo"
      | "roles"
      | "nom"
      | "prenom"
      | "telephone"
      | "verified"
    >,
  ): void
  {
    const u = {
      userIdentifier: user.userIdentifier,
      id: user.id,
      email: user.email,
      photo: user.photo,
      roles: user.roles,
      nom: user.nom,
      prenom: user.prenom,
      telephone: user.telephone,
      verified: user.verified,
    };
    localStorage.setItem('immauweb.user', JSON.stringify(u));
  }

  update(user: Utilisateur, dataUser: UtilisateurUpdateForm)
  {
    return this.api.patch(user.id, dataUser).pipe(tap((user) => this.set(user)));
  }

  me()
  {
    return this.api.me().pipe(
      tap((user) => this.set(user)),
      catchError((err) => {
        this.unset();
        throw err;
      }),
    )
  }

  exists()
  {
    return this._currentUser.value !== null;
  }
}
