# Tools

## 1. Git


![pic](/git1.png "notice")

#### init
```bash
# 在当前目录新建一个Git代码库
git init
# 新建一个目录，将其初始化为Git代码库
git init [project-name]
# 下载一个项目和它的整个代码历史
git clone [url]
# 删除 .git
rm -rf .git
```

#### config
```bash
# 显示当前的Git配置
git config --list
# 编辑Git配置文件
git config -e [--global]
# 设置提交代码时的用户信息
git config [--global] user.name "[name]"
git config [--global] user.email "[email address]"

```
#### add

```bash
# 添加指定文件到暂存区
git add [file1] [file2] ...
# 添加指定目录到暂存区，包括子目录
git add [dir]
# 添加当前目录及其所有子目录中的所有更改到暂存区，但不会考虑在当前目录中删除的文件
git add .
# 将所有更改（包括新文件、已修改文件和已删除文件）添加到暂存区，无论这些更改是在哪个目录中发生的
git add -A
# 添加每个变化前，都会要求确认
# 对于同一个文件的多处变化，可以实现分次提交
git add -p
# 删除工作区文件，并且将这次删除放入暂存区
git rm [file1] [file2] ...
# 停止追踪指定文件，但该文件会保留在工作区
git rm --cached [file]
# 改名文件，并且将这个改名放入暂存区
git mv [file-original] [file-renamed]
```

#### commit
```bash
# 提交暂存区到仓库区
git commit -m [message]
# 提交暂存区的指定文件到仓库区
git commit [file1] [file2] ... -m [message]
# 提交工作区自上次commit之后的变化，直接到仓库区
git commit -a
# 提交时显示所有diff信息
git commit -v
# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
git commit --amend -m [message]
# 重做上一次commit，并包括指定文件的新变化
git commit --amend [file1] [file2] ...
```
#### branch
```bash
# 列出所有本地分支
git branch
# 列出所有远程分支
git branch -r
# 列出所有本地分支和远程分支
git branch -a
# 新建一个分支，但依然停留在当前分支
git branch [branch-name]
# 新建一个分支，并切换到该分支
git checkout -b [branch]
# 新建一个分支，指向指定commit
git branch [branch] [commit]
# 新建一个分支，与指定的远程分支建立追踪关系
git branch --track [branch] [remote-branch]
# 切换到指定分支，并更新工作区
git checkout [branch-name]
# 切换到上一个分支
git checkout -
# 建立追踪关系，在现有分支与指定的远程分支之间
git branch --set-upstream [branch] [remote-branch]
# 合并指定分支到当前分支
git merge [branch]
# 选择一个commit，合并进当前分支
git cherry-pick [commit]
# 删除分支
git branch -d [branch-name]
# 删除远程分支
git push origin --delete [branch-name]
git branch -dr [remote/branch]
```
#### tag
```bash
# 列出所有tag
git tag
# 新建一个tag在当前commit
git tag [tag]
# 新建一个tag在指定commit
git tag [tag] [commit]
# 删除本地tag
git tag -d [tag]
# 删除远程tag
git push origin :refs/tags/[tagName]
# 查看tag信息
git show [tag]
# 提交指定tag
git push [remote] [tag]
# 提交所有tag
git push [remote] --tags
# 新建一个分支，指向某个tag
git checkout -b [branch] [tag]
```
#### log
```bash
# 显示有变更的文件
git status
# 显示当前分支的版本历史
git log
# 显示commit历史，以及每次commit发生变更的文件
git log --stat
# 搜索提交历史，根据关键词
git log -S [keyword]
# 显示某个commit之后的所有变动，每个commit占据一行
git log [tag] HEAD --pretty=format:%s
# 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
git log [tag] HEAD --grep feature
# 显示某个文件的版本历史，包括文件改名
git log --follow [file]
git whatchanged [file]
# 显示指定文件相关的每一次diff
git log -p [file]
# 显示过去5次提交
git log -5 --pretty --oneline
# 显示所有提交过的用户，按提交次数排序
git shortlog -sn
# 显示指定文件是什么人在什么时间修改过
git blame [file]
显示暂存区和工作区的差异git diff
# 显示暂存区和上一个commit的差异
git diff --cached [file]
# 显示工作区与当前分支最新commit之间的差异
git diff HEAD
# 显示两次提交之间的差异
git diff [first-branch]...[second-branch]
# 显示今天你写了多少行代码
git diff --shortstat "@{0 day ago}"
# 显示某次提交的元数据和内容变化
git show [commit]
# 显示某次提交发生变化的文件
git show --name-only [commit]
# 显示某次提交时，某个文件的内容
git show [commit]:[filename]
# 显示当前分支的最近几次提交
git reflog main
git reflog origin/main
git reflog origin/gh-pages
```

#### remote

```bash
# 下载远程仓库的所有变动
git fetch [remote]
# 显示所有远程仓库
git remote -v
# 显示某个远程仓库的信息
git remote show [remote]
# 增加一个新的远程仓库，并命名
git remote add [shortname] [url]
# 取回远程仓库的变化，并与本地分支合并
git pull [remote] [branch]
# 上传本地指定分支到远程仓库
git push [remote] [branch]
# 强行推送当前分支到远程仓库，即使有冲突
git push [remote] --force
# 推送所有分支到远程仓库
git push [remote] --all
```

#### reset

