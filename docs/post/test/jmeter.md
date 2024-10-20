# Jmeter
:::tip Apache Jmeter 5.6.3 Copyright (c) 1999-2024 The Apache Software Foundation
:::
:::tip Apache Ant(TM) version 1.10.15 compiled on August 25 2024
:::

## 1. 创建 Ant 构建脚本
:::details
```xml{7-9,17-20,64-65,74}
<!-- build.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<project name="ant-jmeter-test" default="run" basedir=".">
    <tstamp>
        <format property="time" pattern="yyyyMMddHHmm" />
    </tstamp>
    <property name="jmeter.home" value="/Users/hefang/Documents/tools/apache-jmeter-5.6.3" />
    <property name="jmeter.result.jtl.dir" value="/Users/hefang/Documents/demo/jmtAnt/report/jtl" />
    <property name="jmeter.result.html.dir" value="/Users/hefang/Documents/demo/jmtAnt/report/html" />
    
    <target name="clean-reports">
        <!-- 删除整文件  -->
        <!-- <delete dir="${jmeter.result.jtl.dir}" />
        <mkdir dir="${jmeter.result.jtl.dir}" />
        <delete dir="${jmeter.result.html.dir}" />
        <mkdir dir="${jmeter.result.html.dir}" /> -->
        <!-- 删除特定的 .jtl 文件 -->
        <delete file="${jmeter.result.html.dir}/TestReport_latest.html" />
        <!-- 删除特定的 .html 文件 -->
        <delete file="${jmeter.result.jtl.dir}/TestReport_latest.jtl" />
    </target>

    <target name="run" depends="clean-reports,test,report">
        <echo>${jmeter.result.html.dir}</echo>
        <echo>${jmeter.result.jtl.dir}</echo>
    </target>

    <!-- 生成的报告的前缀-->
    <property name="ReportName" value="TestReport" />
    <!-- <property name="jmeter.result.jtlName" value="${jmeter.result.jtl.dir}/${ReportName}${time}.jtl" />
    <property name="jmeter.result.htmlName" value="${jmeter.result.html.dir}/${ReportName}${time}.html" /> -->
    <property name="jmeter.result.htmlName" value="${jmeter.result.html.dir}/${ReportName}_latest.html" />
    <property name="jmeter.result.jtlName" value="${jmeter.result.jtl.dir}/${ReportName}_latest.jtl" />
    
    <!-- 输出生成的报告名称和存放路径 -->
    <echo message="${jmeter.result.jtlName}"/>
    <echo message="${jmeter.result.htmlName}"/>
    <echo message="${jmeter.result.html.dir}"/>

    <!-- 指定ant-jmeter-1.1.1.jar 的位置 -->
    <path id="jmeter.classpath">
        <fileset dir="${jmeter.home}/extras">
            <include name="ant-jmeter-1.1.1.jar"/>
        </fileset>
    </path>

    <!-- 加载jar包,解决显示时间问题 -->
    <path id="xslt.classpath">
        <fileset dir="${jmeter.home}/lib" includes="xalan*.jar"/>
        <fileset dir="${jmeter.home}/lib" includes="serializer*.jar"/>
    </path>

    <!--<target name="test">
        <taskdef name="jmeter" classname="org.programmerplanet.ant.taskdefs.jmeter.JMeterTask" classpathref="jmeter.classpath"/>
        <jmeter jmeterhome="${jmeter.home}" resultlog="${jmeter.result.jtlName}">
            声明要运行的脚本。"*.jmx"指包含此目录下的所有jmeter脚本 
            <testplans dir="/Users/hefang/Documents/demo/jmtAnt" includes="${testfile}" />
            声明ant执行jmeter时，传入jmeter的属性值，可以自定义必须是xml格式 
            <property name="jmeter.save.saveservice.output_format" value="xml"/>
        </jmeter>
    </target>-->
    <target name="test">
        <taskdef name="jmeter" classname="org.programmerplanet.ant.taskdefs.jmeter.JMeterTask" classpathref="jmeter.classpath"/>
        <!-- 检查是否有传递testfile参数 -->
        <condition property="includes.pattern" value="${testfile}" else="*.jmx">
            <isset property="testfile"/>
        </condition>
        <jmeter jmeterhome="${jmeter.home}" resultlog="${jmeter.result.jtlName}">
            <!-- 动态选择要执行的脚本，根据是否传递testfile参数 -->
            <testplans dir="/Users/he/Documents/local/netApiJmeter" includes="${includes.pattern}" />
            <!-- 声明ant执行jmeter时，传入jmeter的属性值，可以自定义必须是xml格式 -->
            <property name="jmeter.save.saveservice.output_format" value="xml"/>
        </jmeter>
    </target>

    <target name="report">
        <!-- 复制 favicon.ico 文件到目标目录 -->
        <!-- <copy file="/Users/hefang/Documents/demo/jmtAnt/report/favicon.ico" todir="${jmeter.result.html.dir}" /> -->
        <tstamp>
            <format property="report.datestamp" pattern="yyyy-MM-dd HH:mm" />
        </tstamp>
        <xslt
            classpathref="xslt.classpath"
            force="true"
            in="${jmeter.result.jtlName}"
            out="${jmeter.result.htmlName}"
            style="${jmeter.home}/extras/jmeter-results-shanhe-me.xsl">
            <!-- jmeter-results-detail-report_21.xsl这里的文件名可以换成你想要的报告效果 -->
            <!-- jmeter-results-shanhe-me.xsl这里的文件名可以换成你想要的报告效果 -->
            <!-- 显示dateReport的时间 -->
            <param name="dateReport" expression="${report.datestamp}"/>
        </xslt>
        <!-- 手动拷贝生成报告时所需的图片 -->
        <copy todir="${jmeter.result.html.dir}">
            <fileset dir="${jmeter.home}/extras">
                <include name="collapse.png" />
                <include name="expand.png" />
            </fileset>
        </copy>
    </target>
</project>
```
:::
## 2. 生成报告
#### 1. 基于 XML 和 XSL 转换的 HTML 报告
```bash
# jmeter.properties
jmeter.save.saveservice.output_format=xml
# build.xml
style="${jmeter.home}/extras/jmeter-results-shanhe-me.xsl">
```

