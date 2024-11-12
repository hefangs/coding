# Playwright

:::tip info
Playwright 专为满足端到端测试的需求而创建。Playwright 支持所有现代渲染引擎，包括 Chromium、WebKit 和 Firefox。可在 Windows、Linux 和 macOS 上进行测试，本地或 CI，无头或有头，使用原生移动仿真

Playwright 库可用作通用浏览器自动化工具，为同步和异步 Python 提供一组强大的 API 来自动化 Web 应用程序。
:::

::: code-group

```js [JavaScript]
pnpm create playwright
pnpm exec playwright test
pnpm exec playwright test --project=chromium
pnpm exec playwright test example
pnpm exec playwright test --debug
pnpm exec playwright codegen
pnpm exec playwright show-report
pnpm exec playwright test --ui
// playwright.config.ts
// 默认生成playwright.config.ts文件中已经配置了worker,major browsers,testDir!
// 直接执行命令：pnpm exec playwright test
```

```py [Python]
pip install pytest-playwright
playwright install  # 下载浏览器引擎 路径：/Users/he/Library/Caches/ms-playwright
pip install allure-pytest # 生成allure-result
pip install pytest-xdist # 多线程配置
# pytest.ini
[pytest]
addopts = -vs --alluredir ./temp --clean-alluredir
# 然后手动执行
# allure generate ./temp -o ./allure-report --clean
```
:::