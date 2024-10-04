let numbers = [5, 12, 8, 130, 44];

let numbers_len = numbers.length;

let highest_number = numbers[0];

for (let index = 1; index < numbers_len; index++) {
	let number = numbers[index];

	if (number > highest_number) {
		highest_number = number;
	}
}

console.log(
	"%s est le nombre le plus grand parmi la liste des nombres:",
	highest_number,
	numbers
);

// NOTE: typescript casse les bonbons ;)
export {};
