import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataBindings } from './data-bindings/data-bindings';
import { Directives } from './directives/directives';
import { InputComponent } from './io/input/input.component';
import { OutputComponent } from './io/output/output.component';
import { TrainerComponent } from './io/trainer/trainer.component';
import {
	InternListComponent,
} from './observables/pipes/components/intern-list/intern-list.component';
import { ReversePipe } from './observables/pipes/pipes/reverse-pipe';
import { TruncatePipe } from './observables/pipes/pipes/truncate-pipe';
import { CustomDatePipe } from './observables/pipes/pipes/custom-date-pipe';
import {
	EuroToDollarPipe
} from './observables/pipes/pipes/euro-to-dollar-pipe';

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
		DataBindings,
		Directives,
		InputComponent,
		OutputComponent,
		TrainerComponent,
		InternListComponent,
		ReversePipe,
		TruncatePipe,
		CustomDatePipe,
		EuroToDollarPipe,
	],
	templateUrl: './app.html',
	styleUrl: './app.css',
})
export class App
{
	public title: string = `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
 		Debitis eos error impedit, neque quidem reprehenderit tenetur veritatis!
 		Accusantium alias cupiditate error minus nesciunt officia possimus quisquam tenetur.
		Aspernatur, labore quidem.`;
	public currentDate = new Date();
	
	protected readonly alert = window.alert;
}
