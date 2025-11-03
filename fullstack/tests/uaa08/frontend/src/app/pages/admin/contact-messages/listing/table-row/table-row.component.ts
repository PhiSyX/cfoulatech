import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ContactMessageResource } from '~/api/resource/contact-message.resource';
import { BadgeComponent } from '~/components/badge/badge.component';
import { UserAvatarComponent } from '~/components/user/api/user-avatar/user-avatar.component';
import { TruncatePipe } from '~/pipes/truncate.pipe';

@Component({
  selector: 'app-admin-row-contact-message',
  imports: [
    TruncatePipe,
    UserAvatarComponent,
    RouterLink,
    BadgeComponent,
  ],
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.scss',
})
export class TableRowContactMessageComponent
{
  @Input({ required: true })
  declare contactMessageResource: ContactMessageResource;

  @Output()
  archived = new EventEmitter();

  archiveMessage()
  {
    if (!window.confirm('Es-tu certains de vouloir supprimer ce message ?')) {
      return;
    }
    this.archived.emit();
  }
}
