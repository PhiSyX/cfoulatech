import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { forkJoin, mergeMap, of } from 'rxjs';

import { UtilisateurResource } from '~/api/resource/user.resource';
import { ApiPlatform } from '~/api/api-platform';
import { PhotoResource } from '~/api/resource/photo.resource';
import { toUserModel } from '~/api/dto/user.dto';
import { AvatarComponent } from '~/components/avatar/avatar.component';
import { BadgeComponent } from '~/components/badge/badge.component';
import { LoaderComponent } from '~/components/loader/loader.component';
import { UserBadgeComponent } from '~/components/user/user-badge/user-badge.component';
import { Utilisateur } from '~/models/user';
import { RolesPipe } from '~/pipes/roles.pipe';

@Component({
  selector: 'api-user-card',
  imports: [
    AvatarComponent,
    DatePipe,
    UserBadgeComponent,
    RolesPipe,
    LoaderComponent,
    BadgeComponent,
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent implements OnInit
{
  @Input({ required: true })
  declare api: UtilisateurResource['@id'];

  @Input()
  withAuthorization = false;

  @Input()
  withLoader = false;

  // Utilisateur récupéré depuis l'API.
  protected user: Utilisateur | null = null;

  constructor(private apiPlatform: ApiPlatform)
  {
  }

  ngOnInit(): void
  {
    const apiPlatform = this.withAuthorization ? this.apiPlatform.auth() : this.apiPlatform;

    apiPlatform.get<UtilisateurResource>(this.api)
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