```bash
ant
ant run 
ant -Dtestfile=test_plan.jmx
```
```
Buildfile: /Users/he/Documents/local/netApiJmeter/build.xml
     [echo] /Users/he/Documents/local/netApiJmeter/report/jtl/TestReport_202409220004.jtl
     [echo] /Users/he/Documents/local/netApiJmeter/report/html/TestReport_202409220004.html
     [echo] /Users/he/Documents/local/netApiJmeter/report/html

clean-reports:

test:
   [jmeter] Executing test plan: /Users/he/Documents/local/netApiJmeter/NeteaseCloudMusicApi.jmx ==> /Users/he/Documents/local/netApiJmeter/report/jtl/TestReport_202409220004.jtl
   [jmeter] WARN StatusConsoleListener The use of package scanning to locate plugins is deprecated and will be removed in a future release
   [jmeter] WARN StatusConsoleListener The use of package scanning to locate plugins is deprecated and will be removed in a future release
   [jmeter] WARN StatusConsoleListener The use of package scanning to locate plugins is deprecated and will be removed in a future release
   [jmeter] WARN StatusConsoleListener The use of package scanning to locate plugins is deprecated and will be removed in a future release
   [jmeter] Creating summariser <summary>
   [jmeter] Created the tree successfully using /Users/he/Documents/local/netApiJmeter/NeteaseCloudMusicApi.jmx
   [jmeter] Starting standalone test @ 2024 Sep 22 00:04:48 CST (1726934688403)
   [jmeter] Waiting for possible Shutdown/StopTestNow/HeapDump/ThreadDump message on port 4445
   [jmeter] summary =      3 in 00:00:01 =    2.3/s Avg:   372 Min:   327 Max:   412 Err:     0 (0.00%)
   [jmeter] Tidying up ...    @ 2024 Sep 22 00:04:50 CST (1726934690024)
   [jmeter] ... end of run

report:
     [xslt] Processing /Users/he/Documents/local/netApiJmeter/report/jtl/TestReport_202409220004.jtl to /Users/he/Documents/local/netApiJmeter/report/html/TestReport_202409220004.html
     [xslt] Loading stylesheet jmeter-results-shanhe-me.xsl

run:
     [echo] /Users/he/Documents/local/netApiJmeter/report/html
     [echo] /Users/he/Documents/local/netApiJmeter/report/jtl

BUILD SUCCESSFUL
Total time: 5 seconds
```

#### 2. JMeter 自带的 Dashboard 报告（CSV）
```bash
# jmeter.properties
jmeter.save.saveservice.output_format=csv
```
```bash
# 用于从现有结果文件生成报告
jmeter -g HTTP.jtl -o report/dashboard/
# 运行新的测试并生成报告(每次执行前需要删除 dashboard 文件夹和 HTTP.jtl 文件)
jmeter -n -t HTTP.jmx -l HTTP.jtl -e -o report/dashboard/
jmeter -n -t HTTP.jmx -l report/jtl/HTTP.jtl -e -o report/dashboard/
```
```
# 输出
WARNING: package sun.awt.X11 not in java.desktop
WARN StatusConsoleListener The use of package scanning to locate plugins is deprecated and will be removed in a future release
WARN StatusConsoleListener The use of package scanning to locate plugins is deprecated and will be removed in a future release
WARN StatusConsoleListener The use of package scanning to locate plugins is deprecated and will be removed in a future release
WARN StatusConsoleListener The use of package scanning to locate plugins is deprecated and will be removed in a future release
Creating summariser <summary>
Created the tree successfully using NeteaseCloudMusicApi.jmx
Starting standalone test @ 2024 Sep 22 00:28:59 CST (1726936139480)
Waiting for possible Shutdown/StopTestNow/HeapDump/ThreadDump message on port 4445
summary +      1 in 00:00:01 =    1.5/s Avg:   518 Min:   518 Max:   518 Err:     0 (0.00%) Active: 1 Started: 1 Finished: 0
summary +      2 in 00:00:01 =    2.7/s Avg:   365 Min:   290 Max:   441 Err:     0 (0.00%) Active: 0 Started: 1 Finished: 1
summary =      3 in 00:00:01 =    2.2/s Avg:   416 Min:   290 Max:   518 Err:     0 (0.00%)
Tidying up ...    @ 2024 Sep 22 00:29:01 CST (1726936141086)
... end of run
```
#### 3.增加 nginx 部分，可以通过网络接口来查看报告
```bash
brew install nginx
```
```nginx
# 配置NGINX
# nginx.conf
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;
#pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    
    # HTTP 01
    server {
        listen       8080;
        server_name  192.168.0.101;

        location / {
            root /Users/hefang/Documents/demo/jmtAnt/report/dashboard;
            index index.html;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    } 
    # HTTP 02
    server {
        listen       8090;
        server_name  192.168.0.101;

        location / {
            root /Users/hefang/Documents/demo/jmtAnt/report/html;
            index TestReport_latest.html;
        }
        
        error_page   500 502 503 504  /50x.html;
        location = /50x.html { 
            root   html;
        }
    }

    include servers/*;
}

```


