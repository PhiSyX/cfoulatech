<?php

require_once "./Car.php";

$car1 = new Car("Audi", "Noire", 1750.4, 10_000);
var_dump($car1);

$car2 = new Car(brand: "BMW", weight: 1500.0, color: "Rouge", price: 35_000);
var_dump($car2);

$diff = abs($car1->getPrice() - $car2->getPrice());
if ($car1->isMoreExpensive($car2)) {
	echo "La voiture <strong>" .
		$car1->getColor() .
		"</strong> est plus chère " .
		"que la voiture <strong>" .
		$car2->getColor() .
		"</strong>";
	echo ", Il y a une différence de <strong>$diff</strong>€. <br>";
} else {
	echo "La voiture <strong>" .
		$car2->getColor() .
		"</strong> est plus chère " .
		"que la voiture <strong>" .
		$car1->getColor() .
		"</strong>";
	echo ", Il y a une différence de <strong>$diff</strong>€. <br>";
}
