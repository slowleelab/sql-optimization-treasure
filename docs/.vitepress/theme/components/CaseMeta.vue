<script setup lang="ts">
/**
 * CaseMeta - 案例元信息徽章组件
 * 显示难度、适用版本、分类等标签
 */
defineProps<{
  difficulty?: string   // ⭐ / ⭐⭐ / ⭐⭐⭐
  category?: string     // 索引 / 查询改写 / JOIN / DDL / 架构
  versions?: string     // 5.7+ / 8.0+ / 5.7 & 8.0
  tags?: string[]       // 其他标签
}>()
</script>

<template>
  <div class="case-meta">
    <span v-if="difficulty" class="badge difficulty">{{ difficulty }}</span>
    <span v-if="category" class="badge category">{{ category }}</span>
    <span v-if="versions" class="badge version">{{ versions }}</span>
    <span v-for="tag in tags" :key="tag" class="badge tag">{{ tag }}</span>
  </div>
</template>

<style scoped>
.case-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0;
}
.badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.85em;
  font-weight: 500;
}
.difficulty {
  background: rgba(255, 193, 7, 0.15);
  color: #f0a020;
}
.category {
  background: var(--vp-c-indigo-soft);
  color: var(--vp-c-indigo-1);
}
.version {
  background: rgba(25, 135, 84, 0.15);
  color: var(--vp-c-success-1);
}
.tag {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}
</style>
