-- Modifier le poids de chaque utilisateurs. Le premier et le dernier DOIVENT
-- avoir le même poids.
UPDATE users
SET weight_kg = 80
WHERE id_user IN (1, 8);

-- Pareil que : UPDATE users SET weight_kg = 80  WHERE id_user = 1 OR id_user = 8;
UPDATE users
SET weight_kg = 60
WHERE id_user = 2;

UPDATE users
SET weight_kg = 64
WHERE id_user = 3;

UPDATE users
SET weight_kg = 96
WHERE id_user = 4;

UPDATE users
SET weight_kg = 71
WHERE id_user = 5;

UPDATE users
SET weight_kg = 99
WHERE id_user = 6;

UPDATE users
SET weight_kg = 12
WHERE id_user = 7;
