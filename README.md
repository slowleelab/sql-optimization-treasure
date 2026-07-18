# SQL Lab

> 🐳 一套**能跑、能量化对比**的 MySQL 优化实战案例集  
> 每个案例都带真实数据，Docker 一键复现，bad/good EXPLAIN 量化对比

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![MySQL](https://img.shields.io/badge/MySQL-5.7%20%7C%208.0-blue.svg)](https://www.mysql.com/)
[![CI](https://github.com/slowleelab/sql-lab/actions/workflows/validate-sql.yml/badge.svg)](https://github.com/slowleelab/sql-lab/actions)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Cases](https://img.shields.io/badge/cases-77-orange.svg)](docs/cases/)

📖 **在线文档**：[https://slowleelab.github.io/sql-lab/](https://slowleelab.github.io/sql-lab/)  
🤖 **AI 对话**：接入 DeepWiki，可直接与仓库对话提问

> 如果这个项目对你有帮助，欢迎 ⭐ Star 支持！你的 Star 是持续更新的动力。

---

## ✨ 为什么用这个项目

网上不缺 SQL 优化文章，但大多**只讲不练**——贴一段 SQL 说"这样慢，那样快"，你却无法验证。

本项目不同：

| 特性 | 普通文章 | SQL Lab |
|------|---------|-------------|
| 能否复现 | ❌ 只能看 | ✅ Docker 一键跑 |
| 数据量 | ❌ 假数据/无数据 | ✅ 百万级真实数据 |
| 效果验证 | ❌ 口头说快 | ✅ EXPLAIN 量化对比 |
| 版本覆盖 | ❌ 不区分版本 | ✅ 5.7 + 8.0 双版本 |
| 场景贴近 | ❌ 教科书式 | ✅ 生产场景命名 |

## 🚀 快速开始

```bash
# 1. 克隆
git clone https://github.com/slowleelab/sql-lab.git
cd sql-lab

# 2. 启动 MySQL（同时起 5.7 和 8.0）
docker compose up -d

# 3. 运行第一个案例
./scripts/run-case.sh 01-deep-pagination
```

你会看到类似这样的输出：

```
━━━ bad.sql (优化前) ━━━
type: ALL    rows: 980,000    Extra: Using filesort
耗时: 1230 ms

━━━ good.sql (优化后) ━━━
type: ref    rows: 12    Extra: Using index
耗时: 2 ms

🚀 扫描行数下降 99.99%，耗时下降 99.84%
```

## 📚 案例总览

共 **77 个精选案例**，覆盖 MySQL 优化的七大核心场景：

### 一、索引设计与失效（18 个）
| # | 案例 | 难度 | 版本 |
|---|------|------|------|
| 01 | [深度分页 LIMIT 大偏移](docs/cases/indexing/01-deep-pagination.md) | ⭐⭐ | 5.7 & 8.0 |
| 02 | [联合索引最左前缀失效](docs/cases/indexing/02-leftmost-prefix.md) | ⭐ | 5.7 & 8.0 |
| 03 | [隐式类型转换致索引失效](docs/cases/indexing/03-implicit-type-conversion.md) | ⭐⭐ | 5.7 & 8.0 |
| 04 | [函数操作致索引失效](docs/cases/indexing/04-function-on-index.md) | ⭐⭐ | 5.7 & 8.0 |
| 05 | [LIKE 前导通配符](docs/cases/indexing/05-like-leading-wildcard.md) | ⭐ | 5.7 & 8.0 |
| 06 | [OR 条件与索引合并](docs/cases/indexing/06-or-condition.md) | ⭐⭐ | 5.7 & 8.0 |
| 07 | [范围查询后列索引失效](docs/cases/indexing/07-range-after-index.md) | ⭐⭐ | 5.7 & 8.0 |
| 08 | [覆盖索引避免回表](docs/cases/indexing/08-covering-index.md) | ⭐⭐ | 5.7 & 8.0 |
| 09 | [索引下推 ICP](docs/cases/indexing/09-index-condition-pushdown.md) | ⭐⭐⭐ | 5.7 & 8.0 |
| 10 | [冗余索引清理](docs/cases/indexing/10-redundant-index-cleanup.md) | ⭐⭐ | 5.7 & 8.0 |
| 11 | [前缀索引优化长字符串](docs/cases/indexing/11-prefix-index.md) | ⭐⭐ | 5.7 & 8.0 |
| 12 | [索引选择性评估](docs/cases/indexing/12-index-selectivity.md) | ⭐⭐ | 5.7 & 8.0 |
| 13 | [不可见索引（8.0）](docs/cases/indexing/13-invisible-index.md) | ⭐⭐ | 8.0+ |
| 14 | [自增主键跳跃与性能](docs/cases/indexing/14-auto-increment-gap.md) | ⭐⭐ | 5.7 & 8.0 |
| 56 | [索引合并 Index Merge 陷阱](docs/cases/indexing/56-index-merge-pitfall.md) | ⭐⭐ | 5.7 & 8.0 |
| 57 | [索引跳跃扫描 Skip Scan](docs/cases/indexing/57-skip-scan.md) | ⭐⭐ | 8.0+ |
| 71 | [游标分页替代深分页](docs/cases/indexing/71-cursor-pagination.md) | ⭐⭐ | 5.7 & 8.0 |
| 77 | [全文索引 FULLTEXT 替代 LIKE](docs/cases/indexing/77-fulltext-search.md) | ⭐⭐ | 5.7 & 8.0 |

### 二、查询改写（12 个）
| # | 案例 | 难度 | 版本 |
|---|------|------|------|
| 15 | [子查询改写为 JOIN](docs/cases/query-rewrite/15-subquery-to-join.md) | ⭐⭐ | 5.7 & 8.0 |
| 16 | [COUNT(*) 慢查询优化](docs/cases/query-rewrite/16-count-optimization.md) | ⭐⭐ | 5.7 & 8.0 |
| 17 | [GROUP BY filesort 优化](docs/cases/query-rewrite/17-group-by-filesort.md) | ⭐⭐ | 5.7 & 8.0 |
| 18 | [大 IN 列表优化](docs/cases/query-rewrite/18-large-in-list.md) | ⭐⭐ | 5.7 & 8.0 |
| 19 | [EXISTS vs IN](docs/cases/query-rewrite/19-exists-vs-in.md) | ⭐⭐ | 5.7 & 8.0 |
| 20 | [DISTINCT 优化](docs/cases/query-rewrite/20-distinct-optimization.md) | ⭐⭐ | 5.7 & 8.0 |
| 21 | [NOT IN vs LEFT JOIN IS NULL](docs/cases/query-rewrite/21-not-in-vs-left-join.md) | ⭐⭐ | 5.7 & 8.0 |
| 22 | [UNION vs UNION ALL](docs/cases/query-rewrite/22-union-vs-union-all.md) | ⭐ | 5.7 & 8.0 |
| 23 | [ORDER BY LIMIT 无索引优化](docs/cases/query-rewrite/23-orderby-limit-no-index.md) | ⭐⭐ | 5.7 & 8.0 |
| 58 | [HAVING 改 WHERE 提前过滤](docs/cases/query-rewrite/58-having-to-where.md) | ⭐ | 5.7 & 8.0 |
| 59 | [LIMIT 1 优化 EXISTS](docs/cases/query-rewrite/59-limit1-exists.md) | ⭐⭐ | 5.7 & 8.0 |
| 76 | [时区与 TIMESTAMP vs DATETIME](docs/cases/query-rewrite/76-timestamp-vs-datetime.md) | ⭐⭐ | 5.7 & 8.0 |

### 三、JOIN 优化（9 个）
| # | 案例 | 难度 | 版本 |
|---|------|------|------|
| 24 | [小表驱动大表](docs/cases/join/24-small-drive-large.md) | ⭐⭐ | 5.7 & 8.0 |
| 25 | [被驱动表无索引的灾难](docs/cases/join/25-driven-no-index.md) | ⭐⭐ | 5.7 & 8.0 |
| 26 | [Hash Join vs BNL](docs/cases/join/26-hash-join-vs-bnl.md) | ⭐⭐⭐ | 8.0+ |
| 27 | [多表 JOIN 顺序控制](docs/cases/join/27-join-order.md) | ⭐⭐⭐ | 5.7 & 8.0 |
| 28 | [自连接查询优化](docs/cases/join/28-self-join-optimization.md) | ⭐⭐ | 5.7 & 8.0 |
| 29 | [JOIN + GROUP BY 聚合优化](docs/cases/join/29-join-group-by-optimization.md) | ⭐⭐⭐ | 5.7 & 8.0 |
| 30 | [派生表物化优化](docs/cases/join/30-derived-table-materialization.md) | ⭐⭐ | 5.7 & 8.0 |
| 60 | [STRAIGHT_JOIN 强制驱动顺序](docs/cases/join/60-straight-join.md) | ⭐⭐⭐ | 5.7 & 8.0 |
| 61 | [LEFT JOIN 改 INNER JOIN](docs/cases/join/61-left-join-to-inner.md) | ⭐⭐ | 5.7 & 8.0 |

### 四、DDL 与大表（9 个）
| # | 案例 | 难度 | 版本 |
|---|------|------|------|
| 31 | [大表加索引 Online DDL](docs/cases/ddl/31-online-ddl.md) | ⭐⭐⭐ | 5.7 & 8.0 |
| 32 | [TEXT/BLOB 字段陷阱](docs/cases/ddl/32-text-blob-pitfall.md) | ⭐⭐ | 5.7 & 8.0 |
| 33 | [大表 DELETE 分批](docs/cases/ddl/33-batch-delete.md) | ⭐⭐ | 5.7 & 8.0 |
| 34 | [分区表 RANGE 分区优化](docs/cases/ddl/34-partition-range.md) | ⭐⭐⭐ | 5.7 & 8.0 |
| 35 | [大表批量 INSERT 优化](docs/cases/ddl/35-batch-insert-optimization.md) | ⭐⭐ | 5.7 & 8.0 |
| 36 | [OPTIMIZE TABLE 碎片整理](docs/cases/ddl/36-optimize-table-fragmentation.md) | ⭐⭐ | 5.7 & 8.0 |
| 62 | [大表加列 INSTANT（8.0）](docs/cases/ddl/62-instant-add-column.md) | ⭐⭐ | 8.0+ |
| 63 | [修改字段类型锁表](docs/cases/ddl/63-modify-column-type.md) | ⭐⭐⭐ | 5.7 & 8.0 |
| 73 | [大字段垂直拆表](docs/cases/ddl/73-vertical-split-text.md) | ⭐⭐ | 5.7 & 8.0 |

### 五、架构级优化（11 个）
| # | 案例 | 难度 | 版本 |
|---|------|------|------|
| 37 | [多条件动态筛选索引设计](docs/cases/architecture/37-dynamic-filter.md) | ⭐⭐⭐ | 5.7 & 8.0 |
| 38 | [报表统计汇总表](docs/cases/architecture/38-summary-table.md) | ⭐⭐ | 5.7 & 8.0 |
| 39 | [冷热数据分离](docs/cases/architecture/39-hot-cold-separation.md) | ⭐⭐⭐ | 5.7 & 8.0 |
| 40 | [秒杀场景库存扣减](docs/cases/architecture/40-flash-sale-stock.md) | ⭐⭐⭐ | 5.7 & 8.0 |
| 41 | [读写分离架构](docs/cases/architecture/41-read-write-splitting.md) | ⭐⭐⭐ | 5.7 & 8.0 |
| 42 | [JSON 字段使用模式](docs/cases/architecture/42-json-column-pattern.md) | ⭐⭐ | 8.0+ |
| 43 | [软删除设计模式](docs/cases/architecture/43-soft-delete-pattern.md) | ⭐⭐ | 5.7 & 8.0 |
| 64 | [分库分表路由策略](docs/cases/architecture/64-sharding-route.md) | ⭐⭐⭐ | 5.7 & 8.0 |
| 65 | [缓存穿透与布隆过滤器](docs/cases/architecture/65-cache-penetration.md) | ⭐⭐⭐ | 5.7 & 8.0 |
| 72 | [自增主键耗尽与分布式 ID](docs/cases/architecture/72-auto-inc-exhaustion.md) | ⭐⭐⭐ | 5.7 & 8.0 |
| 75 | [连接池与 max_connections 耗尽诊断](docs/cases/architecture/75-connection-pool-exhaustion.md) | ⭐⭐ | 5.7 & 8.0 |

### 六、事务与锁（9 个）
| # | 案例 | 难度 | 版本 |
|---|------|------|------|
| 44 | [死锁排查与分析](docs/cases/transaction/44-deadlock-analysis.md) | ⭐⭐⭐ | 5.7 & 8.0 |
| 45 | [间隙锁导致插入阻塞](docs/cases/transaction/45-gap-lock-insert-block.md) | ⭐⭐⭐ | 5.7 & 8.0 |
| 46 | [SELECT FOR UPDATE 锁范围](docs/cases/transaction/46-select-for-update-scope.md) | ⭐⭐ | 5.7 & 8.0 |
| 47 | [乐观锁与悲观锁对比](docs/cases/transaction/47-optimistic-vs-pessimistic-lock.md) | ⭐⭐ | 5.7 & 8.0 |
| 48 | [幻读问题与解决](docs/cases/transaction/48-phantom-read.md) | ⭐⭐⭐ | 5.7 & 8.0 |
| 49 | [死锁重试与超时处理](docs/cases/transaction/49-deadlock-retry-timeout.md) | ⭐⭐ | 5.7 & 8.0 |
| 50 | [唯一索引并发插入冲突](docs/cases/transaction/50-unique-index-concurrent-insert.md) | ⭐⭐ | 5.7 & 8.0 |
| 66 | [长事务危害](docs/cases/transaction/66-long-transaction-harm.md) | ⭐⭐ | 5.7 & 8.0 |
| 67 | [RC vs RR 隔离级别](docs/cases/transaction/67-rc-vs-rr-isolation.md) | ⭐⭐⭐ | 5.7 & 8.0 |

### 七、优化器与 8.0 新特性（9 个）
| # | 案例 | 难度 | 版本 |
|---|------|------|------|
| 51 | [降序索引消除 filesort](docs/cases/optimizer/51-descending-index.md) | ⭐⭐ | 5.7 & 8.0 |
| 52 | [函数索引（8.0）](docs/cases/optimizer/52-functional-index.md) | ⭐⭐ | 8.0+ |
| 53 | [直方图统计优化](docs/cases/optimizer/53-histogram-statistics.md) | ⭐⭐⭐ | 8.0+ |
| 54 | [CTE 递归查询优化](docs/cases/optimizer/54-cte-recursive.md) | ⭐⭐ | 8.0+ |
| 55 | [窗口函数替代自连接](docs/cases/optimizer/55-window-function.md) | ⭐⭐ | 8.0+ |
| 68 | [优化器 Hint 实战](docs/cases/optimizer/68-optimizer-hint.md) | ⭐⭐ | 5.7 & 8.0 |
| 69 | [派生条件下推（8.0）](docs/cases/optimizer/69-derived-condition-pushdown.md) | ⭐⭐⭐ | 8.0+ |
| 70 | [大批量 UPDATE 分批优化](docs/cases/optimizer/70-batch-update.md) | ⭐⭐ | 5.7 & 8.0 |
| 74 | [慢查询排查方法论](docs/cases/optimizer/74-slow-query-diagnosis.md) | ⭐⭐⭐ | 5.7 & 8.0 |

## 🛠️ 项目结构

```
sql-lab/
├── docs/                  # VitePress 文档站
│   ├── .vitepress/        # 配置 + 自定义组件
│   ├── guide/             # 使用指南
│   └── cases/             # 77 篇案例文档
├── sql/cases/             # 可运行 SQL（schema + seed + bad + good）
├── scripts/run-case.sh    # 一键运行案例
├── docker-compose.yml     # MySQL 5.7 + 8.0
├── .github/workflows/     # CI: SQL 校验 + 文档部署
└── CONTRIBUTING.md        # 贡献指南
```

每个案例的目录结构：

```
sql/cases/01-deep-pagination/
├── case.yml          # 元数据（标题/分类/难度/版本）
├── schema.sql        # 建表 + 索引
├── seed.sql          # 造数据（存储过程批量插入）
├── bad.sql           # 问题 SQL
├── good.sql          # 优化后 SQL
├── setup-good.sql    # [可选] DDL/SESSION 变更（如加索引）
└── expected/         # 参考 EXPLAIN 结果
```

## ⚙️ 运行参数

```bash
# 默认使用 MySQL 8.0
./scripts/run-case.sh 01-deep-pagination

# 指定版本
./scripts/run-case.sh 01-deep-pagination --ver 5.7
./scripts/run-case.sh 01-deep-pagination --ver 8.0

# 跳过造数据（已运行过的案例加速复跑）
./scripts/run-case.sh 01-deep-pagination --no-seed
```

## 🤝 贡献

欢迎贡献新案例！请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何添加一个案例。

我们特别欢迎以下方向的贡献：
- 🏭 真实生产中遇到的优化案例（请脱敏）
- 🆕 MySQL 8.0 新特性（CTE、窗口函数、Hash Join）的优化实践
- 🔀 TiDB / OceanBase 等兼容数据库的差异案例
- 📊 更多数据量级（千万级、亿级）的性能对比

## 📄 License

[MIT](LICENSE)
