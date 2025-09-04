package be.cfoulatech.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "produits")
@NoArgsConstructor
//@Getter
//@Setter
//@ToString
//@EqualsAndHashCode
//@RequiredArgsConstructor
@Data
public class Produit
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Setter(AccessLevel.NONE)
	private Integer id;

	@Column(length = 225, nullable = false)
	private String nom;

	@Column(length = 1500, unique = true)
	private String description;

	@Column(length = 10, nullable = false)
	private Double prix;

	@Column(length = 10, nullable = false)
	private Integer stock;

	public Produit(String nom, String description, Double prix, Integer stock)
	{
		this.nom = nom;
		this.description = description;
		this.prix = prix;
		this.stock = stock;
	}
}
