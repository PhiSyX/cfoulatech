package be.cfoulatech.course.data_access.repository;

import be.cfoulatech.course.domain.entity.Library;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface LibraryRepository extends JpaRepository<Library, UUID>
{
	List<Library> findByCityIgnoreCase(String city);

	Optional<Library> findByName(String name);

	List<Library> findByNameContainingIgnoreCase(String name);

	List<Library> findByCityContainingIgnoreCase(String city);
}
