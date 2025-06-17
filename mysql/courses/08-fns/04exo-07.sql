-- 2) format 07-07-2007
SELECT
	CONCAT(lastname, ' ', firstname) AS "Nom complet",
	DATE_FORMAT(date_of_birth, "%d-%m-%Y") AS "Date formatée"
FROM users;
