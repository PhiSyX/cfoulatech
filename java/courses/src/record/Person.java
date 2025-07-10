package record;

public record Person(String name, int age, String email)
{
	public static void main(String[] args)
	{
		Person p1 = new Person("Alice", 24, "alice@example.org");

		System.out.println("Nom : " + p1.name());
		System.out.println("Age : " + p1.age());
		System.out.println("Email : " + p1.email());
		System.out.println(p1);

		Person p2 = new Person("Bob", 42, "bob@example.org");
		System.out.println(p1.equals(p2));
	}
}
