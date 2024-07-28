#!/usr/bin/env sh

# 忽略错误
set -e

# 构建
pnpm run build

# 进入待发布的目录
cd docs/.vitepress/dist

# 如果是发布到自定义域名
echo 'www.hefang.site' > CNAME

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

rm -rf docs/.vitepress/dist