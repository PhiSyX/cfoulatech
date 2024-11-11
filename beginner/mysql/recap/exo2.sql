-- Sélectionner les utilisateurs qui ont comme nom soit Bond, soit Bauer, soit
-- Knowles ou Croft et qui pèse moins de 85kg et trier les par leur prénom par
-- ordre croissant.
SELECT
	*
FROM users
WHERE lastname IN('Bond', 'Bauer', 'Knowles', 'Croft')
  AND weight_kg < 85
ORDER BY firstname ASC;
