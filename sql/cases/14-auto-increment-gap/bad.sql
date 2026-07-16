-- bad.sql: 默认 lock_mode=1 下，批量插入预分配 ID 段，失败回滚后整段跳号
-- 模拟一次批量插入失败（故意触发主键冲突或违反约束）
-- 先查看当前自增值
SELECT AUTO_INCREMENT AS next_auto_inc
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'sql_treasure' AND TABLE_NAME = 't_id_test';

-- 批量插入一批数据（多行 VALUES），随后模拟失败回滚
START TRANSACTION;
INSERT INTO t_id_test (batch_no, data_value) VALUES
    ('FAIL01', 'a'), ('FAIL01', 'b'), ('FAIL01', 'c'),
    ('FAIL01', 'd'), ('FAIL01', 'e');
-- 模拟失败：回滚事务（这批自增 ID 已被消耗，无法回收）
ROLLBACK;

-- 回滚后自增值已跳过这 5 个 ID
SELECT AUTO_INCREMENT AS next_auto_inc_after_rollback
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'sql_treasure' AND TABLE_NAME = 't_id_test';
