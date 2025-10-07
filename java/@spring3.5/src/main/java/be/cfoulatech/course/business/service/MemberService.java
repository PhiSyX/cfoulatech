package be.cfoulatech.course.business.service;

import be.cfoulatech.course.data_access.repository.MemberRepository;
import be.cfoulatech.course.domain.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor // Génère un constructeur avec tous les champs final pour l'injection de dépendances
@Transactional
public class MemberService
{
	private final MemberRepository membreRepository;

	public Member create(Member membre)
	{
		return membreRepository.save(membre);
	}

	public Optional<Member> findById(UUID id)
	{
		return membreRepository.findById(id);
	}

	public List<Member> findAll()
	{
		return membreRepository.findAll();
	}

	public Optional<Member> findByEmail(String email)
	{
		return membreRepository.findByEmailIgnoreCase(email);
	}

	public List<Member> findByStatus(String status)
	{
		return membreRepository.findByStatus(status);
	}

	public List<Member> findAllExpires()
	{
		return membreRepository.findByStatusIn(
			List.of("SUSPENDU", "EXPIRE")
		);
	}

	public List<Member> findByLibrary(UUID bibliothequeId)
	{
		return membreRepository.findByLibrary_Id(bibliothequeId);
	}

	public List<Member> findByCity(String city)
	{
		return membreRepository.findByLibrary_CityIgnoreCase(city);
	}
}
