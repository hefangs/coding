
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
  ![pic](/git1.png "notice")
:::
## 2. N
:::warning n
  - `npm install -g n`全局安装 n
  - `sudo n`查看已安装node列表并切换
  - `n ls`查看已安装node列表
  - `n lsr`Displaying 20 matches (use --all to see all)
  - `sudo n stable`安装稳定版本
  - `sudo n latest`安装最新版本
  - `sudo n 8.4.0`安装指定版本
  - `sudo n rm 8.4.0`删除某个版本
  - `n prune`删除除已安装版本外的所有缓存版本
  - `n use 8.4.0 index.js`以指定的版本来执行脚本
  - `sudo NODE_MIRROR=http://npm.taobao.org/mirrors/node n stable`更新阿里镜像解决超时问题
:::

## 3. Homebrew
:::info brew
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

## 4. Vitepress
:::danger vitepress更新
- 直接`npm install vitepress`升级到最新版本
- 需要在`main`分支上提交`vitepress`更新后的代码
- `gh-page`分支无需变动和之前一样提交
:::


## 5. Selenium
:::info 元素定位
- `id`:ID属性，最常用的定位方法，每个元素的id应该是唯一的
- `name`:NAME属性，NAME属性在HTML中很少使用，但Selenium仍然支持它
- `class`:CLASS属性，CLASS属性在HTML中很少使用，但Selenium仍然支持它
- `tag`:TAG属性，TAG属性在HTML中很少使用，但Selenium仍然支持它
- `link`:LINK属性，LINK属性在HTML中很少使用，但Selenium仍然支持它
- `xpath`:XPATH属性，XPATH属性在HTML中很少使用，但Selenium仍然支持它
- `css`:CSS属性，CSS属性在HTML中很少使用，但Selenium仍然支持它
:::
:::info 元素操作
- `click()`:点击元素
- `clear()`:清除元素内容
- `send_keys()`:模拟按键输入
- `get_attribute()`:获取元素的属性值
- `get_text()`:获取元素的文本内容
- `is_displayed()`:判断元素是否可见
- `is_enabled()`:判断元素是否可用
- `is_selected()`:判断元素是否被选中
- `get_location()`:获取元素的位置信息
- `get_size()`:获取元素的尺寸信息
- `get_cookies()`:获取所有Cookie信息
- `get_cookie()`:获取指定Cookie信息
- `delete_cookie()`:删除指定Cookie信息
- `delete_all_cookies()`:删除所有Cookie信息
- `execute_script()`:执行JavaScript脚本
- `execute_async_script()`:执行异步JavaScript脚本
- `get_screenshot_as_base64()`:获取当前页面的截图，并将其转换为Base64编码的字符串
- `get_screenshot_as_file()`:获取当前页面的截图，并将其保存到指定的文件路径中
- `refresh()`:刷新当前页面
- `back()`:后退到上一个页面
- `forward()`:前进到下一个页面
- `close()`:关闭当前页面
- `quit()`:关闭浏览器
:::
::: info 浏览器操作
- `maximize_window()`:最大化浏览器窗口
- `minimize_window()`:最小化浏览器窗口
- `fullscreen_window()`:进入全屏模式
- `set_window_size()`:设置浏览器窗口的大小
- `get_window_size()`:获取浏览器窗口的大小
- `set_window_position()`:设置浏览器窗口的位置
- `get_window_position()`:获取浏览器窗口的位置
- `set_window_rect()`:设置浏览器窗口的位置和大小
- `get_window_rect()`:获取浏览器窗口的位置和大小
:::
::: info Select方法
- `select_by_index()`:通过索引选择选项
- `select_by_value()`:通过值选择选项
- `select_by_visible_text()`:通过可见文本选择选项
- `deselect_all()`:取消选择所有选项
- `deselect_by_index()`:取消选择指定索引的选项
- `deselect_by_value()`:取消选择指定值的选项
- `deselect_by_visible_text()`:取消选择指定可见文本的选项
:::
::: info 等待方法
- `implicitly_wait()`:设置全局 implicit 等待时间
- `set_script_timeout()`:设置全局 script 等待时间
- `set_page_load_timeout()`:设置全局 page load 等待时间
- `set_implicit_wait()`:设置当前会话的 implicit 等待时间
- `set_script_timeout()`:设置当前会话的 script 等待时间
- `set_page_load_timeout()`:设置当前会话的 page load 等待时间
:::
::: info 异常处理
- `ignore_exception()`:忽略指定异常
- `ignore_exceptions()`:忽略所有异常
:::
::: info 文件
- `upload_file()`:上传文件到指定元素
- `download_file()`:下载指定文件到指定路径
:::
::: info 鼠标操作
- `move_to_element()`:将鼠标移动到指定元素
- `move_to_element_with_offset()`:将鼠标移动到指定元素并偏移指定位置
- `click_and_hold()`:点击并保持指定元素
- `release()`:释放指定元素
- `double_click()`:双击指定元素
- `context_click()`:右击指定元素
- `drag_and_drop()`:拖拽指定元素
- `drag_and_drop_by_offset()`:拖拽指定元素并偏移指定位置
:::
::: info 键盘操作
- `press_key()`:按下指定键
- `release_key()`:释放指定键
- `send_keys()`:模拟按键输入
:::
::: info 滚动操作
- `scroll_to_element()`:滚动到指定元素
- `scroll_to_position()`:滚动到指定位置
- `scroll_by_offset()`:滚动指定偏移量
:::
