# docker

## docker 安装 nginx 

```bash
# 示所有运行中的容器的 CPU、内存、网络和 I/O
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

docker run -d -p 9999:9999 --name site --restart unless-stopped nginx

docker run -d -p 9999:9999 -v /app/site:/usr/share/nginx/html --name site --restart unless-stopped nginx

docker run -d -p 9999:9999 -v /app/site:/usr/share/nginx/html -v /app/ssl:/etc/ssl --name site --restart unless-stopped nginx

docker run -d -p 3000:3000 --name NeteaseCloudMusicApi --restart unless-stopped binaryify/netease_cloud_music_api
docker run --name linux-command -d -p 40255:40255 --restart unless-stopped wcjiang/linux-command:latest


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
# HTTP server
server {
    listen 80;
    listen [::]:80;
    server_name 106.15.79.229;

    location / {
        return 301 https://$host:9999$request_uri;
    }
}
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
-v jenkins-data:/var/jenkins_home \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /etc/localtime:/etc/localtime:ro \
jenkinszh/jenkins-zh

jenkins/jenkins   2.32
jenkins/jenkins:lts  2.319.1
jenkins/jenkins:latest 2.328
docker pull jenkins/jenkins:latest-jdk21
docker pull jenkins/jenkins:2.470-jdk21
docker pull jenkins/jenkins:2.470
```
docker stop jenkins
docker rm jenkins
docker rmi jenkins/jenkins
docker volume ls
docker volume rm jenkins-data
# 查看所有容器
docker ps -a   
# 查看所有数据卷
docker volume ls  



## postgres

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