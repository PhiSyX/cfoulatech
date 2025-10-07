package be.cfoulatech.course;

import be.cfoulatech.course.business.service.*;
import be.cfoulatech.course.data_access.repository.LangRepository;
import be.cfoulatech.course.domain.entity.*;
import be.cfoulatech.course.domain.enums.MemberStatus;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
public class CourseApplication
{
	public static void main(String[] args)
	{
		SpringApplication.run(CourseApplication.class, args);
	}

	@Bean
	public CommandLineRunner showBeans(ApplicationContext applicationContext)
	{
		return args -> {
			System.out.println("=== BEANS CRÉÉS AUTOMATIQUEMENT ===");
			String[] beans = applicationContext.getBeanDefinitionNames();
			System.out.println("Nombre total de beans : " + beans.length);
			System.out.println("Premiers beans : ");

			for (int i = 0; i < Math.min(10, beans.length); i++) {
				System.out.println("\t " + (i + 1) + ") " + beans[i]);
			}
		};
	}

	@Bean
	public CommandLineRunner testRepository(LangRepository langRepository)
	{
		return args -> {
			System.out.println("=== Test du Repository ===");
			System.out.println("\tNombre de langues en base : " + langRepository.count());
			System.out.println("\tRepository configuré correctement !");
		};
	}

	@Bean
	public CommandLineRunner testLang(LangService langService)
	{
		return args -> {
			System.out.println("=== Test Langue Service ===");

			// Créer quelques langues
			langService.save(new Lang("Français", "FR"));
			langService.save(new Lang("Anglais", "EN"));
//			langService.save(new Lang("Dialecte", null)); // Sans code
			// Test 1 : Recherche
			System.out.println("Recherche 'fran' : " + langService.findByName("fran").size());
			// Test 2 : Comptage
			System.out.println("Langues avec code : " + langService.countWithCode());
			// Test 3 : Existence
			System.out.println("Code 'FR' existe : " + langService.codeExiste("FR"));
			System.out.println("Test terminé !");
		};
	}

	@Bean
	public CommandLineRunner testPerson(PersonService personService)
	{
		return args -> {
			System.out.println("=== Test Personne Service ===");
			try {
				var personne = personService.save(new Person("Doe", "John", "john@doe.fr", 42));

				System.out.printf(
					"La personne %s %s a été ajouté en base de données à l'ID : %s.%n",
					personne.getName(),
					personne.getFirstname(),
					personne.getId()
				);
			} catch (Exception e) {
				System.err.println("Erreur :");
				System.err.print("  ");
				System.err.print(e.getMessage());
				System.err.println();

				var jd = personService.findByName("Doe");

				jd.ifPresent(person -> {
					System.out.printf(
						"La personne %s %s a est présente en base de données à l'ID : %s.%n",
						person.getName(),
						person.getFirstname(),
						person.getId()
					);
				});
			}

			Thread.sleep(500);

//			personService.deleteByEmail("john@doe.fr");
		};
	}

	@Bean
	public CommandLineRunner testAuthor(AuthorService authorService)
	{
		return args -> {
			System.out.println("\n=== TEST AUTEURS ===");

			var hugo = authorService.create(new Author("Hugo", "Victor", LocalDate.of(1802, 2, 26), "Française"));
			var tolkien = authorService.create(new Author("Tolkien", "J.R.R.", LocalDate.of(1892, 1, 3), "Britannique"));

			System.out.println("Hugo ID: " + hugo.getId());

			var maybeAuthor = authorService.findById(hugo.getId());
			maybeAuthor.ifPresent(author -> System.out.println("Trouvé: " + author.getFirstname() + " " + author.getLastname()));

			var lastnames = authorService.findByLastname("HUGO");
			System.out.println("Recherche 'HUGO': " + lastnames.size() + " résultat(s)");

			var britanniques = authorService.findByNationality("Britannique");
			System.out.println("Auteurs britanniques: " + britanniques.size());

			System.out.println("Total: " + authorService.findAll().size());
		};
	}

	@Bean
	public CommandLineRunner testLibrary(LibraryService libraryService, BookService bookService, MemberService memberService)
	{
		return args -> {
			System.out.println("\n=== TEST BIBLIOTHEQUES ===");

			var molenbeek = libraryService.create(new Library("Bibliothèque de Molenbeek", "Rue du Comte de Flandre", "Molenbeek", 150));
			var koekelberg = libraryService.create(new Library("Bibliothèque de Koekelberg", "Avenue de l'Exposition", "Koekelberg", 100));

			var libs_mol = libraryService.findByCity("Molenbeek");
			System.out.println("Bibliothèques à Molenbeek: " + libs_mol.size());

			var livres = bookService.findByCity("Molenbeek");
			System.out.println("Livres à Molenbeek: " + livres.size());

			var members = memberService.findByCity("Koekelberg");
			System.out.println("Membres à Koekelberg: " + members.size());

			System.out.println("Total bibliothèques: " + libraryService.findAll().size());
		};
	}

	@Bean
	public CommandLineRunner testBooks(
		BookService livreService, AuthorService auteurService,
		LibraryService bibliothequeService
	)
	{
		return args -> {
			System.out.println("\n=== TEST LIVRES ===");

			var tolkien = auteurService.create(new Author("Tolkien", "J.R.R.", LocalDate.of(1892, 1, 3), "Britannique"));
			var molenbeek = bibliothequeService.create(new Library("Bibliothèque de Molenbeek", "Rue du Comte de Flandre", "Molenbeek", 150));

			var hobbit = livreService.create(new Book("The Hobbit", 9780261102217L, LocalDate.of(1937, 9, 21), 310, "Anglais", tolkien, molenbeek));
			var lotr = livreService.create(new Book("The Lord of the Rings", 9780261102354L, LocalDate.of(1954, 7, 29), 1178, "Anglais", tolkien, molenbeek));

			var titles = livreService.searchTitle("hobbit");
			System.out.println("Recherche 'hobbit': " + titles.size() + " livre(s)");

			var isbnBooks = livreService.findByIsbn(9780261102217L);
			isbnBooks.ifPresent(l -> System.out.println("Par ISBN: " + l.getTitle()));

			var voluminousBooks = livreService.findVoliminousBooks(500);
			System.out.println("Livres > 500 pages: " + voluminousBooks.size());

			var authoredBooks = livreService.findByAuthor(tolkien.getId());
			System.out.println("Livres de Tolkien: " + authoredBooks.size());
		};
	}

	@Bean
	public CommandLineRunner testMembers(MemberService membreService, LibraryService bibliothequeService)
	{
		return args -> {
			System.out.println("\n=== TEST MEMBRES ===");

			var koekelberg = bibliothequeService.create(new Library("Bibliothèque de Koekelberg", "Avenue de l'Exposition", "Koekelberg", 100));

			var jean = membreService.create(new Member("Dupont", "Jean", "jean@email.com", LocalDate.now(), MemberStatus.ACTIVE, koekelberg));
			var sophie = membreService.create(new Member("Martin", "Sophie", "sophie@email.com", LocalDate.now(), MemberStatus.SUSPENDED, koekelberg));

			var maybeMember = membreService.findByEmail("jean@email.com");
			maybeMember.ifPresent(member -> System.out.println("Par email: " + member.getFirstname()));

			var issuers = membreService.findAllExpires();
			System.out.println("Suspendus/Expirés: " + issuers.size());

			var membres = membreService.findByLibrary(koekelberg.getId());
			System.out.println("Membres à Koekelberg: " + membres.size());
		};
	}

}

