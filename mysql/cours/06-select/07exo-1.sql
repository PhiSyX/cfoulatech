-- 1) Afficher le prénom, genre et date de naissances de tous les hommes sous le
--    format des états-unis qui sont né entre 1989 et 2000.
SELECT
    firstname,
    lastname,
    gender,
    DATE_FORMAT(date_of_birth, GET_FORMAT(DATE, "USA")) AS date_usa
FROM users
WHERE gender = 'M'
  AND (
    YEAR(date_of_birth) BETWEEN 1980 AND 2000
  );
