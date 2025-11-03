import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { mergeMap, Observable, of, tap } from 'rxjs';

import { AnnonceCardComponent } from '~/components/annonce/annonce-card/annonce-card.component';
import { AvatarComponent } from '~/components/avatar/avatar.component';
import { LoaderComponent } from '~/components/loader/loader.component';
import { PageLayoutComponent } from '~/layouts/page-layout/page-layout.component';
import { Annonce, AnnonceCollection } from '~/models/annonce';
import { Utilisateur } from '~/models/user';
import { AnnonceService } from '~/services/annonce.service';
import { AuthService } from '~/services/auth.service';
import { FlashMessageService } from '~/services/flash-message.service';
import { UserService } from '~/services/user.service';
import { FavorisService } from '~/services/favoris.service';

@Component({
  selector: 'app-account',
  imports: [
    AvatarComponent,
    AnnonceCardComponent,
    LoaderComponent,
    PageLayoutComponent,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit
{
  declare form: FormGroup;
  declare formPassword: FormGroup;
  declare currentUser: Utilisateur;

  avatar: File | null = null;
  annonceCollection: AnnonceCollection | null = null;
  favorisAnnonceCollection: AnnonceCollection | null = null;
  editMode = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private flashMessage: FlashMessageService,
    private annonceService: AnnonceService,
    private favorisService: FavorisService,
    private formBuilder: FormBuilder,
  )
  {
  }

  ngOnInit()
  {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(15)]],
    });

    this.formPassword = this.formBuilder.group({
      plainPassword: [''],
    });

    this.authService.currentUser().subscribe((maybeUser) => {
      if (!maybeUser) return;

      this.currentUser = maybeUser;

      this.form.setValue({
        email: maybeUser.email,
        firstname: maybeUser.prenom,
        lastname: maybeUser.nom,
        phone: maybeUser.telephone,
      });

      this.annonceService.fetchFromUser(maybeUser.id).subscribe((annonceCollection) => {
        this.annonceCollection = annonceCollection;
      });

      this.favorisService.annonces().subscribe((annonceCollection) => {
        this.favorisAnnonceCollection = annonceCollection;
      });
    });
  }

  handleSubmit()
  {
    if (!this.form.valid) {
      for (const field in this.form.controls) {
        if (this.form.controls[field].errors) {
          this.flashMessage.error(
            `Le champ du formulaire "${field}" n'est pas valide` +
            ', veuillez remplir tous les champs correctement.',
          );
        }
      }
      return;
    }

    let obs: Observable<any> = of(null);

    if (this.avatar) {
      obs = this.userService.uploadAvatar(this.currentUser, this.avatar);
    }

    obs
      .pipe(
        tap((a) => {
          a && this.flashMessage.success('Votre avatar a bien été téléversé.');
        }),
        mergeMap((_) => {
          return this.userService.update(this.currentUser, {
            prenom: this.form.value.firstname,
            nom: this.form.value.lastname,
            email: this.form.value.email,
            telephone: this.form.value.phone,
          })
        }),
      )
      .subscribe((_) => {
        this.editMode = false;
        this.avatar = null;
        this.flashMessage.success('Votre profil a bien été mis à jour.');
      });
  }

  handleSubmitPassword()
  {
    if (!this.formPassword.valid) return;

    this.userService.update(this.currentUser, {
      plainPassword: this.formPassword.value.plainPassword,
    })
      .pipe(mergeMap((user) => this.authService.login({
        username: user.userIdentifier,
        password: this.formPassword.value.plainPassword,
      })))
      .subscribe(() => {
        this.editMode = false;
        this.avatar = null;
        this.flashMessage.success('Votre mot de passe a bien été mis à jour.');
      });
  }

  enableEditMode()
  {
    this.editMode = true;
  }

  disableEditMode()
  {
    this.editMode = false;
  }

  handleAvatarUpdate(file: File)
  {
    this.avatar = file;
  }

  handleAvatarDelete()
  {
    this.userService.deleteAvatar(this.currentUser).subscribe(() => {
      this.flashMessage.success('Votre avatar a bien été supprimé');
    });
  }

  onDeleteAnnonce(annonce: Annonce)
  {
    this.annonceService.remove(annonce).subscribe(() => {
      window.location.reload();
    });
  }
}
