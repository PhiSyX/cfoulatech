import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cacheable } from 'ts-cacheable';

import { PhotoApi } from '~/api/photo.api';
import { PhotoResource } from '~/api/resource/photo.resource';
import { Photo } from '~/models/photo';

@Injectable({
  providedIn: 'root',
})
export class PhotoService
{
  constructor(private api: PhotoApi)
  {
  }

  fetch(resourcePath: PhotoResource['@id']): Observable<Photo>
  {
    return this.api.get(resourcePath);
  }
}
