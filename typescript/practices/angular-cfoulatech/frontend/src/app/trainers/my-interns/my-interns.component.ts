import { Component, OnInit } from "@angular/core";
import { NgFor } from "@angular/common";
import { InternService } from "../../services/intern.service";
import { Intern } from "../../models/intern";
import { TrainingService } from '../../services/training.service';

@Component({
	selector: "app-my-interns",
	imports: [
		NgFor,

	],
	templateUrl: "./my-interns.component.html",
	styleUrl: "./my-interns.component.scss",
})
export class MyInternsComponent implements OnInit
{
	public interns: Array<Intern> = [];

	constructor(
		private interService: InternService,
		private trainingService: TrainingService,
	)
	{
	}

	ngOnInit()
	{
		let trainerId = globalThis?.localStorage?.getItem("trainerId") || undefined;

		if (!trainerId) {
			alert("Veuillez vous connecter avec un compte formateur, s'il vous plaît");
			return;
		}

		this.interService.filter(trainerId).subscribe((interns) => {
			this.interns = interns.map((intern) => {
				this.trainingService.filter(intern.id!).subscribe((t) => {
					if (!t) return;
					intern.trainings?.push(t);
				});
				return intern;
			});
		});
	}
}
