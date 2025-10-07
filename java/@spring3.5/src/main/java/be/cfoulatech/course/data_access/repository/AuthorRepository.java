package be.cfoulatech.course.data_access.repository;

import be.cfoulatech.course.domain.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AuthorRepository extends JpaRepository<Author, UUID>
{
	List<Author> findByNationality(String nationality);

	List<Author> findByLastnameIgnoreCase(String lastname);

	List<Author> findByLastnameContainingIgnoreCase(String lastname);

	List<Author> findByFirstnameContainingIgnoreCase(String lastname);

	List<Author> findByLastnameContainingIgnoreCaseOrFirstnameContainingIgnoreCase(
		String lastname,
		String firstname
	);
}
