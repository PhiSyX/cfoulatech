import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ContactMessageResource } from '~/api/resource/contact-message.resource';
import { ContactUsForm } from '~/form/contact.form';
import { JwtService } from '~/services/jwt.service';
import { ApiPlatform } from './api-platform';
import { UserService } from '~/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class ContactMessageApi
{
  static BASE_PATH = '/api/contact_messages' as const;

  constructor(
    private apiPlatform: ApiPlatform,
    private jwtService: JwtService,
    private userService: UserService,
  )
  {
  }

  /**
   * Requête en POST vers l'API contact.
   */
  post(data: ContactUsForm): Observable<ContactMessageResource>
  {
    // Auth
    if (this.jwtService.hasToken() && this.userService.get()) {
      // NOTE : l'utilisateur est forcément disponible (grâce à la condition).
      const user = this.userService.get()!;
      data.utilisateur = `/api/utilisateurs/${user.id}`;
      return this.apiPlatform.auth().post<ContactMessageResource>(
        ContactMessageApi.BASE_PATH,
        data,
      );
    }

    // Non auth
    return this.apiPlatform.post<ContactMessageResource>(
      ContactMessageApi.BASE_PATH,
      data,
    );
  }
}
