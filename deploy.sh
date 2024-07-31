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
git remote add origin "https://github.com/hefangs/coding.git"
git fetch origin gh-pages
git reset --soft origin/gh-pages

git add -A
CURRENT_DATE=$(date +"%Y-%m-%d_%H:%M:%S")
COMMIT_MESSAGE="deploy.sh-$CURRENT_DATE"
git commit -m "$COMMIT_MESSAGE"
git push -f origin HEAD:gh-pages

cd -
rm -rf docs/.vitepress/dist
