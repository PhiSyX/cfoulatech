import { minmax } from "../../../lib/math/minmax";
import { describe, test } from "vitest";

describe("minmax utility", () => {
	test("returns the value when it is within range", ({ expect }) => {
		expect(minmax(0, 5, 10)).toBe(5);
	});

	test("returns the minimum value when value is less than minimum", ({
		expect,
	}) => {
		expect(minmax(0, -5, 10)).toBe(0);
	});

	test("returns the maximum value when value is greater than maximum", ({
		expect,
	}) => {
		expect(minmax(0, 15, 10)).toBe(10);
	});

	test("works with negative numbers", ({ expect }) => {
		expect(minmax(-10, -5, 0)).toBe(-5);
		expect(minmax(-10, -15, 0)).toBe(-10);
		expect(minmax(-10, 5, 0)).toBe(0);
	});

	test("works with Infinity", ({ expect }) => {
		expect(
			minmax(Number.NEGATIVE_INFINITY, 5, Number.POSITIVE_INFINITY),
		).toBe(5);
		expect(minmax(0, Number.NEGATIVE_INFINITY, 10)).toBe(0);
		expect(minmax(0, Number.POSITIVE_INFINITY, 10)).toBe(10);
	});
});
