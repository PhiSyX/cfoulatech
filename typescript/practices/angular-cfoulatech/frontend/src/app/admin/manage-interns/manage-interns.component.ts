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
	public currentIndexEdit: NonNullable<Intern["id"]> | -1 = -1;

	constructor(
		private router: Router,
		private internService: InternService,
	)
	{
	}

	ngOnInit(): void
	{
		this.loadInterns();
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
			this.internService.update(
				this.currentIndexEdit.toString(),
				this.newInternModel,
			).subscribe((intern) => this.interns.map((currentIntern) => {
				if (currentIntern.id === intern.id) return intern;
				return currentIntern;
			}));
			this.editMode = false;
		} else {
			this.internService.create(this.newInternModel).subscribe((intern) => {
				this.interns.push(intern);
			});
		}

		this.newInternModel = {
			name: "",
			phone: "",
			email: "",
		};
	}

	handleEdit(id: NonNullable<Intern["id"]>): void
	{
		this.newInternModel = this.interns.find((intern) => intern.id === id)!;
		this.editMode = true;
		this.currentIndexEdit = id;
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
