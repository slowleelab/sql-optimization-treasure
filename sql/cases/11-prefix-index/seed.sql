-- ============================================================
-- 造数据: 15 万条 URL 日志
-- ============================================================

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_seed_url_log $$
CREATE PROCEDURE sp_seed_url_log()
BEGIN
    DECLARE i INT DEFAULT 0;
    DECLARE v_url VARCHAR(255);
    SET autocommit = 0;

    WHILE i < 150000 DO
        -- 用不同 host + 路径构造 URL，前 20 字符已有较好区分度
        SET v_url = CONCAT(
            ELT(FLOOR(1 + RAND() * 5),
                'https://www.example.com/',
                'https://api.example.com/',
                'https://docs.example.com/',
                'https://shop.example.com/',
                'https://blog.example.com/'),
            'p/', LPAD(i, 6, '0'), '/detail?id=', FLOOR(RAND() * 100000)
        );

        INSERT INTO t_url_log (url, visit_count, created_at)
        VALUES (
            v_url,
            FLOOR(1 + RAND() * 1000),
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

CALL sp_seed_url_log();
DROP PROCEDURE IF EXISTS sp_seed_url_log;

SELECT COUNT(*) AS total_rows FROM t_url_log;
