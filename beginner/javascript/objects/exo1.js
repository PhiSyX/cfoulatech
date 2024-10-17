export let personne = {
	firstname: "John",
	lastname: "Doe",
	age: 20,
	say_hello() {
		console.log(
			`Salut je suis ${this.firstname} ${this.lastname}, j'ai ${this.age} ans!`,
		);
	},
};

personne.say_hello();

