package date_time;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class LocalDateClass
{
	public static void main(String[] args)
	{
		LocalDate today = LocalDate.now();
		LocalDate birth = LocalDate.of(1991, 7, 12);

		System.out.println(today);
		System.out.println(birth);

		int year = birth.getYear();
		int month = birth.getMonthValue();
		int day = birth.getDayOfMonth();

		System.out.println(year);
		System.out.println(month);
		System.out.println(day);

		// French format
		DateTimeFormatter frenchFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		System.out.println(birth.format(frenchFormatter));

		// Parsing
		LocalDate date1 = LocalDate.parse("2025-07-15");
		System.out.println(date1);

		// Add, Sub, etc...
		LocalDate date2 = date1.plusDays(10);
		System.out.println(date2);
		LocalDate date3 = date2.minusMonths(1);
		System.out.println(date3);

		// Comparaison
		System.out.println(date2.isBefore(date3));
		System.out.println(date3.isBefore(date2));
	}
}
