package be.cfoulatech.course.data_access.repository;

import be.cfoulatech.course.domain.entity.Lang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface LangRepository extends JpaRepository<Lang, Integer>
{
	List<Lang> findByNameContaining(String name);

	Optional<Lang> findByCode(String code);

	boolean existsByCode(String code);

	@Query("SELECT l FROM Lang l WHERE UPPER(l.name) LIKE UPPER('%' || :recherche || '%')")
	List<Lang> searchFromName(@Param("recherche") String recherche);

	@Query("SELECT COUNT(l) FROM Lang l WHERE l.code IS NOT NULL")
	long countLanguages();

	@Modifying
	@Transactional
	@Query("DELETE FROM Lang l WHERE l.code IS NULL")
	int deleteLanguagesWithoutCode();

}
