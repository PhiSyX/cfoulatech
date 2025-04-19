/**
 * @param {number} val
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function minmax(min, val, max) {
	return Math.min(Math.max(min, val), max);
}
