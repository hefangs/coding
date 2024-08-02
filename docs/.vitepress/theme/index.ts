// .vitepress/theme/index.js

import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick, onUnmounted } from 'vue'
import { useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from './Layout.vue'
import './index.css'

export default {
  ...DefaultTheme,
  Layout,
  setup() {
    const route = useRoute()
    const initZoom = () => {
      // new mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }) // Should there be a new?
      new mediumZoom('.main img', { background: 'rgba(0, 0, 0, 0.9)' }) // 图片后面的背景色
    }
    onMounted(() => {
      initZoom()
    })
    watch(
      () => route.path,
      (newPath, oldPath) => {
        // 初始化图片缩放效果
        nextTick(() => {
          initZoom()
        })

        // 监听路由变化以启动和停止 nprogress
        if (newPath !== oldPath) {
          NProgress.start()
        }
        nextTick(() => {
          NProgress.done()
        })
      }
    )
  }
}
