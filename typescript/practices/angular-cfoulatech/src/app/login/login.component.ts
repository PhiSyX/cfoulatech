import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
	selector: "app-login",
	imports: [FormsModule],
	templateUrl: "./login.component.html",
	styleUrl: "./login.component.css",
	standalone: true,
})
export class LoginComponent
{
	public email = "";
	public password = "";

	private emailRole: Record<string, string> = {
		"admin@cfoulatech.com": "admin",
		"trainer@cfoulatech.com": "trainer",
		"intern@cfoulatech.com": "intern",
	};

	constructor(private router: Router)
	{
	}

	async login()
	{
		if (this.emailRole[this.email]) {
			window.localStorage.setItem("role", this.emailRole[this.email]);
			await this.router.navigate(["/dashboard"]);
		} else {
			alert(`Le mail "${this.email}" est invalide`);
		}
	}
}
