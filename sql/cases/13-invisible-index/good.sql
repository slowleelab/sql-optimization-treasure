-- good.sql: idx_category 设为 INVISIBLE 后，模拟"删除索引"的影响
-- 优化器不再使用该索引，退化为全表扫描（用于验证删除是否安全）
-- 需先执行 setup-good.sql 将索引设为不可见
SELECT id, product_name, category, price
FROM t_product_index
WHERE category = '手机';
