public class Wolf extends Monster
{
	public Wolf(int baseStrength, int baseEndurance, int x, int y)
	{
		super(baseStrength, baseEndurance, x, y);
		Dice d4 = new Dice(1, 4);
		this.leather = d4.roll();
	}
}
