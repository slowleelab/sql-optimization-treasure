# 案例总览

共 **70 个精选案例**，覆盖 MySQL 优化的七大核心场景。每个案例都带真实数据，可一键复现。

## 一、索引设计与失效（16 个）

| # | 案例 | 难度 | 版本 |
|---|------|:----:|:----:|
| 01 | [深度分页 LIMIT 大偏移](./indexing/01-deep-pagination) | ⭐⭐ | 5.7 & 8.0 |
| 02 | [联合索引最左前缀失效](./indexing/02-leftmost-prefix) | ⭐ | 5.7 & 8.0 |
| 03 | [隐式类型转换致索引失效](./indexing/03-implicit-type-conversion) | ⭐⭐ | 5.7 & 8.0 |
| 04 | [函数操作致索引失效](./indexing/04-function-on-index) | ⭐⭐ | 5.7 & 8.0 |
| 05 | [LIKE 前导通配符](./indexing/05-like-leading-wildcard) | ⭐ | 5.7 & 8.0 |
| 06 | [OR 条件与索引合并](./indexing/06-or-condition) | ⭐⭐ | 5.7 & 8.0 |
| 07 | [范围查询后列索引失效](./indexing/07-range-after-index) | ⭐⭐ | 5.7 & 8.0 |
| 08 | [覆盖索引避免回表](./indexing/08-covering-index) | ⭐⭐ | 5.7 & 8.0 |
| 09 | [索引下推 ICP](./indexing/09-index-condition-pushdown) | ⭐⭐⭐ | 5.7 & 8.0 |
| 10 | [冗余索引清理](./indexing/10-redundant-index-cleanup) | ⭐⭐ | 5.7 & 8.0 |
| 11 | [前缀索引优化长字符串](./indexing/11-prefix-index) | ⭐⭐ | 5.7 & 8.0 |
| 12 | [索引选择性评估](./indexing/12-index-selectivity) | ⭐⭐ | 5.7 & 8.0 |
| 13 | [不可见索引（8.0）](./indexing/13-invisible-index) | ⭐⭐ | 8.0+ |
| 14 | [自增主键跳跃与性能](./indexing/14-auto-increment-gap) | ⭐⭐ | 5.7 & 8.0 |
| 56 | [索引合并 Index Merge 陷阱](./indexing/56-index-merge-pitfall) | ⭐⭐ | 5.7 & 8.0 |
| 57 | [索引跳跃扫描 Skip Scan](./indexing/57-skip-scan) | ⭐⭐ | 8.0+ |

## 二、查询改写（11 个）

| # | 案例 | 难度 | 版本 |
|---|------|:----:|:----:|
| 15 | [子查询改写为 JOIN](./query-rewrite/15-subquery-to-join) | ⭐⭐ | 5.7 & 8.0 |
| 16 | [COUNT(*) 慢查询优化](./query-rewrite/16-count-optimization) | ⭐⭐ | 5.7 & 8.0 |
| 17 | [GROUP BY filesort 优化](./query-rewrite/17-group-by-filesort) | ⭐⭐ | 5.7 & 8.0 |
| 18 | [大 IN 列表优化](./query-rewrite/18-large-in-list) | ⭐⭐ | 5.7 & 8.0 |
| 19 | [EXISTS vs IN](./query-rewrite/19-exists-vs-in) | ⭐⭐ | 5.7 & 8.0 |
| 20 | [DISTINCT 优化](./query-rewrite/20-distinct-optimization) | ⭐⭐ | 5.7 & 8.0 |
| 21 | [NOT IN vs LEFT JOIN IS NULL](./query-rewrite/21-not-in-vs-left-join) | ⭐⭐ | 5.7 & 8.0 |
| 22 | [UNION vs UNION ALL](./query-rewrite/22-union-vs-union-all) | ⭐ | 5.7 & 8.0 |
| 23 | [ORDER BY LIMIT 无索引优化](./query-rewrite/23-orderby-limit-no-index) | ⭐⭐ | 5.7 & 8.0 |
| 58 | [HAVING 改 WHERE 提前过滤](./query-rewrite/58-having-to-where) | ⭐ | 5.7 & 8.0 |
| 59 | [LIMIT 1 优化 EXISTS](./query-rewrite/59-limit1-exists) | ⭐⭐ | 5.7 & 8.0 |

## 三、JOIN 优化（9 个）

| # | 案例 | 难度 | 版本 |
|---|------|:----:|:----:|
| 24 | [小表驱动大表](./join/24-small-drive-large) | ⭐⭐ | 5.7 & 8.0 |
| 25 | [被驱动表无索引的灾难](./join/25-driven-no-index) | ⭐⭐ | 5.7 & 8.0 |
| 26 | [Hash Join vs BNL](./join/26-hash-join-vs-bnl) | ⭐⭐⭐ | 8.0+ |
| 27 | [多表 JOIN 顺序控制](./join/27-join-order) | ⭐⭐⭐ | 5.7 & 8.0 |
| 28 | [自连接查询优化](./join/28-self-join-optimization) | ⭐⭐ | 5.7 & 8.0 |
| 29 | [JOIN + GROUP BY 聚合优化](./join/29-join-group-by-optimization) | ⭐⭐⭐ | 5.7 & 8.0 |
| 30 | [派生表物化优化](./join/30-derived-table-materialization) | ⭐⭐ | 5.7 & 8.0 |
| 60 | [STRAIGHT_JOIN 强制驱动顺序](./join/60-straight-join) | ⭐⭐⭐ | 5.7 & 8.0 |
| 61 | [LEFT JOIN 改 INNER JOIN](./join/61-left-join-to-inner) | ⭐⭐ | 5.7 & 8.0 |

