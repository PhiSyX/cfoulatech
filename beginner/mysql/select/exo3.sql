-- Sélectionner certains champs d'une table avec une (ou plusieurs) condition(s)
SELECT firstname,lastname FROM users WHERE id_user = 1

SELECT city FROM users WHERE gender = 'F'

SELECT date_of_birth FROM users WHERE firstname = 'Beyonce'
