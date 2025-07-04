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

	private dbEmailRole: Record<string, string> = {
		"admin@cfoulatech.com": "admin",
		"trainer@cfoulatech.com": "trainer",
		"intern@cfoulatech.com": "intern",
	};
	private dbEmailPassword: Record<string, string> = {
		"admin@cfoulatech.com": "admin12345",
		"trainer@cfoulatech.com": "trainer12345",
		"intern@cfoulatech.com": "intern12345",
	};

	constructor(private router: Router)
	{
	}

	async login()
	{
		if (
			this.dbEmailRole[this.email] &&
			this.dbEmailPassword[this.email] === this.password
		) {
			window.localStorage.setItem("role", this.dbEmailRole[this.email]);
			await this.router.navigate(["/dashboard"]);
		} else {
			this.password = "";
			alert(`Identifiant incorrect pour "${this.email}"`);
		}
	}
}
