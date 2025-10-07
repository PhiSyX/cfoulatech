import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent
{
  declare form: FormGroup<{ name: any; email: any }>;

  constructor(private fb: FormBuilder, private userService: UserService)
  {
    this.form = this.fb.group({
      name: [''],
      email: [''],
    });
  }

  onSubmit()
  {
    if (!this.form.valid) {
      return;
    }

    const { name, email } = this.form.value;

    this.userService.addUser({
      name,
      email,
    }).subscribe((user) => this.form.reset());
  }
}
