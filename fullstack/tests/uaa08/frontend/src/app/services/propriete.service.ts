import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProprieteApi } from '~/api/propriete.api';
import { ProprieteResource } from '~/api/resource/propriete.resource';
import { ProprieteEditForm, ProprieteForm } from '~/form/propriete.form';
import { Propriete } from '~/models/propriete';

@Injectable({
  providedIn: 'root',
})
export class ProprieteService
{
  constructor(private api: ProprieteApi)
  {
  }

  create(data: ProprieteForm): Observable<ProprieteResource>
  {
    return this.api.post(data);
  }

  upload(
    proprieteId: ProprieteResource['id'],
    photo: File,
  )
  {
    return this.api.photo().post(proprieteId, photo);
  }

  update(id: Propriete['id'], data: ProprieteEditForm)
  {
    return this.api.patch(id, data);
  }
}
