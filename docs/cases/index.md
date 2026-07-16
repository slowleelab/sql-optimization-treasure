# 案例总览

共 **55 个精选案例**，覆盖 MySQL 优化的七大核心场景。每个案例都带真实数据，可一键复现。

## 一、索引设计与失效（14 个）

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
| 38 | [冗余索引清理](./indexing/38-redundant-index-cleanup) | ⭐⭐ | 5.7 & 8.0 |
| 39 | [前缀索引优化长字符串](./indexing/39-prefix-index) | ⭐⭐ | 5.7 & 8.0 |
| 40 | [索引选择性评估](./indexing/40-index-selectivity) | ⭐⭐ | 5.7 & 8.0 |
| 41 | [不可见索引（8.0）](./indexing/41-invisible-index) | ⭐⭐ | 8.0+ |
| 42 | [自增主键跳跃与性能](./indexing/42-auto-increment-gap) | ⭐⭐ | 5.7 & 8.0 |

## 二、查询改写（9 个）

| # | 案例 | 难度 | 版本 |
|---|------|:----:|:----:|
| 10 | [子查询改写为 JOIN](./query-rewrite/10-subquery-to-join) | ⭐⭐ | 5.7 & 8.0 |
| 11 | [COUNT(*) 慢查询优化](./query-rewrite/11-count-optimization) | ⭐⭐ | 5.7 & 8.0 |
| 12 | [GROUP BY filesort 优化](./query-rewrite/12-group-by-filesort) | ⭐⭐ | 5.7 & 8.0 |
| 13 | [大 IN 列表优化](./query-rewrite/13-large-in-list) | ⭐⭐ | 5.7 & 8.0 |
| 14 | [EXISTS vs IN](./query-rewrite/14-exists-vs-in) | ⭐⭐ | 5.7 & 8.0 |
| 43 | [DISTINCT 优化](./query-rewrite/43-distinct-optimization) | ⭐⭐ | 5.7 & 8.0 |
| 44 | [NOT IN vs LEFT JOIN IS NULL](./query-rewrite/44-not-in-vs-left-join) | ⭐⭐ | 5.7 & 8.0 |
| 45 | [UNION vs UNION ALL](./query-rewrite/45-union-vs-union-all) | ⭐ | 5.7 & 8.0 |
| 46 | [ORDER BY LIMIT 无索引优化](./query-rewrite/46-orderby-limit-no-index) | ⭐⭐ | 5.7 & 8.0 |

## 三、JOIN 优化（7 个）

| # | 案例 | 难度 | 版本 |
|---|------|:----:|:----:|
| 15 | [小表驱动大表](./join/15-small-drive-large) | ⭐⭐ | 5.7 & 8.0 |
| 16 | [被驱动表无索引的灾难](./join/16-driven-no-index) | ⭐⭐ | 5.7 & 8.0 |
| 17 | [Hash Join vs BNL](./join/17-hash-join-vs-bnl) | ⭐⭐⭐ | 8.0+ |
| 18 | [多表 JOIN 顺序控制](./join/18-join-order) | ⭐⭐⭐ | 5.7 & 8.0 |
| 47 | [自连接查询优化](./join/47-self-join-optimization) | ⭐⭐ | 5.7 & 8.0 |
| 48 | [JOIN + GROUP BY 聚合优化](./join/48-join-group-by-optimization) | ⭐⭐⭐ | 5.7 & 8.0 |
| 49 | [派生表物化优化](./join/49-derived-table-materialization) | ⭐⭐ | 5.7 & 8.0 |

## 四、DDL 与大表（6 个）

