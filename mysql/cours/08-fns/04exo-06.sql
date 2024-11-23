-- 1) Format 7th Jul 2007
SELECT
    CONCAT(lastname, ' ', firstname) AS "Nom complet",
    DATE_FORMAT(date_of_birth, "%D %b %Y") AS "Date formatée"
FROM users;
