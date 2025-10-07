import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CreateUserModel, User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService
{
  private userApiEndpoint: string = "https://localhost:8000/api/users";

  constructor(private http: HttpClient)
  {
  }

  getUsers(): Observable<Array<User>>
  {
    return this.http.get<{
      member: Array<User>;
    }>(this.userApiEndpoint, {
      headers: { 'Content-Type': 'application/ld+json' },
    })
      .pipe(
        map((record) => record.member)
      );
  }

  addUser(user: CreateUserModel): Observable<User>
  {
    return this.http.post<User>(this.userApiEndpoint, {
      ...user,
      password: '',
    }, {
      headers: {
        'Content-Type': 'application/ld+json',
      },
    });
  }
}
