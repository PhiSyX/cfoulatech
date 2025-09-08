import { defineConfig } from "vite";

export default defineConfig({
	css: {
		preprocessorOptions: {
			scss: {
				silenceDeprecations: [
					"import",
					"mixed-decls",
					"color-functions",
					"global-builtin",
				],
			},
		},
	},
});
