// @ts-nocheck

const ADD_ROOM_BUTTON_SELECTOR = "#add-room-btn";
const ADD_ROOM_FORM_SELECTOR   = "#add-room-form";

class HotelManagementSystem
{
	/**
	 * Cette propriété va contenir l'objet de classe Hotel
	 */
	#hotel;

	/**
	 * Construit un objet de type HotelManagementSystem
	 */
	constructor()
	{
		this.#hotel = new Hotel();
	}

	/**
	 * Enregistrement des événements généraux du DOM
	 */
	registerEvents()
	{
		this.#registerEventForAddRoom();
	}

	#registerEventForAddRoom()
	{
		let buttonElement = document.querySelector(ADD_ROOM_BUTTON_SELECTOR);
		let formElement   = document.querySelector(ADD_ROOM_FORM_SELECTOR);

		const onClickAction = (event) => {
			formElement.removeAttribute("hidden");
		};

		const onSubmitAction = (event) => {
			// Désactive le comportement par défaut de la soumission du formulaire
			event.preventDefault();

			/*
			console.log("Formulaire", event.target);

			console.log(
				"Les éléments <input> associés du formulaire",
				event.target.elements,
			);
			*/

			let numberRoom  = checkValidityInput(event.target.elements.number, "positive-number");
			let priceRoom   = checkValidityInput(event.target.elements.price,  "positive-number");
			let typeRoom    = checkValidityInput(event.target.elements.type,   "in-list",  ["single", "double"]);

			if (!numberRoom || !priceRoom || !typeRoom) {
				return;
			}

			// Appel de la méthode addRoom de la classe Hotel, qu'à crée Carina
			let room = this.#hotel.addRoom({
				number: numberRoom.consume(),
				price: priceRoom.consume(),
				type: typeRoom.consume(),
			});

			formElement.setAttribute("hidden", "hidden")
		};

		// Lorsqu'on appuie sur le click, la fonction ci-dessus `onClickAction`
		// va être appelée.
		buttonElement.addEventListener("click", onClickAction);

		// Lorsqu'on appuie sur le bouton de soumission du formulaire
		// la fonction ci-dessus `onSubmitAction` va être appelée.
		formElement.addEventListener("submit", onSubmitAction)
	}
}

/**
 * Validation des `<input />`
 */
function checkValidityInput(input, rule, data = [])
{
	let value   = input.value;
	let pass    = true;
	let helpmsg = "";

	switch (rule) {
		case "positive-number":
		{
			value   = input.valueAsNumber;
			pass    = ! Number.isNaN(value) && value > 0;
			helpmsg = `
				The value of the “${input.name}“ field doesn't have a positive number.
			`;
		} break;

		case "in-list":
		{
			pass    = data.includes(value);
			helpmsg = `
				The value of the “${input.name}“ field is not included in the following predefined list :
				${data}
			`;
		} break;

		case "in-range":
		{
			let lft = data[0];
			let rgt = data[1];

			value = input.valueAsNumber;
			pass  = !Number.isNaN(value) && (value >= lft && value <= rgt);
		} break;
	}


	if (pass === false)
	{
		inputError(input, helpmsg);
		return false;
	}

	inputError(input, "");

	return {
		value,
		/**
		 * Cette méthode efface la valeur de l'<input> et renvoie sa valeur
		 */
		consume() {
			input.value = "";
			return value;
		}
	};
};

function error(msg, element = document.querySelector("#error-msg"))
{
	if (msg.length === 0) {
		element.setAttribute("hidden", "hidden");
	} else {
		element.removeAttribute("hidden");
	}
	element.textContent = msg;
}

function inputError(input, msg)
{
	if (msg.length === 0) {
		input.classList.remove("border", "border-danger");
	} else {
		input.classList.add("border", "border-danger");
	}

	error(msg, input.nextElementSibling);
}
