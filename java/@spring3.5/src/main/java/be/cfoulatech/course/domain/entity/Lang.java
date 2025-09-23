package be.cfoulatech.course.domain.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@Table(name = "langs") @Entity @Data
public class Lang
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Setter(AccessLevel.NONE)
	private Integer id;

	@Column(nullable = false, length = 100)
	private String name;

	@Column(nullable = false, length = 3)
	private String code;

	public Lang(String name, String code)
	{
		this.name = name;
		this.code = code;
	}
}
