export default {
  markdown: {
    // 行号
    lineNumbers: true,
    image: {
      // 启用图片懒加载
      lazyLoading: true
    }
  },
  lang: 'zh-CN',
  title: 'he',
  base: '/',
  description: '一个笔记本子而已',
  // cleanUrls: 'with-subfolders', //  // 从 URL 中删除随尾.html
  lastUpdated: true, // 以git提交的时间为更新时间
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
    // search: {
    //   provider: 'local'
    // },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'short', // full,long,medium,short
        timeStyle: 'medium' // full,long,medium,short
      }
    },
    docFooter: { prev: 'prev', next: 'next' },
    siteTitle: 'he',
    logo: '/one-price.png',
    sidebar: {
      '/post/': sideBar()
    },
    // 社会链接
    socialLinks: [{ icon: 'github', link: 'https://github.com/hefangs' }],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Coding', link: '/post/note/coding' },
      { text: 'JavaScript', link: '/post/note/javascript' },
      // { text: 'Vue3', link: '/post/note/vue3.0' },
      // { text: 'React', link: '/post/note/react' },
      // { text: 'Webpack', link: '/post/note/react' },
      { text: 'Python', link: '/post/note/python' },
      { text: 'Tools', link: '/post/note/tools', activeMatch: '/post' }
      // 导航链接也可以是下拉菜单
      // {
      //   text: 'Dropdown Menu',
      //   items: [
      //     { text: 'Item A', link: '/item-1' },
      //     { text: 'Item B', link: '/item-2' },
      //     { text: 'Item C', link: '/item-3' }
      //   ]
      // }
      // 外部链接
      // {
      //   text: 'Merchandise',
      //   link: 'https://www.thegithubshop.com/',
      //   target: '_self',
      //   rel: 'sponsored'
      // }
    ],
    algolia: {
      appId: '8J64VVRP8K',
      apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
      indexName: 'vitepress'
    },
    footer: {
      message: 'Copyright © 2024 Fang He',
      copyright: '版权所有 浙ICP备2022001576号'
    }
    // editLink: {
    //   pattern: 'https://github.com/hefangs',
    //   text: 'Edit this page on GitHub'
    // },
    // algolia: {
    //   appId: '8J64VVRP8K',
    //   apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
    //   indexName: 'vitepress'
    // }
  }
}

function sideBar() {
  const menus = [
    {
      // text: 'Note',
      collapsible: true,
      // collapsed: true,
      items: [
        { text: 'Start', link: '/post/note/start' },
        { text: 'Coding', link: '/post/note/coding' },
        { text: 'Html & Css', link: '/post/note/html-css.md' },
        { text: 'JavaScript', link: '/post/note/javascript' },
        { text: 'Vue2.0', link: '/post/note/vue2.0' },
        { text: 'Vue3.0', link: '/post/note/vue3.0' },
        { text: 'Http', link: '/post/note/http' },
        { text: 'React', link: '/post/note/react' },
        { text: 'Webpack', link: '/post/note/webpack' },
        { text: 'TypeScript', link: '/post/note/typescript' },
        { text: 'Node', link: '/post/note/node' },
        { text: 'Python', link: '/post/note/python' },
        { text: 'Selenium', link: '/post/note/selenium' },
        { text: 'Pytest', link: '/post/note/pytest' },
        { text: 'Unittest', link: '/post/note/unittest' },
        { text: 'Sql', link: '/post/note/sql' },
        { text: 'Appium', link: '/post/note/appium' },
        { text: 'Jmeter', link: '/post/note/jmeter' },
        { text: 'Postman', link: '/post/note/postman' },
        { text: 'Tools', link: '/post/note/tools' }
      ]
    }
  ]
  return menus
}
