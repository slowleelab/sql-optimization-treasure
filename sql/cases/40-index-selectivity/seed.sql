-- ============================================================
-- 造数据: 20 万订单状态，status 只取 0/1/2（低基数）
-- status 分布: 0 约 30%, 1 约 50%, 2 约 20%
-- ============================================================

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_seed_order_status $$
CREATE PROCEDURE sp_seed_order_status()
BEGIN
    DECLARE i INT DEFAULT 0;
    DECLARE v_status TINYINT;
    SET autocommit = 0;

    WHILE i < 200000 DO
        -- 让 status 分布不均：约 50% 为 1（最大组），单值命中约 10 万行
        SET v_status = ELT(FLOOR(1 + RAND() * 3), 0, 1, 1);

        INSERT INTO t_order_status (order_no, status, user_id, created_at)
        VALUES (
            CONCAT('NO', LPAD(i, 10, '0')),
            v_status,
            FLOOR(1 + RAND() * 50000),
            NOW() - INTERVAL FLOOR(RAND() * 365) DAY
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

CALL sp_seed_order_status();
DROP PROCEDURE IF EXISTS sp_seed_order_status;

SELECT status, COUNT(*) AS cnt FROM t_order_status GROUP BY status;
SELECT COUNT(*) AS total_rows FROM t_order_status;
