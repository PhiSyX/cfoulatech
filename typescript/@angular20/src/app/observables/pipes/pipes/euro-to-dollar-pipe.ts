import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'euroToDollar',
})
export class EuroToDollarPipe implements PipeTransform
{
	transform(value: number, rate: number = 1.08): string
	{
		return `${(value * rate).toFixed(2)}$`;
	}
}
