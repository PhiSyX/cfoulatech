// @ts-nocheck

const librarySystem = new LibrarySystem();

librarySystem
	.register("#addBook", {
		onClick: () => librarySystem.addBookOnEnter(),
		onSubmit: (form) => librarySystem.addBook(form),
	})
	.register("#borrowBook", {
		onClick: () => librarySystem.listBorrowedBooks(),
		onSubmit: (form) => librarySystem.borrowBooks(form),
	})
	.register("#returnBook", {
		onClick: () => librarySystem.listReturnBooks(),
		onSubmit: (form) => librarySystem.returnBooks(form),
	});

librarySystem.listAllBooks();
