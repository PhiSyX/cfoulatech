import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InternService } from '../intern.service';

@Component({
	selector: 'app-add-intern',
	imports: [FormsModule],
	templateUrl: './add-intern.component.html',
	styleUrl: './add-intern.component.css',
})
export class AddInternComponent {
	public newName: string = "";

	constructor(private internService: InternService) {
	}

	addIntern() {
		if (this.newName.trim()) {
			this.internService.addIntern(this.newName);
		}
	}
}
