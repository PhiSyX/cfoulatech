import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { catchError } from 'rxjs';

import { Utilisateur } from '~/models/user';
import { AuthService } from '~/services/auth.service';
import { FlashMessageService } from '~/services/flash-message.service';

@Component({
  selector: 'app-login',
  imports: [
    NgClass,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit
{
  currentUser: Utilisateur | null = null;
  declare form: FormGroup;
  rememberMe = false;
  returnUrl = '';

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
      password: ['', [Validators.required]],
    });

    const urlTree = this.router.parseUrl(this.router.url);

    if (urlTree.queryParams['returnTo']) {
      this.returnUrl = urlTree.queryParams['returnTo'];
    }

    this.authService.currentUser().subscribe((maybeUser) => {
      this.currentUser = maybeUser;

      if (!maybeUser) return;

      this.form.setValue({
        email: maybeUser.email,
        password: '',
      });

      this.rememberMe = true;
    });
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

    this.authService.login({
      username: this.form.value.email,
      password: this.form.value.password,
    })
      .pipe(catchError((err) => {
        const msg = err.error?.detail || err.error?.message || err.message;
        this.form.setErrors(msg);
        throw err;
      }))
      .subscribe((userResponse) => {
        this.flashMessage.success(
          `Vous êtes maintenant connecté en tant que ${userResponse.prenom} (${userResponse.email}) !`,
        );
        this.form.reset();

        if (this.returnUrl) {
          this.router.navigate([this.returnUrl]);
          return;
        }

        if (userResponse.roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/account']);
        }
      });
  }

  logout()
  {
    this.authService.logout();
    this.router.navigate(['/login'], { onSameUrlNavigation: "reload" }).then(() => location.reload());
  }
}
