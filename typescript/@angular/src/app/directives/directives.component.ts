import { Component } from "@angular/core";
import { NgForOf, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { FormsModule } from '@angular/forms';

const Role = {
	Admin: "admin",
	Trainer: "trainer",
	Intern: "intern",
} as const;

type RoleVariant = typeof Role[keyof typeof Role];

@Component({
	selector: "app-directives",
	imports: [
		NgIf,
		FormsModule,
		NgForOf,
		NgSwitch,
		NgSwitchCase,
	],
	templateUrl: "./directives.component.html",
	styleUrl: "./directives.component.css",
	standalone: true,
})
export class DirectivesComponent {
	public isAway: boolean = false;

	public markAsAway(): void {
		this.isAway = true;
	}

	public markAsNoLongerAway(): void {
		this.isAway = false;
	}

	public trainers: Array<string> = ["Jean-Aimable", "Julien", "Benoit", "Nawfal", "Vitor"];

	public readonly Role = Role;
	public role: RoleVariant = Role.Admin;

	/** Exercices */

	public isLoggedIn: boolean = true;

	public isTrainingActive: boolean = true;

	public score: number = 10;

	public isTrainerAvailable: boolean = true;

	public intern: string = "";
	public interns: Array<string> = ["Say", "Carina", "Erica", "Mohamed-Ali", "Mona", "Josué"];

	public addIntern(): void {
		if (this.intern.trim().length === 0) {
			return;
		}
		
		this.interns.push(this.intern);
		this.intern = "";
	}
}
