import { Component, EventEmitter, Output } from '@angular/core';
import { ContactService } from './contact.service';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-contact',
	imports: [
		FormsModule,
	],
	templateUrl: './contact.component.html',
	styleUrl: './contact.component.css',
})
export class ContactComponent {
	public name: string = "";
	public email: string = "";

	@Output()
	public contactAdded = new EventEmitter<void>();

	constructor(private contactService: ContactService) {
	}

	addContact(): void {
		let name = this.name.trim();
		let email = this.email.trim();

		if (!name || !email) {
			return;
		}

		let contact = { name: name, email };
		this.contactService.addContact(contact);
		this.contactAdded.emit();

		this.reset();
	}

	private reset(): void {
		this.name = "";
		this.email = "";
	}
}
