// Hero.java
public abstract class Hero extends Character
{
	protected int gold = 0;
	protected int leather = 0;

	public Hero(int strength, int endurance, int x, int y)
	{
		super(strength, endurance, x, y);
	}

	public void lootGold(int amount)
	{
		gold += amount;
	}

	public void lootLeather(int amount)
	{
		leather += amount;
	}

	public void rest()
	{
		this.hp = endurance + getModifier(endurance);
	}

	public int getGold()
	{
		return gold;
	}

	public int getLeather()
	{
		return leather;
	}
}
