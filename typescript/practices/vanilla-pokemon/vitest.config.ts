import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["**/*.{unit,spec}.[jt]s?(x)"],
	},
});
