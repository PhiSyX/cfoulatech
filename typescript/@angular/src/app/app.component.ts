import { Component, ViewChild } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import {
	InternListComponent,
} from './observable/pipe/components/intern-list/intern-list.component';
import { ServiceComponent } from "./service/service.component";
import { HomeComponent } from "./home/home.component";
import { DataBindingsComponent } from "./data-bindings/data-bindings.component";
import { DirectivesComponent } from './directives/directives.component';
import { TrainerComponent } from './io/trainer/trainer.component';
import { InputComponent } from './io/input/input.component';
import { OutputComponent } from './io/output/output.component';
import { ContactComponent } from './contact/contact.component';
import { ContactListComponent } from './contact/contact-list.component';

@Component({
	selector: "app-root",
	imports: [
		RouterOutlet,
		HomeComponent,
		DataBindingsComponent,
		DirectivesComponent,
		InputComponent,
		TrainerComponent,
		OutputComponent,
		ServiceComponent,
		ContactComponent,
		ContactListComponent,
		InternListComponent,
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
	standalone: true,
})
export class AppComponent
{
	@ViewChild("contacts")
	public contactList!: ContactListComponent;

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
