package enums;

public enum StatusCommand
{
	PENDING,
	CONFIRMED,
	EXPEDITED,
	DELIVERED,
}

class Command
{
	private StatusCommand status;

	public void setStatus(StatusCommand command)
	{
		this.status = command;
	}
}
