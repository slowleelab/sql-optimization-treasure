-- ============================================================
-- 造数据: 20 万订单数据
-- ============================================================

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_seed_order_index $$
CREATE PROCEDURE sp_seed_order_index()
BEGIN
    DECLARE i INT DEFAULT 0;
    SET autocommit = 0;

    WHILE i < 200000 DO
        INSERT INTO t_order_index (user_id, order_no, status, created_at)
        VALUES (
            FLOOR(1 + RAND() * 100000),
            CONCAT('NO', LPAD(i, 10, '0')),
            FLOOR(RAND() * 4),
            NOW() - INTERVAL FLOOR(RAND() * 730) DAY
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

CALL sp_seed_order_index();
DROP PROCEDURE IF EXISTS sp_seed_order_index;

SELECT COUNT(*) AS total_rows FROM t_order_index;
