package exo.basics.array;

import java.util.Random;
import java.util.Scanner;

public class Pawns
{
	public static void main(String[] args)
	{
		Pawns pawns = new Pawns((byte) 10)
			.withRandomCoins()
			.withRandomWalls();

		if (pawns.run()) {
			System.out.println("Bravo, vous avez gagné.");
		} else {
			System.out.println("Partie non terminée, vous avez quitté le jeu.");
		}
	}

	private static final char CURR = '*';
	private static final char COIN = '€';
	private static final char WALL = '#';

	private final char[][] grid;
	private final int[] currentUserPosition = {0, 0};

	private int totalCoins = 0;

	public Pawns(byte size)
	{
		grid = new char[size][size];
	}

	public Pawns withRandomCoins()
	{
		Random rand = new Random();

		totalCoins = rand.nextInt(5, grid.length);

		for (int i = 0; i < totalCoins; i++) {
			int r = rand.nextInt(grid.length);
			int c = rand.nextInt(grid.length);
			grid[r][c] = Pawns.COIN;
		}

		return this;
	}

	public Pawns withRandomWalls()
	{
		Random rand = new Random();

		for (int i = 0; i < rand.nextInt(5, grid.length); i++) {
			int r = rand.nextInt(grid.length);
			int c = rand.nextInt(grid.length);
			if (grid[r][c] == Pawns.COIN) {
				r -= 1;
				if (r <= 0) {
					r += 2;
				}
				c -= 1;
				if (c <= 0) {
					c += 2;
				}
			}
			grid[r][c] = Pawns.WALL;
		}

		return this;
	}

	public void displayGrid()
	{
		StringBuilder stringBuilder = new StringBuilder();

		stringBuilder.append("°\t|");
		for (int col = 0; col < grid.length; col++) {
			stringBuilder.append("\t ").append(col);
		}

		stringBuilder.append('\n');

		for (int row = 0; row < grid.length; row++) {
			stringBuilder.append(row).append("\t|  ");

			for (int col = 0; col < grid[row].length; col++) {
				if (row == currentUserPosition[0] && col == currentUserPosition[1]) {
					stringBuilder.append('\t').append("\uD83E\uDD16");
				} else if (grid[row][col] != Character.UNASSIGNED) {
					String c = grid[row][col] == Pawns.COIN ? "\uD83D\uDCB2" : "\uD83D\uDED1";
					stringBuilder.append('\t').append(c);
				} else {
					stringBuilder.append('\t').append("▫️️");
				}
			}

			stringBuilder.append("\n");
		}

		System.out.println(stringBuilder);
	}

	public boolean isWin()
	{
		return totalCoins <= 0;
	}

	public boolean run()
	{
		Scanner input = new Scanner(System.in);

		displayGrid();

		while (!isWin()) {
			System.out.print("Mouvements - TOP, RIGHT, BOTTOM, LEFT : ");

			String[] parts = input.nextLine().trim().split("\\s");

			String movement = parts[0];
			int count = switch (parts.length) {
				case int n when n > 1 -> Integer.parseInt(parts[1]);
				default -> 1;
			};

			System.out.println();

			switch (movement.toLowerCase()) {
				case "top", "t", "haut", "h" -> moveToTop(count);
				case "right", "r", "droite", "droit", "d" -> moveToRight(count);
				case "bottom", "b", "bas" -> moveToBottom(count);
				case "left", "l", "gauche", "g" -> moveToLeft(count);

				case "quit", "q" -> {
					input.close();
					return false;
				}

				default -> {
					System.out.println("Ce mouvement est incorrect.");
					continue;
				}
			}

			displayGrid();
		}

		input.close();
		return true;
	}

	private boolean isCoin()
	{
		int r = currentUserPosition[0];
		int c = currentUserPosition[1];
		return grid[r][c] == Pawns.COIN;
	}

	private boolean isWall()
	{
		int r = currentUserPosition[0];
		int c = currentUserPosition[1];
		return grid[r][c] == Pawns.WALL;
	}

	private void moveToDec(int count, int idx)
	{
		for (int i = 0; i < count; i++) {
			int prev = currentUserPosition[idx];

			currentUserPosition[idx] -= 1;

			if (currentUserPosition[idx] < 0) {
				currentUserPosition[idx] = 0;
			}

			if (isWall()) {
				currentUserPosition[idx] = prev;
				break;
			} else if (isCoin()) {
				grid[currentUserPosition[0]][currentUserPosition[1]] = Character.UNASSIGNED;
				totalCoins -= 1;
			}
		}
	}

	private void moveToInc(int count, int idx)
	{
		for (int i = 0; i < count; i++) {
			int prev = currentUserPosition[idx];

			currentUserPosition[idx] += 1;

			if (currentUserPosition[idx] > grid.length - 1) {
				currentUserPosition[idx] = grid.length - 1;
			}

			if (isWall()) {
				currentUserPosition[idx] = prev;
				break;
			} else if (isCoin()) {
				grid[currentUserPosition[0]][currentUserPosition[1]] = Character.UNASSIGNED;
				totalCoins -= 1;
			}
		}
	}

	private void moveToTop(int count)
	{
		moveToDec(count, 0);
	}

	private void moveToRight(int count)
	{
		moveToInc(count, 1);
	}

	private void moveToBottom(int count)
	{
		moveToInc(count, 0);
	}

	private void moveToLeft(int count)
	{
		moveToDec(count, 1);
	}
}
