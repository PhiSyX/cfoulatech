import { Injectable } from "@angular/core";
import type { Intern } from '../models/intern';

@Injectable({
	providedIn: "root",
})
export class InternService
{
	private interns: Array<Intern> = [];

	all(): Array<Intern>
	{
		return this.interns;
	}

	create(intern: Intern): void
	{
		this.interns.push(intern)
	}

	update(idx: number, intern: Intern): void
	{
		this.interns[idx] = intern;
	}

	delete(idx: number): void
	{
		this.interns.splice(idx, 1);
	}
}
