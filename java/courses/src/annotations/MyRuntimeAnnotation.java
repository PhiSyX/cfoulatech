package annotations;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME) // Conservée pour la réflexion
public @interface MyRuntimeAnnotation
{
}
