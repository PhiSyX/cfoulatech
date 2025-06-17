package basics.primitive_types;

public class FixedArrayType
{
	public static void main(String[] args)
	{
		int[] ages = new int[5];
		ages[0] = 25;
		ages[1] = 30;
		ages[2] = 22;
		ages[3] = 35;
		ages[4] = 28;

		char[] str1 = new char[4];
		str1[0] = 'c';
		str1[1] = 'h';
		str1[2] = 'a';
		str1[3] = 'r';
		System.out.println(str1);

		int[] notes = {15, 18, 12, 16, 14};
		for (int note : notes) {
			System.out.println(note);
		}

		String[] firstnames = {"Alice", "Bob", "Charlie", "Diana"};
		for (String firstname : firstnames) {
			System.out.println(firstname);
		}

		double[] prices = {19.99, 25.50, 12.75};
		for (double price : prices) {
			System.out.println(price);
		}

		char[] str2 = {'c', 'h', 'a', 'r'};
		System.out.println(str2);

		boolean[] responses = new boolean[]{true, false, true, true, false};
		for (boolean response : responses) {
			System.out.println(response);
		}

		int[][] arrayMulti1 = new int[2][3];
		int[][] arrayMulti2 = {{1, 2, 3}, {4, 5, 6}};
	}
}
