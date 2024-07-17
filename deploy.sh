#!/usr/bin/env sh

# 忽略错误
set -e

# 构建
yarn build

# 进入待发布的目录
cd docs/.vitepress/dist

# 如果是发布到自定义域名
echo 'www.hefang.site' > CNAME

# 输出当前使用的 Git 用户名和电子邮件地址
echo "当前 Git 用户名：" $(git config user.name)
echo "当前 Git 电子邮件地址：" $(git config user.email)

git init
git add -A
git commit -m 'deploy'


# 输出提交后的 Git 配置信息
echo "提交后的 Git 用户名：" $(git config user.name)
echo "提交后的 Git 电子邮件地址：" $(git config user.email)

# 如果部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
# git push -f git@github.com:hefangs/coding.git master:gh-pages
git push -f https://github.com/hefangs/coding.git master:gh-pages

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:hefangs/hefangs.github.io.git main:gh-pages

cd -