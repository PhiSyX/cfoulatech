import { Component, OnInit } from "@angular/core";
import { Trainer } from "../../models/trainer";
import { TrainerService } from '../../services/trainer.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
	selector: "app-manage-trainers",
	imports: [FormsModule, CommonModule, RouterLink],
	templateUrl: "./manage-trainers.component.html",
	styleUrl: "./manage-trainers.component.scss",
})
export class ManageTrainersComponent implements OnInit
{
	public trainers: Array<Trainer> = [];

	public trainerModel: Trainer = {
		name: "",
		phone: "",
		email: "",
		speciality: "",
		password: "",
	};
	public editMode: boolean = false;
	public currentIndexEdit: NonNullable<Trainer["id"]> | -1 = -1;

	constructor(
		private router: Router,
		private trainerService: TrainerService,
	)
	{
	}

	ngOnInit(): void
	{
		this.loadTrainers();
	}

	loadTrainers()
	{
		this.trainerService.all().subscribe((interns) => {
			this.trainers = interns;
		});
	}

	handleSave(): void
	{
		if (this.editMode) {
			this.trainerService.update(
				this.currentIndexEdit.toString(),
				this.trainerModel,
			).subscribe((trainer) => {
				this.trainers = this.trainers.map((currentTrainer) => {
					if (currentTrainer.id === trainer.id) return trainer;
					return currentTrainer;
				})
			});
			this.editMode = false;
		} else {
			this.trainerService.create(this.trainerModel).subscribe((trainer) => {
				this.trainers.push(trainer);
			});
		}

		this.trainerModel = {
			name: "",
			phone: "",
			email: "",
			speciality: "",
			password: "",
		};
	}

	handleEdit(id: NonNullable<Trainer["id"]>): void
	{
		this.trainerModel = { ...this.trainers.find((trainer) => trainer.id === id)! };
		this.editMode = true;
		this.currentIndexEdit = id;
	}

	handleDelete(id: NonNullable<Trainer["id"]>): void
	{
		if (globalThis.confirm("Voulez-vous vraiment supprimer le stagiaire ?")) {
			this.trainerService.delete(id).subscribe(() => {
				this.loadTrainers();
			})
		}
	}

	handleCancel()
	{
		this.trainerModel = {
			name: "",
			phone: "",
			email: "",
			speciality: "",
			password: "",
		};
		this.editMode = false;
	}

	async gotoDashboard(): Promise<void>
	{
		await this.router.navigate(["/dashboard"]);
	}
}
