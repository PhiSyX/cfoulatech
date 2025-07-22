import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService
{
  private title: BehaviorSubject<string> = new BehaviorSubject('');

  define(title: string)
  {
    this.title.next(title);
    document.title = title;
  }

  currentTitle()
  {
    return this.title.asObservable();
  }
}
