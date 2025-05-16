class Ordinateur {
	name: string;

	constructor(name: string) {
		this.name = name;
	}
}

class Chien {
	aboyer(): void {
		console.log("Wouf");
	}
}

let labrador = new Chien();
labrador.aboyer();

class Medecin {
	specialisation: string;
	sexe: string;

	constructor(name: string, sexe: string) {
		this.specialisation = name;
		this.sexe = sexe;
	}
}

let chirurgien: Medecin = new Medecin("Chirurgien", "F");
let orthopediste: Medecin = new Medecin("Orthopédiste", "M");

console.table([chirurgien, orthopediste]);

class Compte {
	name: string;
	private readonly password: string;

	constructor(name: string, password: string) {
		this.name = name;
		this.password = password;
	}

	toString() {
		return this.password;
	}
}

let mikeCompte = new Compte("Axa", "Bank");
console.log("%s", mikeCompte); // %s = appel de la méthode toString

class Employee {
	public name: string;
	private salaire: number;

	constructor(name: string, salaire: number) {
		this.name = name;
		this.salaire = salaire;
	}

	afficherSalaire(): void {
		console.log(this.name, "gagne", `${this.salaire}€`, "par mois");
	}
}

let mikeEmployee = new Employee("Mike", 13_000);
mikeEmployee.afficherSalaire();

class CompteBancaire {
	public titulaire: string;
	private solde: number;

	constructor(titulaire: string, soldeInitial: number = 0) {
		this.titulaire = titulaire;
		this.solde = soldeInitial;
	}

	deposer(montant: number): void {
		this.solde += montant;
	}

	retirer(montant: number): void {
		this.solde -= montant;
	}

	afficherSolde(): void {
		console.log("Solde de", this.titulaire, ":", this.solde, "€")
	}
}

let mikeCompte = new CompteBancaire("Mike", 1_000_000);
mikeCompte.deposer(1_000);
mikeCompte.retirer(5_000);
mikeCompte.afficherSolde();

class Animal {
	public crier(): void {
	}
}

class Chat extends Animal {
	public crier(): void {
		console.log("🐾 Meow  🐈‍⬛")
	}
}

let akira = new Chat();
akira.crier();

class Personne {
	protected nom: string

	constructor(nom: string) {
		this.nom = nom;
	}
}

class Etudiant extends Personne {
	public afficheNom(): void {
		console.log(this.nom)
	}
}

let mikeEtudiant = new Etudiant("Mike");
mikeEtudiant.afficheNom();
class Livre {
	constructor(public titre: string, public auteur: string, public annee: number) {
	}

	public afficherInfos(): void {
		console.log(`Titre: ${this.titre} | Auteur: ${this.auteur} | Année: ${this.annee}`);
	}

	estAncien(): boolean {
		let n = new Date();
		return (n.getFullYear() - this.annee) >= 50;
	}
}

let etranger = new Livre("L'étranger", "Albert Camus", 1942)
etranger.afficherInfos();
console.log(etranger.estAncien());
