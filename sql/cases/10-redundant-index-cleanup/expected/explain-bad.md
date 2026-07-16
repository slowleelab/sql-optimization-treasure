# EXPLAIN 参考结果 - bad.sql (存在冗余索引)

## MySQL 8.0（实测 8.0.46，20 万行数据）

```
+----+-------------+----------------+------+--------------------------------+------------------+---------+-------+------+----------+-------+
| id | select_type | table          | type | possible_keys                  | key              | key_len | ref   | rows | filtered | Extra |
+----+-------------+----------------+------+--------------------------------+------------------+---------+-------+------+----------+-------+
|  1 | SIMPLE      | t_order_index  | ref  | idx_user,idx_user_created      | idx_user_created | 8       | const |   12 |   100.00 | NULL  |
+----+-------------+----------------+------+--------------------------------+------------------+---------+-------+------+----------+-------+
```

## 关键问题

| 字段 | 值 | 分析 |
|------|-----|------|
| type | `ref` | 等值匹配索引 |
| possible_keys | `idx_user,idx_user_created` | **两个候选索引同时出现** |
| key | `idx_user_created` | 优化器最终选了联合索引 |
| Extra | NULL | 无额外操作（查询本身不慢） |

## 为什么有害

虽然查询本身性能尚可，但 `idx_user` 是 `idx_user_created (user_id, created_at)` 的**前缀冗余索引**，带来隐性危害：

1. **写入放大**：每次 INSERT/UPDATE 都要维护两份 user_id 索引，`idx_user` 纯属浪费
2. **空间浪费**：20 万行 × 8 字节 ≈ 1.6 MB 额外索引空间（不含 B+ 树节点开销）
3. **优化器困惑**：`possible_keys` 出现两个候选，每次都要评估成本做选择，增加解析开销
4. **维护负担**：DBA 容易误以为两个索引都在用，不敢清理

可通过 `sys.schema_redundant_indexes` 视图直接发现这类冗余索引。

```sql
SELECT * FROM sys.schema_redundant_indexes
WHERE table_schema = 'sql_treasure' AND table_name = 't_order_index';
```

::: warning 冗余索引判定
`idx(a)` 是 `idx(a,b)` 的冗余索引（左前缀完全相同），可安全删除。
但 `idx(b)` 不是 `idx(a,b)` 的冗余，因为前缀不同，无法互相替代。
:::
