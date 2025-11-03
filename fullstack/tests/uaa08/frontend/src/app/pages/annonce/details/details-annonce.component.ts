import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {  LoaderComponent } from '~/components/loader/loader.component';
import { BadgeComponent } from '~/components/badge/badge.component';
import { PageLayoutComponent } from '~/layouts/page-layout/page-layout.component';
import { Annonce } from '~/models/annonce';
import { Utilisateur } from '~/models/user';
import { AddressPipe } from '~/pipes/address.pipe';
import { Nl2brPipe } from '~/pipes/nl2br.pipe';
import { PricePipe } from '~/pipes/price.pipe';
import { AnnonceService } from '~/services/annonce.service';
import { AuthService } from '~/services/auth.service';
import { FlashMessageService } from '~/services/flash-message.service';

@Component({
  selector: 'app-annonce-details',
  imports: [
    AddressPipe,
    LoaderComponent,
    Nl2brPipe,
    PricePipe,
    BadgeComponent,
    PageLayoutComponent,
  ],
  templateUrl: './details-annonce.component.html',
  styleUrl: './details-annonce.component.scss',
})
export class DetailsAnnonceComponent implements OnInit
{
  annonce: Annonce | null = null;
  currentUser: Utilisateur | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private annonceService: AnnonceService,
    private flashMessage: FlashMessageService,
  )
  {
  }

  ngOnInit()
  {
    this.authService.currentUser().subscribe((user) => {
      this.currentUser = user;
    });

    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.annonceService.fetchById(Number(id)).subscribe(annonce => {
        this.annonce = annonce;
      });
    });
  }

  handleClickContact()
  {
    const ok = window.confirm('Tu as besoin de te connecter pour accéder à ces informations');
    if (!ok) return;

    this.router.navigate(['/login']);
  }

  handleDeleteAnnonce()
  {
    if (!this.annonce) return;

    const ok = window.confirm('Veux-tu vraiment supprimer cette annonce ?');
    if (!ok) return;

    this.annonceService.remove(this.annonce).subscribe(() => {
      this.flashMessage.success("Votre annonce a été supprimé avec succès");
      this.router.navigate(['/annonces']);
    })
  }

  handleEditAnnonce()
  {
    this.router.navigate([`/annonce/edit/${this.annonce?.id}`], { state: { annonce: this.annonce } });
  }
}
