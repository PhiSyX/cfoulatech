/** @type {import('stylelint').Config} */
export default {
	extends: [
		"stylelint-config-standard",
		"stylelint-config-html",
		"stylelint-config-property-sort-order-smacss",
	],
	plugins: ["stylelint-order"],
	rules: {
		// Sélecteurs
		"selector-max-id": 1,
		"selector-max-class": 3,
		"selector-max-type": 3,
		"selector-class-pattern": null,
		"no-descending-specificity": null,

		// Sélecteurs spécifiques
		"selector-pseudo-class-no-unknown": [
			true,
			{ ignorePseudoClasses: ["deep", "global"] },
		],
		"selector-pseudo-element-no-unknown": [
			true,
			{ ignorePseudoElements: ["v-deep"] },
		],
		"at-rule-no-unknown": [true, { ignoreAtRules: ["theme", "utility"] }],
		"declaration-property-value-no-unknown": [
			true,
			{
				ignoreProperties: {
					animation: "auto",
					"animation-duration": "auto",
				},
			},
		],

		// Unités
		"declaration-property-unit-allowed-list": {
			"/^font|^font-size/": ["em", "rem", "%", "vw", "dvw"],
		},

		// Imports
		"import-notation": "string", // pas de "url()" pour les imports

		// Nesting
		"max-nesting-depth": 3, // on limite la profondeur de l'imbrication

		// Media Queries
		"media-feature-range-notation": "context", // on force la notation moderne

		// Polices
		"font-family-no-duplicate-names": null,
		"font-weight-notation": "numeric", // on force la notation numérique pour les poids de police

		// Couleurs
		"color-hex-length": "long", // on force la notation longue pour les couleurs hexadécimales
		"color-named": "never", // on refuse les couleurs nommées
		"color-function-notation": "modern", // on force la notation moderne pour les fonctions de couleurs
		"lightness-notation": "percentage", // on force la notation en pourcentage pour la luminosité
		"alpha-value-notation": "percentage", // on force la notation en pourcentage pour l'alpha
		"hue-degree-notation": "number",
	},
};
