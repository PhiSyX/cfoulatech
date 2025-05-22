export function randomNumber(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min)) + min;
}

export function randomArray<T>(arr: Array<T>): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

export function removeRandomArray<T>(mut_arr: Array<T>): T {
	let index = Math.floor(Math.random() * mut_arr.length);
	let item = mut_arr[index];
	mut_arr.splice(index, 1);
	return item;
}

export function minmax(val: number, min: number, max: number): number {
	return Math.min(Math.max(min, val), max);
}

export function shuffle<T>(array: Array<T>): Array<T> {
	return array
		.map((a) => ({ sort: Math.random(), value: a }))
		.sort((a, b) => a.sort - b.sort)
		.map((a) => a.value);
}
