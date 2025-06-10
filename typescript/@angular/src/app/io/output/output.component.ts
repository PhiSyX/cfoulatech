import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-output',
	imports: [],
	templateUrl: './output.component.html',
	styleUrl: './output.component.css',
})
export class OutputComponent {
	@Input()
	public firstname: string = "";
	@Input()
	public group: string = "";

	@Output()
	prendrePresence = new EventEmitter<string>();

	public emitFirstname(): void {
		this.prendrePresence.emit(this.firstname);
	}
}
