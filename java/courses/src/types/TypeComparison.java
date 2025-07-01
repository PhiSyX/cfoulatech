package types;

import java.util.Arrays;

public class TypeComparison
{
	public static void main(String[] args)
	{
		int primitiveInt = 1;
		byte primitiveByte = 1;
		System.out.println(primitiveInt == primitiveByte); // true

		String str1 = "hey";
		String str2 = "hey";
		System.out.println(str1 == str2); // true

		String str3 = new String("hey");
		System.out.println(str2 == str3); // false
		System.out.println(str2.equals(str3)); // true

		int[] fixArr1 = new int[5];
		int[] fixArr2 = new int[5];
		System.out.println(fixArr1 == fixArr2); // false
		System.out.println(Arrays.equals(fixArr1, fixArr2)); // true

		int[] fixArr3 = {1, 2, 3};
		int[] fixArr4 = {1, 2, 3};
		System.out.println(fixArr3 == fixArr4); // false
		System.out.println(Arrays.equals(fixArr3, fixArr4)); // true
	}
}
