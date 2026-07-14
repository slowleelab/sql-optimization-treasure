import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import ExplainCompare from './components/ExplainCompare.vue'
import CaseMeta from './components/CaseMeta.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ExplainCompare', ExplainCompare)
    app.component('CaseMeta', CaseMeta)
  },
} satisfies Theme
