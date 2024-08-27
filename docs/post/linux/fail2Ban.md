# Fail2Ban

## Fail2Ban

```bash 
# 安装 Fail2Ban
yum install fail2ban
# 卸载 Fail2Ban 软件包
yum remove fail2ban
# 启动 Fail2Ban 服务
systemctl start fail2ban
# 检查 Fail2Ban 服务的状态
systemctl status fail2ban
# 停止 Fail2Ban 服务
systemctl stop fail2ban
# 重新初始化所有的监控和封禁规则
systemctl restart fail2ban
# 系统启动时自动启动
systemctl enable fail2ban
# 删除 Fail2Ban 的配置文件和数据
rm -rf /etc/fail2ban
# 创建一个新的 jail.local 文件
vim /etc/fail2ban/jail.local
```
## fail2ban-client
```bash
# 重新加载 Fail2Ban 配置文件，应用配置更改
fail2ban-client reload
# 显示 Fail2Ban 的总体状态，包括正在运行的 jail 列表及其状态
fail2ban-client status
# 显示 sshd jail 的状态
fail2ban-client status sshd
# 检查配置
fail2ban-client -t
# 检查 Fail2Ban 是否正常响应，成功返回 pong
fail2ban-client ping
# 监控目标被封的 IP 地址
fail2ban-client banned
# 手动封禁指定 IP 地址
fail2ban-client set sshd banip 192.168.1.1
# 手动解封指定 IP 地址
fail2ban-client set sshd unbanip 192.168.1.1
# 实时查看 Fail2Ban 日志文件，用于调试和监控 Fail2Ban 活动
tail -f /var/log/fail2ban.log
```




## 配置 jail.local

```bash
# /etc/fail2ban/jail.local
[DEFAULT]
# 封禁时间（秒），这里设置为3600秒，即1小时
bantime = 2592000                 
# 在findtime时间段内允许的最大失败尝试次数，设置为1
maxretry = 1                   
# 时间窗口（秒），即在这个时间窗口内允许的最大失败尝试次数
findtime = 60                  
# 执行的动作，包含邮件通知（mwl）和其他默认操作
action = %(action_mwl)s        
# 封禁动作，使用iptables进行多端口封禁
banaction = iptables-multiport  
# 忽略的IP地址，127.0.0.1/8表示本地回环地址，不对其进行封禁
ignoreip = 127.0.0.1/8         

[sshd]
# 启用这个jail（监狱），即对sshd服务进行监控
enabled = true                 
# 监控的端口，ssh服务默认使用的端口
port = ssh                     
# 使用的过滤器名称，sshd用于识别ssh失败尝试
filter = sshd                  
# SSH日志文件的路径
logpath = /var/log/secure       
# 在findtime时间窗口内，允许的最大失败尝试次数
maxretry = 1                   


```