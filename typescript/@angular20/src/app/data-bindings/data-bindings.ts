import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-data-bindings',
	imports: [
		FormsModule,
	],
	templateUrl: './data-bindings.html',
	styleUrl: './data-bindings.css',
})
export class DataBindings
{
	public firstname: string = "";

	public imageSrc: string = "oeil.jpg";

	public githubLabel: string = "GitHub PhiSyX";
	public githubUrl: string = "https://github.com/PhiSyX";

	public isChecked: boolean = true;
	public isDisabled: boolean = false

	public toggleBtn: string = "Désactiver";

	public toggleDisable(): void
	{
		this.isDisabled = !this.isDisabled;
		if (this.isDisabled) {
			this.toggleBtn = "Activer";
		} else {
			this.toggleBtn = "Désactiver";
		}
	}

	public inputModel: string = "Mon message";

	public showMessage(): void
	{
		alert(this.inputModel);
	}

	public showFirstname(): void
	{
		alert(`Bonjour ${this.firstname} !`);
	}

	/* Ex checkbox */
	public belgium: boolean = false;
	public france: boolean = false;
	public italy: boolean = true;

	/* Ex select */
	public pays: string = "belgique";
}
