package be.cfoulatech.course.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Table(name = "books")
@Entity
@Data
@NoArgsConstructor
public class Book
{
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Setter(AccessLevel.NONE)
	private UUID id;

	@Column(nullable = false, length = 255)
	private String title;

	@Column(unique = true)
	private Long isbn;

	private LocalDate releaseYear;

	private Integer totalPages;

	@Column(length = 31)
	private String lang;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "author_id")
	private Author author;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "library_id")
	private Library library;

	public Book(
		String title, Long isbn, LocalDate releaseYear,
		Integer totalPages, String lang,
		Author author, Library library
	)
	{
		this.title = title;
		this.isbn = isbn;
		this.releaseYear = releaseYear;
		this.totalPages = totalPages;
		this.lang = lang;
		this.author = author;
		this.library = library;
	}
}
