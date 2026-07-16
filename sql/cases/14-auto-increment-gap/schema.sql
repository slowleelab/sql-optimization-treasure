-- ============================================================
-- 案例四十二: 自增主键跳跃与性能
-- 场景: 批量 INSERT 失败回滚导致 AUTO_INCREMENT 跳号
--       对比不同 innodb_autoinc_lock_mode 下的跳号与并发表现
-- ============================================================

DROP TABLE IF EXISTS t_id_test;
CREATE TABLE t_id_test (
    id          BIGINT      NOT NULL AUTO_INCREMENT,
    batch_no    VARCHAR(20) NOT NULL              COMMENT '批次号',
    data_value  VARCHAR(50) NOT NULL              COMMENT '数据值',
    PRIMARY KEY (id),
    KEY idx_batch (batch_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='自增ID测试表';
