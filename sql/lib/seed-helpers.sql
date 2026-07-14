-- ============================================================
-- seed-helpers.sql - 公共造数据辅助存储过程
-- 所有案例的 seed.sql 可通过 SOURCE 引入本文件复用
-- 用法: SOURCE sql/lib/seed-helpers.sql;
-- ============================================================

-- 随机字符串生成（固定长度）
DROP FUNCTION IF EXISTS fn_random_str $$
CREATE FUNCTION fn_random_str(n INT) RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
    DECLARE chars VARCHAR(62) DEFAULT 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    DECLARE result VARCHAR(255) DEFAULT '';
    DECLARE i INT DEFAULT 0;
    WHILE i < n DO
        SET result = CONCAT(result, SUBSTR(chars, FLOOR(1 + RAND() * 62), 1));
        SET i = i + 1;
    END WHILE;
    RETURN result;
END $$

-- 随机手机号生成
DROP FUNCTION IF EXISTS fn_random_phone $$
CREATE FUNCTION fn_random_phone() RETURNS VARCHAR(11)
DETERMINISTIC
BEGIN
    RETURN CONCAT(
        '1',
        ELT(FLOOR(1 + RAND() * 7), '3','5','7','8','9','4','6'),
        LPAD(FLOOR(RAND() * 100000000), 9, '0')
    );
END $$

-- 随机日期（近 N 天内）
DROP FUNCTION IF EXISTS fn_random_date $$
CREATE FUNCTION fn_random_date(days_back INT) RETURNS DATETIME
DETERMINISTIC
BEGIN
    RETURN NOW() - INTERVAL FLOOR(RAND() * days_back) DAY
                   - INTERVAL FLOOR(RAND() * 24) HOUR;
END $$

-- 通用批量插入辅助：向指定表插入 cnt 行随机订单数据
-- 使用模板：参考各案例的 seed.sql
DROP PROCEDURE IF EXISTS sp_batch_insert $$
CREATE PROCEDURE sp_batch_insert(
    IN table_name VARCHAR(64),
    IN cnt INT
)
BEGIN
    -- 这是一个模板，具体实现见各案例的 seed.sql
    -- 因为不同表结构不同，无法完全通用
    SELECT CONCAT('请在 ', table_name, ' 的 seed.sql 中编写专用造数据逻辑') AS msg;
END $$

DELIMITER ;
