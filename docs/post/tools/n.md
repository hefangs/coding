# N
## N
## 1

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