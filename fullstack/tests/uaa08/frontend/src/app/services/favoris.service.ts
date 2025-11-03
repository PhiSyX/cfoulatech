import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, mergeMap } from 'rxjs';

import { Annonce } from '~/models/annonce';
import { AnnonceService } from '~/services/annonce.service';
import { UserService } from '~/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class FavorisService
{
  favIds: BehaviorSubject<Array<number>> = new BehaviorSubject<Array<number>>([]);

  constructor(
    private annonceService: AnnonceService,
    private userService: UserService,
  )
  {
  }

  add(annonceId: Annonce['id'])
  {
    const olds = this.favIds.value;
    if (olds.includes(annonceId)) {
      return;
    }
    const unique = new Set([...olds, annonceId]);
    const news = Array.from(unique);
    this.favIds.next(news);
    this.saveToStorage(news);
  }

  remove(annonceId: Annonce['id'])
  {
    const olds = this.favIds.value;
    const filtered = olds.filter(favId => favId !== annonceId);
    this.favIds.next(filtered);
    this.saveToStorage(filtered);
  }

  all()
  {
    try {
      const user = this.userService.get()!;
      const favIds = JSON.parse(localStorage.getItem(`immauweb.favorites[${user.id}]`) || '[]');
      for (const favId of favIds) {
        this.add(favId);
      }
    } catch {
    }

    return this.favIds.asObservable();
  }

  annonces()
  {
    return this.all().pipe(
      filter(favIds => favIds.length > 0),
      mergeMap((favIds) => {
        const ids = new URLSearchParams();
        for (const favId of favIds) {
          ids.append('id[]', favId.toString());
        }
        return this.annonceService.fetchWithCustomFilters(ids);
      }),
    )
  }

  unset()
  {
    const user = this.userService.get()!;
    localStorage.removeItem(`immauweb.favoris[${user.id}`);
  }

  saveToStorage(ids: Array<number>): void
  {
    const user = this.userService.get()!;
    localStorage.setItem(`immauweb.favorites[${user.id}]`, JSON.stringify(ids));
  }
}
