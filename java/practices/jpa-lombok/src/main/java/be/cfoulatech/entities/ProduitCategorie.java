package be.cfoulatech.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "produits_categories")
@NoArgsConstructor
//@Getter
//@Setter
//@ToString
//@EqualsAndHashCode
//@RequiredArgsConstructor
@Data
public class ProduitCategorie
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Setter(AccessLevel.NONE)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "produit_id", nullable = false)
	private Produit produit;

	@ManyToOne
	@JoinColumn(name = "categorie_id", nullable = false)
	private Categorie categorie;

	public ProduitCategorie(Produit produit, Categorie categorie)
	{
		this.produit = produit;
		this.categorie = categorie;
	}
}