```bash
# 启动 & 重新加载 nginx 配置
brew services start nginx
brew services reload nginx
```

```bash
# Nginx 搭建 Web 服务器 ——> 包括本地和局域网
http://localhost:8080
http://192.168.0.101:8080

http://localhost:8090
http://192.168.0.101:8090

# 页面输出存在缓存问题需要手动强制刷新
Command + Shift + R
Ctrl + F5
```

## 4. 跨线程调用 cookie
:::code-group 
```js [BeanShell]
- 线程 1
  - login
    - JSON 提取器
      - 变量名称：cookie
      - JSON PATH expression : $.cookie
    - 添加 BeanShell 后置处理程序
      - ${__setProperty(cookie, ${cookie},)}
- 线程 2 
  - status 
  - HTTP信息头管理器
    - Content-Type:application/json
    - cookie:${__P(cookie,)}
```

```js [JSR223]
- 线程 1
  - login
    - JSON 提取器
      - 变量名称：cookie
      - JSON PATH expression : $.cookie
    - 添加 JSR223 后置处理程序
      - String cookie = vars.get("cookie")
      - props.put("cookie", cookie)
- 线程 2 
  - status 
  - HTTP信息头管理器
    - Content-Type:application/json
    - cookie:${__P(cookie,)}

```
:::

## 4. 性能测试 
:::info 配置
- 设置线程数为: 500
- ramp-up: 100
- 循环次数: 1
:::

