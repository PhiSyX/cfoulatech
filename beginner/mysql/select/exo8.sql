SELECT firstname,lastname FROM users ORDER BY firstname ASC;
SELECT lastname,date_of_birth FROM users ORDER BY date_of_birth DESC LIMIT 3;
SELECT firstname,lastname,city FROM users ORDER BY city DESC LIMIT 1,4;
SELECT lastname,gender FROM users ORDER BY gender ASC, lastname DESC;
