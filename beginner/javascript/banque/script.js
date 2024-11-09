// --------- //
// Constante //
// --------- //

/** @satisfies {Record<string, (...args: Array<{toString(): string}>) => string>} */
const MESSAGES_BANK = {
	already_registered: (bank_name, person_name) =>
		`[${bank_name}]: Vous êtes déjà inscrit chez nous, ${person_name}.`,
	bad_pin_code: (bank_name) =>
		`[${bank_name}]: Le code PIN que vous avez entré est invalide.`,
	bye: (bank_name, person_name) =>
		`[${bank_name}]: Au revoir ${person_name}, à la prochaine !`,
	cancel_operation: (bank_name) => `[${bank_name}]: Opération annulée.`,
	invalid_amount_money: (bank_name, amount) =>
		`[${bank_name}]: Le montant que vous avez envoyé (${amount}) est erroné.`,
	is_not_customer: (bank_name) =>
		`[${bank_name}]: Vous n'êtes pas client chez nous, inscrivez-vous.`,
	registration_success: (bank_name, customer_name) =>
		`[${bank_name}]: Bienvenue ${customer_name}, vous êtes maintenant inscrit chez nous.`,
	cash_deposit_success: (bank_name, amount, total_money) =>
		`[${bank_name}]: vous avez déposé ${amount}€ sur votre compte. Vous avez maintenant ${total_money}€.`,
	cash_withdraw_success: (bank_name, amount, total_money) =>
		`[${bank_name}]: vous avez retiré ${amount}€ de votre compte, il vous reste ${total_money}€. `,
	choose_deposit_amount: (bank_name, customer_name) =>
		`[${bank_name}]: Combien d'argent voulez-vous déposer?\n\n` +
		`[${customer_name}]:`,
	choose_withdrawal_amount: (bank_name, customer_name) =>
		`[${bank_name}]: Combien d'argent voulez-vous retirer?\n\n` +
		`[${customer_name}]:`,
	no_longer_withdraw_money: (bank_name, available_balance) =>
		`[${bank_name}]: Vous ne pouvez pas retirer en deçà de 0€.` +
		` Le solde actuel de votre compte est de ${available_balance}€\n\n` +
		` Ajoutez de l'argent à votre compte.\n\n` +
		` Bien à vous.`,

	choose_pin: (bank_name, person_name, details) => {
		if (details) {
			details = `[${bank_name}]: ${details}\n`;
		}

		return (
			`${details}` +
			`[${bank_name}]: Choisissez code PIN de carte bancaire (4 chiffres)\n\n` +
			`[${person_name}]:`
		);
	},

	welcome: (bank_name, person_name) =>
		`[${bank_name}]: ` +
		`Bienvenue ${person_name}, vous êtes sur le point` +
		` de vous inscrire à ${bank_name}.\n\n` +
		`Voulez-vous procéder à l'inscription?`,
};

/** @satisfies {Record<string, (...args: Array<{toString(): string}>) => string>} */
const MESSAGES_PERSON = {
	goto: (person_name, location) =>
		`[${person_name}]: En route vers l'adresse ${location}.`,
};

/** @satisfies {Record<string, (...args: Array<{toString(): string}>) => string>} */
const MESSAGES_WORLD = {
	bank_not_found: (bank_name) =>
		`[Système]: La banque "${bank_name}" n'existe pas dans notre programme.`,
	person_not_found: (person_id) =>
		`[Système]: La personne à l'ID ${person_id} ne semble pas exister.`,

	deposit_request: (banks, person_name) =>
		`[Système]: Dans quelle banque souhaites-tu déposer de l'argent ${person_name} ?\n\n` +
		`Veuillez choisir entre ces choix: ${banks}\n\n` +
		`[${person_name}]:`,

	registration_request: (banks, person_name) =>
		`[Système]: Dans quelle banque souhaites-tu t'inscrire ${person_name} ?\n\n` +
		`Veuillez choisir entre ces choix: ${banks}\n\n` +
		`[${person_name}]:`,
};

// ---- //
// Plan //
// ---- //

class Address {
	/**
	 * Rue.
	 * @type {string}
	 */
	#street;
	/**
	 * Numéro.
	 * @type {string}
	 */
	#street_number;
	/**
	 * Ville.
	 * @type {string}
	 */
	#city;
	/**
	 * Commune.
	 * @type {string}
	 */
	#town;
	/**
	 * Code Postal.
	 * @type {number}
	 */
	#zipcode;

