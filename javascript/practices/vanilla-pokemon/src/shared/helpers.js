// @ts-nocheck

export function randomNumber(min, max)
{
	return Math.floor(Math.random() * (max - min)) + min;
}

export function randomArray(arr)
{
	return arr[Math.floor(Math.random() * arr.length)];
}

export function removeRandomArray(mut_arr)
{
	let index = Math.floor(Math.random() * mut_arr.length);
	let item = mut_arr[index];
	mut_arr.splice(index, 1);
	return item;
}

export function minmax(val, min, max)
{
	return Math.min(Math.max(min, val), max);
}
