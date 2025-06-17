import { alert } from "../utils/alert.js";

class Person {
	/**
	 * Prénom de la personne.
	 *
	 * @type {string}
	 */
	#prenom;

	/**
	 * Age de la personne.
	 *
	 * @type {number}
	 */
	#age;

	/**
	 * Crée une instance de Person.
	 *
	 * @constructor
	 * @param {string} prenom
	 * @param {number} age
	 */
	constructor(prenom, age) {
		this.#age = age;
		this.#prenom = prenom;
	}

	greet() {
		alert(
			`Bonjour, je m'appelle ${this.#prenom} et j'ai ${this.#age} ans.`,
		);
	}

	/**
	 * Récupère le prénom de la propriété prenom.
	 * @returns {string}
	 */
	getPrenom() {
		return this.#prenom;
	}
}

class Employee extends Person {
	/**
	 * Titre de l'emploi
	 *
	 * @type {string}
	 */
	#jobTitle;

	/**
	 * Creates an instance of Employee.
	 *
	 * @constructor
	 * @param {string} prenom
	 * @param {number} age
	 * @param {string} job
	 */
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
