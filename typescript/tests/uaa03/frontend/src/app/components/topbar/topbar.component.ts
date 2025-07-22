import { Component } from '@angular/core';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent
{
  title: string = '';

  constructor(
    private titleService: TitleService,
  )
  {
    this.titleService.currentTitle()
      .subscribe(title => this.title = title);
  }
}
