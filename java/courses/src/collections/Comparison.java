package collections;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class Comparison
{
	public static void main(String[] args)
	{
		Set<Personne> persons = new HashSet<>();
		persons.add(new Personne("Alice", 20));
		persons.add(new Personne("Alice", 20));

		System.out.println(persons.size());
	}
}

class Personne
{
	String name;
	int age;

	public Personne(String name, int age)
	{
		this.name = name;
		this.age = age;
	}

	@Override
	public boolean equals(Object rht)
	{
		if (rht == null || getClass() != rht.getClass()) {
			return false;
		}

		Personne personne = (Personne) rht;
		return age == personne.age && Objects.equals(name, personne.name);
	}

	@Override
	public int hashCode()
	{
		return Objects.hash(name, age);
	}
}
