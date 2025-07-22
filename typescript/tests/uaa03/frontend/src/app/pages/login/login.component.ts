import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TitleService } from '../../services/title.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit
{
  public loginModel: { email: string; password: string; } = {
    email: '',
    password: '',
  };

  public loginError: string = '';

  constructor(
    private titleService: TitleService,
    private loginService: LoginService,
    private router: Router,
  )
  {
    this.titleService.define('Se connecter');
  }

  ngOnInit()
  {
  }

  handleSubmit(e: Event)
  {
    e.preventDefault();

    if (
      this.loginModel.email.trim().length === 0
      || this.loginModel.password.trim().length === 0
    ) {
      this.loginError = 'Vos identifiants sont incorrects';
      return;
    }

    this.loginError = '';

    this.tryLogin(this.loginModel.email, this.loginModel.password);
  }

  private tryLogin(email: string, password: string)
  {
    this.tryLoginAdmin(email, password);
  }

  private tryLoginAdmin(email: string, password: string)
  {
    this.loginService.loginForAdmin(email, password).subscribe(admin => {
      if (!admin) {
        this.tryLoginMedecin(email, password);
        return;
      }

      this.router.navigate(["/admin/dashboard"]);
    });
  }

  private tryLoginMedecin(email: string, password: string)
  {
    this.loginService.loginForMedecin(email, password).subscribe(medecin => {
      if (!medecin) {
        this.tryLoginPatient(email, password);
        return;
      }

      this.router.navigate(["/medecin/dashboard"]);
    });
  }

  private tryLoginPatient(email: string, password: string)
  {
    this.loginService.loginForPatient(email, password).subscribe(patient => {
      if (!patient) {
        this.loginError = 'Vos identifiants sont incorrects';
        return;
      }

      this.router.navigate(["/patient/dashboard"]);
    });
  }
}
