import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-per-page',
  imports: [],
  templateUrl: './navigation-per-page.component.html',
  styleUrl: './navigation-per-page.component.css',
})
export class NavigationPerPageComponent
{
  brand = 'CFOULATECH';

  get currentYear()
  {
    return new Date().getFullYear();
  }
}
