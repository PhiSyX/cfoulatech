package date_time;

import java.time.ZoneId;
import java.time.ZonedDateTime;

public class ZonedDateTimeClass
{
	public static void main(String[] args)
	{
		ZonedDateTime now = ZonedDateTime.now();
		System.out.println(now);

		ZonedDateTime tokyo = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));
		System.out.println(tokyo);

		ZonedDateTime ny2 = tokyo.withZoneSameInstant(ZoneId.of("America/New_York"));
		System.out.println(ny2);
	}
}
