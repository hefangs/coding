# Git
## 常用命令

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
  git clone https://gitee.com/***/a.git
  ~~~

- 查看当前git配置信息

  ~~~shell
  git config --list
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