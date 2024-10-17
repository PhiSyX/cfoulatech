export function Personne() {
	this.firstname = "John";
	this.lastname = "Doe";
	this.age = 20;
}

Personne.say_goodbye = function () {
	console.log("Au revoir");
};

Personne.prototype.say_hello = function () {
	console.log(
		`Salut je suis ${this.firstname} ${this.lastname}, j'ai ${this.age} ans!`,
	);
};

let personne = new Personne();

personne.say_hello();

Personne.say_goodbye();