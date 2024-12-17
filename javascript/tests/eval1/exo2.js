let products = [];

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
	let choice_string = prompt(`Faites un choix :

    1. Ajouter un produit
    2. Afficher le stock
    3. Supprimer un produit
    4. Quitter l'application

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
			add_product();
			break;

		case 2:
			show_stock();
			break;

		case 3:
			remove_product();
			break;

		case 4:
			quit_application();
			break;

		default:
			{
				alert("Entrez un chiffre entre 1 et 4");
				start();
			}
			break;
	}
}

// 1. Ajouter un produit : Le programme doit permettre à l'utilisateur d'ajouter
//    un produit avec son nom, sa quantité et son prix unitaire.
function add_product() {
	let name = required_prompt("Entre un nom");
	let quantity = required_prompt("Entre la quantité");
	let price_unit = required_prompt("Entre prix unitaire");

	let product = {
		name: name,
		quantity: quantity,
		price_unit: price_unit,
	};

	products.push(product);

	start();
}

// 2. Afficher le stock : Le programme doit lister tous les produits du stock
//    avec leurs informations (nom, quantité et prix unitaire).
function show_stock() {
	document.body.innerHTML = "";

	document.write("<ol>");

	products.forEach((product) => {
		document.write(
			`<li>
				Nom: ${product.name},
				Quantité: ${product.quantity},
				Prix: ${product.price_unit}
			</li>`
		);
	});
	document.write("</ol>");

	console.log(products);
}

// 3. Supprimer un produit : Le programme doit permettre de retirer un produit
//    du stock.
function remove_product() {
	let name = required_prompt(
		"Quel produit souhaites-tu retirer ? (par son nom)"
	);

	products = products.filter(
		(product) => product.name.toLowerCase() != name.toLowerCase()
	);

	show_stock();

	start();
}

// 4. Quitter l'application : Permet de terminer l'exécution
function quit_application() {
	alert("Merci au revoir");
}

start();
