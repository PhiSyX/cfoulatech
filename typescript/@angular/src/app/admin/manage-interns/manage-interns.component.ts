import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { Intern } from "../../models/intern";
import { InternService } from "../../services/intern.service";

import { Trainer } from "../../models/trainer";
import { TrainerService } from "../../services/trainer.service";

@Component({
	selector: "app-manage-interns",
	imports: [FormsModule, CommonModule, RouterLink],
	templateUrl: "./manage-interns.component.html",
	styleUrl: "./manage-interns.component.scss",
})
export class ManageInternsComponent implements OnInit
{
	public interns: Array<Intern> = [];
	public trainers: Array<Trainer> = [];

	public internModel: Intern = {
		name: "",
		phone: "",
		email: "",
	};

	public editionMode: boolean = false;
	public assignTrainerMode: boolean = false;

	public selectedInternId: Intern["id"];

	constructor(
		private internService: InternService,
		private trainerService: TrainerService,
	)
	{
	}

	ngOnInit(): void
	{
		this.loadTrainers();
		this.loadInterns();
	}

	loadInterns()
	{
		this.internService.all().subscribe((interns) => {
			this.interns = interns.map((intern) => {
				intern.trainer = this.trainers.find((t) => t.id === intern.trainerId);
				return intern;
			});
		});
	}

	loadTrainers()
	{
		this.trainerService.all().subscribe((trainers) => {
			this.trainers = trainers;
		})
	}

	handleSave(): void
	{
		if (this.editionMode) {
			if (!this.selectedInternId) {
				return;
			}
			this.internService.update(
				this.selectedInternId.toString(),
				this.internModel,
			).subscribe((intern) => {
				this.interns = this.interns.map((currentIntern) => {
					if (currentIntern.id === intern.id) return intern;
					return currentIntern;
				});
			});
			this.editionMode = false;
		} else {
			this.internService.create(this.internModel).subscribe((intern) => {
				this.interns.push(intern);
			});
		}

		this.internModel = {
			name: "",
			phone: "",
			email: "",
		};
	}

	handleEdit(id: NonNullable<Intern["id"]>): void
	{
		this.internModel = { ...this.interns.find((intern) => intern.id === id)! };
		this.editionMode = true;
		this.selectedInternId = id;
	}

	handleDelete(id: NonNullable<Intern["id"]>): void
	{
		if (globalThis.confirm("Voulez-vous vraiment supprimer le stagiaire ?")) {
			this.internService.delete(id).subscribe(() => {
				this.loadInterns();
			})
		}
	}

	handleCancel()
	{
		this.internModel = {
			name: "",
			phone: "",
			email: "",
		};
		this.selectedInternId = undefined;
		this.editionMode = false;
		this.assignTrainerMode = false;
	}

	handleAssignTrainer(internId: string): void
	{
		this.assignTrainerMode = true;
		this.selectedInternId = internId;
		this.internModel = { ...this.interns.find((intern) => intern.id === internId)! };
	}

	handleSaveAssignTrainer(): void
	{
		this.internService.assignTrainer(
			this.internModel.id!,
			this.internModel.trainerId!,
		).subscribe(() => {
			this.loadInterns();
			this.handleCancel();
		});
	}

}
