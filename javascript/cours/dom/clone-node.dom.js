let paragraph1 = document.getElementById('myP');
let paragraph2 = paragraph1?.cloneNode(false);
if (paragraph2) {
	paragraph1?.parentNode?.appendChild(paragraph2);
}

/*
	En savoir plus sur ce que signifie les symboles   ?.
	Ici https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Optional_chaining
*/
