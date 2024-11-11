SELECT
	COUNT(*) AS le_nombre,
	gender
FROM users
GROUP BY gender;
