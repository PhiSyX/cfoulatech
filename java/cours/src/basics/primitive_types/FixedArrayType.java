package basics.primitive_types;

public class FixedArrayType
{
	public static void main(String[] args)
	{
		char[] str1 = new char[4];
		str1[0] = 'c';
		str1[1] = 'h';
		str1[2] = 'a';
		str1[3] = 'r';
		System.out.println(str1);

		char[] str2 = {'c', 'h', 'a', 'r'};
		System.out.println(str2);
	}
}
