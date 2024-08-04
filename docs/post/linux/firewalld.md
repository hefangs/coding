# 防火墙
:::tip centOS 7.9 默认已安装 firewalld

:::
## firewalld 基本使用

```bash
# 启动防火墙
systemctl start firewalld
# 关闭防火墙
systemctl stop firewalld
# 查看防火墙状态
systemctl status firewalld
# 开机禁用
systemctl disable firewalld
# 开机启用
systemctl enable firewalld
```


##  firewalld-cmd 配置

```bash
# 查看版本
firewall-cmd --version
# 查看帮助
firewall-cmd --help
# 显示状态
firewall-cmd --state
# 查看所有打开的端口
firewall-cmd --zone=public --list-ports
# 更新防火墙规则
firewall-cmd --reload
# 查看区域信息
firewall-cmd --get-active-zones
# 查看指定接口所属区域
firewall-cmd --get-zone-of-interface=eth0
# 拒绝所有包
firewall-cmd --panic-on
# 取消拒绝状态
firewall-cmd --panic-off
# 查看是否拒绝
firewall-cmd --query-panic
```


## firewalld 开放端口


```bash
# 查看防火墙开放的端口，如果没有返回，证明没有开放端口
firewall-cmd --list-port 
# 开放端口
firewall-cmd --zone=public --add-port=22/tcp --permanent 
# 重新载入
firewall-cmd --reload 
```

## firewalld 其它操作


```bash
# 查看端口
firewall-cmd --zone=public --query-port=22/tcp
# 删除已开放端口
firewall-cmd --zone=public --remove-port=22/tcp --permanent
firewall-cmd --reload
# 调整默认策略（默认拒绝所有访问，改成允许所有访问）
firewall-cmd --permanent --zone=public --set-target=ACCEPT
firewall-cmd --reload
# 对某个 IP 开放多个端口
firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="10.159.60.29" port protocol="tcp" port="1:65535" accept"
firewall-cmd --reload

```