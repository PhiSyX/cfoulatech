package be.cfoulatech.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "profils")
@NoArgsConstructor
//@Getter
//@Setter
//@ToString
//@EqualsAndHashCode
//@RequiredArgsConstructor
@Data
public class Profil
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Setter(AccessLevel.NONE)
	private Integer id;

	@Column(length = 255)
	private String avatar;

	@Column(length = 6000, nullable = false)
	private String bio;

	@Column(length = 6000)
	private String preferences;

	@OneToOne
	@JoinColumn(name = "client_id", nullable = false)
	private Client client;

	public Profil(String avatar, String bio, String preferences, Client client)
	{
		this.avatar = avatar;
		this.bio = bio;
		this.preferences = preferences;
		this.client = client;
	}

	public Profil(String bio, Client client)
	{
		this.bio = bio;
		this.client = client;
	}
}
