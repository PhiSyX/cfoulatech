import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ServiceComponent } from "./service/service.component";
import { HomeComponent } from "./home/home.component";
import { DataBindingsComponent } from "./data-bindings/data-bindings.component";
import { DirectivesComponent } from './directives/directives.component';
import { FormateurComponent } from './io/formateur/formateur.component';
import { InputComponent } from './io/input/input.component';
import { OutputComponent } from './io/output/output.component';
import { StateComponent } from './state/state.component';

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
		StateComponent,
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
	standalone: true,
})
export class AppComponent {
	title = "Angular";

	alert(name: string) {
		console.log(name);
	}
}
