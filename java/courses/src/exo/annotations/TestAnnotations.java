package exo.annotations;

import annotations.Author;
import exo.annotations.validation.Configuration;
import exo.annotations.validation.Important;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Arrays;

public class TestAnnotations
{
	public static void main(String[] args)
	{
		Class<?> utilisateurClass = Utilisateur.class;

		for (Field field : utilisateurClass.getDeclaredFields()) {
			if (field.isAnnotationPresent(Important.class)) {
				System.out.println("Important : " + field.getName());
			}

			if (field.isAnnotationPresent(Configuration.class)) {
				System.out.println("Configuration : " + field.getName());
				Configuration annot = field.getAnnotation(Configuration.class);
				System.out.println("\t valeur : " + annot.valeur());
				System.out.println("\t description : " + annot.description());
			}
		}

		for (Method method : utilisateurClass.getDeclaredMethods()) {
			System.out.print("Méthode : " + method.getName());
			assert method.getAnnotations().length == 0 : "Certifie que l'annotation @TODO est bien disparu au runtime";
			System.out.println(", aucune annotation trouvée");
		}

		assert utilisateurClass.getAnnotations().length == 0 : "Certifie que l'annotation @Auteur est bien disparu au runtime";

		System.out.println(
			"Total des annotations trouvées sur les champs : " +
				Arrays.stream(utilisateurClass.getDeclaredFields()).map(
					field -> field.getAnnotations().length
				).reduce(0, Integer::sum)
		);
	}
}
