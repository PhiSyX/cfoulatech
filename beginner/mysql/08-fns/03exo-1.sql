-- 1) Affichez les utilisateurs qui sont né à Bruxelles ou à Anvers ou à London
--    ou à New-York. Je veux une colonne en plus avec comme nom « Voici le
--    genre, la ville et le poids » ainsi que leurs données séparées par des
--    virgules et un espace. Pour le poids, je veux en kilos
SELECT
	*,
	CONCAT (gender, ', ', city, ',', weight_kg, 'kg') AS "Voici le genre, la ville et le poids"
FROM users
WHERE
	city IN (
		'Anvers',
		'Bruxelles',
		'London',
		'New-York',
		'New York'
	);
