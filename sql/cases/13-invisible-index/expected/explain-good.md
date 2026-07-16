# EXPLAIN 参考结果 - good.sql (索引设为 INVISIBLE)

## MySQL 8.0（实测 8.0.46，15 万行数据）

```
+----+-------------+------------------+------+---------------+------+---------+------+--------+----------+-------------+
| id | select_type | table            | type | possible_keys | key  | key_len | ref  | rows   | filtered | Extra       |
+----+-------------+------------------+------+---------------+------+---------+------+--------+----------+-------------+
|  1 | SIMPLE      | t_product_index  | ALL  | NULL          | NULL | NULL    | NULL | 148936 |    10.00 | Using where |
+----+-------------+------------------+------+---------------+------+---------+------+--------+----------+-------------+
```

## 关键变化

| 字段 | 值 | 分析 |
|------|-----|------|
| type | **`ALL`** | **退化为全表扫描**（索引已不可见） |
| possible_keys | `NULL` | **不可见索引不出现在候选列表** |
| key | `NULL` | 未使用索引 |
| rows | ~148,936 | 扫描全表 |
| Extra | `Using where` | server 层逐行过滤 category |

## INVISIBLE 索引的原理

```sql
-- 将索引设为不可见（索引数据仍维护，但优化器忽略它）
ALTER TABLE t_product_index ALTER INDEX idx_category INVISIBLE;

-- 如发现问题，可瞬间恢复（无需重建）
ALTER TABLE t_product_index ALTER INDEX idx_category VISIBLE;
```

| 操作 | DROP INDEX | ALTER INDEX INVISIBLE |
|------|-----------|----------------------|
| 索引数据 | 立即删除 | **保留并持续维护** |
| 优化器可见性 | 不可用 | **不可见（忽略）** |
| 写入开销 | 降低（无需维护） | **不变（仍维护）** |
| 恢复方式 | ADD INDEX（重建，慢） | **ALTER VISIBLE（瞬间）** |
| 风险 | 高（不可逆） | **低（可秒级回滚）** |

## 安全删索引流程

1. **设为 INVISIBLE**：`ALTER TABLE t ALTER INDEX idx INVISIBLE;`
2. **观察期**（1~2 周）：监控慢查询日志、EXPLAIN，确认无查询性能下降
3. **确认无影响**：所有依赖该索引的查询都走了更优的替代计划
4. **安全删除**：`ALTER TABLE t DROP INDEX idx;`（此时真正回收空间）
5. **若有问题**：`ALTER TABLE t ALTER INDEX idx VISIBLE;` 瞬间恢复

## 量化对比

| 指标 | bad (可见) | good (INVISIBLE) | 说明 |
|------|-----------|------------------|------|
| type | ref | ALL | 索引 -> 全表 |
| rows | ~7,482 | ~148,936 | 扫描量增加 |
| 写入开销 | 维护索引 | **仍维护**（INVISIBLE 不省写入） | 仅模拟删除效果 |

::: tip 重要区分
INVISIBLE 索引**不节省写入开销**（索引数据仍被维护），它的价值是**零风险验证删除影响**。
只有最终 `DROP INDEX` 才真正释放写入开销和空间。
:::

::: warning 5.7 不支持
INVISIBLE 索引是 MySQL 8.0 新特性，5.7 无此功能。
5.7 删索引只能直接 DROP，建议先在测试环境充分验证，或使用 pt-online-schema-change 等工具。
:::
