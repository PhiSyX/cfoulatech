package exo.klass;

public class Person
{
	String lastname;
	String firstname;
	int age;

	public Person(String lastname, String firstname, int age)
	{
		this.lastname = lastname;
		this.firstname = firstname;
		this.age = age;
	}
}

class PersonTest
{
	public static void main(String[] args)
	{
		Person mike = new Person("S.", "Mike", 24);
		Person clovis = new Person("N.", "Clovis", 24);

		System.out.println(mike.firstname);
		System.out.println(clovis.firstname);
	}
}
