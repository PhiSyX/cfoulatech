// @ts-check

class LibraryBook {
	#author;
	#title;
	#isbn;
	#quantity;

	/**
	 * @param {string} author
	 * @param {string} title
	 * @param {string} isbn
	 * @param {number} [quantity=1]
	 */
	constructor(author, title, isbn, quantity = 1) {
		this.#author = author;
		this.#title = title;
		this.#isbn = isbn;
		this.#quantity = quantity;
	}

	getTitle() {
		return this.#title;
	}

	getAuthor() {
		return this.#author;
	}

	getIsbn() {
		return this.#isbn;
	}

	getQuantity() {
		return this.#quantity;
	}

	increaseQuantity() {
		this.#quantity += 1;
	}

	decreaseQuantity() {
		this.#quantity -= 1;
	}
}

class Library {
	/**
	 * @type {LibraryBook[]}
	 */
	#books = [];

	/**
	 * @type {LibraryBorrowedBook[]}
	 */
	#borrowedBooksByMembers = [];

	/**
	 * @type {LibraryMember[]}
	 */
	#members = [];

	/**
	 * @param {LibraryMember} member
	 */
	addMember(member) {
		this.#members.push(member);
	}

	/**
	 * @param {LibraryBook} book
	 */
	addBook(book) {
		this.#books.push(book);
	}

	/**
	 * @param {string} isbn
	 */
	findBook(isbn) {
		return this.#books.find((book) => book.getIsbn() === isbn);
	}

	/**
	 * @param {string} title
	 */
	findBookByTitle(title) {
		return this.#books.find((book) => book.getTitle() === title);
	}

	allBooks() {
		return this.#books;
	}

	availableBooks() {
		return this.#books.filter((book) => book.getQuantity() > 0);
	}

	/**
	 * @param {string} isbn
	 * @param {LibraryMember} fromMember
	 */
	borrowBook(isbn, fromMember) {
		let book = this.findBook(isbn);

		if (book === undefined) {
			alert("Vous ne pouvez pas emprunter un livre inexistant");
			return;
		}

		if (book.getQuantity() === 0) {
			alert("Le livre n'est plus disponible");
			return;
		}

		book.decreaseQuantity();

		this.#borrowedBooksByMembers.push(
			new LibraryBorrowedBook(isbn, fromMember.getId())
		);
	}

	/**
	 * @param {string} isbn
	 * @param {LibraryMember} fromMember
	 */
	returnsBook(isbn, fromMember) {
		let book = this.findBook(isbn);

		if (book === undefined) {
			alert("Vous ne pouvez pas emprunter un livre inexistant");
			return;
		}

		let memberHasBorrowedBook = this.#borrowedBooksByMembers.some(
			(bb) =>
				bb.getIsbnBook() === isbn &&
				bb.getMemberId() === fromMember.getId()
		);

		if (memberHasBorrowedBook === false) {
			alert(
				"Vous ne pouvez pas rendre un livre que vous n'avez pas emprunté"
			);
			return;
		}

		book.increaseQuantity();

		this.#borrowedBooksByMembers = this.#borrowedBooksByMembers.filter(
			(bb) =>
				!(
					bb.getIsbnBook() === isbn &&
					bb.getMemberId() === fromMember.getId()
				)
		);
	}
}

class LibraryMember {
	/**
	 * @type {string}
	 */
	#name;
	/**
	 * @type {number}
	 */
	#id;
	/**
	 * @type {string[]}
	 */
	#borrowedBooks = [];

	/**
	 * @param {string} name
	 * @param {number} id
	 */
	constructor(name, id) {
		this.#name = name;
		this.#id = id;
	}

	getId() {
		return this.#id;
	}

	/**
	 * @param {string} isbn
	 */
	borrowBook(isbn) {
		this.#borrowedBooks.push(isbn);
	}
}

class LibraryBorrowedBook {
	/**
	 * @type {string}
	 */
	#bookIsbn;
	/**
	 * @type {number}
	 */
	#memberId;
	/**
	 * @type {Date}
	 */
	#borrowedAt;

