import { alert } from "../utils/alert.js";

/**
 * Classe Utilisateur.
 *
 * @property {string} name
 * @property {string} email
 * @property {string} [role="user"]
 */
export class User {
	/**
	 * Nom de l'utilisateur.
	 *
	 * @requires
	 */
	name;
	/**
	 * Email de l'utilisateur.
	 *
	 * @requires
	 */
	email;
	/**
	 * Role de l'utilisateur.
	 *
	 * @default "user"
	 */
	role = "user";

	/**
	 * Le constructeur de la classe Utilisateur.
	 *
	 * @param {string} name
	 * @param {string} email
	 */
	constructor(name, email) {
		this.name = name;
		this.email = email;
	}

	display_info() {
		return `Mon adresse mail est ${this.email} et mon rôle est ${this.role}`;
	}

	say_hello() {
		return `Salut, je suis ${this.name}`;
	}
}

/**
 * Classe Admin.
 *
 * @property {Array<string>} permissions
 */
export class Admin extends User {
	/**
	 * Les permissions des admins.
	 *
	 * @default ["user:readwrite"]
	 */
	permissions;
	role = "admin";

	/**
	 * Le constructeur de la classe `Admin`, qui étend de la classe
	 * `Utilisateur`, nous devons donc appeler l'instruction `super`.
	 *
	 * @param {string} name
	 * @param {string} email
	 * @param {Array<string>} [permissions=["user:readwrite"]]
	 */
	constructor(name, email, permissions = ["user:readwrite"]) {
		super(name, email);
		this.permissions = permissions;
	}

	display_permissions() {
		return `Les permissions de ${this.name} sont les suivantes: "${this.permissions}".`;
	}
}

/**
 * Classe SuperAdmin.
 */
export class SuperAdmin extends Admin {
	/**
	 * Les permissions des super admins.
	 *
	 * @default ["user:readwrite","admin:readwrite"]
	 */
	role = "superadmin";

	/**
	 * Le constructeur de la classe `SuperAdmin`, qui étend de la classe `Admin`
	 * qui elle-même étend de la classe `Utilisateur`.
	 *
	 * @param {string} name
	 * @param {string} email
	 * @param {Array<string>} [permissions=["user:readwrite","admin:readwrite"]]
	 */
	constructor(
		name,
		email,
		permissions = ["user:readwrite", "admin:readwrite"]
	) {
		super(name, email, permissions);
	}
}

let user = new User("John", "john@example.org");
alert(user.display_info());
alert(user.say_hello());
console.log(user, {
	is_user: user instanceof User,
	is_admin: user instanceof Admin,
	is_superadmin: user instanceof SuperAdmin,
});

alert("-----------");

let admin = new Admin("Doe", "doe@example.org");
alert(admin.display_info());
alert(admin.say_hello());
alert(admin.display_permissions());
console.log(admin, {
	is_user: admin instanceof User,
	is_admin: admin instanceof Admin,
	is_superadmin: admin instanceof SuperAdmin,
});

alert("-----------");

let superadmin = new SuperAdmin("John Doe", "john.doe@example.org");
alert(superadmin.display_info());
alert(superadmin.say_hello());
alert(superadmin.display_permissions());
console.log(superadmin, {
	is_user: superadmin instanceof User,
	is_admin: superadmin instanceof Admin,
	is_superadmin: superadmin instanceof SuperAdmin,
});
