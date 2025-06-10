import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StagiaireComponent } from '../stagiaire/stagiaire.component';
import { InputComponent } from '../input/input.component';

@Component({
	selector: 'app-formateur',
	imports: [
		FormsModule,
		StagiaireComponent,
	],
	templateUrl: './formateur.component.html',
	styleUrl: './formateur.component.css',
	standalone: true,
})
export class FormateurComponent {
	public languages: Array<string> = ["HTML", "CSS", "JavaScript"];

	public gereValidationInscription(etudiant: string) {
		alert(`${etudiant} a validé son inscription`);
	}

	public gereLaNote(note: number) {
		if (note < 0 || note > 20) {
			alert("Mauvaise note.");
			return;
		}
		alert(`La note est de ${note} / 20`);
	}
}
