# Tools

## 1. Git
:::tip git 日常基本操作
  - `git init`初始化仓库，默认为 master 分支
  - `git add .`提交全部文件修改到缓存区
  - `git add <具体某个文件路径+全名>`提交某些文件到缓存区
  - `git diff`查看当前代码 add后，会 add 哪些内容
  - `git diff --staged`查看现在 commit 提交后，会提交哪些内容
  - `git status`查看当前分支状态
  - `git pull <远程仓库名> <远程分支名>`拉取远程仓库的分支与本地当前分支合并
  - `git pull <远程仓库名> <远程分支名>:<本地分支名>`拉取远程仓库的分支与本地某个分支合并
  - `git commit -m "<注释>"`提交代码到本地仓库，并写提交注释
  - `git commit -v`提交时显示所有diff信息
  - `git commit --amend [file1] [file2]`重做上一次commit，并包括指定文件的新变化
:::
:::tip  关于提交信息的格式，可以遵循以下的规则
  - `feat`新特性，添加功能
  - `fix`修改 bug
  - `refactor`代码重构
  - `docs`文档修改
  - `style`代码格式修改, 注意不是 css 修改
  - `test`测试用例修改
  - `chore`其他修改, 比如构建流程, 依赖管理
:::

:::tip  分支操作
  - `git branch`查看本地所有分支
  - `git branch -r`查看远程所有分支
  - `git branch -a`查看本地和远程所有分支
  - `git merge <分支名>`合并分支
  - `git merge --abort`合并分支出现冲突时，取消合并，一切回到合并前的状态
  - `git branch <新分支名>`基于当前分支，新建一个分支
  - `git checkout --orphan <新分支名>`新建一个空分支（会保留之前分支的所有文件）
  - `git branch -D <分支名>`删除本地某个分支
  - `git push <远程库名> :<分支名>`删除远程某个分支
  - `git branch <新分支名称> <提交ID>`从提交历史恢复某个删掉的某个分支
  - `git branch -m <原分支名> <新分支名>`分支更名
  - `git checkout <分支名>`切换到本地某个分支
  - `git checkout <远程库名>/<分支名>`切换到线上某个分支
  -` git checkout -b <新分支名>`把基于当前分支新建分支，并切换为这个分支
:::

:::tip 远程同步
 - `git fetch [remote]`下载远程仓库的所有变动
 - `git remote -v`显示所有远程仓库
 - `git pull [remote] [branch]`拉取远程仓库的分支与本地当前分支合并
 - `git fetch`获取线上最新版信息记录，不合并
 - `git push [remote] [branch]`上传本地指定分支到远程仓库
 - `git push [remote] --force`强行推送当前分支到远程仓库，即使有冲突
 - `git push [remote] --all`推送所有分支到远程仓库
:::


:::tip 撤销
  - `git checkout [file]`恢复暂存区的指定文件到工作区
  - `git checkout [commit] [file]`恢复某个commit的指定文件到暂存区和工作区
  - `git checkout .`恢复暂存区的所有文件到工作区
  - `git reset [commit]`重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
  - `git reset --hard`重置暂存区与工作区，与上一次commit保持一致
  - `git reset [file]`重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
  - `git revert [commit]`后者的所有变化都将被前者抵消，并且应用到当前分支
:::

:::tip 存储操作
  - `git stash`暂时将未提交的变化移除
  - `git stash pop`取出储藏中最后存入的工作状态进行恢复，会删除储藏
  - `git stash list`查看所有储藏中的工作
  - `git stash apply <储藏的名称>`取出储藏中对应的工作状态进行恢复，不会删除储藏
  - `git stash clear`清空所有储藏中的工作
  - `git stash drop <储藏的名称>`删除对应的某个储
