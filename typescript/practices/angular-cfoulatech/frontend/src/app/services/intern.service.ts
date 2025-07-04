import { Injectable } from "@angular/core";
import type { Intern } from '../models/intern';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: "root",
})
export class InternService
{
	private apiUrl = "http://localhost:3000/interns";

	constructor(private http: HttpClient)
	{
	}

	all(): Observable<Array<Intern>>
	{
		return this.http.get<Array<Intern>>(this.apiUrl);
	}

	create(intern: Intern): Observable<Intern>
	{
		return this.http.post<Intern>(this.apiUrl, intern);
	}

	update(id: NonNullable<Intern["id"]>, intern: Intern): Observable<Intern>
	{
		return this.http.put<Intern>(`${this.apiUrl}/${id}`, intern);
	}

	delete(id: NonNullable<Intern["id"]>): Observable<void>
	{
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
