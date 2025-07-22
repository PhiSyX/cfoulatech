import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavigationGlobalComponent } from './components/navigation-global/navigation-global.component';
import { NavigationPerPageComponent } from './components/navigation-per-page/navigation-per-page.component';
import { TopbarComponent } from './components/topbar/topbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationGlobalComponent, NavigationPerPageComponent, TopbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent
{
}
