import { DatePipe, NgStyle, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Annonce } from '~/models/annonce';
import { PricePipe } from '~/pipes/price.pipe';
import { TruncatePipe } from '~/pipes/truncate.pipe';
import { FlashMessageService } from '~/services/flash-message.service';
import { FavorisService } from '~/services/favoris.service';

@Component({
  selector: 'ui-annonce-card',
  imports: [
    NgStyle,
    TitleCasePipe,
    PricePipe,
    RouterLink,
    TruncatePipe,
    DatePipe,
  ],
  templateUrl: './annonce-card.component.html',
  styleUrl: './annonce-card.component.scss',
})
export class AnnonceCardComponent implements OnInit
{
  /**
   * Annonce de la carte
   */
  @Input({ required: true })
  declare annonce: Annonce;

  /**
   * Doit-on afficher le bouton de favoris ?
   */
  @Input()
  favorite: boolean = false;

  /**
   * Doit-on afficher le bouton de suppression ?
   */
  @Input()
  delete: boolean = false;

  /**
   * Lien de modification plutôt que lien de détail.
   */
  @Input()
  updateLink: boolean = false;

  @Output()
  deleted: EventEmitter<void> = new EventEmitter();

  favIds: Array<number> = [];

  constructor(
    private favorisService: FavorisService,
    private flashMessage: FlashMessageService,
  )
  {
  }

  ngOnInit()
  {
    this.favorisService.all().subscribe((favIds) => {
      this.favIds = favIds;
    });
  }

  get isinFavs()
  {
    return this.favIds.includes(this.annonce.id);
  }

  /**
   * Lorsque le click est déclenché sur le bouton de suppression.
   */
  handleDelete()
  {
    if (!window.confirm('Voulez-vous vraiment supprimer cette annonce ?')) {
      return;
    }
    this.deleted.emit();
  }

  toggleFavorite()
  {
    if (this.isinFavs) {
      this.favorisService.remove(this.annonce.id);
      this.flashMessage.success(`Annonce "${this.annonce.propriete.titre}" retirée.`);
    } else {
      this.favorisService.add(this.annonce.id);
      this.flashMessage.success(`Annonce "${this.annonce.propriete.titre}" sauvegardée.`);
    }
  }
}
