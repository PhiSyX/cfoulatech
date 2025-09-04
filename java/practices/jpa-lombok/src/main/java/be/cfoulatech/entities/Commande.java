package be.cfoulatech.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "commandes")
@NoArgsConstructor
//@Getter
//@Setter
//@ToString
//@EqualsAndHashCode
//@RequiredArgsConstructor
@Data
public class Commande
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Setter(AccessLevel.NONE)
	private Integer id;

	@Column(name = "date_commande", nullable = false)
	private LocalDateTime dateCommande;

	@Column(name = "montant_total", length = 10, nullable = false)
	private Double montantTotal;

	@Column(nullable = false)
	private String status;

	@ManyToOne
	@JoinColumn(name = "client_id")
	private Client client;

	public Commande(LocalDateTime dateCommande, Double montantTotal, String status, Client client)
	{
		this.dateCommande = dateCommande;
		this.montantTotal = montantTotal;
		this.status = status;
		this.client = client;
	}
}
