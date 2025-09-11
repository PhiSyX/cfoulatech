package be.cfoulatech.course;

import be.cfoulatech.course.business.service.LangueService;
import be.cfoulatech.course.domain.entity.Langue;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

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
		return args ->
		{
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
	public CommandLineRunner testRapide(LangueService langueService)
	{
		return new CommandLineRunner()
		{
			@Override
			public void run(String... args) throws Exception
			{
				System.out.println("Test rapide");
				langueService.sauvegarder(new Langue("English", "EN"));
			}
		};
	}
}

