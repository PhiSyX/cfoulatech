export {};

let student = {
	name: "Zak",
	notes: [10, 7.5, 9.2],
	average()
	{
		const sum = this.notes.reduce((acc, item) => acc + item, 0);
		return sum / this.notes.length;
	},
};

console.log("La moyenne de", student.name, "est de", student.average());
