import { Component, ViewChild } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import {
	InternListComponent,
} from './observable/pipe/components/intern-list/intern-list.component';
import { ServiceComponent } from "./service/service.component";
import { DataBindingsComponent } from "./data-bindings/data-bindings.component";
import { DirectivesComponent } from './directives/directives.component';
import { TrainerComponent } from './io/trainer/trainer.component';
import { InputComponent } from './io/input/input.component';
import { OutputComponent } from './io/output/output.component';
import { TruncatePipe } from './observable/pipe/pipes/truncate.pipe';
import { ReversePipe } from './observable/pipe/pipes/reverse.pipe';
import { CustomDatePipe } from './observable/pipe/pipes/custom-date.pipe';
import { Intern } from './observable/pipe/models/intern';
import { EuroToDollarPipe } from './observable/pipe/pipes/euro-to-dollar.pipe';
import { ContactListComponent } from '../app/contact/contact-list.component';

@Component({
	selector: "app-root",
	imports: [
		RouterOutlet,
		DataBindingsComponent,
		DirectivesComponent,
		InputComponent,
		TrainerComponent,
		OutputComponent,
		ServiceComponent,
		InternListComponent,
		ReversePipe,
		TruncatePipe,
		CustomDatePipe,
		EuroToDollarPipe,
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
	standalone: true,
})
export class AppComponent
{
	@ViewChild("contacts")
	public contactList!: ContactListComponent;

	public title: string = `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
 		Debitis eos error impedit, neque quidem reprehenderit tenetur veritatis!
 		Accusantium alias cupiditate error minus nesciunt officia possimus quisquam tenetur.
		Aspernatur, labore quidem.`;
	public currentDate = new Date();
	public search = "";
	public interns: Array<Intern> = [];

	public alert(name: string)
	{
		console.log(name);
	}

	public handleContactAdded()
	{
		console.log("The contact has been added");
		this.contactList.loadContacts();
	}
}
