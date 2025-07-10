package annotations;

import java.lang.reflect.Method;

public class Person
{
	private String name;

	@MyAnnotation
	public void sayHello()
	{
		System.out.println("Bonjour !");
	}

	public static void main(String[] args) throws Exception
	{
		Class<?> personClass = Person.class;
		System.out.println("Classe trouvée : " + personClass.getSimpleName());

		Method[] methods = personClass.getDeclaredMethods();
		System.out.println("Cette classe a " + methods.length + " méthodes");

		Person p1 = new Person();
		Method sayHello = personClass.getMethod("sayHello");
		sayHello.invoke(p1);
	}
}
