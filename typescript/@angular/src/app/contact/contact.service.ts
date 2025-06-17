import { Injectable } from "@angular/core";
import { Contact } from "./models/contact";

@Injectable({
	providedIn: "root",
})
export class ContactService {
	private contacts: Contact[] = [];

	constructor() {
	}

	public getContacts(): Contact[] {
		return this.contacts;
	}

	public addContact(contact: Contact): void {
		this.contacts.push(contact);
	}

	public deleteContact(startIndex: number): void {
		this.contacts.splice(startIndex, 1);
	}
}
