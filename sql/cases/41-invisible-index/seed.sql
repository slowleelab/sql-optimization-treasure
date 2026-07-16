-- ============================================================
-- 造数据: 15 万商品数据，category 约 20 个分类
-- ============================================================

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_seed_product_index $$
CREATE PROCEDURE sp_seed_product_index()
BEGIN
    DECLARE i INT DEFAULT 0;
    SET autocommit = 0;

    WHILE i < 150000 DO
        INSERT INTO t_product_index (product_name, category, price)
        VALUES (
            CONCAT('商品', LPAD(i, 6, '0')),
            ELT(FLOOR(1 + RAND() * 20),
                '手机','电脑','平板','耳机','音箱','相机','手表',
                '键盘','鼠标','显示器','路由器','充电器','数据线',
                '存储卡','移动硬盘','游戏机','家电','服饰','食品','图书'),
            ROUND(1 + RAND() * 9999, 2)
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

CALL sp_seed_product_index();
DROP PROCEDURE IF EXISTS sp_seed_product_index;

SELECT category, COUNT(*) AS cnt FROM t_product_index GROUP BY category ORDER BY cnt DESC LIMIT 10;
SELECT COUNT(*) AS total_rows FROM t_product_index;
