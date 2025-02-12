DELIMITER $$

CREATE PROCEDURE setCounter(
	INOUT counter INT,
    IN step INT
)
BEGIN
	SET counter = counter + step;
END$$

DELIMITER ;
