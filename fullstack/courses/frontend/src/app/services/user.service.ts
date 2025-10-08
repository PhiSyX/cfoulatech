import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CreateUserModel, User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService
{
  private usersApiEndpoint: string = "https://localhost:8000/api/users";
  private defaultHeaders = { "Content-Type": "application/ld+json" };
  private patchHeaders = { "Content-Type": "application/merge-patch+json" };

  private users: BehaviorSubject<Array<User>> = new BehaviorSubject<Array<User>>([]);
  private _selectedUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient)
  {
  }

  public loadUsers(): void
  {
    type Response = {
      member: Array<User>;
    };

    this.http.get<Response>(this.usersApiEndpoint, {
      headers: this.defaultHeaders,
    })
      .pipe(
        map((record) => record.member),
      )
      .subscribe((users) => {
        this.users.next(users);
      });
  }

  public getUsers(): Observable<Array<User>>
  {
    return this.users.asObservable();
  }

  public addUser(user: CreateUserModel): void
  {
    this.http.post<User>(
      this.usersApiEndpoint,
      { ...user, password: '' },
      { headers: this.defaultHeaders },
    ).subscribe((user) => {
      this.users.next([...this.users.value, user]);
    });
  }

  public selectUser(user: User): void
  {
    this._selectedUser.next(user);
  }

  public selectedUser(): Observable<User | null>
  {
    return this._selectedUser.asObservable();
  }

  public unselectUser(): void
  {
    this._selectedUser.next(null);
  }

  editUser(user: User): void
  {
    let payload: CreateUserModel = {
      name: user.name,
      email: user.email,
    };

    this.http.patch<User>(
      `${this.usersApiEndpoint}/${user.id}`,
      payload,
      { headers: this.patchHeaders },
    ).subscribe((nUser) => {
      const newUsers = this.users.value.map((cUser) => {
        if (cUser.id === nUser.id) return nUser;
        return cUser;
      });
      this.users.next(newUsers);
    });
  }

  deleteUser(user: User): void
  {
    this.http.delete<User>(
      `${this.usersApiEndpoint}/${user.id}`,
      { headers: this.defaultHeaders },
    ).subscribe(() => {
      const filteredUsers = this.users.value.filter((cUser) => cUser.id !== user.id);
      this.users.next(filteredUsers);
    });
  }
}
