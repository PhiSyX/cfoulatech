public class Dragonling extends Monster
{
	public Dragonling(int baseStrength, int baseEndurance, int x, int y)
	{
		super(baseStrength, baseEndurance + 1, x, y);
		Dice d6 = new Dice(1, 6);
		Dice d4 = new Dice(1, 4);
		this.gold = d6.roll();
		this.leather = d4.roll();
	}
}
