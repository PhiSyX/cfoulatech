import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cacheable } from 'ts-cacheable';

import { UtilisateurCreateForm, UtilisateurUpdateForm } from '~/form/utilisateur.form';
import { Utilisateur } from '~/models/user';
import { ApiPlatform } from './api-platform';
import { toUser } from './dto/user.dto';
import { PhotoApi } from './photo.api';
import { PhotoResource } from './resource/photo.resource';
import { UtilisateurResource } from './resource/user.resource';

@Injectable({
  providedIn: 'root',
})
export class UserApi
{
  static BASE_PATH = '/api/utilisateurs' as const;
  static ME_PATH = '/api/me' as const;
  static REGISTER_PATH = '/api/register' as const;

  constructor(
    private apiPlatform: ApiPlatform,
    private userAvatarApi: UserAvatarApi,
    private photoApi: PhotoApi,
  )
  {
  }

  /**
   * Accès au client HTTP Photo Utilisateur
   */
  avatar()
  {
    return this.userAvatarApi;
  }

  /**
   * Requête en GET vers le controller d'API utilisateurs.
   */
  me(): Observable<Utilisateur>
  {
    return toUser(
      this.apiPlatform.auth().get<UtilisateurResource>(UserApi.ME_PATH),
      {
        photo: this.photoApi,
      },
    );
  }

  /**
   * Requête en POST vers l'API utilisateurs.
   */
  post(data: UtilisateurCreateForm): Observable<UtilisateurResource>
  {
    return this.apiPlatform.post<UtilisateurResource>(
      UserApi.REGISTER_PATH,
      data,
    );
  }

  /**
   * Requête en PATCH vers l'API utilisateurs.
   */
  patch(
    idOrPath:
      | UtilisateurResource['@id']
      | UtilisateurResource['id'],
    data: UtilisateurUpdateForm,
  ): Observable<Utilisateur>
  {
    let resourcePath: UtilisateurResource['@id'];
    if (typeof idOrPath === "number") {
      resourcePath = `${UserApi.BASE_PATH}/${idOrPath}`;
    } else {
      resourcePath = idOrPath;
    }

    return toUser(
      this.apiPlatform.auth().patch<UtilisateurResource>(
        resourcePath,
        data,
      ),
      {
        photo: this.photoApi,
      }
    );
  }

  /**
   * Requête en GET vers l'API utilisateurs.
   */
  get(
    idOrPath:
      | UtilisateurResource['@id']
      | UtilisateurResource['id'],
  ): Observable<Utilisateur>
  {
    let resourcePath: UtilisateurResource['@id'];
    if (typeof idOrPath === "number") {
      resourcePath = `${UserApi.BASE_PATH}/${idOrPath}`;
    } else {
      resourcePath = idOrPath;
    }

    return toUser(
      this.apiPlatform.get<UtilisateurResource>(resourcePath),
      {
        photo: this.photoApi,
      },
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserAvatarApi
{
  constructor(
    private apiPlatform: ApiPlatform,
    private photoApi: PhotoApi,
  )
  {
  }

  /**
   * Requête en POST vers le controller d'API photo utilisateurs.
   */
  post(
    idOrPath:
      | UtilisateurResource['@id']
      | UtilisateurResource['id'],
    avatar: File,
  ): Observable<PhotoResource>
  {
    let resourcePath: `${UtilisateurResource['@id']}/upload`;
    if (typeof idOrPath === "number") {
      resourcePath = `${UserApi.BASE_PATH}/${idOrPath}/upload`;
    } else {
      resourcePath = `${idOrPath}/upload`;
    }

    const formData = new FormData();
    formData.append('avatar', avatar);

    return this.apiPlatform.postFormData<PhotoResource>(
      resourcePath,
      formData,
    );
  }

  /**
   * Requête en DELETE vers le controller d'API photo utilisateurs.
   * Pour supprimer un avatar, il est nécessaire d'être connecté.
   */
  delete(
    idOrPath:
      | UtilisateurResource['@id']
      | UtilisateurResource['id']
  ): Observable<Utilisateur>
  {
    let resourcePath: `${UtilisateurResource['@id']}/avatar`;
    if (typeof idOrPath === "number") {
      resourcePath = `${UserApi.BASE_PATH}/${idOrPath}/avatar`;
    } else {
      resourcePath = `${idOrPath}/avatar`;
    }

    return toUser(
      this.apiPlatform.auth().delete<UtilisateurResource>(resourcePath),
      {
        photo: this.photoApi,
      },
    );
  }
}
