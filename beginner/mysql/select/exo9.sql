-- Compter tous les genres, en fonction d'un genre.
SELECT COUNT(gender) FROM users WHERE gender = 'X';

-- Donner un alias au compteur
SELECT COUNT(gender) AS total_womans FROM users WHERE gender = 'F';
SELECT COUNT(gender) AS total_mans FROM users WHERE gender = 'M';
