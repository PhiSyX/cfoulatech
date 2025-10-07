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

	private final LibraryRepository libraryRepository;

	public Library create(Library bibliotheque)
	{
		return libraryRepository.save(bibliotheque);
	}

	public Optional<Library> findById(UUID id)
	{
		return libraryRepository.findById(id);
	}

	public List<Library> findAll()
	{
		return libraryRepository.findAll();
	}

	public List<Library> findByCity(String ville)
	{
		return libraryRepository.findByCityIgnoreCase(ville);
	}

	public Optional<Library> findByName(String nom)
	{
		return libraryRepository.findByName(nom);
	}

	public List<Library> searchName(String nom)
	{
		return libraryRepository.findByNameContainingIgnoreCase(nom);
	}
}
