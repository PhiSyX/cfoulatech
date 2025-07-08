import { Injectable } from "@angular/core";
import type { Trainer } from '../models/trainer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: "root",
})
export class TrainerService
{
	private apiUrl = "http://localhost:3000/trainers";

	constructor(private http: HttpClient)
	{
	}

	all(): Observable<Array<Trainer>>
	{
		return this.http.get<Array<Trainer>>(this.apiUrl);
	}

	create(trainer: Trainer): Observable<Trainer>
	{
		return this.http.post<Trainer>(this.apiUrl, trainer);
	}

	update(id: NonNullable<Trainer["id"]>, trainer: Trainer): Observable<Trainer>
	{
		return this.http.put<Trainer>(`${this.apiUrl}/${id}`, trainer);
	}

	delete(id: NonNullable<Trainer["id"]>): Observable<void>
	{
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
