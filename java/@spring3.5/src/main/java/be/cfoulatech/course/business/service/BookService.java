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
	private final BookRepository livreRepository;

	public Book create(Book book)
	{
		return livreRepository.save(book);
	}

	public Optional<Book> findById(UUID id)
	{
		return livreRepository.findById(id);
	}

	public List<Book> findAll()
	{
		return livreRepository.findAll();
	}

	public List<Book> searchTitle(String title)
	{
		return livreRepository.findByTitleContainingIgnoreCase(title);
	}

	public Optional<Book> findByIsbn(Long isbn)
	{
		return livreRepository.findByIsbn(isbn);
	}

	public List<Book> findByLang(String lang)
	{
		return livreRepository.findByLang(lang);
	}

	public List<Book> findVoliminousBooks(Integer min)
	{
		return livreRepository.findByTotalPagesGreaterThan(min);
	}

	public List<Book> findByLangAndTotalPages(String langue, Integer nbPagesMin)
	{
		return livreRepository.findByLangAndTotalPagesGreaterThan(langue, nbPagesMin);
	}

	public List<Book> findByAuthor(UUID authorId)
	{
		return livreRepository.findByAuthor_Id(authorId);
	}

	public List<Book> findByLibrary(UUID libraryId)
	{
		return livreRepository.findByLibrary_Id(libraryId);
	}

	public List<Book> findByCity(String city)
	{
		return livreRepository.findByLibrary_CityIgnoreCase(city);
	}
}
