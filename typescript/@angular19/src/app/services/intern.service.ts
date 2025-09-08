import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import type { Intern } from "../models/intern";
import { Trainer } from "../models/trainer";

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
		delete intern.trainer;
		return this.http.post<Intern>(this.apiUrl, intern);
	}

	filter(trainerId: NonNullable<Trainer["id"]>): Observable<Array<Intern>>
	{
		return this.http.get<Array<Intern>>(
			`${this.apiUrl}/?trainerId=${trainerId}`,
		);
	}

	update(id: NonNullable<Intern["id"]>, intern: Intern): Observable<Intern>
	{
		delete intern.trainer;
		return this.http.put<Intern>(`${this.apiUrl}/${id}`, intern);
	}

	delete(id: NonNullable<Intern["id"]>): Observable<void>
	{
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}

	assignTrainer(internId: string, trainerId: string): Observable<Intern>
	{
		return this.http.patch<Intern>(`${this.apiUrl}/${internId}`, {
			trainerId: trainerId,
		});
	}
}
