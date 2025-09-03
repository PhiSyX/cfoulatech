import { Injectable } from '@angular/core';

interface User
{
  age?: number;
  name?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class UserService
{
  #user: User = {};

  getUsername(): User["name"]
  {
    return this.#user.name;
  }

  setUsername(username: User["name"])
  {
    this.#user.name = username;
  }

  getUserAge(): User["age"]
  {
    return this.#user.age;
  }

  setUserAge(age: User["age"]): void
  {
    this.#user.age = age;
  }
}
