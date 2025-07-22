import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent implements OnInit
{

  constructor(private titleService: TitleService)
  {
    this.titleService.define('Page introuvable');
  }

  ngOnInit()
  {
  }
}
