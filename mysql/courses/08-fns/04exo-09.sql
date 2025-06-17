-- 4) Format 07/07/2007
SELECT
    CONCAT(lastname, ' ', firstname) AS "Nom complet",
    DATE_FORMAT(date_of_birth, "%m/%d/%Y") AS "Date formatée"
FROM users;
