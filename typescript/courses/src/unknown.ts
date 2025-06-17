let myUnknownVariable: unknown;

myUnknownVariable = 42;
console.log(myUnknownVariable);

myUnknownVariable = "Bonjour";
console.log(myUnknownVariable);

if (typeof myUnknownVariable === "string") {
	console.log("toUpperCase: ", myUnknownVariable.toUpperCase());
}

myUnknownVariable = { nom: "John", age: 42 };
console.table(myUnknownVariable);
