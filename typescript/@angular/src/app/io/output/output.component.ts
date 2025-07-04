import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-output',
	imports: [],
	templateUrl: './output.component.html',
	styleUrl: './output.component.css',
})
export class OutputComponent
{
	@Input()
	public firstname: string = "";
	@Input()
	public group: string = "";

	@Output()
	takeAttendance = new EventEmitter<string>();

	public emitFirstname(): void
	{
		this.takeAttendance.emit(this.firstname);
	}
}
