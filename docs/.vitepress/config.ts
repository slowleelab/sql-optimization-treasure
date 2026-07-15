import { defineConfig } from 'vitepress'

// ────────────────────────────── 导航栏 ──────────────────────────────
const nav = [
  { text: '指南', link: '/guide/introduction' },
  { text: '案例', link: '/cases/' },
  { text: 'GitHub', link: 'https://github.com/your-username/sql-optimization-treasure' },
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
      ],
    },
    {
      text: '四、DDL 与大表',
      collapsed: false,
      items: [
        { text: '19 · 大表加索引', link: '/cases/ddl/19-online-ddl' },
        { text: '20 · TEXT/BLOB 字段陷阱', link: '/cases/ddl/20-text-blob-pitfall' },
        { text: '21 · 大表 DELETE 分批', link: '/cases/ddl/21-batch-delete' },
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
      ],
    },
  ],
}

// ────────────────────────────── 站点配置 ──────────────────────────────
export default defineConfig({
  title: 'SQL 优化典藏',
  description: '一套能跑、能量化对比的 MySQL 优化实战案例集',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['meta', { name: 'theme-color', content: '#3aa675' }],
    ['link', { rel: 'icon', href: '/favicon.svg' }],
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
      { icon: 'github', link: 'https://github.com/your-username/sql-optimization-treasure' },
    ],

    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2026 SQL 优化典藏',
    },

    lastUpdatedText: '最后更新',
  },
})
