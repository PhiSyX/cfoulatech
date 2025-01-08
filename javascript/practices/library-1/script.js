// @ts-check

class LibraryBook {
	#author;
	#title;
	#isbn;

	/**
	 * @param {string} author
	 * @param {string} title
	 * @param {string} isbn
	 */
	constructor(author, title, isbn) {
		this.#author = author;
		this.#title = title;
		this.#isbn = isbn;
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

class Library {
	/**
	 * @type {LibraryBook[]}
	 */
	#books = [];

	/**
	 * @type {LibraryBorrowedBook[]}
	 */
	#borrowedBooks = [];

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
		return this.#books.filter(
			(book) =>
				!this.#borrowedBooks.some(
					(bb) => bb.getIsbnBook() === book.getIsbn()
				)
		);
	}

	/**
	 * @param {string} isbn
	 * @param {LibraryMember} from
	 */
	borrowBook(isbn, from) {
		this.#borrowedBooks.push(new LibraryBorrowedBook(isbn, from.getId()));
	}

	/**
	 * @param {string} isbn
	 * @param {LibraryMember} from
	 */
	returnsBook(isbn, from) {
		this.#borrowedBooks = this.#borrowedBooks.filter(
			(bb) =>
				!(
					bb.getIsbnBook() === isbn &&
					bb.getMemberId() === from.getId()
				)
		);
	}
}

let library = new Library();

let mike = new LibraryMember("Mike", 1);

library.addMember(mike);

library.addBook(new LibraryBook("J.K. Rowling", "Harry Potter", "1234"));
library.addBook(new LibraryBook("J.R.R. Tolkien", "Lord of the Rings", "5678"));
library.addBook(
	new LibraryBook("George R.R. Martin", "Game of Thrones", "91011")
);

library.borrowBook("1234", mike);
library.borrowBook("91011", mike);


console.log(library.allBooks());
console.log(library.availableBooks());

library.returnsBook("1234", mike);
console.log(library.availableBooks());
