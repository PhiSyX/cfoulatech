// @ts-nocheck

const ADD_ROOM_BUTTON_SELECTOR = "#add-room-btn";
const ADD_ROOM_FORM_SELECTOR   = "#add-room-form";

const LIST_ROOMS_BUTTON_SELECTOR = "#list-all-rooms-btn";
const LIST_ROOMS_LIST_SELECTOR = "#list-all-rooms";

const LIST_AVAILABLE_ROOMS_BUTTON_SELECTOR = "#list-available-rooms-btn";
const LIST_AVAILABLE_ROOMS_LIST_SELECTOR = "#list-available-rooms";

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
		let room1 = this.#hotel.addRoom(11, 200.0, "single");
		let room2 = this.#hotel.addRoom(12, 200.0, "double");
		room1.setStatus(false);
	}

	/**
	 * Enregistrement des événements généraux du DOM
	 */
	registerEvents()
	{
		this.#registerEventForAddRoom();

		this.#registerEventForListRooms({
			btnSelector: LIST_ROOMS_BUTTON_SELECTOR,
			listSelector: LIST_ROOMS_LIST_SELECTOR,
			rooms: "all",
		});

		this.#registerEventForListRooms({
			btnSelector: LIST_AVAILABLE_ROOMS_BUTTON_SELECTOR,
			listSelector: LIST_AVAILABLE_ROOMS_LIST_SELECTOR,
			rooms: "available",
		});
	}

	#registerEventForAddRoom()
	{
		let buttonElement = document.querySelector(ADD_ROOM_BUTTON_SELECTOR);
		let formElement   = document.querySelector(ADD_ROOM_FORM_SELECTOR);

		let rooms = [];

		const onClickAction = (event) => {
			rooms = this.#hotel.listAllRooms().map((room) => room.getNumber());
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

			let numberRoom  = checkValidityInput(event.target.elements.number, {
				number: "positive",
				isNotInList: rooms,
			});
			let priceRoom   = checkValidityInput(event.target.elements.price, {
				number: "positive",
			});
			let typeRoom    = checkValidityInput(event.target.elements.type, {
				isInList: this.#hotel.getAllRoomTypes(),
			});

			if (!numberRoom || !priceRoom || !typeRoom) {
				return;
			}

			// Appel de la méthode addRoom de la classe Hotel, qu'à crée Carina
			let room = this.#hotel.addRoom(
				numberRoom.consume(),
				priceRoom.consume(),
				typeRoom.consume(),
			);

			if (!room) {
				alert(`[Erreur]: La chambre n°${room.getNumber()} existe déjà.`);
				return;
			}

			alert(`[Succès]: La chambre n°${room.getNumber()} a bien été crée.`);

			this.#closePage(formElement);
		};

		// Lorsqu'on appuie sur le click, la fonction ci-dessus `onClickAction`
		// va être appelée.
		buttonElement.addEventListener("click", onClickAction);

		// Lorsqu'on appuie sur le bouton de soumission du formulaire
		// la fonction ci-dessus `onSubmitAction` va être appelée.
		formElement.addEventListener("submit", onSubmitAction)
	}

	#registerEventForListRooms(opt)
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
		 *
		 * @param {Room} room
		 */
		const makeRoomItemDOM = (room) => {
			let li = document.createElement("li");
			li.classList.add("list-group-item");

			let div = document.createElement("div");
			div.classList.add("row", "align-items-center");

			{
				let divNumber = document.createElement("div");
				divNumber.classList.add("col-md-2");
				divNumber.textContent = `Room Number: ${room.getNumber()}`;

				let divPrice = document.createElement("div");
				divPrice.classList.add("col-md-2");
				divPrice.textContent = `Room Price: ${room.getPrice()}€`;

				let divStatus = document.createElement("div");
				divStatus.classList.add("col-md-2");
				divStatus.textContent = "Room Status: ";
				if (room.getStatus()) {
					divStatus.textContent += "Free";
				} else {
					divStatus.textContent += "Booked";
				}

				let divActions = document.createElement("div");
				divActions.classList.add("col-md-6", "d-inline-flex", "gap-1", "justify-content-end");
				{
					let btnModify = document.createElement("button");
					btnModify.classList.add("btn", "btn-secondary");
					btnModify.textContent = "Modify";
					this.#registerEventForModifyRoom(room, btnModify);

					let btnFreeBook = document.createElement("button");
					btnFreeBook.classList.add("btn", "btn-secondary");
					if (room.getStatus()) {
						btnFreeBook.textContent = "Book";
					} else {
						btnFreeBook.textContent = "Free";
					}
					this.#registerEventForFreeBookRoom(room, btnFreeBook);

					let btnDelete = document.createElement("button");
					btnDelete.classList.add("btn", "btn-danger");
					btnDelete.textContent = "Delete";
					this.#registerEventForDeleteRoom(room, btnDelete);

					divActions.append(btnModify, btnFreeBook, btnDelete);
				}

				div.append(divNumber, divPrice, divStatus, divActions);
			}

			li.append(div);

			return li;
		};


		// Lorsqu'on appuie sur le click, la fonction ci-dessus `onClickAction`
		// va être appelée.
		buttonElement.addEventListener("click", onClickAction);
	}

	#registerEventForModifyRoom(room, btnElement) {
		const onModifyAction = (event) => {};
		btnElement.addEventListener("click", onModifyAction);
	}

	#registerEventForFreeBookRoom(room, btnElement) {
		const onFreeBookAction = (event) => {};
		btnElement.addEventListener("click", onFreeBookAction);
	}

	#registerEventForDeleteRoom(room, btnElement) {
		const onDeleteAction = (event) => {};
		btnElement.addEventListener("click", onDeleteAction);
	};

	#closePage(currentPage)
	{
		let pages = document.querySelectorAll([
			ADD_ROOM_FORM_SELECTOR,
			LIST_ROOMS_LIST_SELECTOR,
			LIST_AVAILABLE_ROOMS_LIST_SELECTOR
		]);

		for (let page of pages) {
			page.setAttribute("hidden", "hidden");
		}

		currentPage.setAttribute("hidden", "hidden");
	}

	#showPage(currentPage)
	{
		let pages = document.querySelectorAll([
			ADD_ROOM_FORM_SELECTOR,
			LIST_ROOMS_LIST_SELECTOR,
			LIST_AVAILABLE_ROOMS_LIST_SELECTOR
		]);

		for (let page of pages) {
			page.setAttribute("hidden", "hidden");
		}

		currentPage.removeAttribute("hidden");
	}
}

/**
 * Validation des `<input />`
 */
function checkValidityInput(input, ruleOption)
{
	let value   = input.value;
	let pass    = true;
	let helpmsg = "";

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

	if (ruleOption.isInList) {
		pass    = ruleOption.isInList.length > 0 && ruleOption.isInList.includes(value);
		helpmsg = `
			The value of the “${input.name}“ field is not included in the following predefined list :
			${ruleOption.isInList}
		`;
	}

	if (ruleOption.isNotInList && ruleOption.isNotInList.includes(value)) {
		pass    = false;
		helpmsg = `
			The value of the “${input.name}“ field is already included in the following list :
			${ruleOption.isNotInList}
		`;
	}

	if (ruleOption.inRange) {
		let lft = ruleOption.inRange[0];
		let rgt = ruleOption.inRange[1];

		value = input.valueAsNumber;
		pass  = !Number.isNaN(value) && (value >= lft && value <= rgt);
			helpmsg = `
				The value of the “${input.name}“ field is NOT BETWEEN ${lft} AND ${rgt}
			`;
	}

	if (pass === false) {
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
