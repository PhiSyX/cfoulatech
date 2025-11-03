import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cacheable } from 'ts-cacheable';

import { Photo } from '~/models/photo';
import { ApiPlatform } from './api-platform';
import { toPhoto } from './dto/photo.dto';
import { PhotoResource } from './resource/photo.resource';

@Injectable({
  providedIn: 'root',
})
export class PhotoApi
{
  static BASE_PATH = '/api/photos' as const;

  constructor(private apiPlatform: ApiPlatform)
  {
  }

  /**
   * Requête en GET vers l'API photos.
   */
  get(
    idOrPath:
      | PhotoResource['@id']
      | PhotoResource['id']
  ): Observable<Photo>
  {
    let resourcePath: PhotoResource['@id'];
    if (typeof idOrPath === "number") {
      resourcePath = `${PhotoApi.BASE_PATH}/${idOrPath}`;
    } else {
      resourcePath = idOrPath;
    }

    return toPhoto(
      this.apiPlatform.get<PhotoResource>(resourcePath)
    );
  }
}
