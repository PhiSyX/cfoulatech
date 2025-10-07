package be.cfoulatech.course.domain.exception;

public class EmailAlreadyExistsException extends Exception
{
	public EmailAlreadyExistsException()
	{
		super("L'email existe déjà !");
	}
}
