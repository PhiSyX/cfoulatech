package exceptions;

public class TryCatchFinally
{
	public static void main(String[] args)
	{
		try {
			System.out.println("1. Try");
		} catch (Exception e) {
			System.out.println("2. Catch"); // Non exécuté, car pas de throw
		} finally {
			System.out.println("3. Finally");
		}

		System.out.println();
		System.out.println();
		System.out.println();

		try {
			throw new IllegalArgumentException("Try");
//			System.out.println("1. Try"); // Non exécuté, car throw
		} catch (Exception e) {
			System.out.println("2. Catch");
		} finally {
			System.out.println("3. Finally");
		}
	}
}
