import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Trainer } from '../models/trainer';

@Injectable({
	providedIn: 'root',
})
export class AuthService
{
	private trainerAPI = "http://localhost:3000/trainers";

	constructor(private http: HttpClient)
	{
	}

	public connect(email: string, password: string): Observable<Trainer | undefined>
	{
		return this.http.get<Array<Trainer>>(
			this.trainerAPI + "/?email=" + email + "&password=" + password,
		)
			.pipe(
				map((trainers) => trainers.at(0)),
			);
	}
}
