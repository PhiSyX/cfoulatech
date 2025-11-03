import { Component } from '@angular/core';

import { ContactMessageResource, ContactMessageResourceCollection } from '~/api/resource/contact-message.resource';
import { AdminContactService } from '~/services/admin/contact.service';
import { FlashMessageService } from '~/services/flash-message.service';
import { TableRowContactMessageComponent } from './table-row/table-row.component';

@Component({
  selector: 'app-admin-contact-messages-listing',
  imports: [
    TableRowContactMessageComponent,
  ],
  templateUrl: './admin-contact-messages-listing.component.html',
  styleUrl: './admin-contact-messages-listing.component.scss',
})
export class AdminContactMessagesListingComponent
{
  contactMessageCollection: ContactMessageResourceCollection | null = null;

  constructor(
    private flashMessage: FlashMessageService,
    private adminContactService: AdminContactService,
  )
  {
  }

  ngOnInit()
  {
    this.adminContactService.fetchPage(1).subscribe((resCol) => {
      this.contactMessageCollection = resCol;
    });
  }

  archive(contactMessageResource: ContactMessageResource)
  {
    this.adminContactService.remove(contactMessageResource.id).subscribe(() => {
      if (!this.contactMessageCollection?.member) return;

      this.contactMessageCollection.member = this.contactMessageCollection.member.filter(
        (contactMessage) => contactMessage.id !== contactMessageResource.id
      );

      this.flashMessage.success(
        `Le message à l'ID ${contactMessageResource.id} a bien été supprimé.`
      );
    });
  }
}
