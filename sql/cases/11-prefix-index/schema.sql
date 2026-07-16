-- ============================================================
-- 案例三十九: 前缀索引优化长字符串
-- 场景: URL 日志表 url VARCHAR(255)，建全列索引 idx_url 浪费空间
--       前缀索引 idx_url_prefix (url(20)) 只索引前 20 字节，兼顾选择性与空间
-- ============================================================

DROP TABLE IF EXISTS t_url_log;
CREATE TABLE t_url_log (
    id           BIGINT      NOT NULL AUTO_INCREMENT,
    url          VARCHAR(255) NOT NULL             COMMENT '访问URL',
    visit_count  INT         NOT NULL DEFAULT 0    COMMENT '访问次数',
    created_at   DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    KEY idx_url (url)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='URL日志表(前缀索引演示)';
