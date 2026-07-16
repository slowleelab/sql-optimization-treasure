-- good.sql: 用联合索引 (status, user_id) 后，加上 user_id 过滤大幅缩小范围
-- 需先执行 setup-good.sql 建立 idx_status_user 联合索引
SELECT id, order_no, status, user_id, created_at
FROM t_order_status
WHERE status = 1 AND user_id = 12345;
