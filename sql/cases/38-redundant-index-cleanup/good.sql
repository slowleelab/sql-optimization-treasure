-- good.sql: 删除冗余索引后查询（需先执行 setup-good.sql 删除 idx_user）
-- 仅剩 idx_user_created，possible_keys 更清晰，写入开销也降低
SELECT id, user_id, order_no, status, created_at
FROM t_order_index
WHERE user_id = 12345;
