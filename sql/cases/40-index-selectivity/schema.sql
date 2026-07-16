-- ============================================================
-- 案例四十: 索引选择性评估
-- 场景: 订单状态表 status 只有 0/1/2 三个值（低基数列）
--       单列索引 idx_status 选择性极低，优化器弃用
-- ============================================================

DROP TABLE IF EXISTS t_order_status;
CREATE TABLE t_order_status (
    id          BIGINT       NOT NULL AUTO_INCREMENT,
    order_no    VARCHAR(32)  NOT NULL              COMMENT '订单号',
    status      TINYINT      NOT NULL DEFAULT 0    COMMENT '状态: 0待付款 1已付款 2已关闭',
    user_id     BIGINT       NOT NULL              COMMENT '用户ID',
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    KEY idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单状态表(选择性演示)';
