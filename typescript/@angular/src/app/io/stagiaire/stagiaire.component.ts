import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-stagiaire',
	imports: [
		NgForOf,
		FormsModule,
	],
	templateUrl: './stagiaire.component.html',
	styleUrl: './stagiaire.component.css',
	standalone: true,
})
export class StagiaireComponent {
	@Input()
	public studentName: string = "";

	@Input()
	public languages: Array<string> = [];

	@Output()
	public validerInscription = new EventEmitter<string>();

	public emettreValidationInscription() {
		this.validerInscription.emit(this.studentName);
	}

	/* 22 */

	public note: number = 0;
	@Output()
	public prendreNote = new EventEmitter<number>();

	public emettreNote() {
		this.prendreNote.emit(this.note);
	}
}
