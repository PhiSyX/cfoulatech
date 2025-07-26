public abstract class Character
{
	protected final int strength;
	protected final int endurance;
	protected int hp;
	protected int x, y;

	public Character(int strength, int endurance, int x, int y)
	{
		this.strength = strength;
		this.endurance = endurance;
		this.x = x;
		this.y = y;
		this.hp = endurance + getModifier(endurance);
	}

	public int getStrength()
	{
		return strength;
	}

	public int getEndurance()
	{
		return endurance;
	}

	public int getHp()
	{
		return hp;
	}

	public int getX()
	{
		return x;
	}

	public int getY()
	{
		return y;
	}

	public boolean isDead()
	{
		return hp <= 0;
	}

	public static int getModifier(int value)
	{
		if (value < 5) return -1;
		if (value < 10) return 0;
		if (value < 15) return 1;
		return 2;
	}

	public void takeDamage(int dmg)
	{
		hp -= dmg;
	}

	public int attack()
	{
		Dice d4 = new Dice(1, 4);
		return d4.roll() + getModifier(strength);
	}
}
