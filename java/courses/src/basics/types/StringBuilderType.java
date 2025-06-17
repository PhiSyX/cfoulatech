package basics.types;

public class StringBuilderType
{
	public static void main(String[] args)
	{
		// Bad
		long startDebug = System.currentTimeMillis();
		String res = "";
		for (int i = 0; i < 400_000; i++) {
			res += "A";
		}
		long endDebug = System.currentTimeMillis();
		System.out.println(endDebug - startDebug + "ms");

		// Good (Non Thread Safe)
		startDebug = System.currentTimeMillis();
		StringBuilder resb = new StringBuilder();
		System.out.println(resb.capacity());
		for (int i = 0; i < 400_000; i++) {
			resb.append("A");
		}
		endDebug = System.currentTimeMillis();
		System.out.println(endDebug - startDebug + "ms");
	}
}
