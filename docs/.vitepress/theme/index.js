// .vitepress/theme/index.js

import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'
import mediumZoom from 'medium-zoom'

import './index.css'

export default {
  ...DefaultTheme,
  setup() {
    onMounted(() => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' })
      // 为所有图像启用此功能而不显式添加 {data-zoomable}
      mediumZoom('.main img', { background: 'rgba(0, 0, 0, 0.5)' })
    })
  }
}
