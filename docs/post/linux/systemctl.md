
# Systemctl

## systemctl 服务管理命令
```bash
# 启动指定的服务
systemctl start firewalld.service       
# 停止指定的服务
systemctl stop firewalld.service        
# 重启指定的服务
systemctl restart firewalld.service     
# 重新加载指定服务的配置
systemctl reload firewalld.service      
# 查看指定服务的状态
systemctl status firewalld.service   
# 查看服务的启动时间和其他详细信息
systemctl show firewalld.service   
# 设置指定服务为开机启动
systemctl enable firewalld.service      
# 取消指定服务的开机启动
systemctl disable firewalld.service     
# 列出所有启用的服务
systemctl list-unit-files --type=service --state=enabled  
# 列出所有服务的状态
systemctl list-units --type=service  
# 列出所有正在运行的服务
systemctl list-units --type=service --state=running
# 列出所有失败的服务
systemctl --failed
```



## systemctl 系统管理命令

```bash
# 重启系统
systemctl reboot
# 查看系统的总体状态
systemctl status                     
# 查看系统的启动时间
systemctl show --property=StartupTime                  
# 关闭系统
systemctl poweroff                   
# 挂起系统
systemctl suspend   

# systemd-analyze 
# 查看启动耗时
systemd-analyze                                                                                       
# 查看每个服务的启动耗时
systemd-analyze blame
# 显示瀑布状的启动过程流
systemd-analyze critical-chain
# 显示指定服务的启动流
systemd-analyze critical-chain firewalld.service
```

## systemctl 单元管理命令
```bash
# 查看指定单元的状态
systemctl status <unit-name>         
# 列出所有单元
systemctl list-units                 
# 列出所有已加载的单元
systemctl list-units --all           
# 查看指定单元的详细信息
systemctl show <unit-name>           
```


