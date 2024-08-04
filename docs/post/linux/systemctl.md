
# Systemctl

## systemctl
```bash
# 重启系统
systemctl reboot
# 启动一个服务
systemctl start firewalld.service
# 关闭一个服务
systemctl stop firewalld.service
# 重启一个服务
systemctl restart firewalld.service
# 重新加载服务配置（不会重启服务）
systemctl reload firewalld.service
# 显示一个服务的状态
systemctl status firewalld.service
# 在开机时启用一个服务
systemctl enable firewalld.service
# 在开机时禁用一个服务
systemctl disable firewalld.service
# 查看服务是否开机启动
systemctl is-enabled firewalld.service
# 查看已启动的服务列表
systemctl list-unit-files|grep enabled
# 查看启动失败的服务列表
systemctl --failed
```
## systemd-analyze
```bash
# 查看启动耗时
systemd-analyze                                                                                       
# 查看每个服务的启动耗时
systemd-analyze blame
# 显示瀑布状的启动过程流
systemd-analyze critical-chain
# 显示指定服务的启动流
systemd-analyze critical-chain firewalld.service

```