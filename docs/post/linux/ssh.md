# SSH


## ssh

```shell
# 本机
# 生成一份新的 known_hosts，原先的known_hosts改名为known_hosts_old  直接rm known_hosts_old
ssh-keygen -R 106.15.79.229

# 使用默认的公钥文件（通常是 ~/.ssh/id_rsa.pub）
ssh-copy-id root@106.15.79.229

# 或者
# 将指定的公钥文件（~/.ssh/id_rsa.pub）添加到远程服务器上的 ~/.ssh/authorized_keys 文件中
ssh-copy-id -i ~/.ssh/id_rsa.pub root@106.15.79.229
# 服务器
# SSH 配置文件和密钥的安全性
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```