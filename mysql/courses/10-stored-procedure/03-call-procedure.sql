-- Appeler une procédure
CALL <procedure-name>();

-- Appeler une procédure avec un paramètre
CALL <procedure-name>(42);

-- Récupérer les sorties des procédures
CALL <procedure-name>(@out_variable_name);
SELECT @out_variable_name;

-- Appeler une procédure avec un paramètre et retourner la sortie dans ce paramètre.
SET @inout_var = "Mike";
CALL <procedure-name>(@inout_var);
SELECT @inout_var;
