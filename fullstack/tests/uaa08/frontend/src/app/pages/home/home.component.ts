import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertComponent } from '~/components/alert/alert.component';
import { AnnonceCardComponent } from '~/components/annonce/annonce-card/annonce-card.component';
import { LoaderComponent } from '~/components/loader/loader.component';
import { PageLayoutComponent } from '~/layouts/page-layout/page-layout.component';
import { Annonce, AnnonceCollection } from '~/models/annonce';
import { Utilisateur } from '~/models/user';
import { AnnonceService } from '~/services/annonce.service';
import { AuthService } from '~/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [
    AlertComponent,
    AnnonceCardComponent,
    LoaderComponent,
    ReactiveFormsModule,
    PageLayoutComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit
{
  currentUser: Utilisateur | null = null;

  declare annonceCollection: AnnonceCollection;
  declare form: FormGroup;

  withFilter = false;

  constructor(
    private annonceService: AnnonceService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  )
  {
  }

  ngOnInit()
  {
    this.form = this.formBuilder.group({
      ville: [''],
      typeBien: [''],
      typeAchat: [''],
    });

    this.annonceService.fetchLatest(1).subscribe((annonceCollection) => {
      this.annonceCollection = annonceCollection;
    });

    this.authService.currentUser().subscribe((currentUser) => {
      this.currentUser = currentUser;
    });
  }

  handleSubmit()
  {
    const { ville, typeBien, typeAchat } = this.form.value;

    const urlSearchParams = new URLSearchParams();

    if (ville) {
      urlSearchParams.append('ville[]', ville.toLowerCase());
    }

    if (typeBien) {
      urlSearchParams.append('bien[]', typeBien.toLowerCase());
    }

    if (typeAchat) {
      urlSearchParams.append('type[]', typeAchat.toLowerCase());
    }

    this.router.navigateByUrl(`/annonces?${urlSearchParams.toString()}`);
  }

  onDeleteAnnonce(annonce: Annonce): void
  {
    this.annonceService.remove(annonce).subscribe(() => {
      window.location.reload();
    });
  }
}
