import { Injectable } from '@angular/core';
import { type Stagiaire } from '../models/stagiaire';
import { type Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class StagiaireService {
	private stagiaires: Array<Stagiaire> = [
		{ nom: "Erica", age: 24, secteur: "Web" },
		{ nom: "Carina", age: 24, secteur: "Web" },
		{ nom: "Clovis", age: 21, secteur: "Designer" },
		{ nom: "Mike", age: 33, secteur: "Developer" },
	];

	public getStagiaires(): Observable<Array<Stagiaire>> {
		return of(this.stagiaires);
	}
}
