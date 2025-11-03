import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cacheable } from 'ts-cacheable';

import { AdresseEditForm, AdresseForm } from '~/form/adresse.form';
import { Adresse } from '~/models/adresse';
import { ApiPlatform } from './api-platform';
import { toAdresse } from './dto/adresse.dto';
import { AdresseResource } from './resource/adresse.resource';

@Injectable({
  providedIn: 'root',
})
export class AdresseApi
{
  static BASE_PATH = '/api/adresses' as const;

  constructor(private apiPlatform: ApiPlatform)
  {
  }

  /**
   * Requête en POST vers l'API d'adresses. Pour créer une adresse, il est
   * nécessaire d'être authentifié.
   */
  post(data: AdresseForm): Observable<AdresseResource>
  {
    return this.apiPlatform.auth().post<AdresseResource>(
      AdresseApi.BASE_PATH,
      data,
    );
  }

  /**
   * Requête en GET vers l'API d'adresses.
   */
  get(
    idOrPath:
      | AdresseResource['@id']
      | AdresseResource['id']
  ): Observable<Adresse>
  {
    let resourcePath: AdresseResource['@id'];
    if (typeof idOrPath === "number") {
      resourcePath = `${AdresseApi.BASE_PATH}/${idOrPath}`;
    } else {
      resourcePath = idOrPath;
    }

    return toAdresse(this.apiPlatform.get<AdresseResource>(resourcePath));
  }

  /**
   * Requête en PATCH vers l'API d'adresses. Pour modifier une adresse, il est
   * nécessaire d'être authentifié, et d'avoir le rôle ROLE_PROPRIETAIRE.
   */
  patch(
    idOrPath:
      | AdresseResource['@id']
      | AdresseResource['id'],
    data: AdresseEditForm,
  ): Observable<Adresse>
  {
    let resourcePath: AdresseResource['@id'];
    if (typeof idOrPath === "number") {
      resourcePath = `${AdresseApi.BASE_PATH}/${idOrPath}`;
    } else {
      resourcePath = idOrPath;
    }

    return toAdresse(this.apiPlatform.auth().patch(
      resourcePath,
      data,
    ));
  }
}
