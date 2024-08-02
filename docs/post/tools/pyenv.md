# pyenv

## pyenv

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