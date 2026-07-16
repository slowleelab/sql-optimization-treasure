-- ============================================================
-- 造数据: 先插入 10 万行基础数据
-- ============================================================

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_seed_id_test $$
CREATE PROCEDURE sp_seed_id_test()
BEGIN
    DECLARE i INT DEFAULT 0;
    SET autocommit = 0;

    WHILE i < 100000 DO
        INSERT INTO t_id_test (batch_no, data_value)
        VALUES (
            CONCAT('B', LPAD(FLOOR(i / 1000), 5, '0')),
            CONCAT('val_', LPAD(i, 8, '0'))
        );
        SET i = i + 1;

        IF i % 5000 = 0 THEN
            COMMIT;
        END IF;
    END WHILE;

    COMMIT;
    SET autocommit = 1;
END $$
DELIMITER ;

CALL sp_seed_id_test();
DROP PROCEDURE IF EXISTS sp_seed_id_test;

SELECT COUNT(*) AS total_rows, MIN(id) AS min_id, MAX(id) AS max_id FROM t_id_test;
