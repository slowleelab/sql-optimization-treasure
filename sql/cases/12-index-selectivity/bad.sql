-- bad.sql: status=1 命中约 10 万行（占总数 50%），选择性极低
-- 有 idx_status 但优化器评估走索引代价更高，最终全表扫描
SELECT id, order_no, status, user_id, created_at
FROM t_order_status
WHERE status = 1;
