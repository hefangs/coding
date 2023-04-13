
## Git
:::tip git
- 初始化git本地仓库
  ~~~shell
  git init
  ~~~
- 存入暂存区
  ~~~shell
  git add .
  ~~~
- 提交至本地仓库
  ~~~shell
  git commit -m "初始化"
  ~~~
- 查看分支
  ~~~shell
  git branch # 查看本地分支
  git branch -a # 查看全部分支
  ~~~
- 建立远程仓库连接
  ~~~shell
  git remote add origin  https://gitee.com/***/a.git
  ~~~
- 删除远程仓库关联
  ~~~shell
  git remote rm origin
  ~~~
- 重设远程仓库连接
  ~~~shell
  git remote set-url origin https://gitee.com/***/a.git
  ~~~
- 克隆远程仓库项目到本地
  ~~~shell
  git  clone https://gitee.com/***/a.git
  ~~~
- 查看当前git配置信息
  ~~~shell
  git  config --list
  ~~~
- 设置git用户信息
  ~~~shell
  git config user.name "何方"
  git config user.email "he529564582@163.com"
  ~~~
-  显示当前分支的版本历史
  ~~~shell
  git log  
  ~~~
-  删除本地文件已关联的远程仓库并创建新连接
  ~~~shell
  sudo rm -rf .git 
  git remote -v
  git remote remove origin
  ~~~
-  关联远程仓库
  ~~~shell
  git init
  git remote add origin xxx
  ~~~
:::

:::tip n
  - 全局安装 n
  ~~~shell
  npm install -g n
  ~~~
  - 查看已安装node列表并切换
  ~~~shell
  n
  ~~~
  - 查看已安装node列表
  ~~~shell
  n ls
  ~~~
  - 安装稳定版本
  ~~~shell
  sudo n stable
  ~~~
  - 安装最新版本
  ~~~shell
  sudo n latest
  ~~~
  - 安装指定版本
  ~~~shell
  sudo n 8.4.0
  ~~~
  - 删除某个版本
  ~~~shell
  sudo n rm 8.4.0
  ~~~
  - 以指定的版本来执行脚本
  ~~~shell
  n use 8.4.0 index.js
  ~~~
:::