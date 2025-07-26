public abstract class Monster extends Character
{
	protected int gold = 0;
	protected int leather = 0;

	public Monster(int strength, int endurance, int x, int y)
	{
		super(strength, endurance, x, y);
	}

	public int getGold()
	{
		return gold;
	}

	public int getLeather()
	{
		return leather;
	}

	public boolean canBeSkinned()
	{
		return leather > 0;
	}
}
