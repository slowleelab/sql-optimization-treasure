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
        { text: '38 · 冗余索引清理', link: '/cases/indexing/38-redundant-index-cleanup' },
        { text: '39 · 前缀索引优化长字符串', link: '/cases/indexing/39-prefix-index' },
        { text: '40 · 索引选择性评估', link: '/cases/indexing/40-index-selectivity' },
        { text: '41 · 不可见索引（8.0）', link: '/cases/indexing/41-invisible-index' },
        { text: '42 · 自增主键跳跃与性能', link: '/cases/indexing/42-auto-increment-gap' },
      ],
    },
    {
      text: '二、查询改写',
      collapsed: false,
      items: [
        { text: '10 · 子查询改写为 JOIN', link: '/cases/query-rewrite/10-subquery-to-join' },
        { text: '11 · COUNT(*) 慢查询优化', link: '/cases/query-rewrite/11-count-optimization' },
        { text: '12 · GROUP BY filesort 优化', link: '/cases/query-rewrite/12-group-by-filesort' },
        { text: '13 · 大 IN 列表优化', link: '/cases/query-rewrite/13-large-in-list' },
        { text: '14 · EXISTS vs IN', link: '/cases/query-rewrite/14-exists-vs-in' },
        { text: '43 · DISTINCT 优化', link: '/cases/query-rewrite/43-distinct-optimization' },
        { text: '44 · NOT IN vs LEFT JOIN IS NULL', link: '/cases/query-rewrite/44-not-in-vs-left-join' },
        { text: '45 · UNION vs UNION ALL', link: '/cases/query-rewrite/45-union-vs-union-all' },
        { text: '46 · ORDER BY LIMIT 无索引优化', link: '/cases/query-rewrite/46-orderby-limit-no-index' },
      ],
    },
    {
      text: '三、JOIN 优化',
      collapsed: false,
      items: [
        { text: '15 · 小表驱动大表', link: '/cases/join/15-small-drive-large' },
        { text: '16 · 被驱动表无索引的灾难', link: '/cases/join/16-driven-no-index' },
        { text: '17 · Hash Join vs BNL', link: '/cases/join/17-hash-join-vs-bnl' },
        { text: '18 · 多表 JOIN 顺序控制', link: '/cases/join/18-join-order' },
        { text: '47 · 自连接查询优化', link: '/cases/join/47-self-join-optimization' },
        { text: '48 · JOIN + GROUP BY 聚合优化', link: '/cases/join/48-join-group-by-optimization' },
        { text: '49 · 派生表物化优化', link: '/cases/join/49-derived-table-materialization' },
      ],
    },
    {
      text: '四、DDL 与大表',
      collapsed: false,
      items: [
        { text: '19 · 大表加索引', link: '/cases/ddl/19-online-ddl' },
        { text: '20 · TEXT/BLOB 字段陷阱', link: '/cases/ddl/20-text-blob-pitfall' },
        { text: '21 · 大表 DELETE 分批', link: '/cases/ddl/21-batch-delete' },
        { text: '50 · 分区表 RANGE 分区优化', link: '/cases/ddl/50-partition-range' },
        { text: '51 · 大表批量 INSERT 优化', link: '/cases/ddl/51-batch-insert-optimization' },
        { text: '52 · OPTIMIZE TABLE 碎片整理', link: '/cases/ddl/52-optimize-table-fragmentation' },
      ],
    },
    {
      text: '五、架构级优化',
      collapsed: false,
      items: [
        { text: '22 · 多条件动态筛选索引设计', link: '/cases/architecture/22-dynamic-filter' },
        { text: '23 · 报表统计汇总表', link: '/cases/architecture/23-summary-table' },
        { text: '24 · 冷热数据分离', link: '/cases/architecture/24-hot-cold-separation' },
        { text: '25 · 秒杀场景库存扣减', link: '/cases/architecture/25-flash-sale-stock' },
        { text: '53 · 读写分离架构', link: '/cases/architecture/53-read-write-splitting' },
        { text: '54 · JSON 字段使用模式', link: '/cases/architecture/54-json-column-pattern' },
        { text: '55 · 软删除设计模式', link: '/cases/architecture/55-soft-delete-pattern' },
      ],
    },
    {
      text: '六、事务与锁',
      collapsed: false,
      items: [
        { text: '26 · 死锁排查与分析', link: '/cases/transaction/26-deadlock-analysis' },
        { text: '27 · 间隙锁导致插入阻塞', link: '/cases/transaction/27-gap-lock-insert-block' },
        { text: '28 · SELECT FOR UPDATE 锁范围', link: '/cases/transaction/28-select-for-update-scope' },
        { text: '29 · 乐观锁与悲观锁对比', link: '/cases/transaction/29-optimistic-vs-pessimistic-lock' },
        { text: '30 · 幻读问题与解决', link: '/cases/transaction/30-phantom-read' },
        { text: '31 · 死锁重试与超时处理', link: '/cases/transaction/31-deadlock-retry-timeout' },
        { text: '32 · 唯一索引并发插入冲突', link: '/cases/transaction/32-unique-index-concurrent-insert' },
      ],
    },
    {
      text: '七、优化器与 8.0 新特性',
      collapsed: false,
      items: [
        { text: '33 · 降序索引消除 filesort', link: '/cases/optimizer/33-descending-index' },
        { text: '34 · 函数索引（8.0）', link: '/cases/optimizer/34-functional-index' },
        { text: '35 · 直方图统计优化', link: '/cases/optimizer/35-histogram-statistics' },
        { text: '36 · CTE 递归查询优化', link: '/cases/optimizer/36-cte-recursive' },
        { text: '37 · 窗口函数替代自连接', link: '/cases/optimizer/37-window-function' },
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
    ['meta', { property: 'og:title', content: 'SQL Lab · 55 个能跑的 MySQL 优化实战案例' }],
    ['meta', { property: 'og:description', content: '一套能跑、能量化对比的 MySQL 优化实战案例集。55 个精选案例，7 大场景，Docker 一键复现，bad/good EXPLAIN 量化对比。' }],
    ['meta', { property: 'og:url', content: 'https://slowleelab.github.io/sql-lab/' }],
    ['meta', { property: 'og:image', content: 'https://slowleelab.github.io/sql-lab/og-image.svg' }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'SQL Lab · 55 个能跑的 MySQL 优化实战案例' }],
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
