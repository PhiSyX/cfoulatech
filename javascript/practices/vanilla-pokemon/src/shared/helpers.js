/**
 * Retourne un nombre aléatoire en deux limites.
 * @param {number} max
 * @param {number} min
 * @returns {number}
 */
export function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Renvoie un élément aléatoire d'un tableau.
 */
export function randomArray(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Renvoie un élément aléatoire d'un tableau et le supprime du tableau.
 */
export function removeRandomArray(mut_arr) {
	let index = Math.floor(Math.random() * mut_arr.length);
	let item = mut_arr[index];
	mut_arr.splice(index, 1);
	return item;
}

/**
 * @param {number} val
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function minmax(val, min, max) {
	return Math.min(Math.max(min, val), max);
}

/**
 * Mélange un tableau
 */
export function shuffle(arr) {
	return arr
		.map((a) => ({ sort: Math.random(), value: a }))
		.sort((a, b) => a.sort - b.sort)
		.map((a) => a.value);
}
