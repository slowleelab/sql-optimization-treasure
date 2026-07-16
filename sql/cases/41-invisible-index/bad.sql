-- bad.sql: idx_category 可见时，按 category 查询走索引
SELECT id, product_name, category, price
FROM t_product_index
WHERE category = '手机';
