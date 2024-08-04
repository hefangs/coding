export default function sideBar() {
  const menus = [
    { text: 'note', items: [{ text: 'start', link: '/post/note/start' }] },
    {
      text: 'Tools',
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'Git', link: '/post/tools/git' },
        { text: 'N', link: '/post/tools/n' },
        { text: 'Nvm', link: '/post/tools/nvm' },
        { text: 'Nrm', link: '/post/tools/nrm' },
        { text: 'Pyenv', link: '/post/tools/pyenv' },
        { text: 'Homebrew', link: '/post/tools/homebrew' },
        { text: 'Vitepress', link: '/post/tools/vitepress' }
      ]
    },
    {
      text: 'Test',
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'Pytest', link: '/post/test/pytest' },
        { text: 'Jmeter', link: '/post/test/jmeter' },
        { text: 'Unittest', link: '/post/test/unittest' },
        { text: 'Appium', link: '/post/test/appium' },
        { text: 'Postman', link: '/post/test/postman' },
        { text: 'Selenium', link: '/post/test/selenium' }
      ]
    },
    {
      text: 'Python',
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'Data', link: '/post/python/data' },
        { text: 'Operator', link: '/post/python/operator' },
        { text: 'Strings', link: '/post/python/strings' },
        { text: 'List', link: '/post/python/list' },
        { text: 'Tuple', link: '/post/python/tuple' },
        { text: 'Dictionary', link: '/post/python/dictionary' },
        { text: 'Set', link: '/post/python/set' },
        { text: 'Condition', link: '/post/python/condition' },
        { text: 'Loop', link: '/post/python/Loop' },
        { text: 'Function', link: '/post/python/function' },
        {
          text: 'Higher_Order_Function',
          link: '/post/python/higher_order_function'
        }
      ]
    },
    {
      text: 'Frontend',
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'Html', link: '/post/frontend/html' },
        { text: 'Css', link: '/post/frontend/css' },
        { text: 'Javascript', link: '/post/frontend/javascript' },
        { text: 'Code', link: '/post/frontend/code' }
      ]
    },
    {
      text: 'Vue',
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'vue2', link: '/post/vue/vue2.0' },
        { text: 'vue3', link: '/post/vue/vue3.0' }
      ]
    },
    {
      text: 'Sql',
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'Base', link: '/post/sql/base' },
        { text: 'Advanced', link: '/post/sql/advanced' },
        { text: 'Function', link: '/post/sql/function' }
      ]
    },
    {
      text: 'Net',
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'HTTP/HTTPS', link: '/post/net/http_https' },
        { text: 'HTTP1/HTTP2', link: '/post/net/http1.0_http2.0' },
        { text: 'OSI', link: '/post/net/osi' },
        { text: 'TCP/IP', link: '/post/net/tcp_ip' },
        { text: 'CDN', link: '/post/net/cdn' },
        { text: 'GET/POST', link: '/post/net/get_post' },
        { text: 'XSS/CSRF', link: '/post/net/xss_csrf' }
      ]
    },
    {
      text: 'Node',
      collapsible: true,
      collapsed: true,
      items: [{ text: 'Node', link: '/post/node/node' }]
    },
    {
      text: 'Linux',
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'SSH', link: '/post/linux/ssh' },
        { text: 'Systemctl', link: '/post/linux/systemctl' },
        { text: 'FireWalld', link: '/post/linux/firewalld' },
        { text: 'Fail2Ban', link: '/post/linux/fail2Ban' },
        { text: 'Docker', link: '/post/linux/docker' },
      ]
    },
    {
      text: 'Bundler',
      collapsible: true,
      collapsed: true,
      items: [{ text: 'Webpack', link: '/post/bundler/webpack' }]
    }
  ]
  return menus
}
