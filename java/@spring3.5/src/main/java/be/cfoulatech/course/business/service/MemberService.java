package be.cfoulatech.course.business.service;

import be.cfoulatech.course.data_access.repository.MemberRepository;
import be.cfoulatech.course.domain.entity.Member;
import be.cfoulatech.course.domain.enums.MemberStatus;
import be.cfoulatech.course.domain.exception.EmailAlreadyExistsException;
import be.cfoulatech.course.domain.exception.MemberNotFoundException;
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

	public Member create(Member member) throws EmailAlreadyExistsException
	{
		if (membreRepository.existsByEmailIgnoreCase(member.getEmail())) {
			throw new EmailAlreadyExistsException();
		}

		return membreRepository.save(member);
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

	public List<Member> findByStatus(MemberStatus status)
	{
		return membreRepository.findByStatus(status);
	}

	public List<Member> findAllExpires()
	{
		return membreRepository.findByStatusIn(
			List.of(MemberStatus.SUSPENDED, MemberStatus.EXPIRED)
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

	public Member suspend(UUID id)
	{
		var member = membreRepository.findById(id).orElseThrow(() -> new MemberNotFoundException(id));

		if (member.isSuspended()) {
			return member;
		}

		member.setStatus(MemberStatus.SUSPENDED);
//		return membreRepository.save(member); // non obligatoire avec @Transactional
		return member;
	}
}
