package basics.types;

public class StringBuilderType
{
	public static void main(String[] args)
	{
		// Bad
		long debug = System.currentTimeMillis();
		String res = "";
		for (int i = 0; i < 400_000; i++) {
			res += "A";
		}
		long fin = System.currentTimeMillis();
		System.out.println(fin - debug + "ms");

		// Good (Non Thread Safe)
		debug = System.currentTimeMillis();
		StringBuilder resb = new StringBuilder();
		System.out.println(resb.capacity());
		for (int i = 0; i < 400_000; i++) {
			resb.append("A");
		}
		fin = System.currentTimeMillis();
		System.out.println(fin - debug + "ms");
	}
}
