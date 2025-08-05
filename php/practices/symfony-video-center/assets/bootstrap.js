import {
	registerControllers,
	startStimulusApp,
} from "vite-plugin-symfony/stimulus/helpers";
import { registerReactControllerComponents } from "vite-plugin-symfony/stimulus/helpers/react";

registerReactControllerComponents(
    // @ts-expect-error tkt
	import.meta.glob("./react/controllers/**/*.js(x)\?"),
);

const app = startStimulusApp();
registerControllers(
	app,
    // @ts-expect-error tkt
	import.meta.glob("./controllers/*_controller.js", {
		query: "?stimulus",
		eager: true,
	}),
);