:::details 执行
```
jmeter -n -t test_plan.jmx -l test_plan.jtl -e -o report/dashboard
WARNING: package sun.awt.X11 not in java.desktop
WARN StatusConsoleListener The use of package scanning to locate plugins is deprecated and will be removed in a future release
WARN StatusConsoleListener The use of package scanning to locate plugins is deprecated and will be removed in a future release
WARN StatusConsoleListener The use of package scanning to locate plugins is deprecated and will be removed in a future release
WARN StatusConsoleListener The use of package scanning to locate plugins is deprecated and will be removed in a future release
Creating summariser <summary>
Created the tree successfully using test_plan.jmx
Starting standalone test @ 2024 Sep 27 13:47:24 CST (1727416044978)
Waiting for possible Shutdown/StopTestNow/HeapDump/ThreadDump message on port 4445
summary +     84 in 00:00:05 =   18.0/s Avg:   151 Min:     6 Max:  1523 Err:     0 (0.00%) Active: 24 Started: 25 Finished: 1
summary +    541 in 00:00:30 =   18.1/s Avg:  1048 Min:     6 Max: 25611 Err:     0 (0.00%) Active: 172 Started: 174 Finished: 2
summary =    625 in 00:00:35 =   18.1/s Avg:   928 Min:     6 Max: 25611 Err:     0 (0.00%)
summary +    568 in 00:00:30 =   18.9/s Avg:  2826 Min:     5 Max: 46345 Err:     0 (0.00%) Active: 321 Started: 325 Finished: 4
summary =   1193 in 00:01:05 =   18.4/s Avg:  1831 Min:     5 Max: 46345 Err:     0 (0.00%)
summary +    543 in 00:00:30 =   18.1/s Avg:  3854 Min:     6 Max: 84726 Err:     0 (0.00%) Active: 466 Started: 475 Finished: 9
summary =   1736 in 00:01:35 =   18.3/s Avg:  2464 Min:     5 Max: 84726 Err:     0 (0.00%)
summary +    280 in 00:00:31 =    9.0/s Avg: 11895 Min:     7 Max: 111223 Err:     0 (0.00%) Active: 488 Started: 501 Finished: 13
summary =   2016 in 00:02:06 =   16.0/s Avg:  3774 Min:     5 Max: 111223 Err:     0 (0.00%)
summary +     91 in 00:00:29 =    3.1/s Avg: 41200 Min:    13 Max: 145614 Err:     3 (3.30%) Active: 485 Started: 501 Finished: 16
summary =   2107 in 00:02:35 =   13.6/s Avg:  5390 Min:     5 Max: 145614 Err:     3 (0.14%)
summary +    107 in 00:00:30 =    3.6/s Avg: 41261 Min:     7 Max: 160246 Err:     8 (7.48%) Active: 474 Started: 501 Finished: 27
summary =   2214 in 00:03:05 =   12.0/s Avg:  7124 Min:     5 Max: 160246 Err:    11 (0.50%)
summary +    152 in 00:00:30 =    5.1/s Avg: 53857 Min:     6 Max: 195168 Err:    12 (7.89%) Active: 459 Started: 501 Finished: 42
summary =   2366 in 00:03:35 =   11.0/s Avg: 10126 Min:     5 Max: 195168 Err:    23 (0.97%)
summary +    156 in 00:00:30 =    5.2/s Avg: 56235 Min:     6 Max: 237219 Err:     8 (5.13%) Active: 443 Started: 501 Finished: 58
summary =   2522 in 00:04:05 =   10.3/s Avg: 12978 Min:     5 Max: 237219 Err:    31 (1.23%)
summary +    269 in 00:00:30 =    9.0/s Avg: 57629 Min:     7 Max: 264039 Err:     8 (2.97%) Active: 414 Started: 501 Finished: 87
summary =   2791 in 00:04:35 =   10.2/s Avg: 17282 Min:     5 Max: 264039 Err:    39 (1.40%)
summary +    361 in 00:00:30 =   12.0/s Avg: 48597 Min:     6 Max: 286200 Err:     8 (2.22%) Active: 356 Started: 501 Finished: 145
summary =   3152 in 00:05:05 =   10.3/s Avg: 20868 Min:     5 Max: 286200 Err:    47 (1.49%)
summary +    436 in 00:00:30 =   14.5/s Avg: 42574 Min:     6 Max: 298828 Err:    11 (2.52%) Active: 281 Started: 501 Finished: 220
summary =   3588 in 00:05:35 =   10.7/s Avg: 23506 Min:     5 Max: 298828 Err:    58 (1.62%)
summary +    521 in 00:00:30 =   17.4/s Avg: 31259 Min:     6 Max: 342016 Err:    13 (2.50%) Active: 171 Started: 501 Finished: 330
summary =   4109 in 00:06:05 =   11.3/s Avg: 24489 Min:     5 Max: 342016 Err:    71 (1.73%)
summary +    511 in 00:00:31 =   16.4/s Avg: 35161 Min:     6 Max: 372015 Err:     9 (1.76%) Active: 66 Started: 501 Finished: 435
summary =   4620 in 00:06:36 =   11.7/s Avg: 25669 Min:     5 Max: 372015 Err:    80 (1.73%)
summary +    172 in 00:00:29 =    5.9/s Avg: 55142 Min:     6 Max: 399279 Err:     5 (2.91%) Active: 35 Started: 501 Finished: 466
summary =   4792 in 00:07:05 =   11.3/s Avg: 26727 Min:     5 Max: 399279 Err:    85 (1.77%)
summary +    126 in 00:00:31 =    4.1/s Avg: 57880 Min:     6 Max: 395395 Err:     1 (0.79%) Active: 14 Started: 501 Finished: 487
summary =   4918 in 00:07:36 =   10.8/s Avg: 27525 Min:     5 Max: 399279 Err:    86 (1.75%)
summary +     60 in 00:00:30 =    2.0/s Avg: 66094 Min:     7 Max: 474455 Err:     0 (0.00%) Active: 4 Started: 501 Finished: 497
summary =   4978 in 00:08:05 =   10.3/s Avg: 27990 Min:     5 Max: 474455 Err:    86 (1.73%)
summary +     23 in 00:00:15 =    1.5/s Avg: 53965 Min:     7 Max: 464343 Err:     0 (0.00%) Active: 0 Started: 501 Finished: 501
summary =   5001 in 00:08:20 =   10.0/s Avg: 28110 Min:     5 Max: 474455 Err:    86 (1.72%)
Tidying up ...    @ 2024 Sep 27 13:55:45 CST (1727416545869)
... end of run
```
:::

::: info APDEX (Application Performance Index)
| Apdex | T (Toleration threshold) | F (Frustration threshold) | Label |
|:---------:|:------:|:--------:|:------:|
| 0.591   | 500 ms | 1 sec 500 ms | Total |
| 0.001   | 500 ms | 1 sec 500 ms | 获取用户动态 |
| 0.064   | 500 ms | 1 sec 500 ms | 获取用户歌单 |
| 0.137   | 500 ms | 1 sec 500 ms | 获取每日推荐歌曲 |
| 0.223   | 500 ms | 1 sec 500 ms | 电台 - 分类 |
| 0.500   | 500 ms | 1 sec 500 ms | 登录 |
| 0.596   | 500 ms | 1 sec 500 ms | vip 成长值 |
| 0.956   | 500 ms | 1 sec 500 ms | 获取账号信息 |
| 0.976   | 500 ms | 1 sec 500 ms | 云贝账户信息 |
| 0.980   | 500 ms | 1 sec 500 ms | 获取用户历史评论 |
| 0.988   | 500 ms | 1 sec 500 ms | 通知 - 私信 |
| 0.994   | 500 ms | 1 sec 500 ms | 获取用户信息 |
:::


