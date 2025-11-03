import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AnnonceApi } from '~/api/annonce.api';
import { AnnonceResource } from '~/api/resource/annonce.resource';
import { AnnonceEditForm, AnnonceForm } from '~/form/annonce.form';
import { Annonce, AnnonceCollection } from '~/models/annonce';
import { Utilisateur } from '~/models/user';

@Injectable({
  providedIn: 'root',
})
export class AnnonceService
{
  constructor(private api: AnnonceApi)
  {
  }

  create(data: AnnonceForm): Observable<AnnonceResource>
  {
    return this.api.post(data);
  }

  fetchLatest(page: number, filters?: URLSearchParams): Observable<AnnonceCollection>
  {
    return this.api.paginate(page, filters);
  }

  fetchWithCustomFilters(filters: URLSearchParams): Observable<AnnonceCollection>
  {
    return this.api.collection(filters);
  }

  fetchFromUser(id: Utilisateur['id'])
  {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('utilisateur', id.toString());
    return this.api.collection(urlSearchParams);
  }

  fetchById(id: AnnonceResource['id'])
  {
    return this.api.get(id);
  }

  remove(annonce: Annonce)
  {
    return this.api.delete(annonce.id);
  }

  update(id: Annonce['id'], data: AnnonceEditForm)
  {
    return this.api.patch(id, data);
  }
}
