import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class Temperature
{
	private max: number = 0;
	private degree: number = 0;

	setMax(max: number)
	{
		this.max = max;
	}

	getMax(): number
	{
		return this.max;
	}

	increment(number: number): void
	{
		this.degree += number;

		this.degree = minmax(this.degree, 0, this.getMax());
	}

	getDegrees(): number
	{
		return this.degree;
	}
}

function minmax(val: number, min: number, max: number): number
{
	return Math.min(Math.max(min, val), max);
}
