package enums;

public class Planning
{
	public static void main(String[] args)
	{
		Planning planning = new Planning();
		planning.addCourse(Day.MONDAY, "Java");
		planning.addCourse(Day.FRIDAY, "Spring");

		StatusCommand status = StatusCommand.CONFIRMED;

		System.out.println(status.name());
		System.out.println(status.ordinal());

		for (StatusCommand s : StatusCommand.values()) {
			System.out.println(s);
		}
	}

	public void addCourse(Day jour, String course)
	{
		System.out.println("Cours de " + course + " le " + jour);
	}
}
