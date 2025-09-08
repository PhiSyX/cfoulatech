import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class Score
{
	#score = 0;

	add(score: number): void
	{
		this.#score += score;
	}

	getScore(): number
	{
		return this.#score;
	}
}
