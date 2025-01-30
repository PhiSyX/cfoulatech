// @ts-nocheck

/**
 * NOTE(mike) : Les propriétés privées sont déclarées avec un # devant le nom
 *              des propriétés. C'est principalement pour utiliser
 *              l'encapsulation des données. Cela permet de protéger les données
 *              de la classe contre les modifications externes.
 */

class Book {
	/**
	 * Titre du livre.
	 */
	#title;

	/**
	 * ISBN du livre.
	 */
	#isbn;

	/**
	 * Auteur du livre.
	 */
	#author;

	/**
	 * Quantité de livres.
	 */
	#quantity;

	constructor(isbn, author, title, quantity = 1) {
		this.#isbn = isbn;
		this.#author = author;
		this.#title = title;
		this.#quantity = quantity;
	}

	/**
	 * Accès au titre du livre.
	 */
	getTitle() {
		return this.#title;
	}

	/**
	 * Accès à l'ISBN du livre.
	 */
	getIsbn() {
		return this.#isbn;
	}

	/**
	 * Accès au nombre de livres.
	 */
	getQuantity() {
		return this.#quantity;
	}

	/**
	 * Accès à l'auteur du livre.
	 */
	getAuthor() {
		return this.#author;
	}

	/**
	 * Vérifie si le livre a des quantités.
	 */
	hasQuantities() {
		return this.#quantity > 0;
	}

	/**
	 * Augmente la quantité de livres de 1.
	 */
	increaseQuantity(quantity = 1) {
		this.#quantity += quantity;
	}

	/**
	 * Diminue la quantité de livres de 1.
	 */
	decreaseQuantity(quantity = 1) {
		this.#quantity -= quantity;
	}
}

class Library {
	/**
	 * La liste des livres de la bibliothèque.
	 *
	 * @type {Array<Book>}
	 */
	#books = [];

	/**
	 * La liste des livres empruntés de la bibliothèque. Il s'agit d'un
	 * tableau contenant les ISBN empruntés des livres.
	 *
	 * NOTE(mike) : meilleure moyen de gérer les livres empruntés plutôt que de
	 *              vérifier la quantité de chaque livre.
	 *
	 * @type {Array<string>}
	 */
	#borrowedBooks = [];

	/**
	 * Ajoute un livre à la bibliothèque.
	 *
	 * NOTE(mike) : Dans le code d'Aïcha, son script a besoin d'avoir une
	 *              confirmation de l'ajout du livre pour le refléter dans le
	 *              DOM, je modifie donc le code pour retourner un booléen.
	 */
	addBook(book) {
		// NOTE(mike) : On n'ajoute pas le livre s'il existe déjà.
		//              En revanche, on augmente la quantité du livre.
		if (this.#hasBook(book.getIsbn())) {
			let existingBook = this.#findBook(book.getIsbn());
			existingBook.increaseQuantity(book.getQuantity());
			return false;
		}

		this.#books.push(book);

		return true;
	}

	/**
	 * Emprunte un livre de la bibliothèque.
	 *
	 * NOTE(mike) : Dans le code d'Aïcha, son script a besoin d'avoir une
	 *              confirmation d'empreint du livre pour le refléter dans le
	 *              DOM, je modifie donc le code pour retourner l'objet Book
	 *              ou null si inexistant.
	 */
	borrowBook(isbn) {
		const existingBook = this.#findBook(isbn);

		if (existingBook && existingBook.hasQuantities()) {
			existingBook.decreaseQuantity();

			this.#addBorrowedBook(existingBook.getIsbn());

			return existingBook;
		}

		return null;
	}

	/**
	 * Retourne un livre emprunté à la bibliothèque.
	 *
	 * NOTE(mike) : Dans le code d'Aïcha, son script a besoin d'avoir une
	 *              confirmation du retour du livre pour le refléter dans le
	 *              DOM, je modifie donc le code pour retourner l'objet Book
	 *              ou null si inexistant.
	 */
	returnBook(isbn) {
		const existingBook = this.#findBook(isbn);

		if (existingBook && this.#hasBorrowedBook(isbn)) {
			existingBook.increaseQuantity();

			this.#removeBorrowedBook(isbn);

			return existingBook;
		}

		return null;
	}

	/**
	 * Liste tous les livres de la bibliothèque.
	 */
	allBooks() {
		return this.#books;
	}

	/**
	 * Liste tous les livres disponibles dans la bibliothèque.
	 */
	availableBooks() {
		return this.#books.filter((book) => book.hasQuantities());
	}

	/**
	 * Liste tous les livres empruntés de la bibliothèque.
	 */
	allBorrowedBooks() {
		return this.#borrowedBooks.map((isbn) => this.#findBook(isbn));
	}

	/**
	 * Vérifie si un livre existe dans la bibliothèque.
	 *
	 * NOTE(mike) : Cette méthode est privée grâce au # devant le nom, elle
	 *              n'est pas accessible en dehors de la classe.
	 */
	#hasBook(isbn) {
		return this.#books.some((book) => book.getIsbn() === isbn);
	}

	/**
	 * Vérifie si un livre est emprunté.
	 *
	 * NOTE(mike) : Cette méthode est privée grâce au # devant le nom, elle
	 *              n'est pas accessible en dehors de la classe.
	 */
	#hasBorrowedBook(isbn) {
		return this.#borrowedBooks.some((bookIsbn) => bookIsbn === isbn);
	}

	/**
	 * Trouve un livre dans la bibliothèque.
	 *
	 * NOTE(mike) : Cette méthode est privée grâce au # devant le nom, elle
	 *              n'est pas accessible en dehors de la classe.
	 */
	#findBook(isbn) {
		return this.#books.find((book) => book.getIsbn() === isbn) || null;
	}

	/**
	 * Ajoute un livre emprunté dans la liste des livres empruntés
	 */
	#addBorrowedBook(isnb) {
		this.#borrowedBooks.push(isnb);
	}

	/**
	 * Supprime un livre emprunté de la liste des livres empruntés
	 */
	#removeBorrowedBook(isbn) {
		let borrowedBooks = [];
		let found = false;

		for (let bookIsbn of this.#borrowedBooks) {
			if (!found && bookIsbn === isbn) {
				found = true;
				continue;
			}

			borrowedBooks.push(bookIsbn);
		}

		this.#borrowedBooks = borrowedBooks;
	}
}
