export default {
  lang: "zh-CN",
  title: "he",
  base: "/",
  description:
    "技术博客--前端后端运维知识点收录: Vue, React, Taro, ReactNative, Webpack, Vite, UniApp, 小程序, H5, Docker, GitGoLang, Node, Nest, Mysql, Redis, 数据结构, 算法",
  lastUpdated: true,
  ignoreDeadLinks: true,
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "https://user-images.githubusercontent.com/499550/93624428-53932780-f9ae-11ea-8d16-af949e16a09f.png"
      }
    ]
  ],
  themeConfig: {
    siteTitle: "he",
    logo: "https://user-images.githubusercontent.com/499550/93624428-53932780-f9ae-11ea-8d16-af949e16a09f.png",
    sidebar: {
      "/guide/": sidebarGuide()
    },
    socialLinks: [{ icon: "github", link: "https://github.com/hefangs" }],
    footer: {
      message: "Copyright © 2022 Fang He",
      copyright: " 版权所有 浙ICP备2022001576号"
    },
    // editLink: {
    //   pattern: "https://github.com/hefangs",
    //   text: "Edit this page on GitHub"
    // },
    algolia: {
      appId: "8J64VVRP8K",
      apiKey: "a18e2f4cc5665f6602c5631fd868adfd",
      indexName: "vitepress"
    }
  }
}

function sidebarGuide() {
  const menus = [
    {
      text: "Coding",
      collapsible: true,
      items: [{ text: "start", link: "/guide/coding/start" }]
    },
    {
      text: "JavaScript",
      collapsible: true,
      items: [
        { text: "debounce", link: "/guide/javascript/debounce" },
        { text: "throttle", link: "/guide/javascript/throttle" },
        { text: "promise", link: "/guide/javascript/promise" },
        { text: "new", link: "/guide/javascript/new" },
        { text: "unique", link: "/guide/javascript/unique" },
        { text: "instanceof", link: "/guide/javascript/instanceof" },
        { text: "clone-deepClone", link: "/guide/javascript/clone-deepClone" },
        { text: "call-apply-bind", link: "/guide/javascript/call-apply-bind.md" }
        // { text: "arguments", link: "/guide/javascript/arguments" }
      ]
    },
    {
      text: "Tools",
      collapsible: true,
      items: [
        { text: "Nvm", link: "/guide/tools/nvm" },
        { text: "PM2", link: "/guide/tools/pm2" },
        { text: "Git", link: "/guide/tools/git" }
      ]
    }
  ]
  return menus
}
