// Race.java

import java.util.List;

public class Race
{
	private final List<Car> cars;
	private final int laps;
	private final double lapDistanceKm;

	public Race(List<Car> cars, int laps, double lapDistanceKm)
	{
		this.cars = cars;
		this.laps = laps;
		this.lapDistanceKm = lapDistanceKm;
	}

	public void start()
	{
		for (int lap = 1; lap <= laps; lap++) {
			System.out.println("Lap " + lap + ":");
			for (Car car : cars) {
				double lapTime = car.driveLap(lapDistanceKm);
				System.out.printf("  %s %s - Lap time: %.2f seconds\n", car.getBrand(), car.getModel(), lapTime);
			}
			System.out.println();
		}
	}

	public Car getWinner()
	{
		Car winner = cars.get(0);
		for (Car car : cars) {
			if (car.getTotalTime() < winner.getTotalTime()) {
				winner = car;
			}
		}
		return winner;
	}
}
