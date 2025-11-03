import { Injectable } from '@angular/core';

import { ContactMessageApi } from '~/api/contact-message.api';
import { ContactUsForm } from '~/form/contact.form';

@Injectable({
  providedIn: 'root',
})
export class ContactMessageService
{
  constructor(private api: ContactMessageApi)
  {
  }

  send(data: ContactUsForm)
  {
    return this.api.post(data);
  }
}
