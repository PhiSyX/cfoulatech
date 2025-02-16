import { alert } from "../utils/alert.js";

let paragraph = document.getElementsByTagName("p")?.[0];
alert(paragraph?.hasChildNodes()); // Affiche true

/*
	En savoir plus sur ce que signifie les symboles   ?.
	Ici https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Optional_chaining
*/