## 四、DDL 与大表（8 个）

| # | 案例 | 难度 | 版本 |
|---|------|:----:|:----:|
| 31 | [大表加索引 Online DDL](./ddl/31-online-ddl) | ⭐⭐⭐ | 5.7 & 8.0 |
| 32 | [TEXT/BLOB 字段陷阱](./ddl/32-text-blob-pitfall) | ⭐⭐ | 5.7 & 8.0 |
| 33 | [大表 DELETE 分批](./ddl/33-batch-delete) | ⭐⭐ | 5.7 & 8.0 |
| 34 | [分区表 RANGE 分区优化](./ddl/34-partition-range) | ⭐⭐⭐ | 5.7 & 8.0 |
| 35 | [大表批量 INSERT 优化](./ddl/35-batch-insert-optimization) | ⭐⭐ | 5.7 & 8.0 |
| 36 | [OPTIMIZE TABLE 碎片整理](./ddl/36-optimize-table-fragmentation) | ⭐⭐ | 5.7 & 8.0 |
| 62 | [大表加列 INSTANT（8.0）](./ddl/62-instant-add-column) | ⭐⭐ | 8.0+ |
| 63 | [修改字段类型锁表](./ddl/63-modify-column-type) | ⭐⭐⭐ | 5.7 & 8.0 |

## 五、架构级优化（9 个）

| # | 案例 | 难度 | 版本 |
|---|------|:----:|:----:|
| 37 | [多条件动态筛选索引设计](./architecture/37-dynamic-filter) | ⭐⭐⭐ | 5.7 & 8.0 |
| 38 | [报表统计汇总表](./architecture/38-summary-table) | ⭐⭐ | 5.7 & 8.0 |
| 39 | [冷热数据分离](./architecture/39-hot-cold-separation) | ⭐⭐⭐ | 5.7 & 8.0 |
| 40 | [秒杀场景库存扣减](./architecture/40-flash-sale-stock) | ⭐⭐⭐ | 5.7 & 8.0 |
| 41 | [读写分离架构](./architecture/41-read-write-splitting) | ⭐⭐⭐ | 5.7 & 8.0 |
| 42 | [JSON 字段使用模式](./architecture/42-json-column-pattern) | ⭐⭐ | 8.0+ |
| 43 | [软删除设计模式](./architecture/43-soft-delete-pattern) | ⭐⭐ | 5.7 & 8.0 |
| 64 | [分库分表路由策略](./architecture/64-sharding-route) | ⭐⭐⭐ | 5.7 & 8.0 |
| 65 | [缓存穿透与布隆过滤器](./architecture/65-cache-penetration) | ⭐⭐⭐ | 5.7 & 8.0 |

## 六、事务与锁（9 个）

| # | 案例 | 难度 | 版本 |
|---|------|:----:|:----:|
| 44 | [死锁排查与分析](./transaction/44-deadlock-analysis) | ⭐⭐⭐ | 5.7 & 8.0 |
| 45 | [间隙锁导致插入阻塞](./transaction/45-gap-lock-insert-block) | ⭐⭐⭐ | 5.7 & 8.0 |
| 46 | [SELECT FOR UPDATE 锁范围](./transaction/46-select-for-update-scope) | ⭐⭐ | 5.7 & 8.0 |
| 47 | [乐观锁与悲观锁对比](./transaction/47-optimistic-vs-pessimistic-lock) | ⭐⭐ | 5.7 & 8.0 |
| 48 | [幻读问题与解决](./transaction/48-phantom-read) | ⭐⭐⭐ | 5.7 & 8.0 |
| 49 | [死锁重试与超时处理](./transaction/49-deadlock-retry-timeout) | ⭐⭐ | 5.7 & 8.0 |
| 50 | [唯一索引并发插入冲突](./transaction/50-unique-index-concurrent-insert) | ⭐⭐ | 5.7 & 8.0 |
| 66 | [长事务危害](./transaction/66-long-transaction-harm) | ⭐⭐ | 5.7 & 8.0 |
| 67 | [RC vs RR 隔离级别](./transaction/67-rc-vs-rr-isolation) | ⭐⭐⭐ | 5.7 & 8.0 |

## 七、优化器与 8.0 新特性（8 个）

| # | 案例 | 难度 | 版本 |
|---|------|:----:|:----:|
| 51 | [降序索引消除 filesort](./optimizer/51-descending-index) | ⭐⭐ | 5.7 & 8.0 |
| 52 | [函数索引（8.0）](./optimizer/52-functional-index) | ⭐⭐ | 8.0+ |
| 53 | [直方图统计优化](./optimizer/53-histogram-statistics) | ⭐⭐⭐ | 8.0+ |
| 54 | [CTE 递归查询优化](./optimizer/54-cte-recursive) | ⭐⭐ | 8.0+ |
| 55 | [窗口函数替代自连接](./optimizer/55-window-function) | ⭐⭐ | 8.0+ |
| 68 | [优化器 Hint 实战](./optimizer/68-optimizer-hint) | ⭐⭐ | 5.7 & 8.0 |
| 69 | [派生条件下推（8.0）](./optimizer/69-derived-condition-pushdown) | ⭐⭐⭐ | 8.0+ |
| 70 | [大批量 UPDATE 分批优化](./optimizer/70-batch-update) | ⭐⭐ | 5.7 & 8.0 |

---

::: tip 难度说明
- ⭐ 入门：理解索引基本原理即可
- ⭐⭐ 进阶：需要理解 EXPLAIN 输出和优化器行为
- ⭐⭐⭐ 高级：涉及架构设计或版本特性差异
:::
