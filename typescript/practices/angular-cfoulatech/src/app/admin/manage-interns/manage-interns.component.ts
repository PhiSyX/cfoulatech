import { Component, OnInit } from "@angular/core";
import { Intern } from '../../models/intern';
import { InternService } from '../../services/intern.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
	selector: "app-manage-interns",
	imports: [FormsModule, CommonModule, RouterLink],
	templateUrl: "./manage-interns.component.html",
	styleUrl: "./manage-interns.component.scss",
})
export class ManageInternsComponent implements OnInit
{
	public interns: Array<Intern> = [];
	public newInternModel: Intern = {
		name: "",
		phone: "",
		email: "",
	};
	public editMode: boolean = false;
	public currentIndexEdit = -1;

	constructor(
		private router: Router,
		private internService: InternService,
	)
	{
	}

	ngOnInit(): void
	{
		this.interns = this.internService.all();
	}

	handleSave(): void
	{
		if (this.editMode) {
			this.internService.update(this.currentIndexEdit, this.newInternModel);
			this.editMode = false;
		} else {
			this.internService.create(this.newInternModel);
		}

		this.newInternModel = {
			name: "",
			phone: "",
			email: "",
		};
	}

	handleEdit(idx: number): void
	{
		this.newInternModel = { ...this.interns[idx] };
		this.editMode = true;
		this.currentIndexEdit = idx;
	}

	handleDelete(idx: number): void
	{
		if (globalThis.confirm("Voulez-vous vraiment supprimer le stagiaire ?")) {
			this.internService.delete(idx)
		}
	}

	handleCancel()
	{
		this.newInternModel = {
			name: "",
			phone: "",
			email: "",
		};
		this.editMode = false;
	}

	async gotoDashboard(): Promise<void>
	{
		await this.router.navigate(["/dashboard"]);
	}
}
