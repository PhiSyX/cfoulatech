-- Afficher les utilisateurs nés avant le 15 janvier 1999 et ayant plus de 65kg
-- du plus lourd ou moins lourd
SELECT *
FROM users
WHERE date_of_birth < "1999-01-15"
  AND weight_kg > 65
ORDER BY weight_kg DESC;
