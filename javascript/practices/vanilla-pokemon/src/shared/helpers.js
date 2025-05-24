/**
 * Retourne un nombre aléatoire en deux limites.
 * @param {number} min - Limite minimale
 * @param {number} max - Limite maximale
 * @returns {number} Nombre aléatoire entre les deux limites.
 */
export function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Renvoie un élément aléatoire d'un tableau.
 *
 * @template T
 * @param {Array<T>} arr
 * @return T
 */
export function randomArray(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Renvoie un élément aléatoire d'un tableau et le supprime du tableau.
 * @template T
 * @param {Array<T>} mut_arr
 * @return T
 */
export function removeRandomArray(mut_arr) {
	let index = Math.floor(Math.random() * mut_arr.length);
	let item = mut_arr[index];
	mut_arr.splice(index, 1);
	return item;
}

/**
 * Retourne un nombre ENTRE un nombre d'une valeur MINIMALE et un nombre d'une
 * valeur MAXIMALE.
 * Si le nombre `val` est plus petit que `min`, le résultat est `min` si le
 * nombre `val` est plus grand que `max`, le résultat est `max`.
 *
 * @param {number} val - nombre utilisateur
 * @param {number} min - nombre minimal
 * @param {number} max - nombre maximal
 * @returns {number}
 */
export function minmax(val, min, max) {
	return Math.min(Math.max(min, val), max);
}

/**
 * Mélange un tableau
 *
 * @template T
 * @param {Array<T>} arr
 * @return Array<T>
 */
export function shuffle(arr) {
	return arr
		.map((a) => ({ sort: Math.random(), value: a }))
		.sort((a, b) => a.sort - b.sort)
		.map((a) => a.value);
}
