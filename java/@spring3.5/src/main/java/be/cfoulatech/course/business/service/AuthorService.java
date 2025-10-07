package be.cfoulatech.course.business.service;

import be.cfoulatech.course.data_access.repository.AuthorRepository;
import be.cfoulatech.course.domain.entity.Author;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthorService
{
	private final AuthorRepository authorRepository;

	public Author create(Author author)
	{
		return authorRepository.save(author);
	}

	public Optional<Author> findById(UUID id)
	{
		return authorRepository.findById(id);
	}

	public List<Author> findAll()
	{
		return authorRepository.findAll();
	}

	public List<Author> findByNationality(String nationalite)
	{
		return authorRepository.findByNationality(nationalite);
	}

	public List<Author> findByLastname(String nom)
	{
		return authorRepository.findByLastnameIgnoreCase(nom);
	}

	public List<Author> rechercherParNomOuPrenom(String searchTerm)
	{
		return authorRepository.findByLastnameContainingIgnoreCaseOrFirstnameContainingIgnoreCase(searchTerm, searchTerm);
	}
}
