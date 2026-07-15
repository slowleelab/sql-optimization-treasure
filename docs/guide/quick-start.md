# 快速开始

## 前置要求

- [Docker](https://docs.docker.com/get-docker/) 20.10+
- Git
- （可选）本地 MySQL 客户端，用于手动执行 SQL

## 1. 克隆仓库

```bash
git clone https://github.com/slowleelab/sql-optimization-treasure.git
cd sql-optimization-treasure
```

## 2. 启动 MySQL

一键启动 MySQL 5.7 和 8.0 两个容器：

```bash
docker compose up -d
```

| 容器 | 版本 | 端口 | 用户/密码 |
|------|------|------|-----------|
| sql-treasure-mysql57 | MySQL 5.7 | 3307 | root / root |
| sql-treasure-mysql80 | MySQL 8.0 | 3308 | root / root |

验证容器是否就绪：

```bash
docker compose ps
```

等待状态变为 `healthy`（约 10-15 秒）。

## 3. 运行第一个案例

以「深度分页」为例，默认在 MySQL 8.0 上运行：

```bash
./scripts/run-case.sh 01-deep-pagination
```

脚本会自动完成：
1. ✅ 建表（schema.sql）
2. ✅ 造百万级数据（seed.sql，约 30 秒）
3. ✅ 跑 bad.sql 的 EXPLAIN，记录扫描行数和耗时
4. ✅ 跑 good.sql 的 EXPLAIN，输出彩色对比表

### 指定 MySQL 版本

```bash
# 在 MySQL 5.7 上运行
./scripts/run-case.sh 01-deep-pagination --ver 5.7

# 在 MySQL 8.0 上运行（默认）
./scripts/run-case.sh 01-deep-pagination --ver 8.0
```

### 跳过造数据（重跑 EXPLAIN）

数据已经造好后，如果只想重跑 EXPLAIN 对比，加 `--no-seed`：

```bash
./scripts/run-case.sh 01-deep-pagination --no-seed
```

## 4. 查看所有可用案例

```bash
./scripts/run-case.sh
```

会列出 `sql/cases/` 下所有案例目录。

## 5. 手动连接数据库探索

如果你想自己写 SQL 实验，可以直接连上去：

```bash
# 连接 MySQL 8.0
mysql -h 127.0.0.1 -P 3308 -uroot -proot sql_treasure

# 连接 MySQL 5.7
mysql -h 127.0.0.1 -P 3307 -uroot -proot sql_treasure
```

## 6. 本地预览文档站

```bash
npm install
npm run docs:dev
```

浏览器访问 `http://localhost:5173` 即可看到在线文档。

## 清理环境

```bash
# 停止容器（保留数据）
docker compose down

# 停止并删除数据（完全重来）
docker compose down -v
```

## 下一步

- [如何阅读案例](./how-to-read) —— 了解每个案例的标准结构
- [浏览案例](../cases/indexing/01-deep-pagination) —— 从深度分页开始
