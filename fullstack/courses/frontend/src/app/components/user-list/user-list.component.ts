import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [
    NgForOf,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit
{
  public users: Array<User> = [];

  constructor(private userService: UserService)
  {
  }

  ngOnInit()
  {
    this.userService.loadUsers();
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  onSelect(user: User): void
  {
    this.userService.selectUser(user);
  }
}
