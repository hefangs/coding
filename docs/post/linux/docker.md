# docker



## docker

```bash
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






# 重新加载或重启 Nginx
nginx -s reload
# 如果 nginx -s reload 命令无法使用，你可以重启容器
docker restart app










# 生成自签名证书和私钥，注意这里的文件路径
cd /app
mkdir -p /app/ssl
openssl req -x509 -newkey rsa:4096 -nodes -keyout /app/ssl/key.pem -out /app/ssl/cert.pem -days 365

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
# 设置目录权限：
#使用 chmod 命令递归地设置目录和文件的权限
chmod -R 755 /app/site
```