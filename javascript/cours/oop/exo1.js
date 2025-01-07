// @ts-nocheck

import { alert } from "../utils/alert.js";

class Person {
	#prenom;
	#age;

	constructor(prenom, age) {
		this.#age = age;
		this.#prenom = prenom;
	}

	greet() {
		alert(
			`Bonjour, je m'appelle ${this.#prenom} et j'ai ${this.#age} ans.`
		);
	}

	getPrenom() {
		return this.#prenom;
	}
}

class Employee extends Person {
	#jobTitle;

	constructor(prenom, age, job) {
		super(prenom, age);
		this.#jobTitle = job;
	}

	work() {
		alert(`${this.getPrenom()} travaille comme ${this.#jobTitle}.`);
	}
}

let aicha = new Employee("Aicha", 23, "Végétarienne");
let mike = new Person("Mike", 24);
// let timothy = new Employee("Timothy", 22, "Développeur de Jeu-Video");

aicha.greet();
aicha.work();

mike.greet();

// timothy.greet();
// timothy.work();
