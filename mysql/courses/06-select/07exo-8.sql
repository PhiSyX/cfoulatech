-- 8) Afficher les femmes qui sont né entre le 15ème et le 30ème jour du mois.
SELECT firstname,lastname
FROM users
WHERE gender = 'F'
	AND (
		DAY(date_of_birth) BETWEEN 15 AND 30
	);
