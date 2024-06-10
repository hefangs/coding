#!/usr/bin/env sh

# 遇到错误时停止脚本执行
set -e

# 构建项目
yarn build

# 复制 CNAME 文件到构建后的目录
cp docs/CNAME docs/.vitepress/dist/

# 进入待发布的目录
cd docs/.vitepress/dist

# 初始化一个新的 Git 仓库并添加所有文件
git init
git add -A
git commit -m 'deploy'

# 如果部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
# git push -f git@github.com:hefangs/coding.git master:gh-pages
git push -f https://github.com/hefangs/coding.git master:gh-pages

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:hefangs/hefangs.github.io.git main:gh-pages

cd -