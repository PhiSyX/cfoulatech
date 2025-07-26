import java.util.*;

public class Main
{
	public static void main(String[] args)
	{
		Dice d6 = new Dice(1, 6);

		// Create hero (choose Human or Dwarf)
		int[] heroStats = rollStats(d6);
		Hero hero = new Human(heroStats[0], heroStats[1], 0, 0); // or new Dwarf(...)

		// Create monsters
		List<Monster> monsters = new ArrayList<>();
		Random rand = new Random();
		int[][] positions = generateMonsterPositions(10, 15, 2);

		for (int i = 0; i < 10; i++) {
			int[] stats = rollStats(d6);
			int x = positions[i][0], y = positions[i][1];
			switch (i % 3) {
				case 0:
					monsters.add(new Wolf(stats[0], stats[1], x, y));
					break;
				case 1:
					monsters.add(new Orc(stats[0], stats[1], x, y));
					break;
				case 2:
					monsters.add(new Dragonling(stats[0], stats[1], x, y));
					break;
			}
		}

		GameBoard board = new GameBoard(hero, monsters);
		Game game = new Game(board);
		game.start();
	}

	private static int[] rollStats(Dice d6)
	{
		int[] rolls = new int[4];
		for (int i = 0; i < 4; i++) rolls[i] = d6.roll();
		Arrays.sort(rolls);
		int sum = rolls[1] + rolls[2] + rolls[3];
		return new int[]{sum, sum};
	}

	private static int[][] generateMonsterPositions(int count, int size, int minDist)
	{
		Random rand = new Random();
		int[][] pos = new int[count][2];
		int idx = 0;
		while (idx < count) {
			int x = rand.nextInt(size);
			int y = rand.nextInt(size);
			boolean ok = true;
			for (int i = 0; i < idx; i++) {
				if (Math.abs(pos[i][0] - x) < minDist && Math.abs(pos[i][1] - y) < minDist) {
					ok = false;
					break;
				}
			}
			if (ok && (x != 0 || y != 0)) {
				pos[idx][0] = x;
				pos[idx][1] = y;
				idx++;
			}
		}
		return pos;
	}
}