| # | 案例 | 难度 | 版本 |
|---|------|:----:|:----:|
| 19 | [大表加索引 Online DDL](./ddl/19-online-ddl) | ⭐⭐⭐ | 5.7 & 8.0 |
| 20 | [TEXT/BLOB 字段陷阱](./ddl/20-text-blob-pitfall) | ⭐⭐ | 5.7 & 8.0 |
| 21 | [大表 DELETE 分批](./ddl/21-batch-delete) | ⭐⭐ | 5.7 & 8.0 |
| 50 | [分区表 RANGE 分区优化](./ddl/50-partition-range) | ⭐⭐⭐ | 5.7 & 8.0 |
| 51 | [大表批量 INSERT 优化](./ddl/51-batch-insert-optimization) | ⭐⭐ | 5.7 & 8.0 |
| 52 | [OPTIMIZE TABLE 碎片整理](./ddl/52-optimize-table-fragmentation) | ⭐⭐ | 5.7 & 8.0 |

## 五、架构级优化（7 个）

| # | 案例 | 难度 | 版本 |
|---|------|:----:|:----:|
| 22 | [多条件动态筛选索引设计](./architecture/22-dynamic-filter) | ⭐⭐⭐ | 5.7 & 8.0 |
| 23 | [报表统计汇总表](./architecture/23-summary-table) | ⭐⭐ | 5.7 & 8.0 |
| 24 | [冷热数据分离](./architecture/24-hot-cold-separation) | ⭐⭐⭐ | 5.7 & 8.0 |
| 25 | [秒杀场景库存扣减](./architecture/25-flash-sale-stock) | ⭐⭐⭐ | 5.7 & 8.0 |
| 53 | [读写分离架构](./architecture/53-read-write-splitting) | ⭐⭐⭐ | 5.7 & 8.0 |
| 54 | [JSON 字段使用模式](./architecture/54-json-column-pattern) | ⭐⭐ | 8.0+ |
| 55 | [软删除设计模式](./architecture/55-soft-delete-pattern) | ⭐⭐ | 5.7 & 8.0 |

## 六、事务与锁（7 个）

| # | 案例 | 难度 | 版本 |
|---|------|:----:|:----:|
| 26 | [死锁排查与分析](./transaction/26-deadlock-analysis) | ⭐⭐⭐ | 5.7 & 8.0 |
| 27 | [间隙锁导致插入阻塞](./transaction/27-gap-lock-insert-block) | ⭐⭐⭐ | 5.7 & 8.0 |
| 28 | [SELECT FOR UPDATE 锁范围](./transaction/28-select-for-update-scope) | ⭐⭐ | 5.7 & 8.0 |
| 29 | [乐观锁与悲观锁对比](./transaction/29-optimistic-vs-pessimistic-lock) | ⭐⭐ | 5.7 & 8.0 |
| 30 | [幻读问题与解决](./transaction/30-phantom-read) | ⭐⭐⭐ | 5.7 & 8.0 |
| 31 | [死锁重试与超时处理](./transaction/31-deadlock-retry-timeout) | ⭐⭐ | 5.7 & 8.0 |
| 32 | [唯一索引并发插入冲突](./transaction/32-unique-index-concurrent-insert) | ⭐⭐ | 5.7 & 8.0 |

## 七、优化器与 8.0 新特性（5 个）

| # | 案例 | 难度 | 版本 |
|---|------|:----:|:----:|
| 33 | [降序索引消除 filesort](./optimizer/33-descending-index) | ⭐⭐ | 5.7 & 8.0 |
| 34 | [函数索引（8.0）](./optimizer/34-functional-index) | ⭐⭐ | 8.0+ |
| 35 | [直方图统计优化](./optimizer/35-histogram-statistics) | ⭐⭐⭐ | 8.0+ |
| 36 | [CTE 递归查询优化](./optimizer/36-cte-recursive) | ⭐⭐ | 8.0+ |
| 37 | [窗口函数替代自连接](./optimizer/37-window-function) | ⭐⭐ | 8.0+ |

---

::: tip 难度说明
- ⭐ 入门：理解索引基本原理即可
- ⭐⭐ 进阶：需要理解 EXPLAIN 输出和优化器行为
- ⭐⭐⭐ 高级：涉及架构设计或版本特性差异
:::
