package be.cfoulatech.course.data_access.repository;

import be.cfoulatech.course.domain.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MemberRepository extends JpaRepository<Member, UUID>
{
	Optional<Member> findByEmail(String email);

	Optional<Member> findByEmailIgnoreCase(String email);

	List<Member> findByStatus(String status);

	List<Member> findByStatusIn(List<String> status);

	List<Member> findByLibrary_Id(UUID bibliothequeId);

	List<Member> findByLibrary_City(String ville);

	List<Member> findByLibrary_CityIgnoreCase(String ville);

	List<Member> findByLastnameContainingIgnoreCase(String lastname);

	List<Member> findByEmailContainingIgnoreCase(String email);
}
