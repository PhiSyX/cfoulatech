import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Trainer } from '../models/trainer';
import { Intern } from '../models/intern';

@Injectable({
	providedIn: 'root',
})
export class AuthService
{
	private trainerAPI = "http://localhost:3000/trainers";
	private internsAPI = "http://localhost:3000/interns";

	constructor(private http: HttpClient)
	{
	}

	public connectTrainer(email: string, password: string): Observable<Trainer | undefined>
	{
		return this.http.get<Array<Trainer>>(
			this.trainerAPI + "/?email=" + email + "&password=" + password,
		)
			.pipe(
				map((trainers) => trainers.at(0)),
			);
	}

	public connectIntern(email: string, password: string): Observable<Intern | undefined>
	{
		return this.http.get<Array<Intern>>(
			this.internsAPI + "/?email=" + email + "&password=" + password,
		)
			.pipe(
				map((interns) => interns.at(0)),
			);
	}
}