	/**
	 * @param {string} street
	 * @param {{toString(): string}} street_number
	 * @param {string} city
	 * @param {string} town
	 * @param {number} zipcode
	 */
	constructor(street, street_number, city, town, zipcode) {
		this.#street = street;
		this.#street_number = street_number.toString();
		this.#city = city;
		this.#town = town;
		this.#zipcode = zipcode;
	}

	toString() {
		return `${this.#street} n°${this.#street_number}, ${this.#zipcode} ${
			this.#town
		} (${this.#city})`;
	}
}

class Bank {
	/**
	 * Adresse de la banque.
	 * @type {Address}
	 */
	#address;

	/**
	 * ID de la banque.
	 * @type {string}
	 */
	#id;

	/**
	 * Nom de la banque.
	 * @type {string}
	 */
	#name;

	/**
	 * Les clients de la banque.
	 * @type {Array<BankCustomer>}
	 */
	#customers;

	/**
	 * @param {string} name
	 * @param {Address} address
	 * @param {string} [id=random_id()]
	 */
	constructor(name, address, id = random_id()) {
		this.#name = name;
		this.#address = address;
		this.#id = id;
		this.#customers = [];
	}

	/**
	 * @param {BankCustomer} customer
	 */
	add_customer(customer) {
		this.#customers.push(customer);
	}

	/**
	 * @param {BankCustomer} customer
	 */
	cash_deposit_request(customer) {
		let user_pin_code = this.#ask_choose_pin(
			customer.personal_info().get_full_name()
		);

