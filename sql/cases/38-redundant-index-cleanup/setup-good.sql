-- setup-good.sql: 删除冗余前缀索引 idx_user，保留联合索引 idx_user_created
ALTER TABLE t_order_index DROP INDEX idx_user;
