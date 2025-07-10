package record;

public record AppConfig(
	String databaseUrl,
	int port,
	boolean debugMode
)
{
	public static void main(String[] args)
	{
		AppConfig config = new AppConfig(
			"mysql://root@127.0.0.1:3306/cours_recipe_dev?serverVersion=11.8.2-MariaDB&charset=utf8mb4",
			80,
			true
		);

		System.out.println(config);
	}
}
