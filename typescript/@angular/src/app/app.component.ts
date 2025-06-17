import { Component, ViewChild } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ServiceComponent } from "./service/service.component";
import { HomeComponent } from "./home/home.component";
import { DataBindingsComponent } from "./data-bindings/data-bindings.component";
import { DirectivesComponent } from './directives/directives.component';
import { FormateurComponent } from './io/formateur/formateur.component';
import { InputComponent } from './io/input/input.component';
import { OutputComponent } from './io/output/output.component';
import { ContactComponent } from './contact/contact.component';
import { ListContactComponent } from './contact/list-contact.component';

@Component({
	selector: "app-root",
	imports: [
		RouterOutlet,
		HomeComponent,
		DataBindingsComponent,
		DirectivesComponent,
		InputComponent,
		FormateurComponent,
		OutputComponent,
		ServiceComponent,
		ContactComponent,
		ListContactComponent,
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
	standalone: true,
})
export class AppComponent {
	title = "Angular";

	@ViewChild('contacts') contactList!: ListContactComponent;

	public alert(name: string) {
		console.log(name);
	}

	public handleContactAdded() {
		console.log("The contact has been added");
		this.contactList.loadContacts();
	}
}
