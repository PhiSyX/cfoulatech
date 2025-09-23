package be.cfoulatech.course.business.service;

import be.cfoulatech.course.data_access.repository.PersonRepository;
import be.cfoulatech.course.domain.entity.Person;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class PersonService
{
	private final PersonRepository personRepository;

	public PersonService(PersonRepository personRepository)
	{
		this.personRepository = personRepository;
	}

	public Person save(Person person)
	{
		return personRepository.save(person);
	}

	public Optional<Person> findByName(String name)
	{
		return personRepository.findByName(name);
	}

	public void deleteByEmail(String email)
	{
		personRepository.deleteByEmail(email);
	}
}
