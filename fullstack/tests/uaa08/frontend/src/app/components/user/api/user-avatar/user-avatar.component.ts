import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin, mergeMap, of } from 'rxjs';

import { ApiPlatform } from '~/api/api-platform';
import { toUserModel } from '~/api/dto/user.dto';
import { PhotoResource } from '~/api/resource/photo.resource';
import { UtilisateurResource } from '~/api/resource/user.resource';
import { AvatarComponent } from '~/components/avatar/avatar.component';
import { LoaderComponent } from '~/components/loader/loader.component';
import { Utilisateur } from '~/models/user';

@Component({
  selector: 'api-user-photo',
  imports: [
    AvatarComponent,
    LoaderComponent,
    RouterLink,
  ],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss',
})
export class UserAvatarComponent implements OnInit
{
  @Input({ required: true })
  declare api: UtilisateurResource['@id'];

  @Input({ required: true })
  declare width: number | string;
  @Input({ required: true })
  declare height: number | string;

  // Utilisateur récupéré depuis l'API.
  protected user: Utilisateur | null = null;

  constructor(private apiPlatform: ApiPlatform)
  {
  }

  ngOnInit(): void
  {
    this.apiPlatform.get<UtilisateurResource>(this.api)
      .pipe(
        mergeMap((resource) => {
          const photo = resource.photo
            ? this.apiPlatform.get<PhotoResource>(resource.photo)
            : of(null)
          ;

          return forkJoin({
            user: of(resource),
            photo: photo,
          })
        }),
      )
      .subscribe(({ user, photo }) => {
        this.user = toUserModel(user, photo);
      });
  }
}
