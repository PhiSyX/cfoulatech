-- Ajouter quatres utilisateurs différents dont une femme, un homme et deux
-- non-binaires. Deux venants de Bruxelles, deux venants d'Anvers. Deux sont nés
-- avant 2000, deux après 2000. Donner leur tous des poids et date de naissance
-- différentes.

INSERT INTO users 
    (firstname, lastname, gender, date_of_birth, city, weight_kg)
VALUES
    ('Whitney', 'Houston', 'F', '1963-08-09', 'Bruxelles', 62),
    ('Lionel', 'Messi', 'M', '1987-06-24', 'Bruxelles', 67),
    ('Miley', 'Cyrus', 'X', '2002-11-02', 'Anvers', 54),
    ('Sam', 'Smith', 'X', '2015-05-19', 'Anvers', 78)
;
