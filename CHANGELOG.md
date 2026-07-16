# 更新日志

## v1.1.0 (2026-07-14)

### 新增

- **新增 30 个高质量案例**（编号 26-55），案例总数从 25 增至 55
- **新增两大分类**：
  - 六、事务与锁（7 个）：死锁排查、间隙锁、FOR UPDATE 锁范围、乐观锁/悲观锁、幻读、死锁重试超时、唯一索引并发插入
  - 七、优化器与 8.0 新特性（5 个）：降序索引、函数索引、直方图统计、CTE 递归、窗口函数
- **扩展现有分类**：
  - 索引设计与失效 +5（38-42）：冗余索引、前缀索引、索引选择性、不可见索引、自增主键跳跃
  - 查询改写 +4（43-46）：DISTINCT 优化、NOT IN vs LEFT JOIN、UNION vs UNION ALL、ORDER BY LIMIT
  - JOIN 优化 +3（47-49）：自连接、JOIN+GROUP BY 聚合、派生表物化
  - DDL 与大表 +3（50-52）：RANGE 分区、批量 INSERT、碎片整理
  - 架构级优化 +3（53-55）：读写分离、JSON 字段、软删除
- **SEO 优化**：添加 Open Graph / Twitter Card meta、启用 sitemap、添加 robots.txt
- **首页优化**：统计数据、分类导航卡片、快速命令块
- **CI/CD**：修复 GitHub Pages 部署（base 路径、.nojekyll）

### 修复

- 修复在线文档 404 错误（VitePress base 配置）
- 修复首页按钮白色问题（使用 VitePress 官方 CSS 变量）
- 修复首页重复鲸鱼图标
- 修正案例 34-37 的 EXPLAIN 预期结果（经 MySQL 8.0.46 实例验证）

## v1.0.0 (2026-07-10)

### 初始发布

- **25 个精选案例**，覆盖 5 大场景：
  - 索引设计与失效（9 个）
  - 查询改写（5 个）
  - JOIN 优化（4 个）
  - DDL 与大表（3 个）
  - 架构级优化（4 个）
- Docker Compose 双 MySQL 实例（5.7 端口 3307，8.0 端口 3308）
- `run-case.sh` 一键运行案例脚本
- VitePress 文档站点，自定义 CaseMeta 和 ExplainCompare 组件
- GitHub Actions CI：SQL 校验 + 文档自动部署
