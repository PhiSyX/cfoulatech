-- 1. Afficher le status d'une procédure
SHOW PROCEDURE STATUS LIKE  '<procedure-name>';   -- ex: 'getListUsers'
SHOW PROCEDURE STATUS LIKE  '%<procedure-name>';  -- ex: '%users'
SHOW PROCEDURE STATUS LIKE  '<procedure-name>%';  -- ex: 'user%'
SHOW PROCEDURE STATUS LIKE '%<procedure-name>%'; -- ex: '%user%'

-- 2. Afficher les status de toutes les procédures
SHOW PROCEDURE STATUS WHERE DB = '<database>';

-- 3. Retrouver la commande de création d'une procedure
--    Attention: il n'y a pas besoin des guillemets pour cette commande.
SHOW CREATE PROCEDURE <procedure-name>;
