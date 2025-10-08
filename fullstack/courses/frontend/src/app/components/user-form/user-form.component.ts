import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-form',
  imports: [
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit
{
  declare form: FormGroup<{ name: any; email: any }>;
  selectedUser: User | null = null;

  constructor(private fb: FormBuilder, private userService: UserService)
  {
  }

  ngOnInit()
  {
    this.form = this.fb.group({
      name: [''],
      email: [''],
    });

    this.userService.selectedUser().subscribe((user) => {
      this.selectedUser = user;

      if (user) {
        this.form.patchValue({
          name: user.name,
          email: user.email,
        });
      }
    });
  }

  onCreateSubmit()
  {
    if (!this.form.valid) {
      return;
    }

    const { name, email } = this.form.value;

    this.userService.addUser({
      name,
      email,
    });

    this.form.reset();
  }

  onEditSubmit()
  {
    if (!this.form.valid || !this.selectedUser) {
      return;
    }

    const { name, email } = this.form.value;

    this.userService.editUser({
      ...this.selectedUser,
      name,
      email,
    });

    this.form.reset();
    this.userService.unselectUser();
  }
}
