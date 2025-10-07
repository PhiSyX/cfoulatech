package be.cfoulatech.course.business.service;

import be.cfoulatech.course.data_access.repository.BookRepository;
import be.cfoulatech.course.domain.entity.Book;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class BookService
{
	private final BookRepository bookRepository;

	public Book create(Book book)
	{
		return bookRepository.save(book);
	}

	public Optional<Book> findById(UUID id)
	{
		return bookRepository.findById(id);
	}

	public List<Book> findAll()
	{
		return bookRepository.findAll();
	}

	public List<Book> searchTitle(String title)
	{
		return bookRepository.findByTitleContainingIgnoreCase(title);
	}

	public Optional<Book> findByIsbn(Long isbn)
	{
		return bookRepository.findByIsbn(isbn);
	}

	public List<Book> findByLang(String lang)
	{
		return bookRepository.findByLang(lang);
	}

	public List<Book> findVoliminousBooks(Integer min)
	{
		return bookRepository.findByTotalPagesGreaterThan(min);
	}

	public List<Book> findByLangAndTotalPages(String langue, Integer nbPagesMin)
	{
		return bookRepository.findByLangAndTotalPagesGreaterThan(langue, nbPagesMin);
	}

	public List<Book> findByAuthor(UUID authorId)
	{
		return bookRepository.findByAuthor_Id(authorId);
	}

	public List<Book> findByLibrary(UUID libraryId)
	{
		return bookRepository.findByLibrary_Id(libraryId);
	}

	public List<Book> findByCity(String city)
	{
		return bookRepository.findByLibrary_CityIgnoreCase(city);
	}
}
