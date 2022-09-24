export default {
  lang: "zh-CN",
  title: "he",
  base: "/",
  description: "一个笔记本子而已",
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
      "/post/": sidebarpost()
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

function sidebarpost() {
  const menus = [
    {
      text: "Coding",
      collapsible: true,
      items: [{ text: "start", link: "/post/coding/start" }]
    },
    {
      text: "JavaScript",
      collapsible: true,
      items: [
        { text: "debounce", link: "/post/javascript/debounce" },
        { text: "throttle", link: "/post/javascript/throttle" },
        { text: "promise", link: "/post/javascript/promise" },
        { text: "new", link: "/post/javascript/new" },
        { text: "array", link: "/post/javascript/array" },
        { text: "instanceof", link: "/post/javascript/instanceof" },
        { text: "clone-deepClone", link: "/post/javascript/clone-deepClone" },
        { text: "call-apply-bind", link: "/post/javascript/call-apply-bind.md" },
        { text: "extends", link: "/post/javascript/extends" },
        { text: "draggingDiv", link: "/post/javascript/draggingDiv" },
        { text: "lazyLoad", link: "/post/javascript/lazyLoad" }
      ]
    },
    {
      text: "Tools",
      collapsible: true,
      items: [
        { text: "Nvm", link: "/post/tools/nvm" },
        { text: "PM2", link: "/post/tools/pm2" },
        { text: "Git", link: "/post/tools/git" }
      ]
    }
  ]
  return menus
}
