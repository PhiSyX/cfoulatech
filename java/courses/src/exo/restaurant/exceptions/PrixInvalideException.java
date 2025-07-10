package exo.restaurant.exceptions;

public class PrixInvalideException extends RuntimeException
{
	public PrixInvalideException(String message)
	{
		super(message);
	}
}
