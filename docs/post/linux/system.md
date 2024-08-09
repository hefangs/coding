
# Linux 命令集合



## 常用命令
```bash
# 列出目录内容
ls
# 以详细列表形式显示
ls -l
# 显示所有文件，包括隐藏文件
ls -a
# 显示当前工作目录的路径
pwd
# 打印字符串或变量的值
echo "Hello, World!"
# 从标准输入读取用户输入
read variable_name
# 显示日期和时间
date
# 清屏
clear
# 显示命令的手册页
man command_name
# 查找文件
find /path/to/search -name "filename"
# 检查磁盘使用情况
df -h
# 显示内存使用情况
free -h
# 显示当前登录用户
whoami

```


## 文件和目录操作

```bash
# 创建一个空文件或更新文件的时间戳
touch filename
# 创建一个新目录
mkdir directory_name
# 创建多级目录（如果父目录不存在）
mkdir -p /path/to/directory
# 删除文件
rm file
# 递归删除目录及其内容
rm -r directory
# 复制文件到指定目录
cp source destination
# 递归复制目录及其内容
cp -r source_directory destination_directory
# 移动或重命名文件或目录
mv old_name new_name
mv filename /path/to/destination_directory
# 显示文件内容
cat filename
# 查看文件的前10行
head -n 10 filename
# 查看文件的后10行
tail -n 10 filename
# 实时查看文件内容（例如日志文件）
tail -f filename
# 显示文件大小
du -sh filename
# 比较两个文件的不同
diff file1 file2

```

## 权限和所有权管理

```bash
# 改变文件或目录的权限
chmod 755 filename
# 递归改变目录及其内容的权限
chmod -R 755 directory_name
# 改变文件或目录的所有者
chown user:group filename
# 递归改变目录及其内容的所有者
chown -R user:group directory_name
# 显示当前用户的权限掩码
umask

```

## 压缩和解压缩

```bash
# 创建 tar.gz 压缩包
tar -czvf archive_name.tar.gz /path/to/directory
# 解压 tar.gz 压缩包
tar -xzvf archive_name.tar.gz
# 创建 zip 压缩包
zip -r archive_name.zip /path/to/directory
# 解压 zip 压缩包
unzip archive_name.zip

```

## 文本处理

```bash
# 查找文件中包含的字符串
grep "search_string" filename
# 忽略大小写查找字符串
grep -i "search_string" filename
# 递归查找目录中的字符串
grep -r "search_string" /path/to/directory
# 将命令输出重定向到文件
command > output.txt
# 将命令输出追加到文件
command >> output.txt
# 统计文件的行数、单词数、字符数
wc filename
# 按行排序文件内容
sort filename
# 去除文件中的重复行
uniq filename
# 替换文件中的字符串
sed 's/old_string/new_string/g' filename
# 删除文件中的空行
sed '/^$/d' filename
# 显示环境变量
env

```

## 网络管理

```bash
# 显示网络接口信息
ifconfig
# 显示网络接口的 IP 地址
ip addr show
# 查看路由表
route -n
# 测试与目标主机的网络连接
ping hostname_or_ip
# 显示本机端口的监听情况
netstat -tuln
# 远程登录到服务器
ssh user@hostname
# 从远程服务器下载文件
scp user@hostname:/path/to/remote_file /path/to/local_directory
# 上传文件到远程服务器
scp /path/to/local_file user@hostname:/path/to/remote_directory
# 下载文件
wget http://example.com/file.zip

```

## 操作日志

```bash
# 显示内核日志缓冲区的消息
dmesg
# 将内核日志缓冲区消息保存到文件中
dmesg > /path/to/output_file
# 显示登录历史记录
last
# 显示失败的登录尝试
lastb
# 显示日志
cat /var/log/auth.log
# 实时查看系统日志，持续显示新内容
tail -f /var/log/syslog
# 查看文件的最后10行（默认行为）
tail /var/log/syslog
# 查看文件的最后20行
tail -n 20 /var/log/syslog
# 从文件的第100行开始显示（从头开始计算）
tail -n +100 /var/log/syslog
# 监控多个日志文件，持续显示新内容
tail -f /var/log/syslog /var/log/auth.log
# 按时间顺序合并并监控多个日志文件
tail -f -q /var/log/syslog /var/log/auth.log
# 仅显示文件的最后100个字节
tail -c 100 /var/log/syslog
# 实时查看最新的5行日志
tail -n 5 -f /var/log/syslog
# 监控特定日志文件的最新10行，每2秒刷新一次
watch -n 2 tail -n 10 /var/log/syslog
# 结合grep命令搜索日志中包含特定字符串的行
grep "error" /var/log/syslog
# 在日志文件中查找关键字并显示匹配行的最后10行
grep "error" /var/log/syslog | tail -n 10
# 按时间范围过滤syslog日志 (例如显示1小时内的日志)
awk '$0 >= strftime("%b %d %H:%M:%S", systime() - 3600)' /var/log/syslog
# 使用journalctl查看系统日志 (仅适用于systemd系统)
journalctl
# 查看系统启动以来的所有日志
journalctl -b
# 查看特定服务的日志 (如ssh服务)
journalctl -u ssh
# 查看最近的一次启动日志
journalctl -b -1

```
## systemctl 
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

# 查看指定单元的状态
systemctl status <unit-name>         
# 列出所有单元
systemctl list-units                 
# 列出所有已加载的单元
systemctl list-units --all           
# 查看指定单元的详细信息
systemctl show <unit-name>   

# 显示进程列表
ps aux
# 以树状结构显示进程列表
pstree
# 终止进程
kill process_id
# 强制终止进程
kill -9 process_id
# 显示系统运行时间和负载
uptime
# 显示系统信息
uname -a
```