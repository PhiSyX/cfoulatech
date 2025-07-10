package exceptions;

import java.net.MalformedURLException;
import java.net.URL;

public class DelegateThrows
{
	public static void main(String[] args)
	{
		readHost();
		try {
			tryReadHost();
		} catch (MalformedURLException e) {
			System.err.println("URL invalide : " + e.getMessage());
		}
	}

	public static void readHost()
	{
		try {
			URL url = new URL("https://google.com");
			System.out.println(url.getHost());
		} catch (MalformedURLException e) {
			System.err.println("URL invalide : " + e.getMessage());
		}
	}

	public static void tryReadHost() throws MalformedURLException
	{
		URL url = new URL("https://google.com");
		System.out.println(url.getHost());
	}
}
