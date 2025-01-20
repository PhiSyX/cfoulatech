// @ts-nocheck

const ADD_ROOM_BUTTON_SELECTOR = "#add-room-btn";

const ROOM_FORM_SELECTOR        = "#room-form";
const SEARCH_ROOMS_FORM_SELECTOR = "#search-rooms-form";

const LIST_ROOMS_BUTTON_SELECTOR = "#list-all-rooms-btn";
const LIST_ROOMS_LIST_SELECTOR   = "#list-all-rooms";

const LIST_AVAILABLE_ROOMS_BUTTON_SELECTOR = "#list-available-rooms-btn";
const LIST_AVAILABLE_ROOMS_LIST_SELECTOR   = "#list-available-rooms";

const SEARCH_ROOMS_SELECTOR = "#search-rooms";

class HotelManagementSystem
{
	/**
	 * Cette propriété va contenir l'objet de classe Hotel
	 */
	#hotel;

	#formType;

	/**
	 * Construit un objet de type HotelManagementSystem
	 */
	constructor()
	{
		this.#hotel = new Hotel();

		/**
		 * Des exemples.
		 */
		let room1 = this.#hotel.addRoom(11, "single", 23.0);
		room1.setStatus(true);

		let room2 = this.#hotel.addRoom(12, "double", 123.0);
		room2.setStatus(false);
	}

