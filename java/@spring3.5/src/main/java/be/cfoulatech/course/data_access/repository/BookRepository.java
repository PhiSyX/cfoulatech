package be.cfoulatech.course.data_access.repository;

import be.cfoulatech.course.domain.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BookRepository extends JpaRepository<Book, UUID>
{
	List<Book> findByTitleContainingIgnoreCase(String title);

	Optional<Book> findByIsbn(Long isbn);

	List<Book> findByLang(String lang);

	List<Book> findByTotalPagesGreaterThan(Integer totalPages);

	List<Book> findByLangAndTotalPagesGreaterThan(String lang, Integer totalPages);

	List<Book> findByAuthor_Id(UUID authorId);

	List<Book> findByLibrary_Id(UUID libId);

	List<Book> findByLibrary_City(String city);

	List<Book> findByLibrary_CityIgnoreCase(String city);

	List<Book> findByTitleContainingIgnoreCaseAndLang(String title, String lang);
}
