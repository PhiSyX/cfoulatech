# Points clés d'un `objet` et d'une `classe` :

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

2. Une `classe` est destinée à être **instanciée** en un `objet`.

```js
let instance_objet = new CompteBancaire("Nom");
```

Le fait de d'appeler `new` sur une classe s'appelle le fait de **créer une instance de classe**. Une `instance de classe` partage
les mêmes points clés qu'un `objet`.

3. Une `classe` PEUT avoir des propriétés publiques ou privées.

Pour affecter une valeur à une propriété, on utilise `this`.

```js
class CompteBancaire {
	nom; // <- Propriété publique
	#code_puk; // <- Propriété privée.
	#code_pin = "0000"; // <- Propriété privée avec une valeur par défaut.

	constructor(nom) {
		this.nom = nom;
		this.#code_puk = "0000";

		// Pas obligé de faire la ligne qui suit étant donnée
		// qu'il y a une valeur par défaut
		//this.#code_pin = "0000";
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

Pour accéder à une propriété ou une méthode, on utilise `this`.

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

Pour accéder à une propriété ou une méthode, on utilise `this`.

Pour accéder à une propriété ou une méthode de l'objet parent, on utilise
`super` si `this` n'est pas possible.

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