:::
:::warning token过期重新设置
  - [创建一个令牌](https://github.com/settings/tokens): `Create personal access token`
  - 然后重置`Git`凭据: `git config --global --unset credential.helper`
  - 克隆或拉取您的存储库： `git push`
  - 然后输入令牌作为密码
  - 保存你的令牌：`git config --global credential.helper store`
:::

:::tip 总结
  :::details
  ![pic](/git1.png "notice")
:::
## 2. N
:::warning 以交互方式管理`Node.js` 版本
  - `brew install n`全局安装 n
  - `sudo n`查看已安装node列表并切换
  - `n ls`查看已安装node列表
  - `n lsr`Displaying 20 matches (use --all to see all)
  - `sudo n stable`安装稳定版本
  - `sudo n latest`安装最新版本
  - `sudo n 8.4.0`安装指定版本
  - `sudo n rm 8.4.0`删除某个版本
  - `n prune`删除除已安装版本外的所有缓存版本
  - `n use 8.4.0 index.js`以指定的版本来执行脚本
:::

## 3. nvm
:::warning 节点版本管理器(也可以控制`Node.js` 版本)
  - `nvm install 14.17.0`安装特定版本
  - `nvm uninstall 14.17.0`卸载特定版本的
  - `nvm install --lts`安装最新的 LTS（长期支持）版本
  - `nvm use 14.17.0`使用特定版本
  - `nvm use default`使用默认版本
  - `nvm ls`列出所有已安装的 Node.js 版本
  - `nvm current`显示当前使用的 Node.js 版本
  - `nvm ls-remote`列出所有可安装的 Node.js 版本
  - `nvm ls-remote --lts`显示所有可用的 LTS 版本
:::

## 4. Homebrew
:::tip brew
- `brew -v` 查询版本
- `brew -h` 查看帮助信息
- `brew update` 更新Homebrew
- `brew install <pkg_name>` 安装软件
- `brew uninstall <pkg_name>` 卸载软件
- `brew search <pkg_name>` 查询任意包
- `brew info <pkg_name>` 查看任意包内容信息
- `brew list` 列出已安装的软件列表
- `brew list git` 列出已安装软件git的文件目录
- `brew upgrade` 更新所有
- `brew upgrade <pkg_name>` 更新指定包
- `brew cleanup` 清理所有包的旧版本
- `brew cleanup <pkg_name>` 清理指定包的旧版本
- `brew outdated` 查询可更新的包
- `brew update && brew upgrade && brew cleanup` 更新软件版本-清理旧版本或已删除的软件
:::

## 5. Vitepress
:::info vitepress更新
- 直接`npm install vitepress`升级到最新版本
- 需要在`main`分支上提交`vitepress`更新后的代码
- `gh-page`分支无需变动和之前一样提交
- 遇到`npm install package`时，其实已经安装成功，但是进度还是显示安装中，可以重新设置npn源来解决问题
  - `npm config get registry : https://registry.npmjs.org/`
  - `yarn config get registry : https://registry.npmjs.org/`
  - `npm config set registry https://registry.npm.taobao.org/`
  - `yarn config set registry https://registry.npm.taobao.org/`                           

:::


## 6. pyenv
:::warning 简单的`Python`版本管理
- `brew install pyenv` 下载`pyenv`
- `pyenv install --list` 查看所有可用的版本
- `pyenv install 3.9.1` 安装指定的版本
- `pyenv versions` 查看已安装的版本
- `pyenv version` 查看当前版本
- `pyenv global 3.8.10` 切换全局版本
- `pyenv local 3.8.10` 在项目的根目录下执行：
- `pyenv shell 3.8.10` 为当前会话设置版本
- `pyenv uninstall 3.8.10`卸载指定的版本
- `pyenv update`更新`pyenv`本身和所有插件
- 需要添加到 `~/.zshrc`文件中,并且`source ~/.zshrc`
  ```shell
  export PATH="$HOME/.pyenv/bin:$PATH"
  eval "$(pyenv init --path)"
  eval "$(pyenv init -)"
  ```
:::

## 7. nrm
:::danger `NPM`镜像管理
- `nrm ls`列出所有可用的 registry
- `nrm current`显示当前使用的 registry
- `nrm test`测试所有 registry 的响应时间
- `nrm use taobao`切换到指定的 registry
- `nrm info taobao`显示指定 registry 的 URL

:::
