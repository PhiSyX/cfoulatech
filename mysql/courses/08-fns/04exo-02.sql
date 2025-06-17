-- Enlevez 15 mois à tous les autres(X).
UPDATE users
SET date_of_birth = DATE_SUB(date_of_birth, INTERVAL 15 MONTH)
WHERE gender = 'X';
