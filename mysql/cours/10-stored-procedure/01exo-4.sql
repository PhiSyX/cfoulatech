DELIMITER $$

CREATE OR REPLACE PROCEDURE incrementCounter(
	inout counter int,
    in step tinyint
)
BEGIN
	SET counter = counter + step;
END$$

CREATE OR REPLACE PROCEDURE decrementCounter(
	inout counter int,
    in step tinyint
)
BEGIN
	SET counter = counter - step;
END$$

DELIMITER ;

--
-- Application des procédures
--

SET @counter = 1;

CALL incrementCounter(@counter, 3);
SELECT @counter; -- 4

CALL decrementCounter(@counter, 2);
SELECT @counter; -- 2
