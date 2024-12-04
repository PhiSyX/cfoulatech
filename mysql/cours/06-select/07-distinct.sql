SELECT DISTINCT
	city
FROM users;

SELECT DISTINCT
	DATE_FORMAT (date_of_birth, "%d-%m-%Y %H:%i:%s") AS df
FROM users;

SELECT
	DATE_FORMAT (date_of_birth, GET_FORMAT (DATE, "EUR")) AS df_eur
FROM users;
