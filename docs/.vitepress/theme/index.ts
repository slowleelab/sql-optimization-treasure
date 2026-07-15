import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import ExplainCompare from './components/ExplainCompare.vue'
import CaseMeta from './components/CaseMeta.vue'
import HomeFeatures from './components/HomeFeatures.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'home-features-after': () => h(HomeFeatures),
    })
  },
  enhanceApp({ app }) {
    app.component('ExplainCompare', ExplainCompare)
    app.component('CaseMeta', CaseMeta)
  },
} satisfies Theme
