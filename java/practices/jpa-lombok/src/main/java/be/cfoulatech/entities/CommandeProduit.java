package be.cfoulatech.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "commandes_produits")
@NoArgsConstructor
//@Getter
//@Setter
//@ToString
//@EqualsAndHashCode
//@RequiredArgsConstructor
@Data
public class CommandeProduit
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Setter(AccessLevel.NONE)
	private Integer id;

	@Column(nullable = false)
	private Integer quantite;

	@Column(name = "prix_unitaire", nullable = false)
	private Double prixUnitaire;

	@ManyToOne
	@JoinColumn(name = "commande_id", nullable = false)
	private Commande commande;

	@ManyToOne
	@JoinColumn(name = "produit_id", nullable = false)
	private Produit produit;

	public CommandeProduit(Integer quantite, Double prixUnitaire, Commande commande, Produit produit)
	{
		this.quantite = quantite;
		this.prixUnitaire = prixUnitaire;
		this.commande = commande;
		this.produit = produit;
	}
}
