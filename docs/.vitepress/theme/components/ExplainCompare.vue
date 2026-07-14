<script setup lang="ts">
/**
 * ExplainCompare - bad/good EXPLAIN 并排对比组件
 *
 * 用法:
 *   <ExplainCompare
 *     :bad="{ type: 'ALL', rows: '980,000', extra: 'Using filesort' }"
 *     :good="{ type: 'ref', rows: '12', extra: 'Using index' }"
 *     improvement="扫描行数下降 99.99%"
 *   />
 */
defineProps<{
  bad: Record<string, string>
  good: Record<string, string>
  improvement?: string
}>()

const fields: { key: string; label: string }[] = [
  { key: 'type', label: '访问类型' },
  { key: 'key', label: '使用索引' },
  { key: 'rows', label: '扫描行数' },
  { key: 'Extra', label: '附加信息' },
]
</script>

<template>
  <div class="explain-compare">
    <table>
      <thead>
        <tr>
          <th>指标</th>
          <th class="bad-col">优化前 (bad)</th>
          <th class="good-col">优化后 (good)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="f in fields" :key="f.key">
          <td class="field-label">{{ f.label }}</td>
          <td class="bad-col">{{ bad[f.key] || '-' }}</td>
          <td class="good-col">{{ good[f.key] || '-' }}</td>
        </tr>
      </tbody>
    </table>
    <p v-if="improvement" class="improvement">
      🚀 {{ improvement }}
    </p>
  </div>
</template>

<style scoped>
.explain-compare {
  margin: 16px 0;
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9em;
}
th, td {
  padding: 8px 14px;
  border: 1px solid var(--vp-c-border);
  text-align: left;
}
thead th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}
.field-label {
  font-weight: 600;
  white-space: nowrap;
}
.bad-col {
  color: var(--vp-c-danger-1);
}
.good-col {
  color: var(--vp-c-success-1);
  font-weight: 600;
}
.improvement {
  margin-top: 8px;
  padding: 6px 14px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.9em;
  color: var(--vp-c-success-1);
}
</style>
