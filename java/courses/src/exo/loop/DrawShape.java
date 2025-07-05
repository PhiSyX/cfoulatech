package exo.loop;

import java.util.Scanner;

public class DrawShape
{
	public static void main(String[] args)
	{
		a_square();
		b_square_outline();
		c_square_with_diagonals();
		d_square_without_diagonals();
		e_triangles_tlbr();
		f_triangles_bltr();
		g_triangles_trbl();
		h_triangles_brtl();
		i_triangles_tb();
		j_hourglass();
		k_bow_tie();
		l_triangles_bt();
	}

	private static byte askHeight()
	{
		System.out.print("Entrer un hauteur (5): ");
		Scanner scan = new Scanner(System.in);

		String userInput = scan.nextLine().replaceAll("[^\\d]+.*", "");

		byte height = 5;

		if (!userInput.isBlank()) {
			height = Byte.parseByte(userInput);
		}

		if (height < 3 || height > 50) {
			height = 5;
		}

		System.out.printf("Hauteur utilisée : %d%n%n", height);

		scan.close();

		return height;
	}

	private static byte askDigit()
	{
		System.out.print("Entrer un chiffre (5): ");
		Scanner scan = new Scanner(System.in);

		String userInput = scan.nextLine().replaceAll("[^\\d]+.*", "");

		byte digit = 5;

		if (!userInput.isBlank()) {
			digit = Byte.parseByte(userInput);
		}

		if (digit < 1 || digit > 9) {
			digit = 5;
		}

		System.out.printf("Chiffre utilisée : %d%n%n", digit);

		scan.close();

		return digit;
	}

	private static void a_square()
	{
		System.out.println(a_square(askHeight()));
	}

	private static StringBuilder a_square(byte h)
	{
		StringBuilder s = new StringBuilder();

		// Solution 1
		for (int i = 0; i < h; i++) {
			for (int j = 0; j < h; j++) {
				s.append("* ");
			}
			s.append('\n');
		}

		s.append('\n').append("--".repeat(h)).append("\n\n");

		// Solution 2
		s.append(("# ".repeat(h) + "\n").repeat(h));

		return s;
	}

	private static void b_square_outline()
	{
		System.out.println(b_square_outline(askHeight()));
	}

	private static StringBuilder b_square_outline(byte h)
	{
		StringBuilder s = new StringBuilder();

		// Solution 1
		for (int i = 0; i < h; i++) {
			for (int j = 0; j < h; j++) {
				if (i == 0 || i == h - 1 || j == 0 || j == h - 1) {
					s.append("* ");
				} else {
					s.append("  ");
				}
			}
			s.append('\n');
		}

		s.append('\n').append("--".repeat(h)).append("\n\n");

		// Solution 2
		for (int i = 0; i < h; i++) {
			if (i == 0 || i == h - 1) {
				s.append("# ".repeat(h)).append('\n');
				continue;
			}

			s.append("# ");
			s.append("  ".repeat(h - 2));
			s.append("# ");
			s.append('\n');
		}

		return s;
	}

	private static void c_square_with_diagonals()
	{
		System.out.println(c_square_with_diagonals(askHeight()));
	}

	private static StringBuilder c_square_with_diagonals(byte h)
	{
		StringBuilder s = new StringBuilder();

		// Solution 1
		for (int i = 0; i < h; i++) {
			for (int j = 0; j < h; j++) {
				if (i == j || i + j == h - 1) {
					s.append("* ");
				} else {
					s.append("  ");
				}
			}
			s.append('\n');
		}

		s.append('\n').append("--".repeat(h)).append("\n\n");

		// Solution 2
		for (int i = 0, j = h - 1; i < h; i++, j--) {
			int space1 = (j - i < 0) ? j : i;
			int space2 = (j - i < 0) ? i - j : j - i;

			s
				.append("  ".repeat(space1))
				.append("#")
				.append("  ".repeat(space2))
				.append("#")
				.append('\n');
		}

		return s;
	}

	private static void d_square_without_diagonals()
	{
		System.out.println(d_square_without_diagonals(askHeight()));
	}

	private static StringBuilder d_square_without_diagonals(byte h)
	{
		StringBuilder s = new StringBuilder();

		for (int i = 0; i < h; i++) {
			for (int j = 0; j < h; j++) {
				if (!(i == j || i + j == h - 1)) {
					s.append("# ");
				} else {
					s.append("  ");
				}
			}
			s.append('\n');
		}

		return s;
	}

	private static void e_triangles_tlbr()
	{
		System.out.println(e_triangles_tlbr(askHeight()));
	}

	private static StringBuilder e_triangles_tlbr(byte h)
	{
		StringBuilder s = new StringBuilder();
		// Solution 1
		for (int i = 0; i <= h; i++) {
			for (int j = 0; j < i; j++) {
				s.append("* ");
			}
			s.append('\n');
		}

		s.append('\n').append("--".repeat(h)).append("\n\n");

		// Solution 2
		for (int i = 0; i <= h; i++) {
			s.append("# ".repeat(i)).append('\n');
		}

		return s;
	}

