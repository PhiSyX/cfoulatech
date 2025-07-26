import java.util.*;

public class Game
{
	private final GameBoard board;
	private final Scanner scanner = new Scanner(System.in);

	public Game(GameBoard board)
	{
		this.board = board;
	}

	public void start()
	{
		while (!board.getHero().isDead() && !board.allMonstersDead()) {
			board.printBoard();
			System.out.println("Move (WASD): ");
			String move = scanner.nextLine().toUpperCase();
			moveHero(move);

			Monster m = board.getAdjacentMonster();
			if (m != null) {
				System.out.println("Combat started with " + m.getClass().getSimpleName());
				fight(m);
				if (!board.getHero().isDead()) {
					board.getHero().rest();
					System.out.println("Hero rests and recovers HP.");
				}
			}
		}
		if (board.getHero().isDead())
			System.out.println("Hero died! Game over.");
		else
			System.out.println("All monsters defeated! Victory!");
	}

	private void moveHero(String move)
	{
		int x = board.getHero().getX();
		int y = board.getHero().getY();
		int size = board.getSize();
		switch (move) {
			case "W":
				if (x > 0) board.getHero().x--;
				break;
			case "S":
				if (x < size - 1) board.getHero().x++;
				break;
			case "A":
				if (y > 0) board.getHero().y--;
				break;
			case "D":
				if (y < size - 1) board.getHero().y++;
				break;
		}
	}

	private void fight(Monster m)
	{
		Hero h = board.getHero();
		while (!h.isDead() && !m.isDead()) {
			int dmg = h.attack();
			m.takeDamage(dmg);
			System.out.println("Hero hits for " + dmg + " damage. Monster HP: " + m.getHp());
			if (m.isDead()) break;
			int mdmg = m.attack();
			h.takeDamage(mdmg);
			System.out.println("Monster hits for " + mdmg + " damage. Hero HP: " + h.getHp());
		}
		if (m.isDead()) {
			System.out.println("Monster defeated!");
			if (m.getGold() > 0) {
				h.lootGold(m.getGold());
				System.out.println("Hero loots " + m.getGold() + " gold.");
			}
			if (m.canBeSkinned()) {
				h.lootLeather(m.getLeather());
				System.out.println("Hero skins and gets " + m.getLeather() + " leather.");
			}
		}
	}
}
