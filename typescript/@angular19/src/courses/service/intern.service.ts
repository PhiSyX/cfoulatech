import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class InternService
{
	private interns: BehaviorSubject<Array<string>> = new BehaviorSubject(["Jean", "Michel", "Charles"]);
	public interns$ = this.interns.asObservable();

	public addIntern(nom: string)
	{
		this.interns.next([...this.interns.value, nom])
	}
}
