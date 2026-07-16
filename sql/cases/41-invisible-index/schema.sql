-- ============================================================
-- 案例四十一: 不可见索引 Invisible Index（MySQL 8.0）
-- 场景: 商品表按 category 查询，想验证删除 idx_category 的影响
--       先设为 INVISIBLE，观察执行计划是否退化为全表扫描
-- ============================================================

DROP TABLE IF EXISTS t_product_index;
CREATE TABLE t_product_index (
    id            BIGINT        NOT NULL AUTO_INCREMENT,
    product_name  VARCHAR(100)  NOT NULL              COMMENT '商品名',
    category      VARCHAR(30)   NOT NULL              COMMENT '分类',
    price         DECIMAL(10,2) NOT NULL              COMMENT '价格',
    PRIMARY KEY (id),
    KEY idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品表(invisible索引演示)';