```bash
# 恢复暂存区的指定文件到工作区
git checkout [file]
# 恢复某个commit的指定文件到暂存区和工作区
git checkout [commit] [file]
# 恢复暂存区的所有文件到工作区
git checkout .
# 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
git reset [file]
# 重置暂存区与工作区，与上一次commit保持一致
git reset --hard
# 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
git reset [commit]
# 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
git reset --hard [commit]
# 重置当前HEAD为指定commit，但保持暂存区和工作区不变
git reset --keep [commit]
# 新建一个commit，用来撤销指定commit
# 后者的所有变化都将被前者抵消，并且应用到当前分支
git revert [commit]

```


#### merge


###### 第一种:
```bash
# 从dev分支创建新分支
cd /path/to/your/project
git checkout dev
git pull origin dev
git checkout -b new-feature-branch
# 在新分支上开发新功能：进行你的代码修改，然后提交更改
git add .
git commit -m "Add new feature"
# 将新分支推送到远程仓库
git push origin new-feature-branch

# 在GitHub上创建Pull Request
# 打开你的GitHub项目页面
# 你会看到一个提示，告诉你刚刚推送了一个新分支，点击“Compare & pull request”按钮
# 在拉取请求页面，确认目标分支是dev，并添加描述
# 提交拉取请求

# 合并Pull Request
# 你可以自己审查代码变化（即使你是唯一的开发者，这也是一个好习惯）
# 点击“Merge pull request”按钮，将新功能合并到dev分支
# 删除新功能分支（在GitHub上会提示你删除分支）

# 同步本地主分支
git checkout dev
git pull origin dev
# 删除新功能分支
git branch -d new-feature-branch  # 删除本地分支
git push origin --delete new-feature-branch  # 删除远程分支
```


###### 第二种:
```bash
# 从dev分支创建新分支
cd /path/to/your/project
git checkout dev
git pull origin dev
git checkout -b new-feature-branch
# 在新分支上开发新功能：进行你的代码修改，然后提交更改
git add .
git commit -m "Add new feature"
# 合并新分支到dev分支
git checkout dev
git pull origin dev
git merge new-feature-branch
# 将合并后的dev分支推送到远程
git push origin dev
# 删除本地新分支
git branch -d new-feature-branch
# 删除远程新分支（如果已推送过）
git push origin --delete new-feature-branch

```


## 2. N
```bash
# 以交互方式管理 Node.js版本
# 全局安装 n
brew install n
# 查看已安装node列表并切换
sudo n
# 查看已安装node列表
n ls
# Displaying 20 matches (use --all to see all)
n lsr
# 安装稳定版本
sudo n stable
# 安装最新版本
sudo n latest
# 安装指定版本
sudo n 8.4.0
# 删除某个版本
sudo n rm 8.4.0
# 删除除已安装版本外的所有缓存版本
n prune
# 以指定的版本来执行脚本
n use 8.4.0 index.js
```


## 3. nvm
```bash
# 节点版本管理器(也可以控制 Node.js版本)
# 安装特定版本
nvm install 14.17.0
# 卸载特定版本的
nvm uninstall 14.17.0
# 安装最新的 LTS（长期支持）版本
nvm install --lts
# 使用特定版本
nvm use 14.17.0
# 使用默认版本
nvm use default
# 列出所有已安装的 Node.js 版本
nvm ls
# 显示当前使用的 Node.js 版本
nvm current
# 显示所有可用的 LTS 版本
nvm ls-remote --lts
# 列出所有可安装的 Node.js 版本
nvm ls-remote
````



## 4. Homebrew
```bash
# 查询版本
brew -v
# 查看帮助信息
brew -h
#  更新Homebrew
brew update
# 安装软件
brew install <pkg_name>
# 卸载软件
brew uninstall <pkg_name>
# 查询任意包
brew search <pkg_name>
# 查看任意包内容信息
brew info <pkg_name>
# 列出已安装的软件列表
brew list
# 列出手动使用 brew install 安装的软件包,不包括依赖项
brew leaves
# 列出已安装软件git的文件目录
brew list git
# 更新所有
brew upgrade
# 更新指定包
brew upgrade <pkg_name>
# 清理所有包的旧版本
brew cleanup
# 清理指定包的旧版本
brew cleanup <pkg_name>
# 查询可更新的包
brew outdated
更新软件版本-清理旧版本或已删除的软件
brew update && brew upgrade && brew cleanup
```

## 5. Vitepress
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


## 6. pyenv
```bash
# 简单的Python版本管理
# 下载pyenv
brew install pyenv
# 查看所有可用的版本
pyenv install --list
# 安装指定的版本
pyenv install 3.9.1
# 查看已安装的版本
pyenv versions
# 查看当前版本
pyenv version
# 将 Python 3.8.10 设定为全局默认版本
pyenv global 3.8.10
# 将 Python 3.8.10 设定为当前目录的局部版本
pyenv local 3.8.10
# 设置当前 shell 会话的 Python 版本为 3.8.10
pyenv shell 3.8.10
卸载指定的版本
pyenv uninstall 3.8.10
# 更新pyenv本身和所有插件
pyenv update
# 需要添加到 `~/.zshrc`文件中,并且`source ~/.zshrc`
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv init -)"
```


## 7. nrm
```bash
# NPM镜像管理
# 列出所有可用的 registry
nrm ls
# 显示当前使用的 registry
nrm current
# 测试所有 registry 的响应时间
nrm test
# 切换到指定的 registry
nrm use taobao
# 显示指定 registry 的 URL
nrm info taobao
```