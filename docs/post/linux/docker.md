# docker

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
docker run --name linux-command  -d -p 40255:3000 --restart unless-stopped wcjiang/linux-command:latest
docker run -d -p 9999:9999 -v /app/site:/usr/share/nginx/html -v /app/ssl:/etc/ssl --name site --restart unless-stopped nginx
docker run -d -p 3000:3000 --name NeteaseCloudMusicApi --restart unless-stopped  binaryify/netease_cloud_music_api:latest

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
chmod -R 755 /app/site/html
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
-e JAVA_OPTS="-Dhudson.model.DirectoryBrowserSupport.CSP=\"default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';\"" \
jenkins/jenkins:2.472-jdk21

```


## docker 安装 postgres

```bash
docker run -d \
  --privileged \
  --name postgres \
  --restart unless-stopped \
  -e POSTGRES_USER=hefang \
  -e POSTGRES_PASSWORD=910920 \
  -e POSTGRES_DB=hefang \
  -p 5432:5432 \
  -v /app/postgres:/var/lib/postgresql/data \
  postgres:latest

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

## docker 安装 fail2ban
```bash
docker run -d \
  --name=fail2ban \
  --net=host \
  --cap-add=NET_ADMIN \
  --cap-add=NET_RAW \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Etc/UTC \
  -e VERBOSITY=-vv \
  -v /app/fail2ban/config:/config \
  -v /var/log:/var/log:ro \
  -v /app/fail2ban/airsonic/log:/remotelogs/airsonic:ro \
  -v /app/fail2ban/apache2/log:/remotelogs/apache2:ro \
  -v /app/fail2ban/authelia/log:/remotelogs/authelia:ro \
  -v /app/fail2ban/emby/log:/remotelogs/emby:ro \
  -v /app/fail2ban/filebrowser/log:/remotelogs/filebrowser:ro \
  -v /app/fail2ban/homeassistant/log:/remotelogs/homeassistant:ro \
  -v /app/fail2ban/lighttpd/log:/remotelogs/lighttpd:ro \
  -v /app/fail2ban/nextcloud/log:/remotelogs/nextcloud:ro \
  -v /app/fail2ban/nginx/log:/remotelogs/nginx:ro \
  -v /app/fail2ban/nzbget/log:/remotelogs/nzbget:ro \
  -v /app/fail2ban/overseerr/log:/remotelogs/overseerr:ro \
  -v /app/fail2ban/prowlarr/log:/remotelogs/prowlarr:ro \
  -v /app/fail2ban/radarr/log:/remotelogs/radarr:ro \
  -v /app/fail2ban/sabnzbd/log:/remotelogs/sabnzbd:ro \
  -v /app/fail2ban/sonarr/log:/remotelogs/sonarr:ro \
  -v /app/fail2ban/unificontroller/log:/remotelogs/unificontroller:ro \
  -v /app/fail2ban/vaultwarden/log:/remotelogs/vaultwarden:ro \
  --restart unless-stopped \
  linuxserver/fail2ban:latest
```



## docker 安装 nextcloud
```bash
docker run -d \
    --name nextcloud \
    --restart=unless-stopped \
    -p 6868:80 \
    -v /app/nextcloud/nextcloud:/var/www/html \
    -v /app/nextcloud/apps:/var/www/html/custom_apps \
    -v /app/nextcloud/config:/var/www/html/config \
    -v /app/nextcloud/data:/var/www/html/data \
    -v /app/nextcloud/theme:/var/www/html/themes/ \
    -e PUID=1000 \
    -e PGID=1000 \
    -e TZ=Asia/Shanghai \
    nextcloud:latest
```


## docker 安装 alist
```bash
docker run -d \
  --restart=unless-stopped \
  -v /app/alist:/opt/alist/data \
  -p 5244:5244 \
  -e PUID=0 \
  -e PGID=0 \
  -e UMASK=022 \
  --name=alist \
  xhofe/alist:latest
```


## docker 安装 jackett
```bash
docker run -d \
  --name=jackett \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Etc/UTC \
  -e AUTO_UPDATE=true `#optional` \
  -e RUN_OPTS= `#optional` \
  -p 9117:9117 \
  -v /app/jackett/data:/config \
  -v /app/jackett/blackhole:/downloads \
  --restart unless-stopped \
  lscr.io/linuxserver/jackett:latest
```

## docker 安装 radarr
```bash
docker run -d \
  --name=radarr \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Etc/UTC \
  -p 7878:7878 \
  -v /app//radarr/data:/config \
  -v /app/radarr/movies:/movies `#optional` \
  -v /app/radarr/download-client-downloads:/downloads `#optional` \
  --restart unless-stopped \
  linuxserver/radarr:latest
```


## docker 安装 qbittorrent
```bash
  docker run -d \
  --name=qbittorrent \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Etc/UTC \
  -e WEBUI_PORT=8080 \
  -e TORRENTING_PORT=6881 \
  -p 8080:8080 \
  -p 6881:6881 \
  -p 6881:6881/udp \
  -v /app/qbittorrent/appdata:/config \
  -v /app/qbittorrent/downloads:/downloads `#optional` \
  --restart unless-stopped \
  linuxserver/qbittorrent:latest
``` 


## docker 安装 jellyfin
```bash
docker run -d \
  --name=jellyfin \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Etc/UTC \
  -e JELLYFIN_PublishedServerUrl=http://106.15.79.229`#optional` \
  -p 8096:8096 \
  -p 8920:8920 `#optional` \
  -p 7359:7359/udp `#optional` \
  -p 1900:1900/udp `#optional` \
  -v /app/jellyfin/library:/config \
  -v /app/jellyfin/tvseries:/data/tvshows \
  -v /app/jellyfin/movies:/data/movies \
  --restart unless-stopped \
  linuxserver/jellyfin:latest
```
## docker 安装 plex
```bash
  docker run -d \
  --name=plex \
  -e PUID=1000 \
  -e PGID=1000 \
  -p 32400:32400 \
  -e TZ=Etc/UTC \
  -e VERSION=docker \
  -e PLEX_CLAIM= `#optional` \
  -v /app/plex/library:/config \
  -v /app/plex/tvseries:/tv \
  -v /app/plex/movies:/movies \
  --restart unless-stopped \
  linuxserver/plex:latest
```

## docker 安装 heimdall
```bash
docker run -d \
  --name=heimdall \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Etc/UTC \
  -p 7575:7575 \
  -v /app/heimdall/config:/config \
  --restart unless-stopped \
  linuxserver/heimdall:latest
```

## docker 安装 qinglong
```bash
docker run -dit \
  -v /app/ql/data:/ql/data \
  -p 5700:5700 \
  -e QlBaseUrl="/" \
  -e QlPort="5700" \
  --name qinglong \
  --hostname qinglong \
  --restart unless-stopped \
  whyour/qinglong:latest
```