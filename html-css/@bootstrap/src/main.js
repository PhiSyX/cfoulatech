import "./styles.scss";
import * as bootstrap from "bootstrap";

(() => {
	/**
	 * @type {NodeListOf<HTMLFormElement>}
	 */
	const formsList = document.querySelectorAll(".needs-validation");
	const forms = Array.from(formsList);
	for (let form of forms) {
		form.addEventListener(
			"submit",
			(event) => {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				}
				form.classList.add("was-validated");
			},
			false
		);

		form.addEventListener("reset", () => {
			form.classList.remove("was-validated");
		});
	}
})();
