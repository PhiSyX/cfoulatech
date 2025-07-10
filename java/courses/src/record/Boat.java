package record;

public record Boat(
		String name,
		int capacity
)
{
}

class BoatTest
{
	public static void main(String[] args)
	{
		Boat boat = new Boat("Nom", 500);

		System.out.println(boat.name());
		System.out.println(boat.capacity());
	}
}
