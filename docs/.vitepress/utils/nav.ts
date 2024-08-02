export default function nav() {
  const items = [
    { text: 'Home', link: '/' },
    {
      text: 'Tools',
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
      text: 'Javascript',
      link: '/post/frontend/javascript',
      activeMatch: '/post/'
    }
    // { text: 'Tools', link: '/post/note/tools', activeMatch: '/post/note/' },
    // { text: '指南', link: '/post/note/tools', activeMatch: '/post/note/' }
  ]
  return items
}
