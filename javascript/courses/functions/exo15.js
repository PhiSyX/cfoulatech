import { write } from "../utils/write.js";

/**
 * @param {Array<{ toString(): string }>} arr
 * @returns {{ toString(): string }}
 */
function first_item1(arr) {
	return arr[0];
}

/**
 * @param {Array<{ toString(): string }>} arr
 * @returns {{ toString(): string } | null}
 */
function first_item2(arr) {
	return arr.at(0) ?? null;
}

write(first_item1(["a", "b", "c"]));
write(first_item2(["d", "e", "f"]) ?? "Default value");
