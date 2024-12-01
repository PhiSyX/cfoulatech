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

let calc_form = document.querySelector("#js-calc-form");
if (calc_form) {
	calc_form.addEventListener("submit", evenement_submit);
}
