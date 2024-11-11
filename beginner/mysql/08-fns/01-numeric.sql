SELECT
	MAX(date_of_birth)
FROM users;

SELECT
	MAX(date_of_birth),
	gender
FROM users
GROUP BY gender;
