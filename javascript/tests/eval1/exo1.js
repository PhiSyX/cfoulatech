let stagiaires = [];

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

function start() {
	let choice_string = prompt(`Faites un choix entre :

    1. Enregistrer un stagiaire
    2. Afficher les stagiaires
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
			record_stagiaire();
			break;

		case 2:
			show_stagiaires();
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

// 1. Enregistrer un stagiaire : l'utilisateur entre le nom, le prénom, et la
//    catégorie du stagiaire (web ou TSPCR).
function record_stagiaire() {
	let firstname = required_prompt("Entre un nom");
	let lastname = required_prompt("Entre un prénom");
	let category = required_prompt(
		"Entre une catégorie (web, TSPCR)",
		(word) => word === "web" || word === "TSPCR"
	);

	let stagiaire = {
		firstname: firstname,
		lastname: lastname,
		category: category,
	};

	stagiaires.push(stagiaire);

	start();
}

// 2. Afficher la liste des stagiaires : le programme affiche tous les
//    stagiaires inscrits avec leur catégorie, soit dans une alert() ou via
//    document.write().
function show_stagiaires() {
	document.write("<ol>");

	stagiaires.forEach((stagiaire) => {
		document.write(
			`<li>${stagiaire.lastname} ${stagiaire.firstname} ${stagiaire.category} </li>`
		);
	});

	document.write("</ol>");

	console.log(stagiaires);
}

// 3. Quitter l'application : permet de terminer l'exécution du programme
function quit_application() {
	alert("Merci, au revoir");
}

start();
