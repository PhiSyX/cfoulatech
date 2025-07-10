package exceptions;

public class TryCatch
{
	public static void main(String[] args)
	{
		divRuntimeError(1, 1);

		try {
			divCompiletimeError(1, 0);
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
	}

	public static void divRuntimeError(int a, int b)
	{
		if (b == 0) {
			throw new IllegalArgumentException("Division par zéro !");
		}

		System.out.println(a / b);
	}

	public static void divCompiletimeError(int a, int b) throws Exception
	{
		if (b == 0) {
			throw new Exception("Division par zéro impossible !");
		}

		System.out.println(a / b);
	}
}
