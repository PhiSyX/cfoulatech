import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-intern',
	imports: [
		FormsModule,
	],
	templateUrl: './intern.component.html',
	styleUrl: './intern.component.css',
})
export class InternComponent
{
	@Input()
	public studentName: string = "";

	@Input()
	public languages: Array<string> = [];

	@Output()
	public validerInscription = new EventEmitter<string>();

	public emettreValidationInscription()
	{
		this.validerInscription.emit(this.studentName);
	}

	/* 22 */

	public note: number = 0;
	@Output()
	public prendreNote = new EventEmitter<number>();

	public emettreNote()
	{
		this.prendreNote.emit(this.note);
	}
}
