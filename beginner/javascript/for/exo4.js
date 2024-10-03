let numbers = [3, 7, 12, 22, 34, 125, 56, 45, 4558, 41, 100];

/**
 * @param {number} user_number - Nombre entrée par l'utilisateur.
 * @returns {boolean}
 */
export function is_in_list_numbers(user_number) {
	let numbers_len = numbers.length;

	let has_number_been_found = false;

	for (let index = 0; index < numbers_len; index++) {
		let current_iteration_number = numbers[index];
		has_number_been_found = current_iteration_number == user_number;
		if (has_number_been_found) {
			break;
		}
	}

	return has_number_been_found;
}
