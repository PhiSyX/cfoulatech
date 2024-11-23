<?php

while (true) {
	$word = readline("Veuillez entrer un mot : ");

	if (is_palindrome(strtolower($word))) {
		echo "Il s'agit d'un palindrome\n";
	} else {
		echo "Il ne s'agit pas d'un palindrome\n";
	}
}

function is_palindrome(string $word, int $index = 0)
{
	$word_size = strlen($word);

	return (
		$index < 0 ||
		$index >= $word_size >> 1 ||
		$word[$index] === $word[$word_size - 1 - $index] &&
		is_palindrome($word, ++$index)
	);
}
