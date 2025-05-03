<?php

if (true) {
	echo "La condition est true, je passe ici";
} else {
	echo "La condition est false, je passe ici";
}

echo "<br>";

if (false) {
	echo "La condition est true, je passe ici";
} else {
	echo "La condition est false, je passe ici";
}

echo "<hr>";

if (false) {
	echo "La condition est true (1), je passe ici";
} elseif (true) {
	echo "La condition est true (2), je passe ici";
} else {
	echo "La condition est false, je passe ici";
}

echo "<hr>";

echo true
	? "La condition est true, je passe ici"
	: "La condition est false, je passe ici";

echo "<br>";

echo false
	? "La condition est true, je passe ici"
	: "La condition est false, je passe ici";

echo "<hr>";

echo "La condition est "
	// Les parenthèses sont importantes.
	. (true ? "true" : "false")
	. ", je passe ici";
