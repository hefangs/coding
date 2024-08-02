# Homebrew
##  Homebrew
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
