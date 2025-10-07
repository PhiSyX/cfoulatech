package be.cfoulatech.course.domain.exception;

import java.util.UUID;

public class MemberNotFoundException extends RuntimeException
{
	public MemberNotFoundException(UUID id)
	{
		super("Le membre avec l'ID %s n'existe pas".formatted(id));
	}
}
