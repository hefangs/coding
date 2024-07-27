// .vitepress/theme/index.js

import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'

import './index.css'

export default {
  ...DefaultTheme,

  setup() {
    const route = useRoute()
    const initZoom = () => {
      // new mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }) // Should there be a new?
      new mediumZoom('.main img', { background: 'rgba(0, 0, 0, 0.6)' }) // 图片后面的背景色
    }
    onMounted(() => {
      initZoom()
    })
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    )
  }
}
