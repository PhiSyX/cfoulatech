/**
Écrivez un script en JavaScript utilisant des boîtes de dialogue prompt et
alert pour gérer des transactions bancaires. Le prompt doit permettre à
l'utilisateur d'entrer des montants pour les dépôts et les retraits, tandis que
les résultats et le solde doivent être affichés avec des boîtes de dialogue
alert.
 */

let amounts = [];
let total_amount = 0;

function required_prompt(ask, filter_callback) {
	let user_input;
	do {
		user_input = prompt(ask);
	} while (typeof user_input !== "string");

	if (filter_callback && filter_callback(user_input) === false) {
		alert("Votre choix n'est pas valide, recommencez...");
		return required_prompt(ask, filter_callback);
	}

	return user_input;
}

function filter_number(input) {
	let n = Number.parseFloat(input);
	return !Number.isNaN(n);
}

function start() {
	let choice_string = prompt(`Faites un choix entre :

    1. Déposer de l'argent
    2. Retirer de l'argent
    3. Quitter l'application

`);

	if (choice_string === null) {
		alert("Vous avez quitté le programme.");
		return;
	}

	let choice_number = Number.parseInt(choice_string, 10);

	if (Number.isNaN(choice_number)) {
		alert("Il ne s'agit pas d'un nombre recommencez...");
		return;
	}

	switch (choice_number) {
		case 1:
			deposit_amount();
			break;

		case 2:
			withdraw_amount();
			break;

		case 3:
			quit_application();
			break;

		default:
			{
				alert("Entrez un chiffre entre 1 et 3");
				start();
			}
			break;
	}
}

function deposit_amount() {
	let amount = Number.parseFloat(
		required_prompt("Combien d'argent veux-tu déposer ?", filter_number)
	);
	total_amount += amount;
	amounts.push("+" + amount);
	start();
}

function withdraw_amount() {
	let amount = Number.parseFloat(
		required_prompt("Combien d'argent veux-tu retirer ?", filter_number)
	);

	total_amount -= amount;
	amounts.push("-" + amount);
	start();
}

// 3. Quitter l'application : permet de terminer l'exécution du programme
function quit_application() {
	alert(`Le solde total est de: ${total_amount}`);

	amounts.forEach((amount) => {
		alert(amount);
	});
}

start();
