-- Sélectionner les 6 premiers utilisateurs qui ont comme ID soit 1, soit 3,
-- soit 5 ou 7, ou qui soient des hommes ou des non-binaires.
SELECT
	*
FROM users
WHERE id_user IN (1, 3, 5, 7)
   OR gender IN ('M', 'X')
LIMIT 6;
