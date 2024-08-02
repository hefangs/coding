# Vitepress

## Vitepress

```bash

# vitepress更新到最新版本
pnpm install vitepress@latest
# 需要在`main`分支上提交`vitepress`更新后的代码
# gh-pages`分支无需变动和之前一样提交
# 遇到`npm install package`时，其实已经安装成功，但是进度还是显示安装中，可以重新设置npn源来解决问题
npm config get registry : https://registry.npmjs.org/
yarn config get registry : https://registry.npmjs.org/
npm config set registry https://registry.npm.taobao.org/
yarn config set registry https://registry.npm.taobao.org/
```