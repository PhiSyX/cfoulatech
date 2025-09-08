import { Injectable } from '@angular/core';
import { type Intern } from '../models/intern';
import { type Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class InternService
{
	private interns: Array<Intern> = [
		{ name: "Erica", age: 24, sector: "Web" },
		{ name: "Carina", age: 24, sector: "Web" },
		{ name: "Clovis", age: 21, sector: "Designer" },
		{ name: "Mike", age: 33, sector: "Developer" },
	];

	public getStagiaires(): Observable<Array<Intern>>
	{
		return of(this.interns);
	}
}
