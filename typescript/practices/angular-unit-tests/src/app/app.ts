import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
	ProductListComponent,
} from './components/product-list/product-list.component';
import { GradeListComponent } from './components/grade-list/grade-list';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, ProductListComponent, GradeListComponent],
	templateUrl: './app.html',
	styleUrl: './app.css',
})
export class App
{
	protected readonly title = signal('angular-unit-tests');
}
