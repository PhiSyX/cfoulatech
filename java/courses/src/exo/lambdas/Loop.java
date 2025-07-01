package exo.lambdas;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

public class Loop
{
	private final List<String> languages = new ArrayList<>();

	public void addLang(String lang)
	{
		languages.add(lang);
	}

	public void displayLanguages()
	{
		languages.forEach(lang -> System.out.println(lang));
	}

	public void sortLanguages()
	{
		languages.sort((l1, l2) -> l2.compareTo(l1));
	}

	public void filter(String letter)
	{
		languages.removeIf(lang -> lang.contains(letter));
	}

	public void filter(Predicate<String> filter)
	{
		languages.removeIf(filter);
	}

	public long countLetter(String j)
	{
		return languages.stream().filter(l -> l.startsWith(j)).count();
	}

	public void toUpper()
	{
		languages.stream().map(l -> l.toUpperCase()).forEach(lang -> System.out.println(lang));
	}
}

class LoopTest
{
	public static void main(String[] args)
	{
		Loop loop = new Loop();
		loop.addLang("Java");
		loop.addLang("Python");
		loop.addLang("JavaScript");
		loop.addLang("Go");
		loop.addLang("Rust");
//		loop.displayLanguages();
//		loop.sortLanguages();
//		divider();
//		loop.displayLanguages();
//		loop.filter("a");
//		loop.filter(l -> l.length() > 4);
//		divider();
//		loop.displayLanguages();
//		assert loop.countLetter("J") == 2 : "Il n'y a que deux langages commençant par J";
		loop.toUpper();
	}

	private static void divider()
	{
		System.out.println("-".repeat(20));
	}
}
