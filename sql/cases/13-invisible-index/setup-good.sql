-- setup-good.sql: 将 idx_category 设为不可见（MySQL 8.0+）
-- 索引仍被维护，但优化器不再选用它
ALTER TABLE t_product_index ALTER INDEX idx_category INVISIBLE;
