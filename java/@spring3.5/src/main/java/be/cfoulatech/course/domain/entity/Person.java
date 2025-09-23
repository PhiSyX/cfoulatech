package be.cfoulatech.course.domain.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@NoArgsConstructor
@Table(name = "persons") @Entity @Data
public class Person
{
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Setter(AccessLevel.NONE)
	private UUID id;

	@Column(length = 81)
	private String name;

	@Column(length = 123)
	private String firstname;

	@Column(unique = true)
	private String email;

	@Column()
	private Integer age;

	public Person(String name, String firstname, String email, Integer age)
	{
		this.name = name;
		this.firstname = firstname;
		this.email = email;
		this.age = age;
	}
}
