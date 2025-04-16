let yearOfBirth = Number(prompt("Année de naissance"));
let currentYear = new Date().getFullYear();
console.log(currentYear - yearOfBirth);

let val = prompt("Entre un nombre");
let num = Number(val);
let str = String(num);
console.log(
	"typeof val =", typeof val,
	"typeof num =", typeof num,
	"typeof str =", typeof str,
);

let enfant1 = prompt("Prénom du premier enfant");
let age1 = Number(prompt("Age du premier enfant"));

let enfant2 = prompt("Prénom du second enfant");
let age2 = Number(prompt("Age du second enfant"));

let enfant3 = prompt("Prénom du troisième enfant");
let age3 = Number(prompt("Age du troisième enfant"));

let plusGrand;

if (age1 > age2 && age1 > age3) {
	plusGrand = enfant1;
} else if (age2 > age1 && age2 > age3) {
	plusGrand = enfant2;
} else {
	plusGrand = enfant3;
}

alert(`${plusGrand} est l'enfant le plus grand`);
