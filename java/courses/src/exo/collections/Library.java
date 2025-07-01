package exo.collections;

import java.util.*;

public class Library
{
	private final List<String> books = new ArrayList<>();
	private final Set<String> authors = new HashSet<>();
	private final Map<String, String> booksAuthors = new HashMap<>();

	public void addBook(String book)
	{
		books.add(book);
	}

	public void addBook(String book, String author)
	{
		booksAuthors.put(book, author);
	}

	public void addAuthor(String author)
	{
		authors.add(author);
	}

	public String getAuthor(String book)
	{
		return booksAuthors.get(book);
	}

	public List<String> getBooks()
	{
		return books;
	}

	public Set<String> getAuthors()
	{
		return authors;
	}
}

class LibraryTest
{
	public static void main(String[] args)
	{
		Library lib = new Library();
		lib.addBook("Java");
		lib.addBook("Python");
		lib.addBook("JavaScript");

		for (String book : lib.getBooks()) {
			System.out.println(book);
		}

		lib.addAuthor("Martin Fowler");
		lib.addAuthor("Joshua Bloch");
		lib.addAuthor("Martin Fowler");

		assert lib.getAuthors().size() == 2 : "Taille des auteurs doit être de 2";

		lib.addBook("Clean Code", "Robert C. Martin");
		lib.addBook("Effective Java", "Joshua Bloch");

		assert lib.getAuthor("Clean Code").equals("Robert C. Martin") : ":)";
	}
}
