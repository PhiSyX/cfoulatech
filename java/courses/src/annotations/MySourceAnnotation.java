package annotations;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.SOURCE) // Supprimée après compilation
public @interface MySourceAnnotation
{
}
