package be.cfoulatech.course.data_access.repository;

import be.cfoulatech.course.domain.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PersonRepository extends JpaRepository<Person, UUID>
{
	Optional<Person> findByName(String nom);

	Optional<Person> findByEmail(String email);

	@Modifying
	@Transactional
	void deleteByEmail(String email);
}
