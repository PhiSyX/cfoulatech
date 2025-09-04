package be.cfoulatech.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "clients")
@NoArgsConstructor
//@Getter
//@Setter
//@ToString
//@EqualsAndHashCode
//@RequiredArgsConstructor
@Data
public class Client
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Setter(AccessLevel.NONE)
	private Integer id;

	@Column(length = 81, nullable = false)
	private String nom;

	@Column(length = 225, nullable = false, unique = true)
	private String email;

	@Column(name = "date_inscription", length = 225, nullable = false)
	private LocalDate dateInscription;

	@ManyToOne
	@JoinColumn(name = "adresse_id")
	private Adresse adresse;

	@OneToOne
	@JoinColumn(name = "client_id")
	private Profil profil;

	public Client(String nom, String email, LocalDate dateInscription, Adresse adresse, Profil profil)
	{
		this.nom = nom;
		this.email = email;
		this.dateInscription = dateInscription;
		this.adresse = adresse;
		this.profil = profil;
	}
}
