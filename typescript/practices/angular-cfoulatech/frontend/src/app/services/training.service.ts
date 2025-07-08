import { Injectable } from "@angular/core";
import type { Training } from '../models/training';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: "root",
})
export class TrainingService
{
	private apiUrl = "http://localhost:3000/trainings";

	constructor(private http: HttpClient)
	{
	}

	all(): Observable<Array<Training>>
	{
		return this.http.get<Array<Training>>(this.apiUrl);
	}

	create(training: Training): Observable<Training>
	{
		return this.http.post<Training>(this.apiUrl, training);
	}

	update(id: NonNullable<Training["id"]>, training: Training): Observable<Training>
	{
		return this.http.put<Training>(`${this.apiUrl}/${id}`, training);
	}

	delete(id: NonNullable<Training["id"]>): Observable<void>
	{
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
