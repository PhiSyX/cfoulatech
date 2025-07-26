import java.util.ArrayList;
import java.util.List;

public class Main
{
	public static void main(String[] args)
	{
		int laps = 5;
		double lapDistanceKm = 4.5;

		List<Car> cars = new ArrayList<>();
		cars.add(new Car("Ferrari", "F8", 180, 320));
		cars.add(new Car("Porsche", "911", 170, 310));
		cars.add(new Car("Lamborghini", "Huracan", 190, 330));
		cars.add(new Car("Mercedes", "AMG GT", 175, 305));

		Race race = new Race(cars, laps, lapDistanceKm);
		race.start();

		Car winner = race.getWinner();
		System.out.printf("Winner: %s %s with total time: %.2f seconds\n",
			winner.getBrand(), winner.getModel(), winner.getTotalTime());
	}
}
