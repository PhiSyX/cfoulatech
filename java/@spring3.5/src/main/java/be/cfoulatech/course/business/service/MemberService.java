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
@RequiredArgsConstructor
@Transactional
public class MemberService
{
	private final MemberRepository memberRepository;

	public Member create(Member member) throws EmailAlreadyExistsException
	{
		if (memberRepository.existsByEmailIgnoreCase(member.getEmail())) {
			throw new EmailAlreadyExistsException();
		}

		return memberRepository.save(member);
	}

	public Optional<Member> findById(UUID id)
	{
		return memberRepository.findById(id);
	}

	public List<Member> findAll()
	{
		return memberRepository.findAll();
	}

	public Optional<Member> findByEmail(String email)
	{
		return memberRepository.findByEmailIgnoreCase(email);
	}

	public List<Member> findByStatus(MemberStatus status)
	{
		return memberRepository.findByStatus(status);
	}

	public List<Member> findAllExpires()
	{
		return memberRepository.findByStatusIn(
			List.of(MemberStatus.SUSPENDED, MemberStatus.EXPIRED)
		);
	}

	public List<Member> findByLibrary(UUID bibliothequeId)
	{
		return memberRepository.findByLibrary_Id(bibliothequeId);
	}

	public List<Member> findByCity(String city)
	{
		return memberRepository.findByLibrary_CityIgnoreCase(city);
	}

	public Member suspend(UUID id)
	{
		var member = memberRepository.findById(id).orElseThrow(() -> new MemberNotFoundException(id));

		if (member.isSuspended()) {
			return member;
		}

		member.setStatus(MemberStatus.SUSPENDED);
//		return membreRepository.save(member); // non obligatoire avec @Transactional
		return member;
	}
}
