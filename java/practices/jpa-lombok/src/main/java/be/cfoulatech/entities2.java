package be.cfoulatech;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import java.time.LocalDate;

public class entities2
{
	@Entity
	@Table(name = "universites")
	//@NoArgsConstructor
	//@Getter
	//@Setter
	//@ToString
	//@EqualsAndHashCode
	//@RequiredArgsConstructor
	@Data
	public static class Universite
	{
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Integer id;

		@Column(nullable = false)
		private String nom;

		@Column(length = 180, nullable = false)
		private String ville;

		@Column
		private LocalDate fondation;
	}

	@Entity
	@Table(name = "recteurs")
	//@NoArgsConstructor
	//@Getter
	//@Setter
	//@ToString
	//@EqualsAndHashCode
	//@RequiredArgsConstructor
	@Data
	public static class Recteur
	{
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Setter(AccessLevel.NONE)
		private Integer id;

		@Column(length = 81, nullable = false)
		private String nom;

		@Column(length = 123, nullable = false)
		private String prenom;

		@Column(name = "date_nomination", nullable = false)
		private LocalDate dateNomination;

		@OneToOne
		@JoinColumn(name = "universite_id")
		private Universite universite;
	}

	@Entity
	@Table(name = "facultes")
	//@NoArgsConstructor
	//@Getter
	//@Setter
	//@ToString
	//@EqualsAndHashCode
	//@RequiredArgsConstructor
	@Data
	public static class Faculte
	{
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Setter(AccessLevel.NONE)
		private Integer id;

		@Column(nullable = false)
		private String nom;

		@Column(length = 20, nullable = false)
		private String batiment;

		@ManyToOne
		@JoinColumn(name = "universite_id")
		private Universite universite;
	}

	@Entity
	@Table(name = "etudiants")
	//@NoArgsConstructor
	//@Getter
	//@Setter
	//@ToString
	//@EqualsAndHashCode
	//@RequiredArgsConstructor
	@Data
	public static class Etudiant
	{
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Setter(AccessLevel.NONE)
		private Integer id;

		@Column(length = 81, nullable = false)
		private String nom;

		@Column(length = 123, nullable = false)
		private String prenom;

		@Column(name = "num_etudiant", length = 16, nullable = false)
		private String numeroEtudiant;

		@Column(name = "date_inscription", nullable = false)
		private LocalDate dateInscription;

		@ManyToOne
		@JoinColumn(name = "faculte_id")
		private Faculte faculte;
	}
}
