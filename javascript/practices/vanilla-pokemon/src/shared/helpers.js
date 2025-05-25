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
 * @param {Array<T>} arr - Tableau d'origine immuable.
 * @return T
 */
export function randomArray(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Renvoie un élément aléatoire d'un tableau et le supprime du tableau.
 * 
 * /!\ Cette fonction influe sur le tableau d'origine.
 * 
 * @template T
 * @param {Array<T>} mut_arr - Tableau d'origine MUTABlE.
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
 * @param {number} val - nombre utilisateur.
 * @param {number} min - nombre minimal.
 * @param {number} max - nombre maximal.
 * @returns {number}
 */
export function minmax(val, min, max) {
	return Math.min(Math.max(min, val), max);
}

/**
 * Mélange les éléments d'un tableau et retourne un nouveau tableau.
 * @template T
 * @param {Array<T>} arr - Tableau d'origine immuable.
 * @returns {Array<T>} - Nouveau tableau avec tous les éléments mélangés.
 */
export function shuffle(arr) {
	return arr
		// Ajoute un poids aléatoire aux éléments
		.map((item) => ({ weight: Math.random(), value: item }))
		// Trie les éléments de manière ascendante en fonction du poids
		.sort((a, b) => a.weight - b.weight)
		// Retrait du poids, parce qu'on s'en fiche dans le retour.
		.map((sortItem) => sortItem.value);
}
