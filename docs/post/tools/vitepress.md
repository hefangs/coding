# Vitepress

## Vitepress

```bash
# vitepress 更新到最新版本
pnpm view vitepress version
pnpm update vitepress  
# 遇到 npm install package 时，其实已经安装成功，
# 但是进度还是显示安装中，可以重新设置 npn 源来解决问题
npm config get registry : https://registry.npmjs.org/
yarn config get registry : https://registry.npmjs.org/
npm config set registry https://registry.npm.taobao.org/
yarn config set registry https://registry.npm.taobao.org/
```