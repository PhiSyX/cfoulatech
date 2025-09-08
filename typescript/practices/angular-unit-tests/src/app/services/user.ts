import { Injectable } from '@angular/core';
import type { User as UserModel } from '../models/user';

@Injectable({
	providedIn: 'root',
})
export class User
{
	#user: UserModel = {};

	getUsername(): UserModel["name"]
	{
		return this.#user.name;
	}

	setUsername(username: UserModel["name"])
	{
		this.#user.name = username;
	}

	getUserAge(): UserModel["age"]
	{
		return this.#user.age;
	}

	setUserAge(age: UserModel["age"]): void
	{
		this.#user.age = age;
	}
}
