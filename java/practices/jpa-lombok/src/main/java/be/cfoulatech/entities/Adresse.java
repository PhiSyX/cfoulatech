package be.cfoulatech.entities;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Array;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "adresses")
@NoArgsConstructor
//@Getter
//@Setter
//@ToString
//@EqualsAndHashCode
@Data
public class Adresse
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Setter(AccessLevel.NONE)

	private Long id;

	@Column(length = 225, nullable = false)
	private String rue;

	@Column(length = 20, nullable = false)
	private String numero;

	@Column(name = "code_postal", length = 4, nullable = false)
	private Integer codePostal;

	@Column(length = 160, nullable = false)
	private String ville;

	@Column(length = 80, nullable = false)
	private String type;

	@OneToMany(mappedBy = "client")
	private List<Client> clients = new ArrayList<>();

	public Adresse(String rue, String numero, Integer codePostal, String ville, String type)
	{
		this.rue = rue;
		this.numero = numero;
		this.codePostal = codePostal;
		this.ville = ville;
		this.type = type;
	}
}
