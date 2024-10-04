-- Ordonner les lignes en fonction des champs par ordre croissant (ASC)
SELECT * FROM users ORDER BY firstname,lastname ASC

-- On peut retirer toutefois le mot-clé ASC car il s'agit comportement par défaut.
SELECT * FROM users ORDER BY lastname --- fin
--                  ^^^^^^^^          ^^^ : sans rien, revient à avoir un ordre
--                                          croissant par défaut (ASC).

