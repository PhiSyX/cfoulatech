package exo.annotations.validation;

import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface Configuration
{
	String valeur();

	String description() default "Config par défaut";
}
