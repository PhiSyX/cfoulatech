import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cacheable } from 'ts-cacheable';

import { ProprieteEditForm, ProprieteForm } from '~/form/propriete.form';
import { Propriete, ProprietePhoto } from '~/models/propriete';
import { AdresseApi } from './adresse.api';
import { ApiPlatform } from './api-platform';
import { toPropriete, toProprietePhoto } from './dto/propriete.dto';
import { PhotoApi } from './photo.api';
import { ProprietePhotoResource, ProprieteResource } from './resource/propriete.resource';
import { UserApi } from './user.api';

@Injectable({
  providedIn: 'root',
})
export class ProprieteApi
{
  static BASE_PATH = '/api/proprietes' as const;

  constructor(
    private apiPlatform: ApiPlatform,
    private proprietePhotoApi: ProprietePhotoApi,
    private adresseApi: AdresseApi,
    private userApi: UserApi,
  )
  {
  }

  /**
   * Accès au client HTTP ProprietePhoto
   */
  photo()
  {
    return this.proprietePhotoApi;
  }

  /**
   * Requête en POST vers l'API de propriétés. Pour créer une propriété, il est
   * nécessaire d'être authentifié.
   */
  post(data: ProprieteForm): Observable<ProprieteResource>
  {
    return this.apiPlatform.auth().post<ProprieteResource>(
      ProprieteApi.BASE_PATH,
      data,
    );
  }

  /**
   * Requête en GET vers l'API propriétés.
   */
  get(
    idOrPath:
      | ProprieteResource['@id']
      | ProprieteResource['id']
  ): Observable<Propriete>
  {
    let resourcePath: ProprieteResource['@id'];
    if (typeof idOrPath === "number") {
      resourcePath = `${ProprieteApi.BASE_PATH}/${idOrPath}`;
    } else {
      resourcePath = idOrPath;
    }

    return toPropriete(
      this.apiPlatform.get<ProprieteResource>(resourcePath),
      {
        adresse: this.adresseApi,
        photo: this.photo(),
        user: this.userApi,
      }
    );
  }

  /**
   * Requête en POST vers l'API de propriétés.
   * Pour modifier une propriété, il est nécessaire d'avoir le rôle ROLE_PROPRIETAIRE
   * et d'être le proprietaire.
   */
  patch(
    idOrPath:
      | ProprieteResource['@id']
      | ProprieteResource['id'],
    data: ProprieteEditForm
  ): Observable<Propriete>
  {
    let resourcePath: ProprieteResource['@id'];
    if (typeof idOrPath === "number") {
      resourcePath = `${ProprieteApi.BASE_PATH}/${idOrPath}`;
    } else {
      resourcePath = idOrPath;
    }

    return toPropriete(
      this.apiPlatform.auth().patch(resourcePath, data),
      {
        adresse: this.adresseApi,
        photo: this.photo(),
        user: this.userApi,
      }
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class ProprietePhotoApi
{
  static BASE_PATH = '/api/propriete_photos' as const;

  constructor(
    private apiPlatform: ApiPlatform,
    private photoApi: PhotoApi,
  )
  {
  }

  /**
   * Requête en GET vers l'API photos des propriétés.
   */
  get(
    idOrPath:
      | ProprieteResource['photos'][number]
      | ProprietePhotoResource['id']
  ): Observable<ProprietePhoto>
  {
    let resourcePath: ProprieteResource['photos'][number];
    if (typeof idOrPath === "number") {
      resourcePath = `${ProprietePhotoApi.BASE_PATH}/${idOrPath}`;
    } else {
      resourcePath = idOrPath;
    }

    return toProprietePhoto(
      this.apiPlatform.get<ProprietePhotoResource>(resourcePath),
      {
        photo: this.photoApi,
      }
    );
  }

  /**
   * Requête en POST vers l'API des photos des propriétés. Pour téléverser une
   * photo, il est nécessaire d'être connecté et d'être le propriétaire de la
   * propriété.
   */
  post(
    idOrPath:
      | ProprieteResource['@id']
      | ProprieteResource['id'],
    photo: File,
  ): Observable<any>
  {
    let resourcePath: `${ProprieteResource['@id']}/upload`;
    if (typeof idOrPath === "number") {
      resourcePath = `${ProprieteApi.BASE_PATH}/${idOrPath}/upload`;
    } else {
      resourcePath = `${idOrPath}/upload`;
    }

    const formData = new FormData();
    formData.append('photo', photo);

    return this.apiPlatform.auth().postFormData(
      resourcePath,
      formData,
    );
  }
}
