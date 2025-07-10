package exo.restaurant;

import java.util.ArrayList;
import java.util.List;

public class LogsManager
{
	private static List<String> logs = new ArrayList<>();

	public static void ajouterLog(String message)
	{
		logs.add(message);
	}

	public static void afficherEtViderLogs()
	{
		logs.forEach(System.out::println);
		logs.clear();
	}
}
