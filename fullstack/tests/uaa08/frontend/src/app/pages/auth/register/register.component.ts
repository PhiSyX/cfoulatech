import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { UtilisateurResource } from '~/api/resource/user.resource';
import { AvatarComponent } from '~/components/avatar/avatar.component';
import { FlashMessageService } from '~/services/flash-message.service';
import { UserService } from '~/services/user.service';

@Component({
  selector: 'app-register',
  imports: [
    AvatarComponent,
    NgClass,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit
{
  declare form: FormGroup;
  photo: File | null = null;
  photoSrc: string = "/img/upload-avatar.png";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private flashMessage: FlashMessageService,
    private userService: UserService,
  )
  {
  }

  ngOnInit()
  {
    this.form = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.maxLength(15)]],
      email: ['', [Validators.email]],
      plainPassword: ['', [Validators.required]],
    });
  }

  handleSubmit()
  {
    this.flashMessage.clear();

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

    this.userService.create({
      email: this.form.value.email,
      prenom: this.form.value.firstname,
      nom: this.form.value.lastname,
      telephone: this.form.value.phone,
      plainPassword: this.form.value.plainPassword,
      role: "ROLE_CLIENT",
    }).subscribe(this.handleUserCreated);
  }

  handleUserCreated = (user: UtilisateurResource) => {
    this.flashMessage.success(`Veuillez valider votre mail ${user.prenom} !`);

    if (this.photo) {
      this.userService.uploadAvatar(user, this.photo).subscribe(() => {});
    }

    this.form.reset();
    this.photo = null;

    this.router.navigate(['/login']);
  };

  handleAvatar(file: File)
  {
    this.photo = file;
  }
}
