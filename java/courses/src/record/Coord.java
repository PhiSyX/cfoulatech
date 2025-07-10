package record;

public record Coord(double lat, double lng)
{
	public static Coord paris()
	{
		return new Coord(48.8566, 2.3522);
	}

	public static void main(String[] args)
	{
		Coord c1 = new Coord(1.1, 1.1);
		System.out.println(c1);

		Coord c2 = Coord.paris();
		System.out.println(c2);
	}
}

