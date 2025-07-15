package date_time;

import java.time.LocalTime;

public class LocalTimeClass
{
	public static void main(String[] args)
	{
		LocalTime now = LocalTime.now();
		LocalTime noon = LocalTime.of(12, 0);

		System.out.println(now);
		System.out.println(noon);
	}
}
