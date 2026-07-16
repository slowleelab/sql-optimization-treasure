-- ============================================================
-- 案例三十八: 冗余索引清理
-- 场景: 订单索引表同时有 idx_user (user_id) 和 idx_user_created (user_id, created_at)
--       idx_user 是 idx_user_created 的前缀冗余索引，浪费写入与空间
-- ============================================================

DROP TABLE IF EXISTS t_order_index;
CREATE TABLE t_order_index (
    id          BIGINT       NOT NULL AUTO_INCREMENT,
    user_id     BIGINT       NOT NULL              COMMENT '用户ID',
    order_no    VARCHAR(32)  NOT NULL              COMMENT '订单号',
    status      TINYINT      NOT NULL DEFAULT 0    COMMENT '状态',
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    KEY idx_user (user_id),
    KEY idx_user_created (user_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单索引表(冗余索引演示)';
