import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AnnonceEditForm, AnnonceForm } from '~/form/annonce.form';
import { Annonce, AnnonceCollection } from '~/models/annonce';
import { ApiPlatform } from './api-platform';
import { toAnnonce, toAnnonceCollection } from './dto/annonce.dto';
import { ProprieteApi } from './propriete.api';
import { AnnonceResource, AnnonceResourceCollection } from './resource/annonce.resource';
import { UserApi } from './user.api';

@Injectable({
  providedIn: 'root',
})
export class AnnonceApi
{
  static BASE_PATH = '/api/annonces' as const;

  constructor(
    private apiPlatform: ApiPlatform,
    private userApi: UserApi,
    private proprieteApi: ProprieteApi,
  )
  {
  }

  /**
   * Requête en GET vers l'API d'annonces.
   */
  get(
    idOrPath:
      | AnnonceResource['@id']
      | AnnonceResource['id']
  ): Observable<Annonce>
  {
    let resourcePath: AnnonceResource['@id'];
    if (typeof idOrPath === "number") {
      resourcePath = `${AnnonceApi.BASE_PATH}/${idOrPath}`;
    } else {
      resourcePath = idOrPath;
    }

    return toAnnonce(
      this.apiPlatform.get<AnnonceResource>(resourcePath),
      {
        user: this.userApi,
        propriete: this.proprieteApi,
      }
    );
  }

  /**
   * Requête en POST vers l'API d'annonces.
   */
  post(data: AnnonceForm): Observable<AnnonceResource>
  {
    return this.apiPlatform.auth().post<AnnonceResource>(
      AnnonceApi.BASE_PATH,
      data,
    );
  }

  /**
   * Requête en GET vers l'API d'annonces.
   */
  paginate(page: number, filters?: URLSearchParams): Observable<AnnonceCollection>
  {
    const qs = new URLSearchParams(filters);
    qs.set('itemsPerPage', '10');
    qs.set('page', page.toString());
    qs.set('order[createdAt]', 'desc');

    return this.collection(qs);
  }

  /**
   * Requête en GET vers l'API d'annonces.
   */
  collection(filters: URLSearchParams): Observable<AnnonceCollection>
  {
    const qs = new URLSearchParams(filters);
    qs.set('itemsPerPage', '10');
    qs.set('order[createdAt]', 'desc');

    const resourcePath = `${AnnonceApi.BASE_PATH}?${qs.toString()}` as const;

    return toAnnonceCollection(
      this.apiPlatform.get<AnnonceResourceCollection>(resourcePath), {
        user: this.userApi,
        propriete: this.proprieteApi,
      });
  }

  /**
   * Requête en DELETE vers l'API d'annonces.
   * Pour supprimer une annonce, il est nécessaire d'être :
   * 1) authentifié
   * 2) propriétaire de l'annonce
   */
  delete(
    idOrPath:
      | AnnonceResource['@id']
      | AnnonceResource['id']
  ): Observable<void>
  {
    let resourcePath: AnnonceResource['@id'];
    if (typeof idOrPath === "number") {
      resourcePath = `${AnnonceApi.BASE_PATH}/${idOrPath}`;
    } else {
      resourcePath = idOrPath;
    }

    return this.apiPlatform.auth().delete(resourcePath);
  }

  patch(
    idOrPath:
      | AnnonceResource['@id']
      | AnnonceResource['id'],
    data: AnnonceEditForm
  ): Observable<Annonce>
  {
    let resourcePath: AnnonceResource['@id'];
    if (typeof idOrPath === "number") {
      resourcePath = `${AnnonceApi.BASE_PATH}/${idOrPath}`;
    } else {
      resourcePath = idOrPath;
    }

    return toAnnonce(
      this.apiPlatform.auth().patch(resourcePath, data),
      {
        user: this.userApi,
        propriete: this.proprieteApi,
      }
    );
  }
}
