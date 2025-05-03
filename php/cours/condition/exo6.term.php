<?php

$user_hour = (int) readline("Entrez une heure : ");

$opening_hours = 8;
$time_to_eat = 12;
$afternoon_hour = 14;
$closing_hour = 18;

if (
	($user_hour > $opening_hours and $user_hour <= $time_to_eat) ||
	($user_hour >= $afternoon_hour && $user_hour < $closing_hour)
) {
	echo "Le magasin sera ouvert à $user_hour heures";
} else {
	echo "Le magasin sera fermé à $user_hour heures";
}