	/**
	 * Enregistrement des événements généraux du DOM
	 */
	registerEvents()
	{
		this.#registerEventFormRoom();

		this.#registerEventListRooms({
			btnSelector: LIST_ROOMS_BUTTON_SELECTOR,
			listSelector: LIST_ROOMS_LIST_SELECTOR,
			rooms: "all",
		});

		this.#registerEventListRooms({
			btnSelector: LIST_AVAILABLE_ROOMS_BUTTON_SELECTOR,
			listSelector: LIST_AVAILABLE_ROOMS_LIST_SELECTOR,
			rooms: "available",
		});

		this.#registerEventFormSearchRoom();
	}

	#registerEventFormRoom()
	{
		let buttonElement = document.querySelector(ADD_ROOM_BUTTON_SELECTOR);
		let formElement   = document.querySelector(ROOM_FORM_SELECTOR);

		let rooms = [];

		const onClickAction = (event) => {
			this.#formType = "add";

			this.#createForm({
				number: "",
				type: "",
				price: "",
			});

			// this.#hotel.listAllRooms(); retourne une liste d'objet de la classe Room
			// par ex: [Room, Room, Room]
			rooms = this.#hotel.listAllRooms()
				// en utilisant .map, cela va parcourir toutes les rooms
				.map(
					// et je dis que pour chaque Room, je veux recevoir uniquement
					// les numéro de chambres via la méthode room.getNumber();
					(room) => room.getNumber()
				);
			// Maintenant la variable `rooms`, équivaudra à un tableau de
			// numéros des chambres, par ex: [1, 2, 3].

			this.#showPage(formElement);
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

			let numberRoom = checkValidityInput(event.target.elements.number, {
				number:     "positive",
				isInList:    this.#formType === "edit" ? [Number(formElement.getAttribute("data-id"))] : [],
				isNotInList: this.#formType === "add"  ? rooms : [],
			});
			let priceRoom  = checkValidityInput(event.target.elements.price, {
				number: "positive",
			});
			let typeRoom   = checkValidityInput(event.target.elements.type, {
				isInList:    this.#formType === "add"  ? this.#hotel.getAllRoomTypes() : [],
				isNotInList: this.#formType === "edit" ? this.#hotel.getAllRoomTypes() : [],
				unchecked:   this.#formType === "edit",
			});

			if (!numberRoom || !priceRoom || !typeRoom) {
				return;
			}

			// Appel de la méthode addRoom/modifyRoom de la classe Hotel,
			// qu'à crée Carina
			let room;

			if (this.#formType === "add") {
				room = this.#hotel.addRoom(
					numberRoom.consume(),
					typeRoom.consume(),
					priceRoom.consume(),
				);
			} else {
				room = this.#hotel.modifyRoom(
					numberRoom.consume(),
					typeRoom.consume(),
					priceRoom.consume(),
				);
			}

			if (!room) {
				return;
			}

			alert(`[Succès]: La chambre n°${room.getNumber()} a bien été sauvegardé.`);

			this.#closePage(formElement);
		};

		// Lorsqu'on appuie sur le click, la fonction ci-dessus `onClickAction`
		// va être appelée.
		buttonElement.addEventListener("click", onClickAction);

		// Lorsqu'on appuie sur le bouton de soumission du formulaire la
		// fonction ci-dessus `onSubmitAction` va être appelée.
		formElement.addEventListener("submit", onSubmitAction)
	}

	#registerEventFormSearchRoom()
	{
		let formElement   = document.querySelector(SEARCH_ROOMS_FORM_SELECTOR);
		let listElement   = document.querySelector(SEARCH_ROOMS_SELECTOR);
		let listElementUL = listElement.querySelector("ul");
		let selectElement = formElement.querySelector("#type1");
		let statusElement = formElement.querySelector("#status1");

		let roomsTypes = this.#hotel.getAllRoomTypes();

		let defaultTypeOption = document.createElement("option");
		defaultTypeOption.textContent = "Select type";
		defaultTypeOption.value       = "";
		defaultTypeOption.selected    = true;
		defaultTypeOption.disabled    = true;
		selectElement.append(defaultTypeOption);

		for (let roomType of roomsTypes) {
			let option = document.createElement("option");
			option.textContent = capitalize(roomType);
			option.value = roomType;
			selectElement.append(option);
		}

		const onSubmitAction = (event) => {
			event.preventDefault();

			let roomType = checkValidityInput(event.target.elements.type, {
				isInList: roomsTypes,
			});

			let maxPrice = checkValidityInput(event.target.elements.max_price, {
				number: "positive",
			});

			let status = checkValidityInput(event.target.elements.status);

			if (!roomType || !maxPrice) {
				return;
			}

			let rooms = this.#hotel.searchRooms(
				roomType.value,
				maxPrice.value,
				status.value,
			);
			listElementUL.textContent = "";
			for (let room of rooms) {
				listElementUL.append(makeRoomItemDOM(room));
			}

			this.#showPage(listElement);

			if (rooms.length === 0) {
				error("No rooms were found according to your filters.");
			}
		};

		/**
		 * Crée un élément de liste (<li>) correspondant aux informations d'une chambre.
		 */
		const makeRoomItemDOM = (room) => {
			let li = document.createElement("li");
			li.classList.add("list-group-item");

			let div = document.createElement("div");
			div.classList.add("row", "align-items-center");

			{
				let divNumber = document.createElement("div");
				divNumber.classList.add("col-md-2");
				divNumber.textContent = `Number: ${room.getNumber()}`;

				let divPrice = document.createElement("div");
				divPrice.classList.add("col-md-2");
				divPrice.textContent = `Price: ${room.getPrice()}€`;

				let divType = document.createElement("div");
				divType.classList.add("col-md-2");
				divType.textContent = `Type: ${room.getType()}`;

				let divStatus = document.createElement("div");
				divStatus.classList.add("col-md-2");
				divStatus.textContent = "Status: ";
				if (room.getStatus()) {
					divStatus.textContent += "Free";
				} else {
					divStatus.textContent += "Booked";
				}

				let divActions = document.createElement("div");
				divActions.classList.add("col-md-4", "d-inline-flex", "gap-1", "justify-content-end");
				{
					let btnModify = document.createElement("button");
					btnModify.classList.add("btn", "btn-secondary");
					btnModify.textContent = "Modify";
					this.#registerEventEditRoom(room, btnModify);

					let btnFreeBook = document.createElement("button");
					btnFreeBook.classList.add("btn", "btn-secondary");
					if (room.getStatus()) {
						btnFreeBook.textContent = "Book";
					} else {
						btnFreeBook.textContent = "Free";
					}
					this.#registerEventForFreeBookRoom(
						room,
						true,
						btnFreeBook,
						divStatus
					);

					let btnDelete = document.createElement("button");
					btnDelete.classList.add("btn", "btn-danger");
					btnDelete.textContent = "Delete";
					this.#registerEventForDeleteRoom(room, btnDelete, li);

					divActions.append(btnModify, btnFreeBook, btnDelete);
				}

				div.append(divNumber, divPrice, divType, divStatus, divActions);
			}

			li.append(div);

			return li;
		};

		// Lorsqu'on appuie sur le bouton de soumission du formulaire la
		// fonction ci-dessus `onSubmitAction` va être appelée.
		formElement.addEventListener("submit", onSubmitAction);

		const onClickCheckboxAction = (event) => {
			// On dégage le filtre du status
			statusElement.indeterminate = event.altKey;
		};

		// Lorsqu'on maintient ALT (ou option) et que l'on click sur l'input
		// de type checkbox, la fonction `onClickCheckboxAction` est appelée.
		statusElement.addEventListener("click", onClickCheckboxAction);
	}

	#registerEventListRooms(opt)
	{
		let buttonElement = document.querySelector(opt.btnSelector);
		let listElement   = document.querySelector(opt.listSelector);
		let listElementUL = listElement.querySelector("ul");

		const onClickAction = (event) => {
			let rooms = opt.rooms === "all"
				? this.#hotel.listAllRooms()
				: this.#hotel.listAvailableRooms();

			listElementUL.textContent = "";

			for (let room of rooms) {
				listElementUL.append(makeRoomItemDOM(room));
			}

			this.#showPage(listElement);
		};

		/**
		 * Crée un élément de liste (<li>) correspondant aux informations d'une chambre.
		 */
		const makeRoomItemDOM = (room) => {
			let li = document.createElement("li");
			li.classList.add("list-group-item");

			let div = document.createElement("div");
			div.classList.add("row", "align-items-center");

			{
				let divNumber = document.createElement("div");
				divNumber.classList.add("col-md-2");
				divNumber.textContent = `Number: ${room.getNumber()}`;

				let divPrice = document.createElement("div");
				divPrice.classList.add("col-md-2");
				divPrice.textContent = `Price: ${room.getPrice()}€`;

				let divType = document.createElement("div");
				divType.classList.add("col-md-2");
				divType.textContent = `Type: ${room.getType()}`;

				let divStatus = document.createElement("div");
				divStatus.classList.add("col-md-2");
				divStatus.textContent = "Status: ";
				if (room.getStatus()) {
					divStatus.textContent += "Free";
				} else {
					divStatus.textContent += "Booked";
				}

				let divActions = document.createElement("div");
				divActions.classList.add("col-md-4", "d-inline-flex", "gap-1", "justify-content-end");
				{
					let btnModify = document.createElement("button");
					btnModify.classList.add("btn", "btn-secondary");
					btnModify.textContent = "Modify";
					this.#registerEventEditRoom(room, btnModify);

					let btnFreeBook = document.createElement("button");
					btnFreeBook.classList.add("btn", "btn-secondary");
					if (room.getStatus()) {
						btnFreeBook.textContent = "Book";
					} else {
						btnFreeBook.textContent = "Free";
					}
					this.#registerEventForFreeBookRoom(
						room,
						opt.rooms === "available",
						btnFreeBook,
						divStatus
					);

					let btnDelete = document.createElement("button");
					btnDelete.classList.add("btn", "btn-danger");
					btnDelete.textContent = "Delete";
					this.#registerEventForDeleteRoom(room, btnDelete, li);

					divActions.append(btnModify, btnFreeBook, btnDelete);
				}

				div.append(divNumber, divPrice, divType, divStatus, divActions);
			}

			li.append(div);

			return li;
		};

		// Lorsqu'on appuie sur le click, la fonction ci-dessus `onClickAction`
		// va être appelée.
		buttonElement.addEventListener("click", onClickAction);
	}

	#registerEventEditRoom(room, btnElement) {
		// Crée le formulaire d'édition.
		const onClickAction = (event) => {
			let formElement   = document.querySelector(ROOM_FORM_SELECTOR);

			this.#formType = "edit";

			this.#createForm({
				id: room.getNumber(),
				number: room.getNumber(),
				type: room.getType(),
				price: room.getUnitPrice(),
			});

			this.#showPage(formElement);
		};

		// Lorsqu'on appuie sur le click, la fonction ci-dessus `onClickAction`
		// va être appelée.
		btnElement.addEventListener("click", onClickAction);
	}

	// TODO: créer un formulaire avec :
	//
	// 			1. Nom de la personne qui réserve/rend
	// 			2. le nombre de nuits
	#registerEventForFreeBookRoom(room, removeItemWhenBooked, btnElement, rootElement) {
		// Change le texte des éléments du DOM en fonction du status de
		// disponibilité la chambre.
		const onClickAction = (event) => {
			if (room.getStatus()) {
				if (this.#hotel.bookRoom(room.getNumber())) {
					rootElement.textContent = "Status: Booked";
					btnElement.textContent = "Free";
					if (removeItemWhenBooked) {
						rootElement.parentElement.parentElement.remove();
					}
				}
			} else {
				if (this.#hotel.freeRoom(room.getNumber())) {
					rootElement.textContent = "Status: Free";
					btnElement.textContent = "Book";
				}
			}
		};

		// Lorsqu'on appuie sur le click, la fonction ci-dessus `onClickAction`
		// va être appelée.
		btnElement.addEventListener("click", onClickAction);
	}

	#registerEventForDeleteRoom(room, btnElement, rootElement) {
		// Supprime la ligne de la chambre dans la liste des chambres dans le DOM.
		const onClickAction = (event) => {
			this.#hotel.deleteRoom(room.getNumber());
			rootElement.remove();
		};

		// Lorsqu'on appuie sur le click, la fonction ci-dessus `onClickAction`
		// va être appelée.
		btnElement.addEventListener("click", onClickAction);
	}

	#createForm(values) {
		let formElement = document.querySelector(ROOM_FORM_SELECTOR);
		if (values.id) {
			formElement.setAttribute("data-id", values.id);
		} else {
			formElement.removeAttribute("data-id");
		}

		let titleElement = formElement.querySelector("#term");
		titleElement.textContent = this.#formType === "add" ? "Add" : `Edit n°${values.number}`;

		let numberInput = formElement.querySelector("#number2");
		numberInput.classList.remove("border", "border-danger");
		numberInput.value = values.number;
		numberInput.nextElementSibling.textContent = "";
		if (values.id) {
			numberInput.parentElement.setAttribute("hidden", "hidden");
		} else {
			numberInput.parentElement.removeAttribute("hidden");
		}

		let typeElement = formElement.querySelector("#type2");
		typeElement.classList.remove("border", "border-danger");
		typeElement.textContent = "";
		typeElement.nextElementSibling.textContent = "";

		let defaultTypeOption = document.createElement("option");
		defaultTypeOption.textContent = "Select type";
		defaultTypeOption.value       = "";
		defaultTypeOption.selected    = true;
		defaultTypeOption.disabled    = true;

		typeElement.append(defaultTypeOption);

		for (let roomType of this.#hotel.getAllRoomTypes()) {
			let option = document.createElement("option");
			option.textContent = capitalize(roomType);
			option.value = roomType;
			typeElement.append(option);
		}

		typeElement.value = values.type;

		let priceElement = formElement.querySelector("#price2");
		priceElement.value = values.price;
		priceElement.classList.remove("border", "border-danger");
		priceElement.nextElementSibling.textContent = "";
	}

	#closePage(currentPage)
	{
		let pages = document.querySelectorAll([
			ROOM_FORM_SELECTOR,
			LIST_ROOMS_LIST_SELECTOR,
			LIST_AVAILABLE_ROOMS_LIST_SELECTOR,
			SEARCH_ROOMS_SELECTOR,
		]);

		for (let page of pages) {
			page.setAttribute("hidden", "hidden");
		}

		currentPage.setAttribute("hidden", "hidden");
	}

	#showPage(currentPage)
	{
		let pages = document.querySelectorAll([
			ROOM_FORM_SELECTOR,
			LIST_ROOMS_LIST_SELECTOR,
			LIST_AVAILABLE_ROOMS_LIST_SELECTOR,
			SEARCH_ROOMS_SELECTOR
		]);

		for (let page of pages) {
			page.setAttribute("hidden", "hidden");
		}

		currentPage.removeAttribute("hidden");

		error("");
	}
}

