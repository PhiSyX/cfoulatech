package be.cfoulatech.course.business.service;

import be.cfoulatech.course.data_access.repository.LangRepository;
import be.cfoulatech.course.domain.entity.Lang;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class LangService
{
	private final LangRepository langRepository;

	public LangService(LangRepository langRepository)
	{
		this.langRepository = langRepository;
	}

	public Lang save(Lang lang)
	{
		return langRepository.save(lang);
	}

	public List<Lang> findAll()
	{
		return langRepository.findAll();
	}

	public Optional<Lang> findById(Integer id)
	{
		return langRepository.findById(id);
	}

	public void delete(Integer id)
	{
		langRepository.deleteById(id);
	}

	public long count()
	{
		return langRepository.count();
	}

	public boolean isExist(Integer id)
	{
		return langRepository.existsById(id);
	}

	// ... vos méthodes existantes

	// Juste ces 3 nouvelles méthodes pour tester
	public List<Lang> findByName(String recherche)
	{
		return langRepository.searchFromName(recherche);
	}

	public long compterLanguesAvecCode()
	{
		return langRepository.countLanguages();
	}

	public boolean codeExiste(String code)
	{
		return langRepository.existsByCode(code);
	}
}