	private static void f_triangles_bltr()
	{
		System.out.println(f_triangles_bltr(askHeight()));
	}

	private static StringBuilder f_triangles_bltr(byte h)
	{
		StringBuilder s = new StringBuilder();
		// Solution 1
		for (int i = 0; i < h; i++) {
			for (int j = h; j > i; j--) {
				s.append("* ");
			}
			s.append('\n');
		}

		s.append('\n').append("--".repeat(h)).append("\n\n");

		// Solution 2
		for (int i = 0; i < h; i++) {
			s.append("# ".repeat(h - i)).append('\n');
		}

		return s;
	}

	private static void g_triangles_trbl()
	{
		System.out.println(g_triangles_trbl(askHeight()));
	}

	private static StringBuilder g_triangles_trbl(byte h)
	{
		StringBuilder s = new StringBuilder();

		// Solution 1
		for (int i = 0; i < h; i++) {
			for (int j = h - i - 1; j > 0; j--) {
				s.append("  ");
			}
			for (int j = 0; j < i + 1; j++) {
				s.append(" *");
			}
			s.append('\n');
		}

		s.append('\n').append("--".repeat(h)).append("\n\n");

		// Solution 2
		for (int i = 0; i < h; i++) {
			s.append("  ".repeat(h - i - 1));
			s.append("# ".repeat(i + 1));
			s.append('\n');
		}

		return s;
	}

	private static void h_triangles_brtl()
	{
		System.out.println(h_triangles_brtl(askHeight()));
	}

	private static StringBuilder h_triangles_brtl(byte h)
	{
		StringBuilder s = new StringBuilder();
		// Solution 1
		for (int i = 0; i < h; i++) {
			for (int j = 0; j < i; j++) {
				s.append("  ");
			}

			for (int j = h - i; j > 0; j--) {
				s.append(" *");
			}

			s.append('\n');
		}

		s.append('\n').append("--".repeat(h)).append("\n\n");

		// Solution 2
		for (int i = h; i > 0; i--) {
			s.append("  ".repeat(h - i));
			s.append("# ".repeat(i));
			s.append('\n');
		}

		return s;
	}

	private static void i_triangles_tb()
	{
		System.out.println(i_triangles_tb(askHeight()));
	}

	private static StringBuilder i_triangles_tb(byte h)
	{
		StringBuilder s = new StringBuilder();

		int half = Math.round((float) h / 2);

		for (int i = 1; i < half + 1; i++) {
			s.append("  ".repeat(half - i));
			s.append("# ".repeat(i * 2 - 1));
			s.append("  ".repeat(half - i));
			s.append('\n');
		}

		return s;
	}

	private static void j_hourglass()
	{
		System.out.println(j_hourglass(askHeight()));
	}

	private static StringBuilder j_hourglass(byte h)
	{
		StringBuilder s = new StringBuilder();
		for (int i = 0; i < h; i++) {
			for (int j = 0; j < h; j++) {
				if ((j >= i && j <= h - i - 1) || (j <= i && j >= h - i - 1)) {
					s.append("# ");
				} else {
					s.append("  ");
				}
			}
			s.append('\n');
		}
		return s;
	}

	private static void k_bow_tie()
	{
		System.out.println(k_bow_tie(askHeight()));
	}

	private static StringBuilder k_bow_tie(byte h)
	{
		StringBuilder s = new StringBuilder();
		for (int i = 0; i < h; ++i) {
			for (int j = 0; j < h; ++j) {
				if ((j <= i || j >= h - i - 1) && (j >= i || j <= h - i - 1)) {
					s.append("# ");
				} else {
					s.append("  ");
				}
			}
			s.append('\n');
		}
		return s;
	}

	private static void l_triangles_bt()
	{
		System.out.println(l_triangles_bt(askDigit()));
	}

	private static StringBuilder l_triangles_bt(byte h)
	{
		StringBuilder s = new StringBuilder();
		int half = Math.round((float) h / 2);

		// Solution 1
		for (int i = half; i > 0; i--) {
			for (int j = 0; j < half - i; j++) {
				s.append("  ");
			}

			int x2 = i * 2;

			for (int j = 0; j < x2; j++) {
				int n = j >= i ? x2 - j : j + 1;
				s.append(n + " ");
			}

			for (int j = 0; j < half - i; j++) {
				s.append("  ");
			}

			s.append('\n');
		}

		s.append('\n').append("--".repeat(h)).append("\n\n");

		// Solution 2
		for (int i = half; i > 0; i--) {
			StringBuilder builder = new StringBuilder();
			builder.append("  ".repeat(half - i));

			for (int j = 0; j < i; j++) {
				builder.append(j + 1).append(" ");
			}

			s.append(builder).append(builder.reverse().toString().trim()).append('\n');
		}

		return s;
	}
}
