# 案例总览

共 **25 个精选案例**，覆盖 MySQL 优化的五大核心场景。每个案例都带真实数据，可一键复现。

## 一、索引设计与失效（9 个）

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

## 二、查询改写（5 个）

| # | 案例 | 难度 | 版本 |
|---|------|:----:|:----:|
| 10 | [子查询改写为 JOIN](./query-rewrite/10-subquery-to-join) | ⭐⭐ | 5.7 & 8.0 |
| 11 | [COUNT(*) 慢查询优化](./query-rewrite/11-count-optimization) | ⭐⭐ | 5.7 & 8.0 |
| 12 | [GROUP BY filesort 优化](./query-rewrite/12-group-by-filesort) | ⭐⭐ | 5.7 & 8.0 |
| 13 | [大 IN 列表优化](./query-rewrite/13-large-in-list) | ⭐⭐ | 5.7 & 8.0 |
| 14 | [EXISTS vs IN](./query-rewrite/14-exists-vs-in) | ⭐⭐ | 5.7 & 8.0 |

## 三、JOIN 优化（4 个）

| # | 案例 | 难度 | 版本 |
|---|------|:----:|:----:|
| 15 | [小表驱动大表](./join/15-small-drive-large) | ⭐⭐ | 5.7 & 8.0 |
| 16 | [被驱动表无索引的灾难](./join/16-driven-no-index) | ⭐⭐ | 5.7 & 8.0 |
| 17 | [Hash Join vs BNL](./join/17-hash-join-vs-bnl) | ⭐⭐⭐ | 8.0+ |
| 18 | [多表 JOIN 顺序控制](./join/18-join-order) | ⭐⭐⭐ | 5.7 & 8.0 |

## 四、DDL 与大表（3 个）

| # | 案例 | 难度 | 版本 |
|---|------|:----:|:----:|
| 19 | [大表加索引 Online DDL](./ddl/19-online-ddl) | ⭐⭐⭐ | 5.7 & 8.0 |
| 20 | [TEXT/BLOB 字段陷阱](./ddl/20-text-blob-pitfall) | ⭐⭐ | 5.7 & 8.0 |
| 21 | [大表 DELETE 分批](./ddl/21-batch-delete) | ⭐⭐ | 5.7 & 8.0 |

## 五、架构级优化（4 个）

| # | 案例 | 难度 | 版本 |
|---|------|:----:|:----:|
| 22 | [多条件动态筛选索引设计](./architecture/22-dynamic-filter) | ⭐⭐⭐ | 5.7 & 8.0 |
| 23 | [报表统计汇总表](./architecture/23-summary-table) | ⭐⭐ | 5.7 & 8.0 |
| 24 | [冷热数据分离](./architecture/24-hot-cold-separation) | ⭐⭐⭐ | 5.7 & 8.0 |
| 25 | [秒杀场景库存扣减](./architecture/25-flash-sale-stock) | ⭐⭐⭐ | 5.7 & 8.0 |

---

::: tip 难度说明
- ⭐ 入门：理解索引基本原理即可
- ⭐⭐ 进阶：需要理解 EXPLAIN 输出和优化器行为
- ⭐⭐⭐ 高级：涉及架构设计或版本特性差异
:::
