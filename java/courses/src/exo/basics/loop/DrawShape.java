package exo.basics.loop;

public class DrawShape
{
	public static void main(String[] args)
	{
		/*
		System.out.print("Entrer un hauteur : ");
		Scanner userInput = new Scanner(System.in);
		byte height = Byte.parseByte(
			userInput.nextLine()
				.replaceAll("[a-zA-Z\\s,.]+.*", "")
		);
		*/
		byte height = 5;

//		a_square(height);
//		b_square_outline(height);
//		c_square_with_diagonals(height);
//		d_square_without_diagonals(height);
//		e_triangles_tlbr(height);
//		f_triangles_bltr(height);
//		g_triangles_trbl(height);
//		h_triangles_brtl(height);
//		height = 9;
//		i_triangles_tb(height);
//		j_hourglass(height);
	}

	private static void a_square(int h)
	{
		// Solution 1
//		for (int i = 0; i < h; i++) {
//			for (int j = 0; j < h; j++) {
//				System.out.print("* ");
//			}
//			System.out.println('*');
//		}

		// Solution 2
		System.out.println(("* ".repeat(h) + "\n").repeat(h));
		System.out.println();
	}

	private static void b_square_outline(byte h)
	{
		// Solution 1
//		for (int i = 0; i < h; i++) {
//			for (int j = 0; j < h; j++) {
//				if (i == 0 || i == h - 1 || j == 0 || j == h - 1) {
//					System.out.print("# ");
//				} else {
//					System.out.print("  ");
//				}
//			}
//			System.out.println();
//		}

		// Solution 2
		for (int i = 0; i < h; i++) {
			if (i == 0 || i == h - 1) {
				System.out.println("# ".repeat(h));
				continue;
			}

			System.out.print("# ");
			System.out.print("  ".repeat(h - 2));
			System.out.print("# ");
			System.out.println();
		}

		System.out.println();
	}

	private static void c_square_with_diagonals(byte h)
	{
		// Solution 1
//		for (int i = 0; i < h; i++) {
//			for (int j = 0; j < h; j++) {
//				if (i == j || i + j == h - 1) {
//					System.out.print("#\t");
//				} else {
//					System.out.print("\t");
//				}
//			}
//			System.out.println();
//		}

		// Solution 2
		for (int i = 0, j = h - 1; i < h; i++, j--) {
			int space1 = (j - i < 0) ? j : i;
			int space2 = (j - i < 0) ? i - j : j - i;

			System.out.print("\t".repeat(space1));
			System.out.print("#");
			System.out.print("\t".repeat(space2));
			System.out.print("#");
			System.out.println();
		}

		System.out.println();
	}

	private static void d_square_without_diagonals(byte h)
	{
		// Solution 1
		for (int i = 0; i < h; i++) {
			for (int j = 0; j < h; j++) {
				if (!(i == j || i + j == h - 1)) {
					System.out.print("# ");
				} else {
					System.out.print("  ");
				}
			}

			System.out.println();
		}

		System.out.println();
	}

	private static void e_triangles_tlbr(byte h)
	{
		// Solution 1
//		for (int i = 0; i <= h; i++) {
//			for (int j = 0; j < i; j++) {
//				System.out.print("# ");
//			}
//			System.out.println();
//		}

		// Solution 2
		for (int i = 0; i <= h; i++) {
			System.out.println("# ".repeat(i));
		}

		System.out.println();
	}

	private static void f_triangles_bltr(byte h)
	{
		// Solution 1
//		for (int i = 0; i < h; i++) {
//			for (int j = h; j > i; j--) {
//				System.out.print("# ");
//			}
//			System.out.println();
//		}

		// Solution 2
		for (int i = 0; i < h; i++) {
			System.out.println("# ".repeat(h - i));
		}
	}

	private static void g_triangles_trbl(byte h)
	{
		// Solution 1
		/*
		for (int i = 0; i < h; i++) {
			for (int j = h - i - 1; j > 0; j--) {
				System.out.print("  ");
			}
			for (int j = 0; j < i + 1; j++) {
				System.out.print(" #");
			}
			System.out.println();
		}
		*/

		// Solution 2
		for (int i = 0; i < h; i++) {
			System.out.print("  ".repeat(h - i - 1));
			System.out.print("# ".repeat(i + 1));
			System.out.println();
		}

		System.out.println();
	}

	private static void h_triangles_brtl(byte h)
	{
		// Solution 1
//		for (int i = 0; i < h; i++) {
//			for (int j = 0; j < i; j++) {
//				System.out.print("  ");
//			}
//
//			for (int j = h - i; j > 0; j--) {
//				System.out.print(" #");
//			}
//
//			System.out.println();
//		}

		// Solution 2
		for (int i = h; i > 0; i--) {
			System.out.print("  ".repeat(h - i));
			System.out.print("# ".repeat(i));
			System.out.println();
		}

		System.out.println();
	}

	private static void i_triangles_tb(byte h)
	{
		int half = Math.round((float) h / 2);

		for (int i = 1; i < half + 1; i++) {
			for (int j = 0; j < half - i; j++) {
				System.out.print("  ");
			}

			for (int j = 1; j < i * 2; j++) {
				System.out.print("# ");
			}

			for (int j = 0; j < half - i; j++) {
				System.out.print("  ");
			}

			System.out.println();
		}

		System.out.println();
	}

	private static void j_hourglass(byte h)
	{
		for (int i = 0; i < h; i++) {
			for (int j = 0; j < h; j++) {
				if ((j >= i && j <= h - i - 1) || (j <= i && j >= h - i - 1)) {
					System.out.print("# ");
				} else {
					System.out.print("  ");
				}
			}
			System.out.println();
		}
	}
}
