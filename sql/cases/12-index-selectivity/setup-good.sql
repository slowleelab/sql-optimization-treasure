-- setup-good.sql: 建立联合索引 (status, user_id)，用高基数列 user_id 提升整体选择性
ALTER TABLE t_order_status ADD KEY idx_status_user (status, user_id);
