package be.cfoulatech.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "users")
public class User
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false, length = 100)
	private String name;

	@Column(nullable = false, length = 150, unique = true)
	private String email;

	@Column(nullable = false)
	private LocalDate birthday;

	public User()
	{
	}

	public User(String name, String email, LocalDate birthday)
	{
		this.name = name;
		this.email = email;
		this.birthday = birthday;
	}

	// region Getter | Setter

	public Integer getId()
	{
		return id;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public String getEmail()
	{
		return email;
	}

	public void setEmail(String email)
	{
		this.email = email;
	}

	public LocalDate getBirthday()
	{
		return birthday;
	}

	public void setBirthday(LocalDate birthday)
	{
		this.birthday = birthday;
	}

	// endregion Getter | Setter //


	@Override
	public boolean equals(Object o)
	{
		if (o == null || getClass() != o.getClass()) return false;
		User user = (User) o;
		return Objects.equals(id, user.id) && Objects.equals(name, user.name) && Objects.equals(email, user.email) && Objects.equals(birthday, user.birthday);
	}

	@Override
	public int hashCode()
	{
		return Objects.hash(id, name, email, birthday);
	}

}
