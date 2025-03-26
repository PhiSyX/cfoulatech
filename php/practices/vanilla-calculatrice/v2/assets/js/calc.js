function evenement_submit(e) {
	e.preventDefault();

	let calc_form = document.querySelector("#js-calc-form");
	let alert_messages = document.querySelector("#js-alert-message");

	let left_operand_el = calc_form.firstElementChild;
	let left_operand = Number.parseFloat(left_operand_el.value);

	let right_operand_el =
		calc_form.firstElementChild.nextElementSibling.nextElementSibling;
	let right_operand = Number.parseFloat(right_operand_el.value);

	if (Number.isNaN(left_operand)) {
		calc_form.classList.add("error");
		left_operand_el.classList.add("error");
	} else {
		left_operand_el.classList.remove("error");
	}

	if (Number.isNaN(right_operand)) {
		calc_form.classList.add("error");
		right_operand_el.classList.add("error");
	} else {
		right_operand_el.classList.remove("error");
	}

	if (Number.isNaN(left_operand) || Number.isNaN(right_operand)) {
		let alert = document.createElement("div");
		alert.classList.add("alert", "alert--error");
		let par = document.createElement("p");
		par.textContent = "Vous devez entrer deux nombres valides.";
		alert.appendChild(par);
		alert_messages.innerHTML = "";
		alert_messages.appendChild(alert);
		return;
	}

	left_operand_el.classList.remove("error");
	right_operand_el.classList.remove("error");

	calc_form.submit();
}

function evenement_click_run() {
	let app = document.querySelector("#js-app");
	calc_run.setAttribute("hidden", "true");

	let form_el = document.createElement("form");
	form_el.id = "js-calc-form";
	form_el.method = "GET";

	app.appendChild(form_el);

	let select_el = document.createElement("select");

	let opt_add = document.createElement("option");
	opt_add.value = "addition";
	opt_add.textContent = "+";

	let opt_sub = document.createElement("option");
	opt_sub.value = "soustraction";
	opt_sub.textContent = "-";

	let opt_mul = document.createElement("option");
	opt_mul.value = "multiplication";
	opt_mul.textContent = "*";

	let opt_div = document.createElement("option");
	opt_div.value = "division";
	opt_div.textContent = "/";

	select_el.add(opt_add);
	select_el.add(opt_sub);
	select_el.add(opt_mul);
	select_el.add(opt_div);

	let left_input = document.createElement("input");
	left_input.setAttribute("name", "left_operand");
	left_input.type = "number";
	left_input.placeholder = "Opérand gauche";

	let right_input = document.createElement("input");
	right_input.setAttribute("name", "right_operand");
	right_input.type = "number";
	right_input.placeholder = "Opérand droit";

	let button_submit = document.createElement("button");
	button_submit.type = "submit";
	button_submit.textContent = "Calculer";

	form_el.appendChild(left_input);
	form_el.appendChild(select_el);
	form_el.appendChild(right_input);
	form_el.appendChild(button_submit);

	form_el.addEventListener("submit", (e) => {
		form_el.action = `${select_el.value}.php`;
		evenement_submit(e);
	});

	let alert_messages = document.createElement("div");
	alert_messages.id = "js-alert-message";
	alert_messages.className = "alert-message";
	app.appendChild(alert_messages);
}

let calc_form = document.querySelector("#js-calc-form");
if (calc_form) {
	calc_form.addEventListener("submit", evenement_submit);
}

let calc_run = document.querySelector("#js-calc-run");
if (calc_run) {
	calc_run.addEventListener("click", evenement_click_run);
}
