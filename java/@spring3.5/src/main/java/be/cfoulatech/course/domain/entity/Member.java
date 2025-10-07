package be.cfoulatech.course.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;


@Table(name = "members")
@Entity
@Data
@NoArgsConstructor
public class Member
{
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Setter(AccessLevel.NONE)
	private UUID id;

	@Column(nullable = false, length = 123)
	private String lastname;

	@Column(length = 81)
	private String firstname;

	@Column(unique = true, length = 255)
	private String email;

	@Column()
	private LocalDate registeredAt;

	@Column(length = 255)
	private String status;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "library_id")
	private Library library;

	public Member(
		String lastname, String firstname, String email,
		LocalDate registeredAt, String status,
		Library library
	)
	{
		this.lastname = lastname;
		this.firstname = firstname;
		this.email = email;
		this.registeredAt = registeredAt;
		this.status = status;
		this.library = library;
	}
}
