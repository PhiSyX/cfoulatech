package be.cfoulatech.course.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Table(name = "libraries")
@Entity
@NoArgsConstructor
@Data
public class Library
{
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Setter(AccessLevel.NONE)
	private UUID id;

	@Column(nullable = false, length = 255)
	private String name;

	@Column(length = 255)
	private String address;

	@Column(length = 255)
	private String city;

	private Integer seats;

	public Library(String name, String address, String city, Integer seats)
	{
		this.name = name;
		this.address = address;
		this.city = city;
		this.seats = seats;
	}
}
