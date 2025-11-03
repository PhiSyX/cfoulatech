import { NgClass, NgTemplateOutlet } from "@angular/common";
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FlashMessageService } from '~/services/flash-message.service';

@Component({
  selector: 'ui-avatar',
  imports: [
    NgClass,
    NgTemplateOutlet,
  ],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent
{
  /**
   * La photo de l'utilisateur (src)
   */
  @Input({ required: true })
  declare avatar: string;

  /**
   * Taille en largeur de la photo
   */
  @Input({ required: true })
  declare width: number | string;

  /**
   * Taille en hauteur de la photo
   */
  @Input({ required: true })
  declare height: number | string;

  /**
   * Est-ce que la photo peut être modifié à la volé ?
   * Est-ce qu'on peut supprimer la photo ?
   */
  @Input()
  editable: boolean = false;

  /**
   * Ajout de bord arondis sur la photo.
   */
  @Input()
  rounded: boolean = true;

  /**
   * Identifiant de la photo.
   */
  @Input()
  id: string = "avatar";

  /**
   * Ancienne photo (dans le cas où la photo a été changé via l'input file)
   */
  oldAvatar: string | null = null;

  /**
   * Événement de changement de photo.
   */
  @Output()
  uploaded: EventEmitter<File> = new EventEmitter();

  /**
   * Événement de suppression de photo.
   */
  @Output()
  deleted: EventEmitter<string> = new EventEmitter();

  /**
   * Lorsqu'il n'y a pas de photo, quelle photo afficher.
   */
  private placeholder: string = "/img/default-avatar.png";

  constructor(private flashMessage: FlashMessageService)
  {
  }

  /**
   * Gestion de l'événement `change` sur l'input file.
   */
  handleImage(evt: Event)
  {
    // @ts-expect-error
    const [file] = evt.target.files;

    if (file.size > 2_000_000) {
      // @ts-expect-error
      evt.target.input = '';
      this.flashMessage.error('La photo est trop volumineuse.\nChoisissez uen photo de moins de 2mb');
      return;
    }

    this.uploaded.emit(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', (_) => {
      this.oldAvatar = this.avatar;
      this.avatar = reader.result as string;
    });
  }

  /**
   * Gestion de l'événement `click` sur le bouton de suppression.
   */
  handleDelete()
  {
    if (this.oldAvatar !== null) {
      this.avatar = this.oldAvatar;
      return;
    }

    // Confirmation de suppression

    const expected = 'OUI, JE LE VEUX';

    if (
      window.prompt(
        'Êtes vous sûr de vouloir supprimer votre photo ? \n' +
        `Entrez \`${expected}\` en majuscule.`,
      ) === expected
    ) {
      this.deleted.emit(this.avatar);
      this.avatar = this.placeholder;
    }
  }
}
