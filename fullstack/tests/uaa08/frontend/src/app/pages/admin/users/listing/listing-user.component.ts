import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AvatarComponent } from '~/components/avatar/avatar.component';
import { LoaderComponent } from '~/components/loader/loader.component';
import { UserBadgeComponent } from '~/components/user/user-badge/user-badge.component';
import { Utilisateur, UtilisateurCollection } from '~/models/user';
import { RolesPipe } from '~/pipes/roles.pipe';
import { AdminUserService } from '~/services/admin/user.service';
import { FlashMessageService } from '~/services/flash-message.service';
import { AuthService } from '~/services/auth.service';

@Component({
  selector: 'app-admin-listing-user',
  imports: [
    LoaderComponent,
    RolesPipe,
    RouterLink,
    UserBadgeComponent,
    AvatarComponent,
  ],
  templateUrl: './listing-user.component.html',
  styleUrl: './listing-user.component.scss',
})
export class AdminListingUserComponent implements OnInit
{
  userCollection: UtilisateurCollection | null = null;
  currentUser: Utilisateur | null = null;

  constructor(
    private flashMessage: FlashMessageService,
    private adminUserService: AdminUserService,
    private authService: AuthService,
  )
  {
  }

  ngOnInit()
  {
    this.authService.currentUser().subscribe((user) => {
      this.currentUser = user;
    });

    this.adminUserService.fetchPage(1, {
      'roles[0]': 'ROLE_CLIENT',
      'roles[1]': 'ROLE_PROPRIETAIRE',
    }).subscribe((userCollection) => {
      this.userCollection = userCollection;
    });
  }

  onDelete(user: Utilisateur)
  {
    if (
      user.id === this.currentUser?.id ||
      user.roles.includes('ROLE_ADMIN')
    ) {
      this.flashMessage.warning(
        `Désolé, vous ne pouvez pas effectuer cette action fastidieuse car il s'agit
        d'un membre dont le rôle est Administrateur.`,
      );
      return;
    }

    if (!window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      return;
    }

    this.adminUserService.remove(user).subscribe(() => {
      this.flashMessage.success(
        `L'utilisateur '${user.userIdentifier}' a bien été supprimé.`,
      );

      if (this.userCollection?.users) {
        this.userCollection.users = this.userCollection.users.filter(
          (cUser) => cUser.userIdentifier !== user.userIdentifier,
        );
      }
    });
  }
}
