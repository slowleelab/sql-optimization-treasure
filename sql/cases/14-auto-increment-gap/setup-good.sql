-- setup-good.sql: 切换自增锁模式为 interleave（模式 2）
-- 模式 2 下并发插入性能最佳，不再持有表级 AUTO-INC 锁
-- 注意: 这是 SESSION 级设置，需在执行 good.sql 的同一连接生效
SET SESSION innodb_autoinc_lock_mode = 2;
