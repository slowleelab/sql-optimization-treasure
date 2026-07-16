# 贡献指南

感谢你有兴趣为 SQL Lab贡献案例！这份指南会帮你快速上手。

## 前置准备

在开始之前，请确保本地环境已就绪：

```bash
# 1. 克隆仓库
git clone https://github.com/slowleelab/sql-lab.git
cd sql-lab

# 2. 启动 MySQL 容器（5.7 + 8.0）
docker compose up -d

# 3. 安装文档站依赖（用于本地预览文档）
npm install

# 4. 验证环境（运行一个已有案例）
./scripts/run-case.sh 01-deep-pagination
```

## 贡献一个案例

### 1. 创建案例目录

推荐使用脚手架脚本快速创建案例骨架：

```bash
# 用法: ./scripts/new-case.sh <编号-名称> <分类>
./scripts/new-case.sh 56-your-case-name indexing
```

支持的分类：`indexing` / `query-rewrite` / `join` / `ddl` / `architecture` / `transaction` / `optimizer`

也可以手动创建：

```bash
mkdir -p sql/cases/56-your-case-name/expected
```

### 2. 必需文件

每个案例必须包含以下文件：

| 文件 | 必须 | 说明 |
|------|------|------|
| `case.yml` | ✅ | 案例元数据 |
| `schema.sql` | ✅ | 建表语句 + 索引 |
| `seed.sql` | ✅ | 造数据存储过程/脚本 |
| `bad.sql` | ✅ | 问题 SQL |
| `good.sql` | ✅ | 优化后 SQL（可多个方案用注释分隔） |
| `expected/explain-bad.md` | ✅ | 参考 EXPLAIN 结果 |
| `expected/explain-good.md` | ✅ | 参考 EXPLAIN 结果 |

### 3. case.yml 模板

```yaml
title: 深度分页 LIMIT 大偏移          # 案例标题
category: indexing                   # 分类: indexing/query-rewrite/join/ddl/architecture
difficulty: 2                        # 难度: 1(⭐) 2(⭐⭐) 3(⭐⭐⭐)
versions: ["5.7", "8.0"]            # 适用版本
tags: ["分页", "延迟关联", "覆盖索引"] # 标签
description: |
  电商订单列表翻页到第 10 万页时耗时飙升，
  通过延迟关联和覆盖索引优化。
```

### 4. schema.sql 规范

- 使用 `InnoDB` 引擎
- 使用 `utf8mb4` 字符集
- 表名使用 `t_` 前缀
- 字段名小写下划线
- 索引名：主键 `pk_`，唯一索引 `uk_`，普通索引 `idx_`

```sql
DROP TABLE IF EXISTS t_order;
CREATE TABLE t_order (
    id          BIGINT       NOT NULL AUTO_INCREMENT,
    user_id     BIGINT       NOT NULL,
    order_no    VARCHAR(32)  NOT NULL,
    amount      DECIMAL(10,2) NOT NULL,
    status      TINYINT      NOT NULL DEFAULT 0,
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 5. seed.sql 规范

造数据量至少 **10 万行**，推荐百万级。使用存储过程批量插入（每批 1000 行）：

```sql
DELIMITER $$
CREATE PROCEDURE seed_orders(IN cnt INT)
BEGIN
    DECLARE i INT DEFAULT 0;
    SET autocommit = 0;
    WHILE i < cnt DO
        INSERT INTO t_order (user_id, order_no, amount, status, created_at)
        VALUES (FLOOR(RAND()*100000), CONCAT('NO', i), ROUND(RAND()*1000,2), FLOOR(RAND()*4), NOW() - INTERVAL FLOOR(RAND()*365) DAY);
        SET i = i + 1;
        IF i % 1000 = 0 THEN COMMIT; END IF;
    END WHILE;
    COMMIT;
    SET autocommit = 1;
END$$
DELIMITER ;

CALL seed_orders(1000000);
DROP PROCEDURE IF EXISTS seed_orders;
```

### 6. bad.sql / good.sql 规范

- 每个 `.sql` 文件只放一条语句（便于 EXPLAIN）
- 第一行用 `--` 注释说明这条 SQL 的目的
- good.sql 可用注释分隔多个优化方案

```sql
-- bad.sql: 常见写法，大偏移分页
SELECT * FROM t_order WHERE status = 1 ORDER BY created_at LIMIT 1000000, 20;
```

```sql
-- good.sql: 延迟关联 + 覆盖索引
SELECT t.* FROM t_order t
INNER JOIN (
    SELECT id FROM t_order WHERE status = 1 ORDER BY created_at LIMIT 1000000, 20
) tmp ON t.id = tmp.id;
```

### 7. 文档正文

在 `docs/cases/<分类>/` 下创建对应的 `.md` 文件，遵循五段式结构：

```markdown
# 案例标题

<CaseMeta difficulty="⭐⭐" category="索引" versions="5.7 & 8.0" :tags="['分页']" />

## 场景痛点
（真实业务背景）

## 问题分析
（bad.sql + EXPLAIN 分析）

## 优化方案
（good.sql + 原理讲解）

## 量化对比
<ExplainCompare
  :bad="{ type: 'ALL', rows: '980,000', Extra: 'Using filesort' }"
  :good="{ type: 'ref', rows: '12', Extra: 'Using index' }"
  improvement="扫描行数下降 99.99%"
/>

## 避坑指南
（适用边界和注意事项）
```

### 8. 验证

提交前确保案例能跑通：

```bash
./scripts/run-case.sh your-case-name --ver 8.0
./scripts/run-case.sh your-case-name --ver 5.7
```

## 其他贡献方式

- 🐛 [报告 Bug](https://github.com/slowleelab/sql-lab/issues)
- 💡 [建议新案例](https://github.com/slowleelab/sql-lab/issues)
- 📝 改进文档措辞和排版
- 🔍 审查 EXPLAIN 结果的准确性

## 行为准则

请保持友善和尊重。我们欢迎所有技术水平的人参与。
