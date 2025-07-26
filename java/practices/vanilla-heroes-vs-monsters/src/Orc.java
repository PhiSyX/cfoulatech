public class Orc extends Monster
{
	public Orc(int baseStrength, int baseEndurance, int x, int y)
	{
		super(baseStrength + 1, baseEndurance, x, y);
		Dice d6 = new Dice(1, 6);
		this.gold = d6.roll();
	}
}
