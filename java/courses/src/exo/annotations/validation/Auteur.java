package exo.annotations.validation;

import java.lang.annotation.*;

@Retention(RetentionPolicy.SOURCE)
@Target(ElementType.TYPE)
public @interface Auteur
{
	String nom();

	String email() default "";
}
