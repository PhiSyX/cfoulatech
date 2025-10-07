package be.cfoulatech.course.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Table(name = "authors")
@Entity
@Data
@NoArgsConstructor
public class Author
{
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Setter(AccessLevel.NONE)
	private UUID id;

	@Column(nullable = false, length = 255)
	private String lastname;

	@Column(nullable = false, length = 255)
	private String firstname;

	@Column
	private LocalDate birthdate;

	@Column(length = 60)
	private String nationality;

	public Author(String nom, String prenom, LocalDate birthdate, String nationalite)
	{
		this.lastname = nom;
		this.firstname = prenom;
		this.birthdate = birthdate;
		this.nationality = nationalite;
	}
}
