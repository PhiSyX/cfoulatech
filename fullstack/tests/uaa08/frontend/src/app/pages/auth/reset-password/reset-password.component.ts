import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FlashMessageService } from '~/services/flash-message.service';
import { AuthService } from '~/services/auth.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  imports: [
    ReactiveFormsModule,
    NgClass,
    RouterLink,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent
{
  declare form: FormGroup;
  declare formReset: FormGroup;
  token: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private flashMessage: FlashMessageService,
    private authService: AuthService,
  )
  {
  }

  ngOnInit()
  {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.formReset = this.formBuilder.group({
      plainPassword: ['', [Validators.required]],
      confirmPlainPassword: ['', [Validators.required]],
    })

    const url = this.router.parseUrl(this.router.url);
    const token = url.queryParams['token'];
    if (token) {
      this.token = token;
    }
  }

  handleSubmit()
  {
    this.form.setErrors(null);
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

    this.authService.requestResetPassword({ email: this.form.value.email })
      .pipe(catchError((err) => {
        const msg = err.error?.detail || err.error?.message || err.message;
        this.form.setErrors(msg);
        throw err;
      }))
      .subscribe((res) => {
        this.flashMessage.success(
          `
Si un compte correspondant à votre adresse mail existe, un e-mail contenant un lien vous permettant de réinitialiser
votre mot de passe vient de vous être envoyé. Ce lien expirera dans 1 heure.

Si vous ne recevez pas d'e-mail, veuillez vérifier votre dossier de courriers indésirables ou réessayer.
        `,
          20_000,
        );
        this.form.reset();
        this.router.navigate(['/login']);
      });
  }

  handleResetSubmit()
  {
    if (!this.token) {
      return;
    }

    if (this.formReset.value.plainPassword !== this.formReset.value.confirmPlainPassword) {
      this.formReset.setErrors({ plainPassword: 'Invalide' });
      return;
    }

    this.authService.resetPassword({
      plainPassword: this.formReset.value.plainPassword,
      token: this.token,
    }).subscribe((res) => {
      this.flashMessage.success('Votre mot de passe a bien été changé.');
      this.router.navigate([res.redirectTo]);
    });
  }
}