::: info Statistics
![pic](/jmeter01.png "notice")
:::

::: details Errors
| Type of error                                                                                         | Number of errors | % in errors | % in all samples |
|:--------------------------------------------------------------------------------------------------|:----------:|:------------:|:---------------:|
| Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 20,946; received: 6,681) | 4        | 4.65       | 0.08          |
| Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 20,946; received: 969)  | 4        | 4.65       | 0.08          |
| Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 231,411; received: 219,323) | 4        | 4.65       | 0.08          |
| 502/Bad Gateway                                                                                   | 3        | 3.49       | 0.06          |
| Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 231,411; received: 215,039) | 3        | 3.49       | 0.06          |
| Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 67,747; received: 25,244) | 3        | 3.49       | 0.06          |
| Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 231,411; received: 229,319) | 3        | 3.49       | 0.06          |
:::

:::info 总结
1. 测试概况
   - 样本总数: 5001
   - 失败样本: 86
   - 错误率: 1.72%（可接受的范围，但有提升空间）
   - 平均响应时间: 28,110.30 ms（整体偏高）
   - 最大响应时间: 474,455 ms（存在极端值，影响用户体验）
   - 交易速率: 10.00 transactions/s（需要提升）
2. 主要问题: 
   - 通常表示服务器在发送响应体的过程中提前关闭了连接
    ```
    Non HTTP response code: org.apache.http.ConnectionClosedException/Non 
    HTTP response message: Premature end of Content-Length delimited message body (expected: 20,946; received: 5,253)
    ```
3. 优化方向:
   - 针对高延迟和错误的接口进行深入分析与优化。
   - 监控服务器资源，识别潜在的瓶颈。
   - 考虑增加测试负载，观察系统在极限条件下的表现。
   - 整体上，系统在高负载下表现不均，某些接口需优先优化，以提升整体性能和用户体验
:::


## 5. 压力测试

:::info 配置
- 设置线程数为: 100
- ramp-up: 50
- 循环次数: 永远  `（执行20分钟）`
:::

