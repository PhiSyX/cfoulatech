export {};

let firstnames = ["Mike", "Erica", "Carina"];
let finder = "Mike";
let firstname = firstnames.find(
	(firstname) => firstname === finder,
);
console.log(firstname);
