# points clés d'un `objet` et d'une `classe` :

## Objet

1. Un `objet` PEUT avoir des **propriétés**. Toutes les propriétés sont **publiques**.

```js
let obj = {
	prenom: "Mike",
	age: 24,
};
```

Avec un accès à ses propriétés en lecture et écriture.

```js
console.log(obj.age); // Accès en lecture (Sortie: 24)
obj.prenom = "Salvatore"; // Accès en écriture
console.log(obj.prenom); // Accès en lecture (Sortie: "Salvatore")
```

2. Un `objet` PEUT avoir des **méthodes publiques**.

```js
let obj = {
	méthode() {
		console.log("Hello World");
	},
};

obj.méthode(); // Accès à la méthode publique.
```

3. Les méthodes d'un `objet` PEUVENT avoir accès aux propriétés et aux méthodes de l'`objet` via `this`.

```js
let obj = {
	prenom: "Mike",
	age: 24,

	hello() {
		this.méthode();
	},

	méthode() {
		console.log(`Bonjour, je suis ${this.prenom}`);
	},
};

obj.hello(); // Accès à la méthode publique.
```

4. `this` équivaut à l'`objet` en question.

## Classe

1. Une `classe` PEUT avoir un constructeur.

```js
class CompteBancaire {
	// Constructeur
	constructor(nom) {}
}
```

2. Une `classe` est destinée à être utilisée et surtout **instanciée** en un `objet`.

```js
let instance_objet = new CompteBancaire("Nom");
```

3. Une `classe` PEUT avoir des propriétés publiques ou privées.

```js
class CompteBancaire {
	nom; // <- Propriété publique
	#code_pin; // <- Propriété privée.

	constructor(nom) {
		this.nom = nom;
		this.#code_pin = "0000";
	}
}
```

Les propriétés privées ne peuvent être utilisées qu'au sein de la classe.

```js
let instance_objet = new CompteBancaire("Nom");
console.log(instance_objet.nom); // Ok.
console.log(instance_objet.#code_pin); // Erreur.
```

3. Une `classe` PEUT avoir des méthodes publiques ou privées.

```js
class CompteBancaire {
	nom;
	#code_pin;

	constructor(nom) {
		this.nom = nom;
		this.#code_pin = this.#générer_code_pin();
	}

	// Méthodes publiques.
	déposer(montant) {}
	retirer(montant) {}

	// Méthodes privées.
	#générer_code_pin() {
		return "0000";
	}
}
```

Les méthodes privées ne peuvent être utilisées qu'au sein de la classe.

```js
let instance_objet = new CompteBancaire("Nom");
console.log(instance_objet.déposer(123)); // Ok.
console.log(instance_objet.retirer(123)); // Ok.
console.log(instance_objet.#générer_code_pin()); // Erreur.
```

4. Une `classe` PEUT hériter des propriétés publiques et méthodes publiques d'une classe parente.

```js
class CompteBancaire {
	#solde;

	constructor(solde) {
		this.#solde = solde;
	}

	déposer(montant) {}
	retirer(montant) {}

	getSolde() {
		return this.#solde;
	}
}

class CompteÉpargne extends CompteBancaire {
	constructor(solde, taux) {
		super(solde);

		this.taux = taux;
	}

	appliquer_intérêt() {
		let interet1 = this.getSolde() * this.taux; // Ok: Accès aux méthodes publiques de CompteBancaire
		//let interet2 = this.#solde * this.taux; // Erreur: Pas accès aux propriétés privées de CompteBancaire
		this.déposer(interet1);
	}
}
```

```js
let instance_objet = new CompteÉpargne(500, 0.2);
console.log(instance_objet.appliquer_intérêt()); // Ok.
console.log(instance_objet.retirer(123)); // Ok.
console.log(instance_objet.#solde); // Erreur.
```
