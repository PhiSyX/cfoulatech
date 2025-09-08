import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { Contact } from '../models/contact';
import { NgForOf } from '@angular/common';

@Component({
	selector: 'app-contact-list',
	imports: [
		NgForOf,
	],
	templateUrl: './contact-list.component.html',
	styleUrl: './contact-list.component.css',
})
export class ContactListComponent implements OnInit
{
	public contacts: Contact[] = [];

	constructor(private contactService: ContactService)
	{
	}

	public loadContacts()
	{
		this.contacts = this.contactService.getContacts();
	}

	public deleteContact(index: number)
	{
		this.contactService.deleteContact(index);
		this.loadContacts();
	}

	ngOnInit()
	{
		this.loadContacts();
	}
}
