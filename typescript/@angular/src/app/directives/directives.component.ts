import { Component } from "@angular/core";
import {
	NgClass,
	NgForOf,
	NgIf,
	NgStyle,
	NgSwitch,
	NgSwitchCase,
} from "@angular/common";
import { FormsModule } from "@angular/forms";

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
		NgClass,
		NgStyle,
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

	public internModel: string = "";
	public interns: Array<string> = ["Say", "Carina", "Erica", "Mohamed-Ali", "Mona", "Josué"];

	public addIntern(): void {
		let intern = this.internModel.trim();
		if (intern.length === 0) {
			alert("Entrez un nom de stagiaire.");
			return;
		}

		// Le stagiaire est déjà existant
		if (this.interns.includes(intern)) {
			alert(`Le stagiaire ${intern} est déjà existant.`);
			this.internModel = "";
			return;
		}

		// Ajout du stagiaire
		this.interns.push(intern);
		this.internModel = "";
	}


	public trainingModel: string = "";
	public trainings: Array<string> = ["Web", "HelpDesk", "Cyber Sécurité"];

	public addTraining(): void {
		if (this.trainingModel.trim().length === 0) {
			return;
		}
		this.trainings.push(this.trainingModel);
		this.trainingModel = "";
	}

	public evaluationNom: string = "";
	public evaluationNote: number = 0;
	public evaluations: Array<{ nom: string; note: number; }> = [
		{ nom: "Mohamed Ali", note: 17 },
		{ nom: "Tim", note: 12 },
		{ nom: "Mike", note: 20 },
	];

	public addEvaluation(): void {
		if (this.evaluationNom.trim().length === 0) {
			alert("Entrez un nom");
			return;
		}

		let note = Number(this.evaluationNote);

		if (note < 0 || note > 20) {
			alert("Entrez une note entre 0 et 20");
			return;
		}

		this.evaluations.push({
			nom: this.evaluationNom.trim(),
			note,
		});

		this.evaluationNom = "";
		this.evaluationNote = 0;
	}

	public get evaluationMoyenne(): number {
		let totalEval = this.evaluations.length;
		return (
			this.evaluations.reduce(
				(totalAcc, evaluation) => totalAcc + evaluation.note, 0,
			) / totalEval
		);
	}

	public delEvaluation(evaluation: { nom: string; note: number; }): void {
		this.evaluations = this.evaluations.filter((e) => e.nom !== evaluation.nom);
	}

	public myClass: Array<string> = ["ng-class-directive", "ng-class-directive-2"];

	public isHello: boolean = false;
	public isWorld: boolean = false;
	public color: string = "blue";

	public myStyle = { color: 'red', fontSize: '16px' };

	public changeStyle(color: string, fontSize: string): void {
		this.myStyle.color = color;
		this.myStyle.fontSize = fontSize;
	}
}
