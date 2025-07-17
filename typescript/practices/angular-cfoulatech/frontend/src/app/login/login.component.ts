import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';

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

	constructor(private router: Router, private authService: AuthService)
	{
	}

	async login(): Promise<void>
	{
		if (this.email.trim().length === 0 || this.password.length === 0) {
			alert("Please enter a valid email address or password");
			return;
		}

		if (
			this.dbEmailRole[this.email] &&
			this.dbEmailPassword[this.email] === this.password
		) {
			window.localStorage.setItem("role", this.dbEmailRole[this.email]);
			await this.router.navigate(["/dashboard"]);
			return;
		}

		this.authService.connectTrainer(this.email, this.password).subscribe((trainer) => {
			if (!trainer) {
				this.connectIntern();
				return;
			}

			window.localStorage.setItem("role", "trainer");
			window.localStorage.setItem("trainerId", trainer.id!.toString());
			this.router.navigate(["/dashboard"]);
		});
	}

	private connectIntern(): void
	{
		this.authService.connectIntern(this.email, this.password).subscribe((intern) => {
			if (!intern) {
				alert(`Identifiant incorrect pour "${this.email}"`);
				return;
			}
			window.localStorage.setItem("role", "intern");
			window.localStorage.setItem("internId", intern.id!.toString());
			this.router.navigate(["/dashboard"]);
		});
	}
}
