import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { Contact } from './models/contact';
import { NgForOf } from '@angular/common';

@Component({
	selector: 'app-list-contact',
	imports: [
		NgForOf,
	],
	templateUrl: './list-contact.component.html',
	styleUrl: './list-contact.component.css',
})
export class ListContactComponent implements OnInit {
	contacts: Contact[] = [];

	constructor(private contactService: ContactService) {
	}

	ngOnInit() {
		this.loadContacts();
	}

	loadContacts() {
		this.contacts = this.contactService.getContacts();
	}

	public deleteContact(index: number) {
		this.contactService.deleteContact(index);
		this.loadContacts();
	}
}
