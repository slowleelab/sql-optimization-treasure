# SQL 优化典藏大集

> 🐳 一套**能跑、能量化对比**的 MySQL 优化实战案例集  
> 每个案例都带真实数据，Docker 一键复现，bad/good EXPLAIN 量化对比

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![MySQL](https://img.shields.io/badge/MySQL-5.7%20%7C%208.0-blue.svg)](https://www.mysql.com/)
[![CI](https://github.com/your-username/sql-optimization-treasure/actions/workflows/validate-sql.yml/badge.svg)](https://github.com/your-username/sql-optimization-treasure/actions)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Cases](https://img.shields.io/badge/cases-25-orange.svg)](docs/cases/)

📖 **在线文档**：[https://your-username.github.io/sql-optimization-treasure/](https://your-username.github.io/sql-optimization-treasure/)  
🤖 **AI 对话**：接入 DeepWiki，可直接与仓库对话提问

> 如果这个项目对你有帮助，欢迎 ⭐ Star 支持！你的 Star 是持续更新的动力。

---

## ✨ 为什么用这个项目

网上不缺 SQL 优化文章，但大多**只讲不练**——贴一段 SQL 说"这样慢，那样快"，你却无法验证。

本项目不同：

| 特性 | 普通文章 | SQL 优化典藏 |
|------|---------|-------------|
| 能否复现 | ❌ 只能看 | ✅ Docker 一键跑 |
| 数据量 | ❌ 假数据/无数据 | ✅ 百万级真实数据 |
| 效果验证 | ❌ 口头说快 | ✅ EXPLAIN 量化对比 |
| 版本覆盖 | ❌ 不区分版本 | ✅ 5.7 + 8.0 双版本 |
| 场景贴近 | ❌ 教科书式 | ✅ 生产场景命名 |

## 🚀 快速开始

```bash
# 1. 克隆
git clone https://github.com/your-username/sql-optimization-treasure.git
cd sql-optimization-treasure

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

共 25 个精选案例，覆盖五大场景：

### 一、索引设计与失效（9 个）
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

### 二、查询改写（5 个）
| # | 案例 | 难度 | 版本 |
|---|------|------|------|
| 10 | [子查询改写为 JOIN](docs/cases/query-rewrite/10-subquery-to-join.md) | ⭐⭐ | 5.7 & 8.0 |
| 11 | [COUNT(*) 慢查询优化](docs/cases/query-rewrite/11-count-optimization.md) | ⭐⭐ | 5.7 & 8.0 |
| 12 | [GROUP BY filesort 优化](docs/cases/query-rewrite/12-group-by-filesort.md) | ⭐⭐ | 5.7 & 8.0 |
| 13 | [大 IN 列表优化](docs/cases/query-rewrite/13-large-in-list.md) | ⭐⭐ | 5.7 & 8.0 |
| 14 | [EXISTS vs IN](docs/cases/query-rewrite/14-exists-vs-in.md) | ⭐⭐ | 5.7 & 8.0 |

### 三、JOIN 优化（4 个）
| # | 案例 | 难度 | 版本 |
|---|------|------|------|
| 15 | [小表驱动大表](docs/cases/join/15-small-drive-large.md) | ⭐⭐ | 5.7 & 8.0 |
| 16 | [被驱动表无索引的灾难](docs/cases/join/16-driven-no-index.md) | ⭐⭐ | 5.7 & 8.0 |
| 17 | [Hash Join vs BNL](docs/cases/join/17-hash-join-vs-bnl.md) | ⭐⭐⭐ | 8.0+ |
| 18 | [多表 JOIN 顺序控制](docs/cases/join/18-join-order.md) | ⭐⭐⭐ | 5.7 & 8.0 |

### 四、DDL 与大表（3 个）
| # | 案例 | 难度 | 版本 |
|---|------|------|------|
| 19 | [大表加索引 Online DDL](docs/cases/ddl/19-online-ddl.md) | ⭐⭐⭐ | 5.7 & 8.0 |
| 20 | [TEXT/BLOB 字段陷阱](docs/cases/ddl/20-text-blob-pitfall.md) | ⭐⭐ | 5.7 & 8.0 |
| 21 | [大表 DELETE 分批](docs/cases/ddl/21-batch-delete.md) | ⭐⭐ | 5.7 & 8.0 |

### 五、架构级优化（4 个）
| # | 案例 | 难度 | 版本 |
|---|------|------|------|
| 22 | [多条件动态筛选索引设计](docs/cases/architecture/22-dynamic-filter.md) | ⭐⭐⭐ | 5.7 & 8.0 |
| 23 | [报表统计汇总表](docs/cases/architecture/23-summary-table.md) | ⭐⭐ | 5.7 & 8.0 |
| 24 | [冷热数据分离](docs/cases/architecture/24-hot-cold-separation.md) | ⭐⭐⭐ | 5.7 & 8.0 |
| 25 | [秒杀场景库存扣减](docs/cases/architecture/25-flash-sale-stock.md) | ⭐⭐⭐ | 5.7 & 8.0 |

## 🛠️ 项目结构

```
sql-optimization-treasure/
├── docs/                  # VitePress 文档站
│   ├── .vitepress/        # 配置 + 自定义组件
│   ├── guide/             # 使用指南
│   └── cases/             # 25 篇案例文档
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
