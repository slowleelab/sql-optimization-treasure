import { defineConfig } from 'vitepress'

// ────────────────────────────── 导航栏 ──────────────────────────────
const nav = [
  { text: '指南', link: '/guide/introduction' },
  { text: '案例', link: '/cases/' },
  { text: 'GitHub', link: 'https://github.com/slowleelab/sql-lab' },
]

// ────────────────────────────── 侧边栏 ──────────────────────────────
const sidebar = {
  '/guide/': [
    {
      text: '开始',
      items: [
        { text: '项目介绍', link: '/guide/introduction' },
        { text: '快速开始', link: '/guide/quick-start' },
        { text: '如何阅读案例', link: '/guide/how-to-read' },
      ],
    },
  ],
  '/cases/': [
    {
      text: '一、索引设计与失效',
      collapsed: false,
      items: [
        { text: '01 · 深度分页 LIMIT 大偏移', link: '/cases/indexing/01-deep-pagination' },
        { text: '02 · 联合索引最左前缀', link: '/cases/indexing/02-leftmost-prefix' },
        { text: '03 · 隐式类型转换致索引失效', link: '/cases/indexing/03-implicit-type-conversion' },
        { text: '04 · 函数操作致索引失效', link: '/cases/indexing/04-function-on-index' },
        { text: '05 · LIKE 前导通配符', link: '/cases/indexing/05-like-leading-wildcard' },
        { text: '06 · OR 条件与索引合并', link: '/cases/indexing/06-or-condition' },
        { text: '07 · 范围查询后列索引失效', link: '/cases/indexing/07-range-after-index' },
        { text: '08 · 覆盖索引避免回表', link: '/cases/indexing/08-covering-index' },
        { text: '09 · 索引下推 ICP', link: '/cases/indexing/09-index-condition-pushdown' },
        { text: '10 · 冗余索引清理', link: '/cases/indexing/10-redundant-index-cleanup' },
        { text: '11 · 前缀索引优化长字符串', link: '/cases/indexing/11-prefix-index' },
        { text: '12 · 索引选择性评估', link: '/cases/indexing/12-index-selectivity' },
        { text: '13 · 不可见索引（8.0）', link: '/cases/indexing/13-invisible-index' },
        { text: '14 · 自增主键跳跃与性能', link: '/cases/indexing/14-auto-increment-gap' },
        { text: '56 · 索引合并 Index Merge 陷阱', link: '/cases/indexing/56-index-merge-pitfall' },
        { text: '57 · 索引跳跃扫描 Skip Scan', link: '/cases/indexing/57-skip-scan' },
        { text: '71 · 游标分页替代深分页', link: '/cases/indexing/71-cursor-pagination' },
      ],
    },
    {
      text: '二、查询改写',
      collapsed: false,
      items: [
        { text: '15 · 子查询改写为 JOIN', link: '/cases/query-rewrite/15-subquery-to-join' },
        { text: '16 · COUNT(*) 慢查询优化', link: '/cases/query-rewrite/16-count-optimization' },
        { text: '17 · GROUP BY filesort 优化', link: '/cases/query-rewrite/17-group-by-filesort' },
        { text: '18 · 大 IN 列表优化', link: '/cases/query-rewrite/18-large-in-list' },
        { text: '19 · EXISTS vs IN', link: '/cases/query-rewrite/19-exists-vs-in' },
        { text: '20 · DISTINCT 优化', link: '/cases/query-rewrite/20-distinct-optimization' },
        { text: '21 · NOT IN vs LEFT JOIN IS NULL', link: '/cases/query-rewrite/21-not-in-vs-left-join' },
        { text: '22 · UNION vs UNION ALL', link: '/cases/query-rewrite/22-union-vs-union-all' },
        { text: '23 · ORDER BY LIMIT 无索引优化', link: '/cases/query-rewrite/23-orderby-limit-no-index' },
        { text: '58 · HAVING 改 WHERE 提前过滤', link: '/cases/query-rewrite/58-having-to-where' },
        { text: '59 · LIMIT 1 优化 EXISTS', link: '/cases/query-rewrite/59-limit1-exists' },
      ],
    },
    {
      text: '三、JOIN 优化',
      collapsed: false,
      items: [
        { text: '24 · 小表驱动大表', link: '/cases/join/24-small-drive-large' },
        { text: '25 · 被驱动表无索引的灾难', link: '/cases/join/25-driven-no-index' },
        { text: '26 · Hash Join vs BNL', link: '/cases/join/26-hash-join-vs-bnl' },
        { text: '27 · 多表 JOIN 顺序控制', link: '/cases/join/27-join-order' },
        { text: '28 · 自连接查询优化', link: '/cases/join/28-self-join-optimization' },
        { text: '29 · JOIN + GROUP BY 聚合优化', link: '/cases/join/29-join-group-by-optimization' },
        { text: '30 · 派生表物化优化', link: '/cases/join/30-derived-table-materialization' },
        { text: '60 · STRAIGHT_JOIN 强制驱动顺序', link: '/cases/join/60-straight-join' },
        { text: '61 · LEFT JOIN 改 INNER JOIN', link: '/cases/join/61-left-join-to-inner' },
      ],
    },
    {
      text: '四、DDL 与大表',
      collapsed: false,
      items: [
        { text: '31 · 大表加索引', link: '/cases/ddl/31-online-ddl' },
        { text: '32 · TEXT/BLOB 字段陷阱', link: '/cases/ddl/32-text-blob-pitfall' },
        { text: '33 · 大表 DELETE 分批', link: '/cases/ddl/33-batch-delete' },
        { text: '34 · 分区表 RANGE 分区优化', link: '/cases/ddl/34-partition-range' },
        { text: '35 · 大表批量 INSERT 优化', link: '/cases/ddl/35-batch-insert-optimization' },
        { text: '36 · OPTIMIZE TABLE 碎片整理', link: '/cases/ddl/36-optimize-table-fragmentation' },
        { text: '62 · 大表加列 INSTANT（8.0）', link: '/cases/ddl/62-instant-add-column' },
        { text: '63 · 修改字段类型锁表', link: '/cases/ddl/63-modify-column-type' },
        { text: '73 · 大字段垂直拆表', link: '/cases/ddl/73-vertical-split-text' },
      ],
    },
    {
      text: '五、架构级优化',
      collapsed: false,
      items: [
        { text: '37 · 多条件动态筛选索引设计', link: '/cases/architecture/37-dynamic-filter' },
        { text: '38 · 报表统计汇总表', link: '/cases/architecture/38-summary-table' },
        { text: '39 · 冷热数据分离', link: '/cases/architecture/39-hot-cold-separation' },
        { text: '40 · 秒杀场景库存扣减', link: '/cases/architecture/40-flash-sale-stock' },
        { text: '41 · 读写分离架构', link: '/cases/architecture/41-read-write-splitting' },
        { text: '42 · JSON 字段使用模式', link: '/cases/architecture/42-json-column-pattern' },
        { text: '43 · 软删除设计模式', link: '/cases/architecture/43-soft-delete-pattern' },
        { text: '64 · 分库分表路由策略', link: '/cases/architecture/64-sharding-route' },
        { text: '65 · 缓存穿透与布隆过滤器', link: '/cases/architecture/65-cache-penetration' },
        { text: '72 · 自增主键耗尽与分布式 ID', link: '/cases/architecture/72-auto-inc-exhaustion' },
      ],
    },
    {
      text: '六、事务与锁',
      collapsed: false,
      items: [
        { text: '44 · 死锁排查与分析', link: '/cases/transaction/44-deadlock-analysis' },
        { text: '45 · 间隙锁导致插入阻塞', link: '/cases/transaction/45-gap-lock-insert-block' },
        { text: '46 · SELECT FOR UPDATE 锁范围', link: '/cases/transaction/46-select-for-update-scope' },
        { text: '47 · 乐观锁与悲观锁对比', link: '/cases/transaction/47-optimistic-vs-pessimistic-lock' },
        { text: '48 · 幻读问题与解决', link: '/cases/transaction/48-phantom-read' },
        { text: '49 · 死锁重试与超时处理', link: '/cases/transaction/49-deadlock-retry-timeout' },
        { text: '50 · 唯一索引并发插入冲突', link: '/cases/transaction/50-unique-index-concurrent-insert' },
        { text: '66 · 长事务危害', link: '/cases/transaction/66-long-transaction-harm' },
        { text: '67 · RC vs RR 隔离级别', link: '/cases/transaction/67-rc-vs-rr-isolation' },
      ],
    },
    {
      text: '七、优化器与 8.0 新特性',
      collapsed: false,
      items: [
        { text: '51 · 降序索引消除 filesort', link: '/cases/optimizer/51-descending-index' },
        { text: '52 · 函数索引（8.0）', link: '/cases/optimizer/52-functional-index' },
        { text: '53 · 直方图统计优化', link: '/cases/optimizer/53-histogram-statistics' },
        { text: '54 · CTE 递归查询优化', link: '/cases/optimizer/54-cte-recursive' },
        { text: '55 · 窗口函数替代自连接', link: '/cases/optimizer/55-window-function' },
        { text: '68 · 优化器 Hint 实战', link: '/cases/optimizer/68-optimizer-hint' },
        { text: '69 · 派生条件下推（8.0）', link: '/cases/optimizer/69-derived-condition-pushdown' },
        { text: '70 · 大批量 UPDATE 分批优化', link: '/cases/optimizer/70-batch-update' },
      ],
    },
  ],
}

