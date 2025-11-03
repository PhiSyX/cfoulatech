import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiPlatform } from '~/api/api-platform';
import { ContactMessageResource, ContactMessageResourceCollection } from '~/api/resource/contact-message.resource';

@Injectable({
  providedIn: 'root',
})
export class AdminContactMessageApi
{
  static BASE_PATH = '/api/contact_messages' as const;

  constructor(
    private apiPlatform: ApiPlatform,
  )
  {
  }

  paginate(
    page: number,
    filters?: (string[][] | Record<string, string> | string | URLSearchParams),
  ): Observable<ContactMessageResourceCollection>
  {
    const qs = new URLSearchParams(filters);
    qs.append('page', page.toString());
    qs.append('order[createdAt]', 'desc');
    return this.collection(qs);
  }

  collection(filters: URLSearchParams): Observable<ContactMessageResourceCollection>
  {
    const resourcePath = `${AdminContactMessageApi.BASE_PATH}?${filters.toString()}` as const;

    return this.apiPlatform.auth().get<ContactMessageResourceCollection>(resourcePath);
  }

  delete(
    idOrPath:
      | ContactMessageResource['@id']
      | ContactMessageResource['id'],
  )
  {
    let resourcePath: ContactMessageResource['@id'];
    if (typeof idOrPath === 'number') {
      resourcePath = `${AdminContactMessageApi.BASE_PATH}/${idOrPath}`;
    } else {
      resourcePath = idOrPath;
    }

    return this.apiPlatform.auth().delete(resourcePath);
  }
}
