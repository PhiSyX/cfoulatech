import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserRole } from '~/api/resource/user.resource';
import { AvatarComponent } from '~/components/avatar/avatar.component';
import { LoaderComponent } from '~/components/loader/loader.component';
import { Utilisateur } from '~/models/user';
import { RolesPipe } from '~/pipes/roles.pipe';
import { AdminUserService } from '~/services/admin/user.service';
import { FlashMessageService } from '~/services/flash-message.service';
import { UserService } from '~/services/user.service';

@Component({
  selector: 'app-admin-edit-user',
  imports: [
    AvatarComponent,
    LoaderComponent,
    ReactiveFormsModule,
    RolesPipe,
    DatePipe,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent implements OnInit
{
  user: Utilisateur | null = null;

  defaultRoles: Array<UserRole> = [
    "ROLE_ADMIN",
    "ROLE_CLIENT",
    "ROLE_PROPRIETAIRE",
  ];

  declare form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminUserService: AdminUserService,
    private userService: UserService,
    private flashMessage: FlashMessageService,
    private route: ActivatedRoute,
    private router: Router,
  )
  {
  }

  ngOnInit()
  {
    // @ts-expect-error
    const { id: userId } = this.route.params.value;

    this.form = this.formBuilder.group({
      prenom: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required]],
      roles: [[], [Validators.required]],
    });

    this.adminUserService.fetchById(Number(userId)).subscribe((user) => {
      this.user = user;

      this.form.setValue({
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        telephone: user.telephone,
        roles: user.roles,
      });
    });
  }

  handleSubmit()
  {
    if (!this.user) return;

    if (this.form.invalid) {
      this.flashMessage.success("Le formulaire est invalide");
      return;
    }

    this.adminUserService.update(this.user.id, {
      prenom: this.form.value.prenom,
      nom: this.form.value.nom,
      email: this.form.value.email,
      telephone: this.form.value.telephone,
      roles: this.form.value.roles,
    }).subscribe((user) => {
      this.flashMessage.success(
        `L'utilisateur n°${user.id} a bien été modifié`,
      );
      this.router.navigate(['/admin/users']);
    });
  }

  deleteAvatar()
  {
    if (!this.user) return;

    this.adminUserService.deleteAvatar(this.user).subscribe((user) => {
      this.userService.set(user);
      this.flashMessage.success(
        `L'utilisateur à l'ID ${user.id} a bien été modifié`,
      );
    });
  }
}
