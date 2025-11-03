import { Component } from '@angular/core';
import { HeaderComponent } from '~/components/header/header.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'layout-admin',
  imports: [
    HeaderComponent,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent
{
}
