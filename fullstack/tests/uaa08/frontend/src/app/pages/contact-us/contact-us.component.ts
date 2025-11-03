import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PageLayoutComponent } from '~/layouts/page-layout/page-layout.component';
import { Utilisateur } from '~/models/user';
import { AuthService } from '~/services/auth.service';
import { ContactMessageService } from '~/services/contact-message.service';
import { FlashMessageService } from '~/services/flash-message.service';

@Component({
  selector: 'app-contact-us',
  imports: [
    FormsModule,
    PageLayoutComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent implements OnInit
{
  currentUser: Utilisateur | null = null;

  declare form: FormGroup;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessageService,
    private contactService: ContactMessageService,
    private router: Router,
    private formBuilder: FormBuilder,
  )
  {
  }

  ngOnInit()
  {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      sujet: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(20)]],
    });

    this.authService.currentUser().subscribe((maybeUser) => {
      if (!maybeUser) return;

      this.form.setValue({
        name: maybeUser.prenom + ' ' + maybeUser.nom,
        phone: maybeUser.telephone,
        email: maybeUser.email,
        message: '',
        sujet: '',
      });

      this.currentUser = maybeUser;
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

    this.contactService.send({
      nomComplet: this.form.value.name,
      email: this.form.value.email,
      telephone: this.form.value.phone,
      sujet: this.form.value.sujet,
      message: this.form.value.message,
    })
    .subscribe(() => {
      this.flashMessage.success(
        `Votre message a bien été transmis à notre équipe d'expert Immauwebillier.`,
      );
      this.form.reset();
    });
  }
}
