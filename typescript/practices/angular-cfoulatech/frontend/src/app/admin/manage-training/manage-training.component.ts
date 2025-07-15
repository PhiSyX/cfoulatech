import { Component, OnInit } from "@angular/core";
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Training } from '../../models/training';
import { TrainingService } from '../../services/training.service';
import { InternService } from '../../services/intern.service';
import { Intern } from '../../models/intern';

@Component({
	selector: "app-manage-training",
	imports: [FormsModule, CommonModule, RouterLink],
	templateUrl: "./manage-training.component.html",
	styleUrl: "./manage-training.component.scss",
})
export class ManageTrainingComponent implements OnInit
{
	public trainings: Array<Training> = [];
	public newTrainingModel: Training = {
		description: "",
		duration: 0,
		endDate: "",
		goal: "",
		level: "débutant",
		startDate: "",
		status: "brouillon",
		title: "",
		interns: [],
	};
	public editMode: boolean = false;
	public currentIndexEdit: NonNullable<Training["id"]> | -1 = -1;
	public interns: Array<Intern> = [];

	constructor(
		private router: Router,
		private trainingService: TrainingService,
		private internService: InternService,
	)
	{
	}

	ngOnInit(): void
	{
		this.loadTrainings();
		this.loadInterns();
	}

	loadTrainings()
	{
		this.trainingService.all().subscribe((trainings) => {
			this.trainings = trainings;
		});
	}

	loadInterns()
	{
		this.internService.all().subscribe((interns) => {
			this.interns = interns;
		});
	}

	handleSave(): void
	{
		if (this.editMode) {
			this.trainingService.update(
				this.currentIndexEdit.toString(),
				this.newTrainingModel,
			).subscribe((training) => {
				this.trainings = this.trainings.map((currentTraining) => {
					if (currentTraining.id === training.id) return training;
					return currentTraining;
				})
			});
			this.editMode = false;
		} else {
			this.trainingService.create(this.newTrainingModel).subscribe((training) => {
				this.trainings.push(training);
			});
		}

		this.newTrainingModel = {
			description: "",
			duration: 0,
			endDate: "",
			goal: "",
			level: "débutant",
			startDate: "",
			status: "brouillon",
			title: "",
			interns: [],
		};
	}

	handleEdit(id: NonNullable<Training["id"]>): void
	{
		this.newTrainingModel = { ...this.trainings.find((training) => training.id === id)! };
		this.editMode = true;
		this.currentIndexEdit = id;
	}

	handleDelete(id: NonNullable<Training["id"]>): void
	{
		if (globalThis.confirm("Voulez-vous vraiment supprimer la formation ?")) {
			this.trainingService.delete(id).subscribe(() => {
				this.loadTrainings();
			})
		}
	}

	handleCancel()
	{
		this.newTrainingModel = {
			description: "",
			duration: 0,
			endDate: "",
			goal: "",
			level: "débutant",
			startDate: "",
			status: "brouillon",
			title: "",
			interns: [],
		};
		this.editMode = false;
	}

	async gotoDashboard(): Promise<void>
	{
		await this.router.navigate(["/dashboard"]);
	}
}
