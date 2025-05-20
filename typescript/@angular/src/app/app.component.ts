import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServiceComponent } from "./service/service.component";
import { HomeComponent } from "./home/home.component";
import { DataBindingsComponent } from "./data-bindings/data-bindings.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HomeComponent, ServiceComponent, DataBindingsComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'Angular';
}
