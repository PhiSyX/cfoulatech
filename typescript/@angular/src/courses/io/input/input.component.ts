import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-input',
	imports: [],
	templateUrl: './input.component.html',
	styleUrl: './input.component.css',
})
export class InputComponent {
	@Input()
	public firstname: string = "";
	@Input()
	public group: string = "";
}