:::details 执行
```
jmeter -n -t test_plan.jmx -l test_plan.jtl -e -o report/dashboard
WARNING: package sun.awt.X11 not in java.desktop
WARN StatusConsoleListener The use of package scanning to locate plugins is deprecated and will be removed in a future release
WARN StatusConsoleListener The use of package scanning to locate plugins is deprecated and will be removed in a future release
WARN StatusConsoleListener The use of package scanning to locate plugins is deprecated and will be removed in a future release
WARN StatusConsoleListener The use of package scanning to locate plugins is deprecated and will be removed in a future release
Creating summariser <summary>
Created the tree successfully using test_plan.jmx
Starting standalone test @ 2024 Sep 27 15:22:28 CST (1727421748060)
Waiting for possible Shutdown/StopTestNow/HeapDump/ThreadDump message on port 4445
summary +     18 in 00:00:02 =   10.6/s Avg:   148 Min:     8 Max:   456 Err:     0 (0.00%) Active: 4 Started: 5 Finished: 1
summary +    356 in 00:00:30 =   11.9/s Avg:  1031 Min:     6 Max: 23376 Err:     0 (0.00%) Active: 64 Started: 65 Finished: 1
summary =    374 in 00:00:32 =   11.9/s Avg:   988 Min:     6 Max: 23376 Err:     0 (0.00%)
summary +    332 in 00:00:30 =   10.9/s Avg:  3676 Min:     5 Max: 44596 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =    706 in 00:01:02 =   11.4/s Avg:  2252 Min:     5 Max: 44596 Err:     0 (0.00%)
summary +    273 in 00:00:30 =    9.2/s Avg:  8705 Min:     6 Max: 70070 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =    979 in 00:01:32 =   10.7/s Avg:  4052 Min:     5 Max: 70070 Err:     0 (0.00%)
summary +    400 in 00:00:30 =   13.3/s Avg:  8447 Min:     5 Max: 107241 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =   1379 in 00:02:02 =   11.3/s Avg:  5327 Min:     5 Max: 107241 Err:     0 (0.00%)
summary +    328 in 00:00:30 =   10.8/s Avg:  8602 Min:     6 Max: 119668 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =   1707 in 00:02:32 =   11.2/s Avg:  5956 Min:     5 Max: 119668 Err:     0 (0.00%)
summary +    325 in 00:00:30 =   11.0/s Avg:  7455 Min:     6 Max: 116388 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =   2032 in 00:03:02 =   11.2/s Avg:  6196 Min:     5 Max: 119668 Err:     0 (0.00%)
summary +    398 in 00:00:30 =   13.1/s Avg:  9617 Min:     6 Max: 141041 Err:     1 (0.25%) Active: 100 Started: 101 Finished: 1
summary =   2430 in 00:03:32 =   11.5/s Avg:  6756 Min:     5 Max: 141041 Err:     1 (0.04%)
summary +    335 in 00:00:30 =   11.1/s Avg:  7923 Min:     5 Max: 158245 Err:     1 (0.30%) Active: 100 Started: 101 Finished: 1
summary =   2765 in 00:04:02 =   11.4/s Avg:  6898 Min:     5 Max: 158245 Err:     2 (0.07%)
summary +    313 in 00:00:30 =   10.5/s Avg:  9931 Min:     6 Max: 99089 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =   3078 in 00:04:32 =   11.3/s Avg:  7206 Min:     5 Max: 158245 Err:     2 (0.06%)
summary +    374 in 00:00:30 =   12.6/s Avg:  7354 Min:     5 Max: 134238 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =   3452 in 00:05:02 =   11.4/s Avg:  7222 Min:     5 Max: 158245 Err:     2 (0.06%)
summary +    324 in 00:00:30 =   10.8/s Avg:  8010 Min:     6 Max: 122356 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =   3776 in 00:05:32 =   11.4/s Avg:  7290 Min:     5 Max: 158245 Err:     2 (0.05%)
summary +    349 in 00:00:30 =   11.6/s Avg:  8886 Min:     6 Max: 134515 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =   4125 in 00:06:02 =   11.4/s Avg:  7425 Min:     5 Max: 158245 Err:     2 (0.05%)
summary +    377 in 00:00:31 =   12.3/s Avg:  7925 Min:     6 Max: 182207 Err:     3 (0.80%) Active: 100 Started: 101 Finished: 1
summary =   4502 in 00:06:32 =   11.5/s Avg:  7467 Min:     5 Max: 182207 Err:     5 (0.11%)
summary +    337 in 00:00:30 =   11.4/s Avg:  9556 Min:     6 Max: 122410 Err:     2 (0.59%) Active: 100 Started: 101 Finished: 1
summary =   4839 in 00:07:02 =   11.5/s Avg:  7612 Min:     5 Max: 182207 Err:     7 (0.14%)
summary +    320 in 00:00:30 =   10.7/s Avg:  9443 Min:     6 Max: 218382 Err:     2 (0.62%) Active: 100 Started: 101 Finished: 1
summary =   5159 in 00:07:32 =   11.4/s Avg:  7726 Min:     5 Max: 218382 Err:     9 (0.17%)
summary +    405 in 00:00:30 =   13.4/s Avg:  7346 Min:     5 Max: 91365 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =   5564 in 00:08:02 =   11.5/s Avg:  7698 Min:     5 Max: 218382 Err:     9 (0.16%)
summary +    321 in 00:00:30 =   10.8/s Avg:  8154 Min:     6 Max: 133827 Err:     1 (0.31%) Active: 100 Started: 101 Finished: 1
summary =   5885 in 00:08:32 =   11.5/s Avg:  7723 Min:     5 Max: 218382 Err:    10 (0.17%)
summary +    342 in 00:00:30 =   11.3/s Avg:  7945 Min:     5 Max: 118101 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =   6227 in 00:09:02 =   11.5/s Avg:  7735 Min:     5 Max: 218382 Err:    10 (0.16%)
summary +    334 in 00:00:30 =   11.1/s Avg:  9543 Min:     5 Max: 172198 Err:     1 (0.30%) Active: 100 Started: 101 Finished: 1
summary =   6561 in 00:09:32 =   11.5/s Avg:  7827 Min:     5 Max: 218382 Err:    11 (0.17%)
summary +    339 in 00:00:30 =   11.3/s Avg:  8505 Min:     6 Max: 383495 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =   6900 in 00:10:02 =   11.5/s Avg:  7860 Min:     5 Max: 383495 Err:    11 (0.16%)
summary +    336 in 00:00:30 =   11.2/s Avg:  8484 Min:     6 Max: 136135 Err:     1 (0.30%) Active: 100 Started: 101 Finished: 1
summary =   7236 in 00:10:32 =   11.5/s Avg:  7889 Min:     5 Max: 383495 Err:    12 (0.17%)
summary +    374 in 00:00:30 =   12.5/s Avg:  9918 Min:     5 Max: 121647 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =   7610 in 00:11:02 =   11.5/s Avg:  7989 Min:     5 Max: 383495 Err:    12 (0.16%)
summary +    355 in 00:00:30 =   11.7/s Avg:  6770 Min:     5 Max: 123713 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =   7965 in 00:11:32 =   11.5/s Avg:  7935 Min:     5 Max: 383495 Err:    12 (0.15%)
summary +    329 in 00:00:30 =   11.0/s Avg: 10417 Min:     6 Max: 489417 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =   8294 in 00:12:02 =   11.5/s Avg:  8033 Min:     5 Max: 489417 Err:    12 (0.14%)
summary +    364 in 00:00:30 =   12.1/s Avg:  8389 Min:     6 Max: 167014 Err:     2 (0.55%) Active: 100 Started: 101 Finished: 1
summary =   8658 in 00:12:32 =   11.5/s Avg:  8048 Min:     5 Max: 489417 Err:    14 (0.16%)
summary +    308 in 00:00:30 =   10.3/s Avg:  8597 Min:     6 Max: 139403 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =   8966 in 00:13:02 =   11.5/s Avg:  8067 Min:     5 Max: 489417 Err:    14 (0.16%)
summary +    353 in 00:00:30 =   11.7/s Avg:  8332 Min:     6 Max: 102400 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =   9319 in 00:13:32 =   11.5/s Avg:  8077 Min:     5 Max: 489417 Err:    14 (0.15%)
summary +    377 in 00:00:30 =   12.6/s Avg:  9249 Min:     5 Max: 387082 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =   9696 in 00:14:02 =   11.5/s Avg:  8123 Min:     5 Max: 489417 Err:    14 (0.14%)
summary +    326 in 00:00:30 =   10.9/s Avg:  8248 Min:     6 Max: 141067 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =  10022 in 00:14:32 =   11.5/s Avg:  8127 Min:     5 Max: 489417 Err:    14 (0.14%)
summary +    374 in 00:00:30 =   12.3/s Avg:  7907 Min:     6 Max: 163643 Err:     1 (0.27%) Active: 100 Started: 101 Finished: 1
summary =  10396 in 00:15:02 =   11.5/s Avg:  8119 Min:     5 Max: 489417 Err:    15 (0.14%)
summary +    328 in 00:00:30 =   11.1/s Avg: 10060 Min:     6 Max: 187305 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =  10724 in 00:15:32 =   11.5/s Avg:  8178 Min:     5 Max: 489417 Err:    15 (0.14%)
summary +    336 in 00:00:30 =   11.2/s Avg:  8830 Min:     6 Max: 124401 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =  11060 in 00:16:02 =   11.5/s Avg:  8198 Min:     5 Max: 489417 Err:    15 (0.14%)
summary +    369 in 00:00:30 =   12.3/s Avg:  8144 Min:     6 Max: 125870 Err:     1 (0.27%) Active: 100 Started: 101 Finished: 1
summary =  11429 in 00:16:32 =   11.5/s Avg:  8196 Min:     5 Max: 489417 Err:    16 (0.14%)
summary +    362 in 00:00:30 =   12.1/s Avg:  8777 Min:     6 Max: 369523 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =  11791 in 00:17:02 =   11.5/s Avg:  8214 Min:     5 Max: 489417 Err:    16 (0.14%)
summary +    316 in 00:00:30 =   10.5/s Avg:  8403 Min:     6 Max: 116420 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =  12107 in 00:17:32 =   11.5/s Avg:  8219 Min:     5 Max: 489417 Err:    16 (0.13%)
summary +    363 in 00:00:30 =   12.1/s Avg:  8709 Min:     6 Max: 159747 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =  12470 in 00:18:02 =   11.5/s Avg:  8233 Min:     5 Max: 489417 Err:    16 (0.13%)
summary +    326 in 00:00:30 =   10.9/s Avg:  8183 Min:     6 Max: 130108 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =  12796 in 00:18:32 =   11.5/s Avg:  8232 Min:     5 Max: 489417 Err:    16 (0.13%)
summary +    356 in 00:00:30 =   11.9/s Avg:  8816 Min:     6 Max: 221870 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =  13152 in 00:19:02 =   11.5/s Avg:  8248 Min:     5 Max: 489417 Err:    16 (0.12%)
summary +    342 in 00:00:30 =   11.4/s Avg:  9083 Min:     5 Max: 162058 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =  13494 in 00:19:32 =   11.5/s Avg:  8269 Min:     5 Max: 489417 Err:    16 (0.12%)
summary +    359 in 00:00:30 =   11.9/s Avg:  8571 Min:     6 Max: 326456 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =  13853 in 00:20:02 =   11.5/s Avg:  8277 Min:     5 Max: 489417 Err:    16 (0.12%)
summary +    374 in 00:00:30 =   12.5/s Avg:  7726 Min:     6 Max: 109663 Err:     0 (0.00%) Active: 100 Started: 101 Finished: 1
summary =  14227 in 00:20:32 =   11.6/s Avg:  8262 Min:     5 Max: 489417 Err:    16 (0.11%)

jmeter -g test_plan.jtl -o report/dashboard/
WARNING: package sun.awt.X11 not in java.desktop
WARN StatusConsoleListener The use of package scanning to locate plugins is deprecated and will be removed in a future release
WARN StatusConsoleListener The use of package scanning to locate plugins is deprecated and will be removed in a future release
WARN StatusConsoleListener The use of package scanning to locate plugins is deprecated and will be removed in a future release
WARN StatusConsoleListener The use of package scanning to locate plugins is deprecated and will be removed in a future release
```
:::


