export default {
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
        href: 'http://mms0.baidu.com/it/u=1906135646,1953718901&fm=253&app=138&f=PNG&fmt=auto&q=75?w=357&h=316'
      }
    ]
  ],
  themeConfig: {
    siteTitle: 'he',
    logo: 'http://mms0.baidu.com/it/u=1906135646,1953718901&fm=253&app=138&f=PNG&fmt=auto&q=75?w=357&h=316',
    sidebar: {
      '/post/': sidebarpost()
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/hefangs' }],
    footer: {
      message: 'Copyright © 2022 Fang He',
      copyright: ' 版权所有 浙ICP备2022001576号'
    },
    // editLink: {
    //   pattern: "https://github.com/hefangs",
    //   text: "Edit this page on GitHub"
    // },
    algolia: {
      appId: '8J64VVRP8K',
      apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
      indexName: 'vitepress'
    }
  }
}

function sidebarpost() {
  const menus = [
    {
      text: 'At',
      collapsible: true,
      items: [{ text: 'start', link: '/post/at/start' }]
    },
    {
      text: 'Coding',
      collapsible: true,
      items: [
        { text: 'debounce', link: '/post/coding/debounce' },
        { text: 'throttle', link: '/post/coding/throttle' },
        { text: 'promise', link: '/post/coding/promise' },
        { text: 'new', link: '/post/coding/new' },
        { text: 'array', link: '/post/coding/array' },
        { text: 'instanceof', link: '/post/coding/instanceof' },
        { text: 'clone-deepClone', link: '/post/coding/clone-deepClone' },
        {
          text: 'call-apply-bind',
          link: '/post/coding/call-apply-bind.md'
        },
        { text: 'extends', link: '/post/coding/extends' },
        { text: 'draggingDiv', link: '/post/coding/draggingDiv' },
        { text: 'lazyLoad', link: '/post/coding/lazyLoad' },
        { text: 'sort', link: '/post/coding/sort' },
        {
          text: 'symbol.iterator',
          link: '/post/coding/symbol.iterator'
        },
        {
          text: 'object.key',
          link: '/post/coding/object.key'
        }
      ]
    },
    {
      text: 'Vue',
      collapsible: true,
      items: [
        { text: 'vue2.0', link: '/post/vue/vue2.0' },
        { text: 'vue3.0', link: '/post/vue/vue3.0' }
      ]
    },
    {
      text: 'Interview',
      collapsible: true,
      items: [
        { text: 'updated-20221212', link: '/post/interview/updated-20221212' }
      ]
    },
    {
      text: 'Tools',
      collapsible: true,
      items: [{ text: 'Git', link: '/post/tools/git' }]
    }
  ]
  return menus
}
