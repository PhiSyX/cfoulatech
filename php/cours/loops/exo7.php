<?php

$user = [
	"firstname" => "Lara",
	"lastname" => "Croft",
	"gender" => "F",
	"dateOfBirth" => "15/03/1995",
	"city" => "London",
];

foreach ($user as $key => $value) {
	echo $key . " : " . $value . "\n";
}
