package exo.basics.loop;

public class DrawForm
{
	public static void main(String[] args)
	{
		byte totalSize = 5;
		int[][] grid = new int[totalSize][totalSize];

		// Carré
		for (int i = 0; i < grid.length; i++) {
			for (int j = 0; j < grid[i].length; j++) {
				System.out.print("* ");
			}
			System.out.println('*');
		}

		System.out.println();

		// Triangle
		/*
		for (int i = 0; i <= grid.length; i++) {
			for (int j = 0; j < i; j++) {
				System.out.print("* ");
			}
			System.out.println();
		}
		*/

		for (int i = 0; i <= grid.length; i++) {
			System.out.println("* ".repeat(i));
		}

		System.out.println();

		// Carré (outline)
		/*
		for (int i = 0; i < grid.length; i++) {
			for (int j = 0; j < grid[i].length; j++) {
				if (i == 0 || i == grid.length - 1 || j == 0 || j == grid[i].length - 1) {
					System.out.print("# ");
				} else {
					System.out.print("  ");
				}
			}
			System.out.println();
		}
		*/

		for (int i = 0; i < grid.length; i++) {
			if (i == 0 || i == grid.length - 1) {
				System.out.print("# ".repeat(grid.length));
			} else {
				System.out.print("# ");
				System.out.print("  ".repeat(grid.length - 2));
				System.out.print("# ");
			}
			System.out.println();
		}

		System.out.println();

		// Croix
		for (int i = 0; i < grid.length; i++) {
			for (int j = 0; j < grid[i].length; j++) {
				if (i == j || i + j == grid[i].length - 1) {
					System.out.print("# ");
				} else {
					System.out.print("  ");
				}
			}
			System.out.println();
		}

		System.out.println();

		// Carré sans les diagonales
		for (int i = 0; i < grid.length; i++) {
			for (int j = 0; j < grid[i].length; j++) {
				if (i == 0 || i == grid.length - 1) {
					if (j >= 1 && j <= grid[i].length - 2) {
						System.out.print("# ");
					} else {
						System.out.print("  ");
					}
					continue;
				}

				if (i % 2 == 1) {
					if (j % 2 == 0) {
						System.out.print("# ");
					} else {
						System.out.print("  ");
					}
					continue;
				}

				if (j != 2) {
					System.out.print("# ");
				} else {
					System.out.print("  ");
				}
			}

			System.out.println();
		}

		System.out.println();

		// Triangle inversé
		for (int i = 0; i < grid.length; i++) {
			for (int j = grid[i].length; j > i; j--) {
				System.out.print("# ");
			}
			System.out.println();
		}
	}
}
