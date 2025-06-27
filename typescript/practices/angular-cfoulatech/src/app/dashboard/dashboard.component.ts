import { NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
	selector: "app-dashboard",
	imports: [NgIf, RouterLink],
	templateUrl: "./dashboard.component.html",
	styleUrl: "./dashboard.component.css",
	standalone: true,
})
export class DashboardComponent
{
	role = globalThis.localStorage?.getItem("role") ?? "invité";
}