/**
 * Validation des `<input />`
 */
function checkValidityInput(input, ruleOption = {})
{
	let value   = input.value;
	let pass    = true;
	let helpmsg = "";

	if (input.type === "checkbox") {
		value = input.checked;

		if (input.indeterminate) {
			value = null;
		}
	}

	if (ruleOption.number) {
		switch (ruleOption.number) {
			case "positive":
			{
				value = input.valueAsNumber;
				pass  = ! Number.isNaN(value) && value > 0;

				helpmsg = `
					The value of the “${input.name}“ field doesn't have a positive number.
				`;
			} break;
		}
	}

	if (ruleOption.isInList && ruleOption.isInList.length > 0) {
		pass    = ruleOption.isInList.includes(value);
		helpmsg = `
			The value of the “${input.name}“ field is not included in the following predefined list :
			${ruleOption.isInList}
		`;
	}

	if (
		ruleOption.isNotInList &&
		ruleOption.isNotInList.length > 0 &&
		ruleOption.isNotInList.includes(value)
	) {
		pass    = false;
		helpmsg = `
			The value of the “${input.name}“ field is already included in the following list :
			${ruleOption.isNotInList}
		`;
	}

	if (ruleOption.inRange) {
		let lft = ruleOption.inRange[0];
		let rgt = ruleOption.inRange[1];

		value   = input.valueAsNumber;
		pass    = !Number.isNaN(value) && (value >= lft && value <= rgt);
		helpmsg = `
			The value of the “${input.name}“ field is NOT BETWEEN ${lft} AND ${rgt}
		`;
	}

	if (pass === false) {
		if (!ruleOption.unchecked) {
			inputError(input, helpmsg);
			return false;
		}
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

function capitalize(s) {
	return s[0].toUpperCase() + s.slice(1);
}
