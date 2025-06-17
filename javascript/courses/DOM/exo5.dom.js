{
	let myDiv = document.createElement("div");
	myDiv.id = "myDiv";

	let myParagraph = document.createElement("p");
	myParagraph.id = "myP";

	let e2 = document.createTextNode(" est une entreprise de");
	let br = document.createElement("br");
	let e4 = document.createTextNode("services linguistiques");
	let e5 = br.cloneNode();
	let e6 = document.createTextNode(
		"offrant des prestations professionnelles",
	);
	let e7 = br.cloneNode();
	let e8 = document.createTextNode("de ");
	let e9 = document.createElement("a");
	e9.href = "/traduction.html";
	e9.textContent = "traduction";
	let e10 = document.createTextNode(", ");
	let e11 = document.createElement("a");
	e11.href = "/correction.html";
	e11.textContent = "correction";
	let e12 = document.createTextNode(" et ");

	let e13 = document.createElement("a");
	e13.href = "/relecture-text.html";
	let e131 = document.createElement("strong");
	e131.textContent = "relecture de texte";
	e13.appendChild(e131);

	let e14 = document.createTextNode(".");

	let title = document.createElement("h1");
	title.textContent = "Excellent!";

	let devis = document.createElement("a");
	devis.href = "/devis";
	devis.className = "btn";
	devis.textContent = "Demander votre devis gratuit";

	myParagraph.appendChild(e2);
	myParagraph.appendChild(br);
	myParagraph.appendChild(e4);
	myParagraph.appendChild(e5);
	myParagraph.appendChild(e6);
	myParagraph.appendChild(e7);
	myParagraph.appendChild(e8);
	myParagraph.appendChild(e9);
	myParagraph.appendChild(e10);
	myParagraph.appendChild(e12);
	myParagraph.appendChild(e13);
	myParagraph.appendChild(e14);

	myDiv.appendChild(myParagraph);
	myDiv.insertBefore(title, myParagraph);

	myDiv.appendChild(devis);

	document.body.appendChild(myDiv);
}

{
	let myDiv = document.createElement("div");
	myDiv.id = "divTP2";
	let myPar = document.createElement("p");
	myPar.textContent = "Langages basés sur ECMAScript :";
	let myUL = document.createElement("ul");
	let langs = ["JavaScript", "JScript", "ActionScript", "EX4"];
	for (const lang of langs) {
		let myLI = document.createElement("li");
		myLI.textContent = lang;
		myUL.appendChild(myLI);
	}
	myDiv.appendChild(myPar);
	myDiv.appendChild(myUL);
	document.body.appendChild(myDiv);
}

{
	let myDiv = document.createElement("div");
	myDiv.id = "divTP3";

	let myPar = document.createElement("p");
	myPar.textContent = "Langages basés sur ECMAScript :";

	let myDL = document.createElement("dl");

	let langs = [
		{
			name: "JavaScript",
			desc: "JavaScript est un langage de programmation de scripts principalement utilisé dans les pages web interactives mais aussi coté serveur.",
		},
		{
			name: "JScript",
			desc: "JScript est le nom générique de plusieurs implémentations d'ECMAScript 3 créées par Microsoft.",
		},
		{
			name: "ActionScript",
			desc: "ActionScript est le langage de programmation utilisé au sein d'applications clientes (Adobe Flash, Adobe Flex) et serveur (Flash media server, JRun, Macromedia Generator).",
		},
		{
			name: "EX4",
			desc: "ECMAScript for XML (E4X) est une extension XML au langage ECMAScript.",
		},
	];

	for (const lang of langs) {
		let myDT = document.createElement("dt");
		myDT.textContent = lang.name;

		let myDD = document.createElement("dd");
		myDD.textContent = lang.desc;

		myDL.appendChild(myDT);
		myDL.appendChild(myDD);
	}

	myDiv.appendChild(myPar);
	myDiv.appendChild(myDL);

	document.body.appendChild(myDiv);
}
