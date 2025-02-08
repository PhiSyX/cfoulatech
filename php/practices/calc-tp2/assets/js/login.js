let login_form = document.querySelector("#js-login-form");
let alert_messages = document.querySelector("#js-alert-message");

login_form.addEventListener("submit", (e) => {
	e.preventDefault();

	let login_el = login_form.firstElementChild.nextElementSibling;
	let login_value = login_el.value;

	let pass_el = login_el.nextElementSibling.nextElementSibling;
	let pass_value = pass_el.value;

	if (login_value === "") {
		login_form.classList.add("error");
		login_el.classList.add("error");
	} else {
		login_el.classList.remove("error");
	}

	if (pass_value === "") {
		login_form.classList.add("error");
		pass_el.classList.add("error");
	} else {
		pass_el.classList.remove("error");
	}

	if (login_value === "" || pass_value === "") {
		let alert = document.createElement("div");
		alert.classList.add("alert", "alert--error");
		let par = document.createElement("p");
		par.textContent = "Les champs ne doivent pas être vides.";
		alert.appendChild(par);
		// NOTE: efface tout le contenu
		alert_messages.innerHTML = "";
		alert_messages.appendChild(alert);
		return;
	}

	login_el.classList.remove("error");
	pass_el.classList.remove("error");

	login_form.submit();
});
