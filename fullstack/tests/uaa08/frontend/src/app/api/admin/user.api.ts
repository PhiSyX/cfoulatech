import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cacheable } from 'ts-cacheable';

import { AnnonceApi } from '~/api/annonce.api';
import { ApiPlatform } from '~/api/api-platform';
import { toUserCollection, toUserWithRelationship } from '~/api/dto/user.dto';
import { PhotoApi } from '~/api/photo.api';
import { ProprieteApi } from '~/api/propriete.api';
import { UtilisateurResource, UtilisateurResourceCollection } from '~/api/resource/user.resource';
import { AdminUtilisateurUpdateForm } from '~/form/utilisateur.form';
import { Utilisateur, UtilisateurCollection } from '~/models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminUserApi
{
  static BASE_PATH = '/api/utilisateurs' as const;

  constructor(
    private apiPlatform: ApiPlatform,
    private photoApi: PhotoApi,
    private proprieteApi: ProprieteApi,
    private annonceApi: AnnonceApi,
  )
  {
  }

  /**
   * Requête en GET vers l'API utilisateurs.
   */
  get(
    idOrPath:
      | UtilisateurResource['@id']
      | UtilisateurResource['id']
  ): Observable<Utilisateur>
  {
    let resourcePath: UtilisateurResource['@id'];
    if (typeof idOrPath === "number") {
      resourcePath = `${AdminUserApi.BASE_PATH}/${idOrPath}`;
    } else {
      resourcePath = idOrPath;
    }

    return toUserWithRelationship(
      this.apiPlatform.auth().get<UtilisateurResource>(resourcePath),
      {
        photo: this.photoApi,
        propriete: this.proprieteApi,
        annonce: this.annonceApi,
      },
    );
  }

  paginate(
    page: number,
    filters?: (string[][] | Record<string, string> | string | URLSearchParams),
  ): Observable<UtilisateurCollection>
  {
    const qs = new URLSearchParams(filters);
    qs.append('page', page.toString());
    qs.append('order[createdAt]', 'desc');
    return this.collection(qs);
  }

  collection(filters: URLSearchParams): Observable<UtilisateurCollection>
  {
    const resourcePath = `${AdminUserApi.BASE_PATH}?${filters.toString()}` as const;

    return toUserCollection(
      this.apiPlatform.auth().get<UtilisateurResourceCollection>(resourcePath),
      {
        photo: this.photoApi,
        propriete: this.proprieteApi,
        annonce: this.annonceApi,
      },
    );
  }

  delete(
    idOrPath:
      | UtilisateurResource['@id']
      | UtilisateurResource['id']
  ): Observable<void>
  {
    let resourcePath: UtilisateurResource['@id'];
    if (typeof idOrPath === "number") {
      resourcePath = `${AdminUserApi.BASE_PATH}/${idOrPath}`;
    } else {
      resourcePath = idOrPath;
    }

    return this.apiPlatform.auth().delete(resourcePath);
  }

  /**
   * Requête en PATCH vers l'API utilisateurs (admin).
   */
  patch(
    idOrPath:
      | UtilisateurResource['@id']
      | UtilisateurResource['id'],
    data: AdminUtilisateurUpdateForm
  ): Observable<Utilisateur>
  {
    let resourcePath: UtilisateurResource['@id'];
    if (typeof idOrPath === "number") {
      resourcePath = `${AdminUserApi.BASE_PATH}/${idOrPath}`;
    } else {
      resourcePath = idOrPath;
    }

    return toUserWithRelationship(
      this.apiPlatform.auth().patch<UtilisateurResource>(
        resourcePath,
        data,
      ),
      {
        photo: this.photoApi,
        propriete: this.proprieteApi,
        annonce: this.annonceApi,
      },
    );
  }
}
