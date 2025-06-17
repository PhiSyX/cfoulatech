-- 5) Format Saturday 7 July 2007
SELECT
    CONCAT(lastname, ' ', firstname) AS "Nom complet",
    DATE_FORMAT(date_of_birth, "%W %e %M %Y") AS "Date formatée"
FROM users;
