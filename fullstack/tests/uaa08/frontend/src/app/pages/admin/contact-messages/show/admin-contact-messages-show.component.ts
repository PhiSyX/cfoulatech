import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError } from 'rxjs';

import { ApiPlatform } from '~/api/api-platform';
import { ContactMessageResource } from '~/api/resource/contact-message.resource';
import { LoaderComponent } from '~/components/loader/loader.component';
import { UserCardComponent } from '~/components/user/api/user-card/user-card.component';
import { Nl2brPipe } from '~/pipes/nl2br.pipe';
import { FlashMessageService } from '~/services/flash-message.service';

@Component({
  selector: 'app-admin-contact-messages-show',
  imports: [
    LoaderComponent,
    Nl2brPipe,
    UserCardComponent,
    RouterLink,
  ],
  templateUrl: './admin-contact-messages-show.component.html',
  styleUrl: './admin-contact-messages-show.component.scss',
})
export class AdminContactMessagesShowComponent implements OnInit
{
  contactMessage: ContactMessageResource | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessageService,
    private apiPlatform: ApiPlatform,
  )
  {
  }

  ngOnInit()
  {
    // @ts-expect-error
    const { id } = this.route.params.value;
    const contactMessageId = Number(id);

    this.apiPlatform.auth().get<ContactMessageResource>(
      `/api/contact_messages/${contactMessageId}`,
    )
      .pipe(catchError((err) => {
        // Not Found
        this.router.navigate(['/admin/contact-messages']);
        throw err;
      }))
      .subscribe((res) => {
        this.contactMessage = res;
      });
  }

  protected archive(contactMessage: ContactMessageResource)
  {
    if (!window.confirm('Es-tu certains de vouloir supprimer ce message ?')) {
      return;
    }

    this.apiPlatform.auth().delete<ContactMessageResource>(
      `/api/contact_messages/${contactMessage.id}`,
    )
      .subscribe(() => {
        this.router.navigate(['/admin/contact-messages']);
        this.flashMessage.success(
          `Le message à l'id ${contactMessage.id} a bien été archivé`
        );
      });
  }
}
