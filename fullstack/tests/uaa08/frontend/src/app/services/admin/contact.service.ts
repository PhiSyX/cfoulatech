import { Injectable } from '@angular/core';

import { AdminContactMessageApi } from '~/api/admin/contact-message.api';
import { ContactMessageResource } from '~/api/resource/contact-message.resource';

@Injectable({
  providedIn: 'root',
})
export class AdminContactService
{
  constructor(
    private api: AdminContactMessageApi,
  )
  {
  }

  fetchPage(page: number)
  {
    return this.api.paginate(page);
  }

  remove(id: ContactMessageResource['id'])
  {
    return this.api.delete(id);
  }
}