	/**
	 * @param {string} bookId
	 * @param {number} memberId
	 */
	constructor(bookId, memberId) {
		this.#bookIsbn = bookId;
		this.#memberId = memberId;
		this.#borrowedAt = new Date();
	}

	getIsbnBook() {
		return this.#bookIsbn;
	}

	getMemberId() {
		return this.#memberId;
	}
}

let library = new Library();

let mike = new LibraryMember("Mike", 1);

library.addMember(mike);

/*
library.addBook(new LibraryBook("J.K. Rowling", "Harry Potter", "1234", 5));

library.addBook(
	new LibraryBook("J.R.R. Tolkien", "Lord of the Rings", "5678", 2)
);
library.addBook(
	new LibraryBook("George R.R. Martin", "Game of Thrones", "91011", 1)
);

library.borrowBook("1234", mike);
library.borrowBook("91011", mike);

console.log("Tous les livres", library.allBooks());
console.log("Disponibles #1", library.availableBooks());

library.returnsBook("91011", mike);
library.returnsBook("5678", mike);
console.log("Disponibles #2", library.availableBooks());
*/

function launchLibrarySystemEvent() {
	/**
	 * @type {HTMLDialogElement|null}
	 */
	let launchLibrarySystemDialog = document.querySelector(
		"#js-dialog-launch-libsys"
	);
	launchLibrarySystemDialog?.showModal();

	/** 1. Add Book */

	let addBookButton = document.querySelector("#js-btn-add-book");
	addBookButton?.addEventListener("click", () =>
		addBookEvent(launchLibrarySystemDialog)
	);

	/** 2. Borrow Book */

	let borrowBookButton = document.querySelector("#js-btn-borrow-book");
	borrowBookButton?.addEventListener("click", () =>
		borrowBookEvent(launchLibrarySystemDialog)
	);

	/** 3. Returns Book */

	let returnsBookButton = document.querySelector("#js-btn-returns-book");
	returnsBookButton?.addEventListener("click", () =>
		returnsBookEvent(launchLibrarySystemDialog)
	);

	/** 4. Exit */

	let exitButton = document.querySelector("#js-btn-exit");
	exitButton?.addEventListener("click", () => {
		launchLibrarySystemDialog?.close();
	});
}

/**
 * @param {HTMLDialogElement|null} launchLibrarySystemDialog
 * @param {HTMLDialogElement|null} currentDialog
 */
function dialogBehavior(launchLibrarySystemDialog, currentDialog) {
	launchLibrarySystemDialog?.close();

	currentDialog?.showModal();

	let closeButton = currentDialog?.querySelector("button[type='dialog']");

	closeButton?.addEventListener(
		"click",
		() => {
			launchLibrarySystemDialog?.showModal();

			let inputs = currentDialog?.querySelectorAll("input");
			inputs?.forEach((input) => {
				input.value = input.getAttribute("value") || "";
			});
			let selects = currentDialog?.querySelectorAll("select");
			selects?.forEach((select) => {
				for (let option of Array.from(select.selectedOptions)) {
					option.selected = false;
				}
			});
		},
		{ once: true }
	);
}

/**
 * @param {HTMLDialogElement|null} launchLibrarySystemDialog
 */
function addBookEvent(launchLibrarySystemDialog) {
	dialogBehavior(
		launchLibrarySystemDialog,
		document.querySelector("#js-dialog-add-book")
	);
}

/**
 * @param {HTMLDialogElement|null} launchLibrarySystemDialog
 */
function borrowBookEvent(launchLibrarySystemDialog) {
	dialogBehavior(
		launchLibrarySystemDialog,
		document.querySelector("#js-dialog-borrow-book")
	);
}

/**
 * @param {HTMLDialogElement|null} launchLibrarySystemDialog
 */
function returnsBookEvent(launchLibrarySystemDialog) {
	dialogBehavior(
		launchLibrarySystemDialog,
		document.querySelector("#js-dialog-returns-book")
	);
}

let launchLibrarySystemButton = document.querySelector("#js-libsys");
launchLibrarySystemButton?.addEventListener("click", launchLibrarySystemEvent);
