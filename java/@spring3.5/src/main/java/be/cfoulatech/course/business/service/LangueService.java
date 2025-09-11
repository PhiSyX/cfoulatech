package be.cfoulatech.course.business.service;

import be.cfoulatech.course.data_access.repository.LangueRepository;
import be.cfoulatech.course.domain.entity.Langue;
import org.springframework.stereotype.Service;

@Service
public class LangueService
{
	private final LangueRepository langueRepository;

	public LangueService(LangueRepository langueRepository)
	{
		this.langueRepository = langueRepository;
	}

	public Langue sauvegarder(Langue langue)
	{
		return langueRepository.save(langue);
	}
}
