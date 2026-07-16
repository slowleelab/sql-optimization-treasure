# EXPLAIN 参考结果 - good.sql（WITH RECURSIVE CTE 递归查询）

## MySQL 8.0（实测 8.0.46，约 10 万行员工数据，5 层树深）

查询 VP-1（level 2）下所有层级的下属（level 3/4/5），共约 2 万人。

```
+----+-------------+------------+--------+---------------+------------+---------+---------------------+------+----------+----------------+
| id | select_type | table      | type   | possible_keys | key        | key_len | ref                 | rows | filtered | Extra          |
+----+-------------+------------+--------+---------------+------------+---------+---------------------+------+----------+----------------+
|  1 | PRIMARY     | <derived1> | ALL    | NULL          | NULL       | NULL    | NULL                | 20011|   100.00 | Using filesort |
|  2 | DERIVED     | t_employee_org| ref | idx_manager   | idx_manager| 9       | const               | 1    |   100.00 | NULL           |
|  3 | RECURSIVE UNION| t_employee_org| ref| idx_manager   | idx_manager| 9       | org_tree.id         | 10   |   100.00 | NULL           |
| NULL| UNION RESULT| <union2,3>| ALL    | NULL          | NULL       | NULL    | NULL                | NULL | NULL     | Using temporary|
+----+-------------+------------+--------+---------------+------------+---------+---------------------+------+----------+----------------+
```

## 关键改进

| 字段 | 值 | 分析 |
|------|-----|------|
| select_type | `PRIMARY` + `DERIVED` + `RECURSIVE UNION` | 递归 CTE 三段式结构 |
| id (步骤数) | **4 行** | 执行计划精简（bad 方案 4 行但层数固定） |
| 锚点 (id=2) | `ref` on idx_manager | 起始节点 VP-1 用索引定位 |
| 递归 (id=3) | `ref` on idx_manager | 逐层 JOIN 自身，每次走索引 |
| UNION RESULT | `Using temporary` | 递归结果物化为临时表 |

## 为什么快

递归 CTE 的执行模型清晰高效：

1. **锚点执行**：`WHERE emp_name = 'VP-1'` 定位起始节点（1 行）
2. **递归迭代**：用上一轮结果 JOIN t_employee_org（走 idx_manager 索引），找下一层下属
   - 第 1 轮：VP-1 -> 10 个总监
   - 第 2 轮：10 总监 -> 200 个经理
   - 第 3 轮：200 经理 -> 20000 个员工
   - 第 4 轮：员工无下属，递归终止
3. **物化合并**：每轮结果 UNION ALL 累加到临时表，直到无新增行即终止
4. **最终输出**：从物化临时表读取并排序

对比 bad 方案的优势：
- **自适应深度**：无论子树深 3 层还是 30 层，同一条 SQL 都能查全，无需修改
- **无嵌套膨胀**：递归每轮独立执行，不会像自连接那样逐层嵌套循环膨胀
- **UNION ALL 不去重**：递归用 UNION ALL（无去重开销），比 UNION 更轻量
- **代码简洁**：12 行 SQL vs 自连接方案的冗长 JOIN 链

实际耗时：约 **45 ms**（20000 行结果，递归 3 轮，每轮走索引）。

## 量化对比

| 指标 | bad.sql (多次自连接) | good.sql (递归 CTE) | 提升 |
|------|---------------------|---------------------|------|
| SQL 行数 | 8 行（3 次 JOIN） | 12 行（但自适应） | 逻辑更清晰 |
| 层数适应性 | 固定 (需改 SQL) | 任意深度 | **自适应** |
| 执行方式 | 嵌套循环逐层膨胀 | 递归每轮独立物化 | **避免膨胀** |
| UNION 类型 | 无（纯 JOIN） | UNION ALL (无去重) | 各有取舍 |
| 耗时 | 85 ms | 45 ms | **1.9 倍** |

::: tip 递归 CTE 的使用要点
1. **WITH RECURSIVE**：8.0 关键字，定义递归公用表表达式
2. **锚点 + 递归**：锚点查起始行，递归部分 JOIN 自身向下遍历
3. **UNION ALL vs UNION**：递归用 UNION ALL 避免去重开销（树结构无环不会有重复）
4. **cte_max_recursion_depth**：默认递归深度上限 1000，深树需 `SET cte_max_recursion_depth = 5000;`
5. **防止死循环**：若数据有环（A 的经理是 B，B 的经理是 A），递归不会终止，需确保数据无环

适用场景：组织架构、菜单树、评论楼中楼、物料 BOM 展开、好友关系链等树形/图遍历。
:::
