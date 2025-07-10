package exo.restaurant.exceptions;

public class CommandeImpossibleException extends RuntimeException
{
	public CommandeImpossibleException(String message)
	{
		super(message);
	}
}
