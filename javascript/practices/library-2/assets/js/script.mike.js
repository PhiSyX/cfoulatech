// @ts-nocheck

const _ = { once: true };

class LibrarySystem {
	#library;
	#inuse = false;

	constructor() {
		this.#library = new Library();

		// Des EXEMPLES de livres
		this.#library.addBook(
			new Book("12345", "Ragnar", "The last kingdom", 2)
		);
		this.#library.addBook(new Book("90001", "Ragnar Lodbrok", "Vikings"));
	}

	/**
	 * Ajoute un événement de click à un élément HTML.
	 */
	register(id, callbacks) {
		document.querySelector(`${id}Button`).addEventListener("click", () => {
			if (this.#inuse) {
				return;
			}

			if (callbacks.onClick) {
				callbacks.onClick();
			}

			this.#inuse = true;

			let dialog = document.querySelector(`${id}Dialog`);
			if (!dialog) {
				return;
			}

			dialog.setAttribute("open", "open");
			document.querySelector("#result").textContent = "";

			let form = dialog.querySelector("form");
			if (form == null) {
				return;
			}

			let resetButton = form.querySelector('button[type="reset"]');

			if (resetButton != null) {
				resetButton.addEventListener("click", () => {
					dialog.removeAttribute("open");
					this.#inuse = false;
				}, _);
			}

			form.addEventListener("submit", (e) => {
				e.preventDefault();

				callbacks.onSubmit(form.elements);

				for (let formel of form.elements) {
					if (formel.nodeName === "INPUT") {
						formel.value = formel.getAttribute("value") || "";
					}
				}

				dialog.removeAttribute("open");

				this.#inuse = false;
			}, _);
		});

		return this;
	}

	/**
	 * Cette fonction est appelée lorsque le formulaire "Add the book now" est
	 * soumis.
	 */
	addBook(form) {
		addBookEvent(this.#library, form);
		this.listAllBooks();
	}

	/**
	 * Cette fonction est appelée lorsque bouton "Add a new book" est cliqué.
	 */
	addBookOnEnter() {
		let dialog = document.querySelector("#addBookDialog");

		let quantityInput = dialog.querySelector("#quantity1");
		let quantityOutput = dialog.querySelector("#quantity2");

		quantityOutput.value = quantityInput.value;

		quantityInput?.addEventListener("change", () => {
			quantityOutput.value = quantityInput.value;
		});
	}

	/**
	 * Cette fonction est appelée lorsque bouton "Borrow book(s) now" est
	 * cliqué.
	 */
	borrowBooks(form) {
		borrowBooksEvent(this.#library, form);
		this.listAllBooks();
	}

	/**
	 * Cette fonction est appelée lorsque bouton "Borrow a book" est cliqué.
	 */
	listBorrowedBooks() {
		let select = document.querySelector("select#isbn2");
		select.textContent = "";

		for (let book of this.#library.availableBooks()) {
			let opt = document.createElement("option");
			opt.value = book.getIsbn();
			opt.textContent = `${book.getTitle()} - ${book.getAuthor()}`;
			select?.appendChild(opt);
		}
	}

	/**
	 * Table des livres
	 */
	listAllBooks() {
		let books = this.#library.allBooks();

		let table = document.querySelector("#table-books");
		table.innerHTML = "";

		for (let book of books) {
			let tr = document.createElement("tr");

			let tdIsbn = document.createElement("td");
			tdIsbn.textContent = book.getIsbn();

			let tdAuthor = document.createElement("td");
			tdAuthor.textContent = book.getAuthor();

			let tdTitle = document.createElement("td");
			tdTitle.textContent = book.getTitle();

			let tdAvailable = document.createElement("td");
			if (book.hasQuantities()) {
				tdAvailable.textContent = `${book.getQuantity()} book(s)`;
			} else {
				tdAvailable.textContent = "No";
			}

			tr.appendChild(tdIsbn);
			tr.appendChild(tdAuthor);
			tr.appendChild(tdTitle);
			tr.appendChild(tdAvailable);

			table.appendChild(tr);
		}
	}

	/**
	 * Cette fonction est appelée lorsque bouton "Returns book(s) now" est
	 * cliqué.
	 */
	returnBooks(form) {
		returnBooksEvent(this.#library, form);
		this.listAllBooks();
	}

	/**
	 * Cette fonction est appelée lorsque bouton "Return a book" est cliqué.
	 */
	listReturnBooks() {
		let select = document.querySelector("select#isbn3");
		select.textContent = "";

		for (let book of this.#library.allBorrowedBooks()) {
			let opt = document.createElement("option");
			opt.value = book.getIsbn();
			opt.textContent = `${book.getTitle()} - ${book.getAuthor()}`;
			select?.appendChild(opt);
		}
	}
}

