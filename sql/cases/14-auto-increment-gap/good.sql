-- good.sql: 设置 innodb_autoinc_lock_mode=2（interleave 模式）
-- 并发批量插入时不再持有表级自增锁，减少锁等待，提升并发吞吐
-- 需先执行 setup-good.sql 切换锁模式
-- 注意: lock_mode=2 下批量插入可能产生更多跳号，但并发性能更好

SELECT @@innodb_autoinc_lock_mode AS lock_mode;

-- 并发友好的批量插入（interleave 模式下不阻塞其他事务的插入）
START TRANSACTION;
INSERT INTO t_id_test (batch_no, data_value) VALUES
    ('OK01', 'x'), ('OK01', 'y'), ('OK01', 'z');
COMMIT;

SELECT COUNT(*) AS rows_after, MAX(id) AS max_id FROM t_id_test WHERE batch_no = 'OK01';
