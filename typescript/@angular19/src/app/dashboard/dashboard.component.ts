import { NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";

@Component({
	selector: "app-dashboard",
	imports: [NgIf, RouterLink],
	templateUrl: "./dashboard.component.html",
	styleUrl: "./dashboard.component.css",
	standalone: true,
})
export class DashboardComponent
{
	public role = globalThis.localStorage?.getItem("role") ?? "invité";

	constructor(private router: Router)
	{
	}

	public async logout(): Promise<void>
	{
		localStorage.removeItem("role");
		await this.router.navigate(["/login"]);
	}
}