::: info APDEX (Application Performance Index)
| Apdex | T (Toleration threshold) | F (Frustration threshold) | Label           |
|:-----:|:------------------------:|:-------------------------:|:---------------:|
| 0.613 | 500 ms                   | 1 sec 500 ms              | Total           |
| 0.002 | 500 ms                   | 1 sec 500 ms              | 获取用户动态    |
| 0.002 | 500 ms                   | 1 sec 500 ms              | 获取每日推荐歌曲 |
| 0.094 | 500 ms                   | 1 sec 500 ms              | 电台 - 分类     |
| 0.207 | 500 ms                   | 1 sec 500 ms              | 获取用户歌单    |
| 0.828 | 500 ms                   | 1 sec 500 ms              | vip 成长值      |
| 0.980 | 500 ms                   | 1 sec 500 ms              | 云贝账户信息    |
| 0.990 | 500 ms                   | 1 sec 500 ms              | 获取账号信息    |
| 0.994 | 500 ms                   | 1 sec 500 ms              | 获取用户历史评论 |
| 0.995 | 500 ms                   | 1 sec 500 ms              | 通知 - 私信     |
| 0.996 | 500 ms                   | 1 sec 500 ms              | 获取用户信息    |
| 1.000 | 500 ms                   | 1 sec 500 ms              | 登录            |
:::



