import java.util.Random;

public class Dice
{
	private final int minimum;
	private final int maximum;
	private final Random random = new Random();

	public Dice(int minimum, int maximum)
	{
		this.minimum = minimum;
		this.maximum = maximum;
	}

	public int getMinimum()
	{
		return minimum;
	}

	public int getMaximum()
	{
		return maximum;
	}

	public int roll()
	{
		return random.nextInt(maximum - minimum + 1) + minimum;
	}
}
