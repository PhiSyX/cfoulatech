package record;

public record UserDTO(String name, String email, boolean isActive)
{
	public static void main(String[] args)
	{
		// ex: get user from database
		UserEntity userEntity = new UserEntity(42)
			.setLastname("Doe")
			.setLastname("John")
			.setEmail("john@doe.org")
			.setActive(true);

		// dto
		UserDTO userDTO = new UserDTO(
			userEntity.getFullName(),
			userEntity.getEmail(),
			userEntity.isActive()
		);

		System.out.println(userDTO);
	}
}

class UserEntity
{
	private Integer id;
	private String lastname;
	private String firstname;
	private String email;
	private boolean active;

	public UserEntity(Integer id)
	{
		this.id = id;
	}

	public String getFullName()
	{
		return "%s %s".formatted(firstname, lastname);
	}

	public String getLastname()
	{
		return lastname;
	}

	public UserEntity setLastname(String lastname)
	{
		this.lastname = lastname;
		return this;
	}

	public String getFirstname()
	{
		return firstname;
	}

	public UserEntity setFirstname(String firstname)
	{
		this.firstname = firstname;
		return this;
	}

	public String getEmail()
	{
		return email;
	}

	public UserEntity setEmail(String email)
	{
		this.email = email;
		return this;
	}

	public boolean isActive()
	{
		return active;
	}

	public UserEntity setActive(boolean active)
	{
		this.active = active;
		return this;
	}
}
