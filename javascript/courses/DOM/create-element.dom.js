import { alert } from "../utils/alert.js";

let intro = document.querySelector("#intro");
let contenu = intro?.textContent;
alert(`Le contenu de la variable contenu: ${contenu}`);

let paragraphs = document.querySelectorAll("p");
alert(`Il y a ${paragraphs.length} paragraphes !`);

let paragraphs_para = document.querySelectorAll("p.para");
alert(`Il y a ${paragraphs_para.length} paragraphes avec la classe "para" !`);

let paragraph = document.querySelector("p.para");
alert(paragraph?.innerHTML);

/*
	En savoir plus sur ce que signifie les symboles   ?.
	Ici https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Optional_chaining
*/