// ────────────────────────────── 站点配置 ──────────────────────────────
export default defineConfig({
  title: 'SQL Lab',
  description: '一套能跑、能量化对比的 MySQL 优化实战案例集',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,

  // GitHub Pages 部署在 /sql-lab/ 子路径下
  base: '/sql-lab/',

  // 站点 URL（用于 sitemap 和 canonical 链接）
  sitemap: {
    hostname: 'https://slowleelab.github.io/sql-lab/',
  },

  head: [
    ['meta', { name: 'theme-color', content: '#3aa675' }],
    ['link', { rel: 'icon', href: '/sql-lab/favicon.svg' }],

    // SEO: 关键词
    ['meta', { name: 'keywords', content: 'MySQL优化,SQL优化,EXPLAIN,索引优化,MySQL 8.0,数据库性能,Docker,慢查询,事务锁,查询改写' }],

    // Open Graph（社交分享卡片）
    ['meta', { property: 'og:site_name', content: 'SQL Lab' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'SQL Lab · 73 个能跑的 MySQL 优化实战案例' }],
    ['meta', { property: 'og:description', content: '一套能跑、能量化对比的 MySQL 优化实战案例集。73 个精选案例，7 大场景，Docker 一键复现，bad/good EXPLAIN 量化对比。' }],
    ['meta', { property: 'og:url', content: 'https://slowleelab.github.io/sql-lab/' }],
    ['meta', { property: 'og:image', content: 'https://slowleelab.github.io/sql-lab/og-image.svg' }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'SQL Lab · 73 个能跑的 MySQL 优化实战案例' }],
    ['meta', { name: 'twitter:description', content: '一套能跑、能量化对比的 MySQL 优化实战案例集。Docker 一键复现，bad/good EXPLAIN 量化对比。' }],
    ['meta', { name: 'twitter:image', content: 'https://slowleelab.github.io/sql-lab/og-image.svg' }],
  ],

  themeConfig: {
    nav,
    sidebar,

    logo: '/favicon.svg',

    search: {
      provider: 'local',
    },

    outline: {
      label: '本页目录',
      level: [2, 3],
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/slowleelab/sql-lab' },
    ],

    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2026 SQL Lab',
    },

    lastUpdatedText: '最后更新',
  },
})
