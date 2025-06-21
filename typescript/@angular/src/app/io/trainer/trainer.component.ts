import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InternComponent } from '../intern/intern.component';

@Component({
	selector: 'app-trainer',
	imports: [
		FormsModule,
		InternComponent,
	],
	templateUrl: './trainer.component.html',
	styleUrl: './trainer.component.css',
	standalone: true,
})
export class TrainerComponent
{
	public languages: Array<string> = ["HTML", "CSS", "JavaScript"];

	public handleValidateRegistration(student: string)
	{
		alert(`${student} a validé son inscription`);
	}

	public handleNote(note: number)
	{
		if (note < 0 || note > 20) {
			alert("Mauvaise note.");
			return;
		}
		alert(`La note est de ${note} / 20`);
	}
}