		if (!user_pin_code) {
			notify(MESSAGES_BANK.cancel_operation(this.#name));
			return;
		}

		// TODO: avoir une limite de 3
		if (!customer.credit_card().compare_pin_code(user_pin_code)) {
			notify(MESSAGES_BANK.bad_pin_code(this.#name));
			return;
		}

		let user_amount = this.#ask_amount(
			MESSAGES_BANK.choose_deposit_amount(
				this.#name,
				customer.personal_info().get_full_name()
			)
		);

		if (!user_amount) {
			return;
		}

		customer.cash_deposit(user_amount);
		notify(
			MESSAGES_BANK.cash_deposit_success(
				this.#name,
				user_amount,
				customer.total_money_info()
			)
		);
	}

	/**
	 * @param {BankCustomer} customer
	 */
	cash_withdrawal_request(customer) {
		let user_pin_code = this.#ask_choose_pin(
			customer.personal_info().get_full_name()
		);

		if (!user_pin_code) {
			notify(MESSAGES_BANK.cancel_operation(this.#name));
			return;
		}

		// TODO: avoir une limite de 3
		if (!customer.credit_card().compare_pin_code(user_pin_code)) {
			notify(MESSAGES_BANK.bad_pin_code(this.#name));
			return;
		}

		let user_amount = this.#ask_amount(
			MESSAGES_BANK.choose_withdrawal_amount(
				this.#name,
				customer.personal_info().get_full_name()
			)
		);

		if (!user_amount) {
			return;
		}

		if (!customer.cash_withdrawal(user_amount)) {
			return;
		}

		notify(
			MESSAGES_BANK.cash_withdraw_success(
				this.#name,
				user_amount,
				customer.total_money_info()
			)
		);
	}

	/**
	 * @param {Person} person
	 */
	find_customer(person) {
		return this.#customers.find(
			(customer) =>
				customer.personal_info().number_card() ===
				person.identity_card().number_card()
		);
	}

	get_identifier() {
		return this.#name.toLowerCase().replaceAll(" ", "_");
	}

	get_name() {
		return this.#name;
	}

	get_location() {
		return this.#address;
	}

	/**
	 * @param {Person} person
	 */
	has_customer(person) {
		return this.#customers.some(
			(customer) =>
				customer.personal_info().number_card() ===
				person.identity_card().number_card()
		);
	}

	/**
	 * @param {Person} person
	 */
	registration_request(person) {
		if (this.has_customer(person)) {
			notify(MESSAGES_BANK.already_registered(this.#name, person.full_name()));
			return null;
		}

		let want_register = confirmation(
			MESSAGES_BANK.welcome(this.#name, person.full_name())
		);
		if (!want_register) {
			notify(MESSAGES_BANK.bye(this.#name, person.full_name()));
			return null;
		}

		let user_pin_code = this.#ask_choose_pin(person.full_name());
		if (!user_pin_code) {
			return;
		}

		let bank_customer = new BankCustomer(person.identity_card(), this.#id);
		bank_customer.define_pin_code_to_credit_card(user_pin_code);
		this.add_customer(bank_customer);
		notify(MESSAGES_BANK.registration_success(this.#name, person.full_name()));
		return bank_customer.credit_card();
	}

	/**
	 * @param {string} message
	 */
	#ask_amount(message) {
		let user_amount = Number.parseFloat(ask(message, "0") || "0");

		if (!user_amount || user_amount < 0) {
			notify(MESSAGES_BANK.invalid_amount_money(this.#name, user_amount || 0));
			return null;
		}

		return user_amount;
	}

	/**
	 * @param {string} full_name
	 */
	#ask_choose_pin(full_name) {
		let user_pin_code_s = null;
		let invalid_pin = "";

		do {
			// Le code entré est invalide
			if (typeof user_pin_code_s === "string" && user_pin_code_s.length >= 0) {
				invalid_pin = "Mauvais code PIN, recommencez...";
			}

			user_pin_code_s = ask(
				MESSAGES_BANK.choose_pin(this.#name, full_name, invalid_pin)
			);

			if (user_pin_code_s === null) {
				return null;
			}
		} while (user_pin_code_s.length !== 4);

		return Number.parseInt(user_pin_code_s, 10);
	}
}

class BankCustomer {
	/**
	 * Compte bancaire du client.
	 * @type {BankAccount}
	 */
	#account;

	/**
	 * Carte bancaire du client.
	 * @type {BankCreditCard}
	 */
	#credit_card;

	/**
	 * ID du client.
	 * @type {string}
	 */
	#id;

	/**
	 * La banque liée à ce client.
	 * @type {string}
	 */
	#linked_bank;

	/**
	 * Les informations du client de banque.
	 * @type {IdentityCard}
	 */
	#personal_info;

	/**
	 * @param {IdentityCard} personal_info
	 * @param {string} bank_id
	 */
	constructor(personal_info, bank_id) {
		this.#linked_bank = bank_id;
		this.#personal_info = personal_info;

		this.#id = this.#generate_id();

		this.#credit_card = new BankCreditCard(this.#linked_bank, this.#id);
		this.#account = new BankAccount(bank_id, this.#credit_card.number());
	}

	/**
	 * @param {number} pin_code
	 */
	define_pin_code_to_credit_card(pin_code) {
		this.#credit_card.with_pin_code(pin_code);
		return this;
	}

	credit_card() {
		return this.#credit_card;
	}

	/**
	 * @param {number} amount
	 */
	cash_deposit(amount) {
		this.#account.deposit(this, amount);
	}

	/**
	 * @param {number} amount
	 */
	cash_withdrawal(amount) {
		return this.#account.withdraw(this, amount);
	}

	personal_info() {
		return this.#personal_info;
	}

	total_money_info() {
		return this.#account.total_money();
	}

	transactions_history() {
		return this.#account.transactions_history();
	}

	#generate_id() {
		return random_number(6);
	}
}

class BankCreditCard {
	/**
	 * Le client lié à cette carte de banque.
	 * @type {string}
	 */
	#linked_customer;

	/**
	 * La banque liée à cette carte.
	 * @type {string}
	 */
	#linked_bank;

	/**
	 * Numéro de la carte bancaire.
	 * @type {string}
	 */
	#number;

	/**
	 * Le code pin de la carte bancaire.
	 * @type {number}
	 */
	#pin_code;

	/**
	 * @param {string} bank_id
	 * @param {string} customer_id
	 */
	constructor(bank_id, customer_id) {
		this.#linked_bank = bank_id;
		this.#linked_customer = customer_id;

		this.#pin_code = this.#generate_pin_code();
		this.#number = this.#generate_number();
	}

	/**
	 * @param {number} user_pin_code
	 */
	compare_pin_code(user_pin_code) {
		return this.#pin_code === user_pin_code;
	}

	#generate_pin_code() {
		return Number.parseInt(random_number(4), 10);
	}

	#generate_number() {
		let n = random_number(8);
		return `${this.#linked_bank}:${this.#linked_customer}-${n}`;
	}

	linked_bank() {
		return this.#linked_bank;
	}

	number() {
		return this.#number;
	}

	/**
	 * @param {number} pin_code
	 */
	with_pin_code(pin_code) {
		this.#pin_code = pin_code;
		return this;
	}
}

class BankAccount {
	/**
	 * La carte bancaire liée à ce compte.
	 * @type {string}
	 */
	#linked_card;

	/**
	 * La banque liée à cette carte.
	 * @type {string}
	 */
	#linked_bank;

	/**
	 * Argent dans le compte.
	 * @type {number}
	 */
	#money = 0;

	/**
	 * @type {Array<BankTransaction>}
	 */
	#transactions_history = [];

	/**
	 * @param {string} bank_id
	 * @param {string} credit_card_number
	 */
	constructor(bank_id, credit_card_number) {
		this.#linked_bank = bank_id;
		this.#linked_card = credit_card_number;
	}

	/**
	 * @param {BankCustomer} from_customer
	 * @param {number} amount
	 */
	deposit(from_customer, amount) {
		this.#money += amount;

		let transaction = new BankTransaction()
			.with_from(from_customer)
			.with_amount(`+${amount}€`)
			.with_date(new Date());

		this.#transactions_history.push(transaction);

		return true;
	}

	total_money() {
		return this.#money;
	}

	transactions_history() {
		return this.#transactions_history;
	}

	/**
	 * @param {BankCustomer} from_customer
	 * @param {number} amount
	 */
	withdraw(from_customer, amount) {
		if (amount <= 0) {
			notify(MESSAGES_BANK.invalid_amount_money(amount));
			return false;
		}

		if (this.#money - amount < 0) {
			notify(
				MESSAGES_BANK.no_longer_withdraw_money(this.#linked_bank, this.#money)
			);
			return false;
		}

		this.#money -= amount;

		let transaction = new BankTransaction()
			.with_from(from_customer)
			.with_amount(`-${amount}€`)
			.with_date(new Date());

		this.#transactions_history.push(transaction);

		return true;
	}
}

class BankTransaction {
	/**
	 * @type {BankCustomer|null}
	 */
	customer = null;
	/**
	 * @type {Date|null}
	 */
	date = null;
	/**
	 * @type {string|null}
	 */
	amount = null;

	/**
	 * @param {string} amount
	 */
	with_amount(amount) {
		this.amount = amount;
		return this;
	}

	/**
	 * @param {Date} date
	 */
	with_date(date) {
		this.date = date;
		return this;
	}

	/**
	 * @param {BankCustomer} customer
	 */
	with_from(customer) {
		this.customer = customer;
		return this;
	}
}

class Person {
	/**
	 * ID de l'utilisateur.
	 * @type {string}
	 */
	#id;

	/**
	 * Carte d'identité de la personne.
	 * @type {IdentityCard}
	 */
	#identity_card;

	/**
	 * Les cartes bancaires de la personne.
	 * @type {Array<BankCreditCard>}
	 */
	#credit_cards = [];

	/**
	 * Argent liquide de la personne.
	 * @type {number}
	 */
	#money_cash = 0;

	/**
	 * @param {string} firstname
	 * @param {string} lastname
	 * @param {Date} birth_date
	 * @param {string} [id=random_id()]
	 */
	constructor(firstname, lastname, birth_date, id = random_id()) {
		this.#id = id;
		this.#identity_card = new IdentityCard(lastname, firstname, birth_date);
	}

	/**
	 * @param {BankCreditCard} credit_card
	 */
	add_credit_card(credit_card) {
		this.#credit_cards.push(credit_card);
	}

	firstname() {
		return this.#identity_card.get_firstname();
	}

	full_name() {
		return this.#identity_card.get_full_name();
	}

	id() {
		return this.#id;
	}

	identity_card() {
		return this.#identity_card;
	}

	/**
	 * @param {Address} location
	 * @param {() => void} action
	 */
	goto(location, action) {
		notify(MESSAGES_PERSON.goto(this.#identity_card.get_full_name(), location));
		action();
	}

	/**
	 * @param {number} amount
	 */
	set_money(amount) {
		this.#money_cash = amount;
	}
}

class IdentityCard {
	/**
	 * @type {Date}
	 */
	#birth_date;
	/**
	 * @type {string}
	 */
	#firstname;
	/**
	 * @type {string}
	 */
	#lastname;

	/**
	 * Numéro de la carte ID
	 * @type {string}
	 */
	#number_card;

	/**
	 * @param {string} lastname
	 * @param {string} firstname
	 * @param {Date} birth_date
	 */
	constructor(lastname, firstname, birth_date) {
		this.#birth_date = birth_date;
		this.#firstname = firstname;
		this.#lastname = lastname;

		this.#number_card = this.#generate_number_card();
	}

	get_age() {
		let current_date = new Date();
		let diff_y = current_date.getFullYear() - this.#birth_date.getFullYear();
		let diff_m = current_date.getMonth() - this.#birth_date.getMonth();
		let diff_d = current_date.getDate() - this.#birth_date.getDate();

		if (diff_m <= 0 || diff_d < 0) {
			diff_y -= 1;
		}

		return diff_y;
	}

	get_firstname() {
		return this.#firstname;
	}

	get_full_name() {
		return `${this.#lastname} ${this.#firstname}`;
	}

	number_card() {
		return this.#number_card;
	}

	#generate_number_card() {
		return random_number(12);
	}
}

// -------- //
// Fonction //
// -------- //

/**
 * @param {string} q
 * @param {string} [d]
 */
function ask(q, d) {
	let output = prompt(q, d);
	console.info(q, output);
	return output;
}

/**
 * @param {string} q
 */
function confirmation(q) {
	let b = confirm(q);
	console.info(q, b);
	return b;
}

/**
 * @param {string} str
 */
function notify(str) {
	alert(str);
	console.info(str);
}

function random_id() {
	return `${Math.floor(Math.random() * 1_000_000)}`;
}

/**
 * @param {number} n
 */
function random_number(n) {
	let number = "";
	for (let i = 0; i < n; i++) {
		number += Math.floor(Math.random() * 9);
	}
	return number;
}

// -------- //
// Fonction // -> Les événements "click" sur les boutons.
// -------- //

/**
 * @param {string} person_id
 */
function start_bank_account_registration(person_id, default_bank = "") {
	let fake_data = world.fetch(
		person_id,
		(person, bank_list) =>
			MESSAGES_WORLD.registration_request(bank_list, person.full_name()),
		default_bank
	);

	if (!fake_data) {
		return;
	}

	fake_data.person.goto(fake_data.bank.get_location(), () => {
		let credit_card = fake_data.bank.registration_request(fake_data.person);
		if (credit_card) {
			fake_data.person.add_credit_card(credit_card);
		}
	});
}

/**
 * @param {string} person_id
 */
function start_cash_deposit(person_id, default_bank = "") {
	let fake_data = world.fetch_customer(
		person_id,
		(person, bank_list) =>
			MESSAGES_WORLD.deposit_request(bank_list, person.full_name()),
		default_bank
	);

	if (!fake_data) {
		return;
	}

	if (!fake_data.customer) {
		notify(MESSAGES_BANK.is_not_customer(fake_data.bank.get_name()));
		return;
	}

	fake_data.bank.cash_deposit_request(fake_data.customer);
	console.table(fake_data.customer.transactions_history());
}

/**
 * @param {string} person_id
 */
function start_cash_withdrawal(person_id, default_bank = "") {
	let fake_data = world.fetch_customer(
		person_id,
		(person, bank_list) =>
			MESSAGES_WORLD.deposit_request(bank_list, person.full_name()),
		default_bank
	);

	if (!fake_data) {
		return;
	}

	if (!fake_data.customer) {
		notify(MESSAGES_BANK.is_not_customer(fake_data.bank.get_name()));
		return;
	}

	fake_data.bank.cash_withdrawal_request(fake_data.customer);
	console.table(fake_data.customer.transactions_history());
}

// -------------- //
// Implémentation // Commencement de l'implémentation de notre plan
// -------------- //

class FakeWorld {
	/**
	 * @private
	 * @type {Record<string, Bank>}
	 */
	banks = {};

	/**
	 * @type {Array<Person>}
	 */
	#persons = [];

	/**
	 * @param {Bank} bank
	 */
	add_bank(bank) {
		let identifier = bank.get_identifier();
		this.banks[identifier] = bank;
		return this;
	}

	/**
	 * @param {Person} person
	 */
	add_person(person) {
		this.#persons.push(person);
		return this;
	}

	/**
	 * @param {string} person_id
	 */
	get_person(person_id) {
		return this.#persons.find((person) => person.id() === person_id);
	}

	get_bank_names() {
		let names = [];
		for (let bank_id in this.banks) {
			let bank = this.banks[bank_id];
			names.push(bank.get_name());
		}
		return names;
	}

	/**
	 * @param {string} bank_name
	 */
	find_bank(bank_name) {
		for (let bank_id in this.banks) {
			let bank = this.banks[bank_id];
			if (bank.get_name().toLowerCase() === bank_name.toLowerCase()) {
				return bank;
			}
		}
		return null;
	}

	/**
	 * @param {string} person_id
	 * @param {(p: Person, banks: Array<string>) => string} message
	 * @param {string} [default_bank=""]
	 */
	fetch(person_id, message, default_bank = "") {
		let person = world.get_person(person_id);
		if (!person) {
			notify(MESSAGES_WORLD.person_not_found(person_id));
			return null;
		}

		let bank_names = world.get_bank_names();

		let user_bank = ask(message(person, bank_names), default_bank);
		if (user_bank === null) {
			return null;
		}

		let bank_founded = bank_names.find(
			(bank) => bank.toLowerCase() === user_bank.toLowerCase()
		);
		let bank = world.find_bank(bank_founded || "");
		if (!bank_founded || !bank) {
			notify(MESSAGES_WORLD.bank_not_found(user_bank));
			return null;
		}

		return { bank: bank, person: person };
	}

	/**
	 * @param {string} person_id
	 * @param {(p: Person, banks: Array<string>) => string} message
	 * @param {string} [default_bank=""]
	 */
	fetch_customer(person_id, message, default_bank = "") {
		let fake_data = this.fetch(person_id, message, default_bank);
		if (!fake_data || !fake_data.bank || !fake_data.person) {
			return;
		}

		let person = fake_data.person;
		let bank = fake_data.bank;
		let customer = fake_data.bank.find_customer(person);

		return { bank: bank, customer: customer };
	}
}

// ---- //
// Data // -> Il s'agit d'exemples de données de la base de données.
// ---- //

let database_users = [
	{
		id: random_id(),
		firstname: "Mike",
		lastname: "S.",
		birth_date: "12-07-1991",
		money_cash: 20,
	},
	{
		id: random_id(),
		firstname: "Timothy",
		lastname: "X.",
		birth_date: "11-12-2005",
		money_cash: 10,
	},
	{
		id: random_id(),
		firstname: "Jeremy",
		lastname: "X.",
		birth_date: "04-04-1987",
		money_cash: 17,
	},
];

let database_banks = [
	{
		id: random_id(),
		name: "Axa Bank",
		address: {
			street: "Rue de la banque d'Axa Bank",
			street_number: 200,
			city: "Bruxelles",
			town: "Bruxelles",
			zipcode: 1000,
		},
		accounts: [database_users[2]],
	},
	{
		id: random_id(),
		name: "ING Bank",
		address: {
			street: "Rue de la banque d'ING Bank",
			street_number: 10,
			city: "Bruxelles",
			town: "Bruxelles",
			zipcode: 1000,
		},
	},
];

let world = new FakeWorld();

// Ajout des banques dans notre monde.
for (let database_bank of database_banks) {
	let bank_id = database_bank.id;
	let bank_name = database_bank.name;
	let bank_address = new Address(
		database_bank.address.street,
		database_bank.address.street_number,
		database_bank.address.city,
		database_bank.address.town,
		database_bank.address.zipcode
	);
	let bank = new Bank(bank_name, bank_address, bank_id);
	world.add_bank(bank);
}

for (let database_user of database_users) {
	let person_id = database_user.id;
	let person_firstname = database_user.firstname;
	let person_lastname = database_user.lastname;
	let person_birth_date = new Date(database_user.birth_date);

	let person = new Person(
		person_firstname,
		person_lastname,
		person_birth_date,
		person_id
	);
	person.set_money(database_user.money_cash);

	world.add_person(person);
}
