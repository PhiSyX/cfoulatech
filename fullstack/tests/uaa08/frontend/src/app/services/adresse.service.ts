import { Injectable } from '@angular/core';

import { AdresseApi } from '~/api/adresse.api';
import { AdresseEditForm, AdresseForm } from '~/form/adresse.form';
import { Adresse } from '~/models/adresse';

@Injectable({
  providedIn: 'root',
})
export class AdresseService
{
  constructor(private api: AdresseApi)
  {
  }

  create(data: AdresseForm)
  {
    return this.api.post(data);
  }

  update(id: Adresse['id'], data: AdresseEditForm)
  {
    return this.api.patch(id, data);
  }
}
