package be.cfoulatech.course.business.service;

import be.cfoulatech.course.data_access.repository.LibraryRepository;
import be.cfoulatech.course.domain.entity.Library;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class LibraryService
{

	private final LibraryRepository bibliothequeRepository;

	public Library create(Library bibliotheque)
	{
		return bibliothequeRepository.save(bibliotheque);
	}

	public Optional<Library> findById(UUID id)
	{
		return bibliothequeRepository.findById(id);
	}

	public List<Library> findAll()
	{
		return bibliothequeRepository.findAll();
	}

	public List<Library> findByCity(String ville)
	{
		return bibliothequeRepository.findByCityIgnoreCase(ville);
	}

	public Optional<Library> findByName(String nom)
	{
		return bibliothequeRepository.findByName(nom);
	}

	public List<Library> searchName(String nom)
	{
		return bibliothequeRepository.findByNameContainingIgnoreCase(nom);
	}
}
