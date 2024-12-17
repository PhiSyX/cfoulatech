// Écrivez un programme en JavaScript qui permet de calculer la factorielle d'un
// nombre entier positif saisi par l'utilisateur

function factorial(number) {
	if (number === 0) {
		return 1;
	}
	return number * factorial(number - 1);
}

let user_number = Number(prompt("Votre nombre"));

if (user_number < 0) {
	alert("Le nombre DOIT être un nombre positif supérieur ou égal à 0");
} else {
	let f = factorial(user_number);
	alert(`La factorielle de ${user_number} vaut ${f}`);
}
