import sideBar from './utils/sidebar.ts'
import nav from './utils/nav.ts'
export default {
  markdown: {
    // container: {
    //   tipLabel: '提示',
    //   warningLabel: '警告',
    //   dangerLabel: '危险',
    //   infoLabel: '信息',
    //   detailsLabel: '详细信息'
    // },
    lineNumbers: true,
    image: {
      lazyLoading: true
    }
  },
  lang: 'zh-CN',
  title: 'he',
  base: '/',
  description: '一个笔记本子而已',
  lastUpdated: true,
  ignoreDeadLinks: true,
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/one-price.png'
      }
    ]
  ],
  themeConfig: {
    siteTitle: 'he',
    logo: '/one-price.png',
    sidebar: sideBar(),
    // 社交链接
    socialLinks: [{ icon: 'github', link: 'https://github.com/hefangs' }],
    nav: nav(),
    // algolia 搜索
    // search - provider:local 设置是没有问题的，只是启动服务时间比之前多了10来秒
    // search: {
    //   provider: 'local'
    // },
    lastUpdated: {
      text: 'Updated on',
      formatOptions: {
        dateStyle: 'short', // full,long,medium,short
        timeStyle: 'medium' // full,long,medium,short
      }
    },
    docFooter: { prev: 'prev', next: 'next' },
    algolia: {
      appId: '8J64VVRP8K',
      apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
      indexName: 'vitepress'
    },
    footer: {
      message: 'Copyright © 2024 Fang He',
      copyright: '版权所有 浙ICP备2022001576号'
    },
    editLink: {
      pattern: 'https://github.com/hefangs',
      text: 'Edit this page on GitHub'
    }
  }
}
