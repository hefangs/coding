export default {
  markdown: {
    lineNumbers: true
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
        // href: 'http://mms0.baidu.com/it/u=1906135646,1953718901&fm=253&app=138&f=PNG&fmt=auto&q=75?w=357&h=316'
        href: '/one-price.png'
      }
    ]
  ],
  themeConfig: {
    siteTitle: 'he',
    logo: '/one-price.png',
    sidebar: {
      '/post/': sideBar()
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/hefangs' }],
    // lastUpdatedText: '最近更新时间',
    // docFooter: { prev: '上一篇', next: '下一篇' },
    nav: [
      // { text: 'Coding', link: '/post/note/coding' },
      // { text: 'JS', link: '/post/note/javascript' },
      // { text: 'Vue2', link: '/post/note/vue2.0' },
      // { text: 'Vue3', link: '/post/note/vue3.0' },
      // { text: 'React', link: '/post/note/react' },
      // { text: 'Webpack', link: '/post/note/react' },
      // { text: 'TypeScript', link: '/post/note/typescript' },
      // { text: 'Node', link: '/post/note/node' }
    ],
    footer: {
      message: 'Copyright © 2023 Fang He',
      copyright: '版权所有 浙ICP备2022001576号'
    },
    // editLink: {
    //   pattern: 'https://github.com/hefangs',
    //   text: 'Edit this page on GitHub'
    // },
    algolia: {
      appId: '8J64VVRP8K',
      apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
      indexName: 'vitepress'
    }
  }
}

function sideBar() {
  const menus = [
    {
      text: 'Note',
      collapsible: true,
      // collapsed: true,
      items: [
        { text: 'Start', link: '/post/note/start' },
        { text: 'Coding', link: '/post/note/coding' },
        { text: 'Html & Css', link: '/post/note/html-css.md' },
        { text: 'JavaScript', link: '/post/note/javascript' },
        { text: 'Vue2.0', link: '/post/note/vue2.0' },
        { text: 'Vue3.0', link: '/post/note/vue3.0' },
        { text: 'React', link: '/post/note/react' },
        { text: 'Webpack', link: '/post/note/webpack' },
        { text: 'TypeScript', link: '/post/note/typescript' },
        { text: 'Git', link: '/post/note/git' },
        { text: 'Node', link: '/post/note/node' }
      ]
    }
  ]
  return menus
}
