import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { AuthService } from './services/auth.service';
import { FlashMessageService } from './services/flash-message.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit
{
  constructor(
    private flashMessage: FlashMessageService,
    private authService: AuthService,
  )
  {
  }

  ngOnInit()
  {
    this.authService.currentUser().subscribe((user) => {
      if (!user) return;

      if (!user.verified) {
        this.flashMessage.warning(
          `Votre compte n'est pas vérifié, veuillez confirmer votre compte à l'adresse ${user.userIdentifier}`,
        );
        return;
      }
    })
  }
}
