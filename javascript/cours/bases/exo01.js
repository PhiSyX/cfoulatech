let welcome = "Bienvenue";
console.log(welcome);

let prenom = prompt("Entre ton prénom");
alert(`Ton prénom est le suivant: ${prenom}`);

let dataType = prompt("Quelle est ta valeur ?");
console.log(dataType, typeof dataType);
console.log(Number(dataType), typeof Number(dataType));
console.log(Boolean(dataType), typeof Boolean(dataType));

let x = Number.parseFloat(prompt("Quelle est ton nombre premier ?") || "0");
let y = Number.parseFloat(prompt("Quelle est ton nombre second ?") || "0");
let z = x + y;
console.log(`Résultat: ${z}`);

if (confirm("Voulez-vous continuer ?")) {
	console.log("Ok, super.");
} else {
	console.log("Tu n'as pas accepté.");
}