::: info Statistics
![pic](/jmeter02.png "notice")
:::

::: details Errors
| Type of error                                                                                     | Number of errors | % in errors | % in all samples |
|--------------------------------------------------------------------------------------------------|------------------|-------------|------------------|
| 502/Bad Gateway                                                                                   | 4                | 25.00%      | 0.03%            |
| Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 231,411; received: 210,755) | 1                | 6.25%       | 0.01%            |
| Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 231,411; received: 220,751) | 1                | 6.25%       | 0.01%            |
| Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 67,741; received: 23,815) | 1                | 6.25%       | 0.01%            |
| Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 231,411; received: 215,039) | 1                | 6.25%       | 0.01%            |
| Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 67,754; received: 18,104) | 1                | 6.25%       | 0.01%            |
:::



:::info 总结
1. 测试概况
   - 总请求数：14413个请求
   - 失败数：16个请求
   - 错误率：0.11%（相对较低）
   - 平均响应时间：8265.18毫秒，最大响应时间为489417毫秒（大约8分钟），最小响应时间为5毫秒
   - 吞吐量：11.52次/秒，总接收数据量为392.99 KB，总发送数据量为41.45 KB
2. 主要问题: 
   - 通常表示服务器在发送响应体的过程中提前关闭了连接
    ```
    Non HTTP response code: org.apache.http.ConnectionClosedException/Non 
    HTTP response message: Premature end of Content-Length delimited message body (expected: 20,946; received: 5,253)
    ```
3. 优化方向:
    - 获取用户动态：平均响应时间接近56秒，最大响应时间达到8分钟，错误率0.35%，是主要瓶颈
    - 获取每日推荐歌曲：平均响应时间16.5秒，错误率0.43%，也需要进一步优化
:::











:::info 重点关注
1. 错误率 (Error %) 
   - 意义: 表示请求失败的比例。
   - 关注点: 高错误率可能指示系统存在严重的问题，需要定位和修复故障。理想情况下，错误率应低于1-2%。
2. 平均响应时间 (Average)
   - 意义: 所有请求的平均处理时间。
   - 关注点: 反映了系统的整体性能，较长的平均响应时间可能表示系统瓶颈或负载过重。
3. 90百分位响应时间 (90th pct)
   - 意义: 90%的请求在此时间内完成。
   - 关注点: 更能反映大多数用户的实际体验，比平均响应时间更能显示出性能的分布情况。高于期望值可能表明系统在高负载下的表现不稳定。
4. 最大响应时间 (Max)
   - 意义: 所有请求中最长的响应时间。
   - 关注点: 帮助识别性能极限或异常情况。如果最大响应时间远高于其他响应时间，可能表明系统存在性能瓶颈或异常。
5. 吞吐量 (Transactions/s)
   - 意义: 每秒处理的请求数。
   - 关注点: 显示系统的处理能力，较高的吞吐量意味着系统能处理更多的请求。需要确保高吞吐量伴随合理的错误率和响应时间。
:::



::: info 关键字段解释 
- Label: 测试名称或请求标签。
- #Samples: 请求样本总数。
- FAIL: 失败的请求数量。
- Error %: 请求错误的百分比。
- Average: 请求的平均响应时间（毫秒）。
- Min: 请求的最小响应时间（毫秒）。
- Max: 请求的最大响应时间（毫秒）。
- Median: 请求的中位数响应时间（毫秒）。
- 90th pct: 第90百分位响应时间（90%的请求在此时间内完成）。
- 95th pct: 第95百分位响应时间（95%的请求在此时间内完成）。
- 99th pct: 第99百分位响应时间（99%的请求在此时间内完成）。
- Transactions/s: 每秒完成的事务数（吞吐量）。
- Received: 每秒接收到的数据量（KB/秒）。
- Sent: 每秒发送的数据量（KB/秒）
:::