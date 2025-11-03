import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AdminUserApi } from '~/api/admin/user.api';
import { UserApi } from '~/api/user.api';
import { AdminUtilisateurUpdateForm } from '~/form/utilisateur.form';
import { Utilisateur } from '~/models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminUserService
{
  constructor(
    private api: AdminUserApi,
    private userApi: UserApi,
  )
  {
  }

  fetchById(id: Utilisateur['id'])
  {
    return this.api.get(id);
  }

  fetchPage(
    page: number,
    filters?: (string[][] | Record<string, string> | string | URLSearchParams),
  )
  {
    return this.api.paginate(page, filters);
  }

  update(id: Utilisateur['id'], data: AdminUtilisateurUpdateForm)
  {
    return this.api.patch(id, data);
  }

  remove(user: Utilisateur)
  {
    return this.api.delete(user.id);
  }

  deleteAvatar(user: Utilisateur): Observable<Utilisateur>
  {
    return this.userApi.avatar().delete(user.id);
  }
}
