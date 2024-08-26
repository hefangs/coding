# docker

## docker 安装 nginx 

```bash
# 显示示所有运行中的容器的 CPU、内存、网络和 I/O
docker stats
# 进入容器
docker exec -it site /bin/bash
apt-get update
apt-get install vim -y
# 强制删除
docker rm -f 552
# 或者
docker stop 552
docker rm 552

docker run -d -p 9999:9999 -v /app/site:/usr/share/nginx/html -v /app/ssl:/etc/ssl --name site --restart unless-stopped nginx

# 重新加载配置或重启 Nginx
nginx -t
nginx -s reload

# 如果 nginx -s reload 命令无法使用，你可以重启容器
docker restart app

# 生成自签名证书和私钥，注意这里的文件路径
cd /app
mkdir -p /app/ssl
openssl req -x509 -newkey rsa:4096 -nodes -keyout /app/ssl/key.pem -out /app/ssl/cert.pem -days 365
# 权限
chmod -R 755 /app/ssl
# vim etc/nginx/conf.d/default.conf 
# HTTPS server
server {
    listen 9999 ssl;
    listen [::]:9999 ssl;
    server_name 106.15.79.229;

    ssl_certificate /etc/ssl/cert.pem;
    ssl_certificate_key /etc/ssl/key.pem;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}

# 403 Forbidden 错误表示服务器拒绝了对某些资源的访问。这通常是由于权限问题或配置不正确导致的
# 设置权限：
# 使用 chmod 命令递归地设置目录和文件的权限
chmod -R 755 /app/site
```

## docker 安装 Jenkins

```bash
docker run \
-d \
-u root \
--privileged \
-p 8080:8080 \
-p 50000:50000 \
--name jenkins \
--restart=unless-stopped \
-v /app/jenkins:/var/jenkins_home \
-v /usr/bin/docker:/usr/bin/docker \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /etc/localtime:/etc/localtime:ro \
jenkins/jenkins:2.472-jdk21

```


## docker 安装 postgres

```bash
docker run -d \
  --privileged \
  --name postgres \
  --restart unless-stopped \
  -e POSTGRES_USER=hefang \
  -e POSTGRES_PASSWORD=123456 \
  -e POSTGRES_DB=hefang \
  -p 5432:5432 \
  -v my_pgdata:/var/lib/postgresql/data \
  postgres

```

## docker 安装 gitlab

```bash
docker run -d \
  -p 8081:443 -p 8082:80 -p 8083:22 \
  --name gitlab \
  --restart always \
  --volume /app/gitlab/config:/etc/gitlab \
  --volume /app/gitlab/logs:/var/log/gitlab \
  --volume /app/gitlab/data:/var/opt/gitlab \
  --privileged=true \
  gitlab/gitlab-ce
```
## volume
```bash
# 停止容器 删除容器
docker stop jenkins
docker rm jenkins
# 删除镜像
docker rmi jenkins/jenkins
# 查看所有数据卷
docker volume ls
# 删除数据卷
docker volume rm jenkins
```


## docker 安装 mysql

```bash
docker run -p 3306:3306 --name mysql \
-v /app/mysql/log:/var/log/mysql \
-v /app/mysql/data:/var/lib/mysql \
-v /app/mysql/conf:/etc/mysql/conf.d \
--restart=unless-stopped \
-e MYSQL_ROOT_PASSWORD=910920 \
mysql:latest
```



## docker 安装 glances

```bash
docker run \
  -d \
  --restart="unless-stopped" \
  -p 61208-61209:61208-61209 \
  -e GLANCES_OPT="-w" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  --pid host \
	-e TZ="${TZ}" \
	--name glances \
  nicolargo/glances:latest
```


## docker 安装 netdata

```bash
docker run -d --name=netdata \
--pid=host \
--network=host \
-v /app/netdata/netdataconfig:/etc/netdata \
-v /app/netdata/netdatalib:/var/lib/netdata \
-v /app/netdata/netdatacache:/var/cache/netdata \
-v /:/host/root:ro,rslave \
-v /etc/passwd:/host/etc/passwd:ro \
-v /etc/group:/host/etc/group:ro \
-v /etc/localtime:/etc/localtime:ro \
-v /proc:/host/proc:ro \
-v /sys:/host/sys:ro \
-v /etc/os-release:/host/etc/os-release:ro \
-v /var/log:/host/var/log:ro \
-v /var/run/docker.sock:/var/run/docker.sock:ro \
--restart unless-stopped \
--cap-add SYS_PTRACE \
--cap-add SYS_ADMIN \
--security-opt apparmor=unconfined \
-e NETDATA_CLAIM_TOKEN=TB0MnaUyn8hjT_8mGbOBmt2_xKSuMD_elzHataYBFeyK60_uxD9gi7GkZvsHJ6N8npEjTfSAuTWwOyhPLyYOiQOMbnzc4I8-rt2CS1KITK9882HuEIxYwcVHF4Ff8etxHnVK07I \
-e NETDATA_CLAIM_URL=https://app.netdata.cloud \
-e NETDATA_CLAIM_ROOMS=4af0dd02-5d65-4976-89dd-a5b920f12e33 \
netdata/netdata:edge
```