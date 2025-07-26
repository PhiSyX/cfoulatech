import java.util.ArrayList;
import java.util.List;

public class GameBoard
{
	private final int size = 15;
	private final char[][] board = new char[size][size];
	private Hero hero;
	private final List<Monster> monsters = new ArrayList<>();

	public GameBoard(Hero hero, List<Monster> monsters)
	{
		this.hero = hero;
		this.monsters.addAll(monsters);
		updateBoard();
	}

	public void updateBoard()
	{
		for (int i = 0; i < size; i++)
			for (int j = 0; j < size; j++)
				board[i][j] = '.';

		board[hero.getX()][hero.getY()] = 'H';
		for (Monster m : monsters) {
			if (!m.isDead())
				board[m.getX()][m.getY()] = getMonsterSymbol(m);
		}
	}

	private char getMonsterSymbol(Monster m)
	{
		if (m instanceof Wolf) return 'L';
		if (m instanceof Orc) return 'O';
		if (m instanceof Dragonling) return 'D';
		return '?';
	}

	public void printBoard()
	{
		updateBoard();
		for (int i = 0; i < size; i++) {
			for (int j = 0; j < size; j++)
				System.out.print(board[i][j] + " ");
			System.out.println();
		}
	}

	public Monster getAdjacentMonster()
	{
		for (Monster m : monsters) {
			if (m.isDead()) continue;
			int dx = Math.abs(hero.getX() - m.getX());
			int dy = Math.abs(hero.getY() - m.getY());
			if ((dx == 1 && dy == 0) || (dx == 0 && dy == 1))
				return m;
		}
		return null;
	}

	public boolean allMonstersDead()
	{
		for (Monster m : monsters)
			if (!m.isDead()) return false;
		return true;
	}

	public Hero getHero()
	{
		return hero;
	}

	public List<Monster> getMonsters()
	{
		return monsters;
	}

	public int getSize()
	{
		return size;
	}
}
