-- 3) Format 07 July 2017
SELECT
    CONCAT(lastname, ' ', firstname) AS "Nom complet",
    DATE_FORMAT(date_of_birth, "%d %M %Y") AS "Date formatée"
FROM users;
