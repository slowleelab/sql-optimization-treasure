-- bad.sql: 表上存在冗余索引 idx_user (user_id)
-- 优化器有两个候选索引 idx_user / idx_user_created，possible_keys 列出两个，增加选择成本
SELECT id, user_id, order_no, status, created_at
FROM t_order_index
WHERE user_id = 12345;
