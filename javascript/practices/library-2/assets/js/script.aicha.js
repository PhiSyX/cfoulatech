// @ts-nocheck

/**
 * Affiche un message dans la section de résultat.
 */
function displayResult(message) {
	const resultSection = document.getElementById("result");

	const text = document.createElement("li");
	text.textContent = message;

	resultSection.appendChild(text);
}

/**
 * Affiche un message d'erreur dans la section de résultat.
 */
function displayError(message) {
	const resultSection = document.getElementById("result");

	const text = document.createElement("li");
	text.textContent = message;
	text.style.color = "red";

	resultSection.appendChild(text);
}

/**
 * Cette fonction est appelée lorsque bouton "Add a new book" est cliqué.
 *
 * NOTE(mike): le paramètre library est un objet de la classe Library qu'à crée
 *             Mona.
 *
 * NOTE(mike): le paramètre form est un objet contenant les éléments <input> du
 *             formulaire lié à l'ajout de livre. C'est grâce à cet objet qu'on
 *             va pouvoir récupérer les valeurs.
 *
 * NOTE(mike): Les messages d'erreurs et de succès sont directement mis dans
 *             cette fonction, plutôt que dans les méthodes de la classe
 *             Library.
 */
function addBookEvent(library, form) {
	const title = form.title.value;
	const isbn = form.isbn.value;
	const author = form.author.value;
	const quantity = Number(form.quantity.value);

	if (title && isbn && author) {
		if (library.addBook(new Book(isbn, author, title, quantity))) {
			displayResult(`The book "${title}" has been successfully added.`);
		} else {
			displayResult(
				`The book with ISBN "${isbn}" is already in the library, so we've added ${quantity} more unit(s).`
			);
		}
	} else {
		displayError("All fields are required to add a book.");
	}
}

/**
 * Cette fonction est appelée lorsque bouton "Borrow a book" est cliqué.
 *
 * NOTE(mike): le paramètre library est un objet de la classe Library qu'à crée
 *             Mona.
 *
 * NOTE(mike): le paramètre form est un objet contenant les éléments <input> du
 *             formulaire lié à l'empreint de livre. C'est grâce à cet objet
 *             qu'on va pouvoir récupérer les valeurs.
 *
 * NOTE(mike): Les messages d'erreurs et de succès sont directement mis dans
 *             cette fonction, plutôt que dans les méthodes de la classe
 *             Library.
 */
function borrowBooksEvent(library, form) {
	const isbns = [];

	for (let option of form.isbn.options) {
		if (option.selected) {
			isbns.push(option.value);
		}
	}

	if (isbns.length === 0) {
		displayError("At least one ISBN is required to borrow a book.");
		return;
	}

	for (let isbn of isbns) {
		const result = library.borrowBook(isbn);

		if (result === null) {
			displayError(
				`The book with ISBN "${isbn}" was not found in the library or is not available.`
			);
			return;
		}

		displayResult(`You have borrowed the book "${result.getTitle()}".`);
	}
}

/**
 * Cette fonction est appelée lorsque bouton "Return a book" est cliqué.
 *
 * NOTE(mike): le paramètre library est un objet de la classe Library qu'à crée
 *             Mona.
 *
 * NOTE(mike): le paramètre form est un objet contenant les éléments <input> du
 *             formulaire lié au retour de livre. C'est grâce à cet objet qu'on
 *             va pouvoir récupérer les valeurs.
 *
 * NOTE(mike): Les messages d'erreurs et de succès sont directement mis dans
 *             cette fonction, plutôt que dans les méthodes de la classe
 *             Library.
 */
function returnBooksEvent(library, form) {
	const isbns = [];

	for (let option of form.isbn.options) {
		if (option.selected) {
			isbns.push(option.value);
		}
	}

	if (isbns.length === 0) {
		displayError("At least one ISBN is required to return a book.");
		return;
	}

	for (let isbn of isbns) {
		const result = library.returnBook(isbn);

		if (result === null) {
			displayError(
				`The book with ISBN "${isbn}" was not found in the library.`
			);
			return;
		}

		displayResult(`You have returned the book "${result.getTitle()}".`);
	}
}
