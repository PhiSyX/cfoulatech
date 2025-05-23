import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-data-bindings',
	imports: [
		FormsModule,
	],
	templateUrl: './data-bindings.component.html',
	styleUrl: './data-bindings.component.css',
})
export class DataBindingsComponent {
	public firstname: string = "";

	public imageSrc: string = "oeil.jpg";

	public githubLabel: string = "GitHub PhiSyX";
	public githubUrl: string = "https://github.com/PhiSyX";

	public isChecked: boolean = true;
	public isDisabled: boolean = false

	public toggleBtn: string = "Désactiver";

	public toggleDisable(): void {
		this.isDisabled = !this.isDisabled;
		if (this.isDisabled) {
			this.toggleBtn = "Activer";
		} else {
			this.toggleBtn = "Désactiver";
		}
	}

	public inputModel: string = "Mon message";

	public showMessage(): void {
		alert(this.inputModel);
	}

	public showFirstname(): void
	{
		alert(`Bonjour ${this.firstname} !`);
	}
}
