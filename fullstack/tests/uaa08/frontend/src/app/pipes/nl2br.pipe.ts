import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nl2br',
})
export class Nl2brPipe implements PipeTransform
{
  transform(str: string): Array<string>
  {
    return str.split(/[\r\n]+/);
  }
}
