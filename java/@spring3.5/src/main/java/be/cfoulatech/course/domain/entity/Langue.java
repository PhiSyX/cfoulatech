package be.cfoulatech.course.domain.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Langues")
@Data
@NoArgsConstructor
public class Langue
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Setter(AccessLevel.NONE)
	private Integer id;

	@Column(nullable = false, length = 100)
	private String nom;

	@Column(length = 3)
	private String code;

	public Langue(String nom, String code)
	{
		this.nom = nom;
		this.code = code;
	}


}
