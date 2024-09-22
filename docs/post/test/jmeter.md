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

    <target name="test">
        <taskdef name="jmeter" classname="org.programmerplanet.ant.taskdefs.jmeter.JMeterTask" classpathref="jmeter.classpath"/>
        <jmeter jmeterhome="${jmeter.home}" resultlog="${jmeter.result.jtlName}">
            <!-- 声明要运行的脚本。"*.jmx"指包含此目录下的所有jmeter脚本 -->
            <testplans dir="/Users/hefang/Documents/demo/jmtAnt" includes="*.jmx" />
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
## 2. 创建 JMeter 测试脚本
:::details
```xml
<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.6.3">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="测试计划">
      <elementProp name="TestPlan.user_defined_variables" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="用户定义的变量">
        <collectionProp name="Arguments.arguments"/>
      </elementProp>
    </TestPlan>
    <hashTree>
      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="线程组">
        <intProp name="ThreadGroup.num_threads">1</intProp>
        <intProp name="ThreadGroup.ramp_time">1</intProp>
        <boolProp name="ThreadGroup.same_user_on_next_iteration">true</boolProp>
        <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
        <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControlPanel" testclass="LoopController" testname="循环控制器">
          <stringProp name="LoopController.loops">1</stringProp>
          <boolProp name="LoopController.continue_forever">false</boolProp>
        </elementProp>
      </ThreadGroup>
      <hashTree>
        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="HTTP请求">
          <stringProp name="HTTPSampler.domain">localhost</stringProp>
          <stringProp name="HTTPSampler.port">3000</stringProp>
          <stringProp name="HTTPSampler.protocol">http</stringProp>
          <stringProp name="HTTPSampler.path">/login/qr/key</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <stringProp name="HTTPSampler.method">GET</stringProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.postBodyRaw">false</boolProp>
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="用户定义的变量">
            <collectionProp name="Arguments.arguments"/>
          </elementProp>
        </HTTPSamplerProxy>
        <hashTree>
          <ResultCollector guiclass="ViewResultsFullVisualizer" testclass="ResultCollector" testname="查看结果树">
            <boolProp name="ResultCollector.error_logging">false</boolProp>
            <objProp>
              <name>saveConfig</name>
              <value class="SampleSaveConfiguration">
                <time>true</time>
                <latency>true</latency>
                <timestamp>true</timestamp>
                <success>true</success>
                <label>true</label>
                <code>true</code>
                <message>true</message>
                <threadName>true</threadName>
                <dataType>true</dataType>
                <encoding>false</encoding>
                <assertions>true</assertions>
                <subresults>true</subresults>
                <responseData>false</responseData>
                <samplerData>false</samplerData>
                <xml>true</xml>
                <fieldNames>true</fieldNames>
                <responseHeaders>false</responseHeaders>
                <requestHeaders>false</requestHeaders>
                <responseDataOnError>false</responseDataOnError>
                <saveAssertionResultsFailureMessage>true</saveAssertionResultsFailureMessage>
                <assertionsResultsToSave>0</assertionsResultsToSave>
                <bytes>true</bytes>
                <sentBytes>true</sentBytes>
                <url>true</url>
                <threadCounts>true</threadCounts>
                <idleTime>true</idleTime>
                <connectTime>true</connectTime>
              </value>
            </objProp>
            <stringProp name="filename"></stringProp>
          </ResultCollector>
          <hashTree/>
          <JSONPostProcessor guiclass="JSONPostProcessorGui" testclass="JSONPostProcessor" testname="JSON提取器">
            <stringProp name="JSONPostProcessor.referenceNames">unikey</stringProp>
            <stringProp name="JSONPostProcessor.jsonPathExprs">$.data.unikey</stringProp>
            <stringProp name="JSONPostProcessor.match_numbers">1</stringProp>
            <stringProp name="TestPlan.comments">提取unikey</stringProp>
            <stringProp name="Sample.scope">all</stringProp>
          </JSONPostProcessor>
          <hashTree/>
        </hashTree>
        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="HTTP请求">
          <stringProp name="HTTPSampler.domain">localhost</stringProp>
          <stringProp name="HTTPSampler.port">3000</stringProp>
          <stringProp name="HTTPSampler.protocol">http</stringProp>
          <stringProp name="HTTPSampler.path">/login/qr/create</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <stringProp name="HTTPSampler.method">GET</stringProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.postBodyRaw">false</boolProp>
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="用户定义的变量">
            <collectionProp name="Arguments.arguments">
              <elementProp name="key" elementType="HTTPArgument">
                <boolProp name="HTTPArgument.always_encode">false</boolProp>
                <stringProp name="Argument.value">${unikey}</stringProp>
                <stringProp name="Argument.metadata">=</stringProp>
                <boolProp name="HTTPArgument.use_equals">true</boolProp>
                <stringProp name="Argument.name">key</stringProp>
              </elementProp>
            </collectionProp>
          </elementProp>
        </HTTPSamplerProxy>
        <hashTree>
          <ResultCollector guiclass="ViewResultsFullVisualizer" testclass="ResultCollector" testname="查看结果树">
            <boolProp name="ResultCollector.error_logging">false</boolProp>
            <objProp>
              <name>saveConfig</name>
              <value class="SampleSaveConfiguration">
                <time>true</time>
                <latency>true</latency>
                <timestamp>true</timestamp>
                <success>true</success>
                <label>true</label>
                <code>true</code>
                <message>true</message>
                <threadName>true</threadName>
                <dataType>true</dataType>
                <encoding>false</encoding>
                <assertions>true</assertions>
                <subresults>true</subresults>
                <responseData>false</responseData>
                <samplerData>false</samplerData>
                <xml>true</xml>
                <fieldNames>true</fieldNames>
                <responseHeaders>false</responseHeaders>
                <requestHeaders>false</requestHeaders>
                <responseDataOnError>false</responseDataOnError>
                <saveAssertionResultsFailureMessage>true</saveAssertionResultsFailureMessage>
                <assertionsResultsToSave>0</assertionsResultsToSave>
                <bytes>true</bytes>
                <sentBytes>true</sentBytes>
                <url>true</url>
                <threadCounts>true</threadCounts>
                <idleTime>true</idleTime>
                <connectTime>true</connectTime>
              </value>
            </objProp>
            <stringProp name="filename"></stringProp>
          </ResultCollector>
          <hashTree/>
        </hashTree>
        <ResultCollector guiclass="ViewResultsFullVisualizer" testclass="ResultCollector" testname="查看结果树">
          <boolProp name="ResultCollector.error_logging">false</boolProp>
          <objProp>
            <name>saveConfig</name>
            <value class="SampleSaveConfiguration">
              <time>true</time>
              <latency>true</latency>
              <timestamp>true</timestamp>
              <success>true</success>
              <label>true</label>
              <code>true</code>
              <message>true</message>
              <threadName>true</threadName>
              <dataType>true</dataType>
              <encoding>false</encoding>
              <assertions>true</assertions>
              <subresults>true</subresults>
              <responseData>false</responseData>
              <samplerData>false</samplerData>
              <xml>true</xml>
              <fieldNames>true</fieldNames>
              <responseHeaders>false</responseHeaders>
              <requestHeaders>false</requestHeaders>
              <responseDataOnError>false</responseDataOnError>
              <saveAssertionResultsFailureMessage>true</saveAssertionResultsFailureMessage>
              <assertionsResultsToSave>0</assertionsResultsToSave>
              <bytes>true</bytes>
              <sentBytes>true</sentBytes>
              <url>true</url>
              <threadCounts>true</threadCounts>
              <idleTime>true</idleTime>
              <connectTime>true</connectTime>
            </value>
          </objProp>
          <stringProp name="filename"></stringProp>
        </ResultCollector>
        <hashTree/>
      </hashTree>
    </hashTree>
  </hashTree>
</jmeterTestPlan>
```
:::


## 3. 生成报告
#### 1. 基于 XML 和 XSL 转换的 HTML 报告
```bash
# jmeter.properties
jmeter.save.saveservice.output_format=xml
# build.xml
style="${jmeter.home}/extras/jmeter-results-shanhe-me.xsl">
```
```bash
# 输出内容
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

# 用于从现有结果文件生成报告
jmeter -g HTTP.jtl -o report/dashboard/
# 运行新的测试并生成报告(每次执行前需要删除 dashboard 文件夹和 HTTP.jtl 文件)
jmeter -n -t HTTP.jmx -l HTTP.jtl -e -o report/dashboard/
jmeter -n -t HTTP.jmx -l report/jtl/HTTP.jtl -e -o report/dashboard/
```
```bash
# 输出内容
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
#### 4.增加 nginx 部分，可以通过网络接口来查看报告
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
    
    # HTTP01
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
    # HTTP02
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
:::info BeanShell 与 JSR223
- 线程 1 
  - login
    - 添加 JSON 提取器
      - 变量名称：`cookie`
      - JSON PATH expression : `$.cookie`
    - 添加 BeanShell 后置处理程序（将提取到的cookie设置为全局变量）
      ```bash
      ${__setProperty(cookie, ${cookie},)}
      ```
    - 或者添加 JSR223 后置处理程序（将提取到的cookie设置为全局变量）
      ```bash
        // 获取提取的 Cookie 值
        String cookie = vars.get("cookie");
        // 将 Cookie 值存储到 JMeter 属性中
        props.put("cookie", cookie);
      ```

- 线程 2 
  - status 
    - HTTP信息头管理器
      - Content-Type:`application/json`
      - cookie:`${__P(cookie,)}`
:::

## 5. 缓存登录态
:::info 登录接口
- 登录接口下添加 `JSON提取器`
  - 变量名称：`cookie`
  - Json Path Expressions: `$.cookie `
- 登录接口下添加 `JSR223 后置处理程序`
  ```bash
  // 获取提取的 Cookie 值
  String cookie = vars.get("cookie");
  // 将 Cookie 值存储到 JMeter 属性中
  props.put("cookie", cookie);

  // 获取当前时间戳
  long currentTime = System.currentTimeMillis();

  // 将当前时间戳存储为全局属性，表示登录时间
  props.put("loginTime", String.valueOf(currentTime));

  // 将cookie也存储为全局属性
  props.put("cookie", vars.get("cookie"));

  // 假设已经通过登录接口成功获取了cookie
  String newCookie = vars.get("cookie");

  // 获取当前时间戳
  long newLoginTime = System.currentTimeMillis();

  // 更新全局属性，存储新的cookie和登录时间
  props.put("cookie", newCookie);
  props.put("loginTime", String.valueOf(newLoginTime));
  ```
- 登录接口下添加 `JSR223 预处理程序`
  ```bash
  // 获取当前时间戳
  long currentTime = System.currentTimeMillis();

  // 从全局属性中获取之前的登录时间
  String loginTimeStr = props.get("loginTime");

  // 从全局属性中获取cookie
  String cookie = props.get("cookie");

  // 设定cookie有效时长（例如1分钟 = 60000毫秒）
  long sessionTimeout = 60000; 

  // 判断是否需要重新登录
  if (cookie == null || cookie.isEmpty() || loginTimeStr == null || (currentTime - Long.parseLong(loginTimeStr)) > sessionTimeout) {
      // 登录态过期，设置标志位，表示需要重新登录
      vars.put("needLogin", "true");
  } else {
      // 登录态有效，无需重新登录
      vars.put("needLogin", "false");
  }
  ```
- If Controller 控制登录请求的执行
  ```bash
  ${needLogin} == true
  ```
:::


## 6. 压力测试
:::tip 压力测试(Stress Testing)
- Thread Group1:
  - Number of Threads (users): 1
  - Ramp-Up Period (in seconds): 
  - Loop Count: 1
  - HTTP Request(login):
    - JSON 提取器
    - BeanShell 后置处理程序 `${__setProperty(cookie, ${cookie},)}`
- Thread Group2:
  - Number of Threads (users): 4000
  - Ramp-Up Period (in seconds): 300
  - Loop Count: 1
  - HTTP Request(status):
    - Content-Type:application/json
    - cookie:`${__P(cookie,)}`


**线程 2 设置线程数为: 4000,ramp-up：300,循环次数：1**

**Statistics**
| Label    | #Samples | FAIL | Error % | Average | Min | Max  | Median | 90th pct | 95th pct | 99th pct | Transactions/s | Received | Sent   |
| -------- | -------- | ---- | ------- | ------- | --- | ---- | ------ | -------- | -------- | -------- | -------------- | -------- | ------ |
| Total    | 12001    | 0    | 0.00%   | 12.13   | 4   | 1116 | 9.00   | 17.00    | 19.00    | 29.00    | 49.76          | 36.50    | 179.30 |
| login    | 1        | 0    | 0.00%   | 629.00  | 629 | 629  | 629.00 | 629.00   | 629.00   | 629.00   | 1.59           | 16.16    | 0.36   |
| account  | 4000     | 0    | 0.00%   | 9.09    | 5   | 315  | 8.00   | 10.00    | 12.00    | 21.00    | 16.68          | 12.98    | 60.10  |
| status   | 4000     | 0    | 0.00%   | 17.76   | 10  | 1116 | 16.00  | 20.00    | 23.00    | 34.00    | 16.67          | 13.12    | 60.07  |
| subcount | 4000     | 0    | 0.00%   | 9.37    | 4   | 385  | 8.00   | 11.00    | 12.00    | 21.00    | 16.69          | 10.56    | 60.15  |

**重点关注**
- Error %：确保错误率为0，表示系统在高负载下能够正常处理请求。
- Average、Median 和 90th pct：这些响应时间指标可以帮助您了解系统在大多数情况下的性能。
- Max 和 99th pct：这些指标可以揭示极端情况下的性能瓶颈。
- Transactions/s：衡量系统的吞吐量，确保系统在高并发下能够处理足够多的请求
:::


## 7. 性能测试
::: tip 性能测试(Performance Testing)
- Thread Group1:
  - Number of Threads (users): 1
  - Ramp-Up Period (in seconds): 
  - Loop Count: 1
  - HTTP Request(login):
    - JSON 提取器
    - BeanShell 后置处理程序 `${__setProperty(cookie, ${cookie},)}`
- Thread Group2:
  - Number of Threads (users): 2000
  - Ramp-Up Period (in seconds): 100
  - Loop Count: 1
  - HTTP Request(status):
    - Content-Type:application/json
    - cookie:`${__P(cookie,)}`

- **线程 2 设置线程数为: 4000, ramp-up: 300, 循环次数: 永远**
- **same user on each iteration  勾选 调度器-持续时间：600秒**

**Statistics**
| Label    | #Samples | FAIL   | Error % | Average | Min | Max    | Median | 90th pct | 95th pct | 99th pct | Transactions/s | Received | Sent    |
| -------- | -------- | ------ | ------- | ------- | --- | ------ | ------ | -------- | -------- | -------- | -------------- | -------- | ------- |
| Total    | 643898   | 495652 | 76.98%  | 936.18  | 0   | 173852 | 0.00   | 1.00     | 14.00    | 5042.00  | 1941.90        | 2927.54  | 2139.24 |
| login    | 1        | 0      | 0.00%   | 562.00  | 562 | 562    | 562.00 | 562.00   | 562.00   | 562.00   | 1.78           | 18.09    | 0.41    |
| account  | 214516   | 165300 | 77.06%  | 1028.11 | 0   | 173609 | 0.00   | 1.00     | 142.15   | 5078.00  | 649.50         | 986.06   | 714.55  |
| status   | 215984   | 165898 | 76.81%  | 1080.45 | 0   | 173852 | 0.00   | 1.00     | 253.95   | 5074.00  | 653.65         | 989.33   | 729.70  |
| subcount | 213397   | 164454 | 77.06%  | 697.75  | 0   | 173612 | 0.00   | 1.00     | 41.00    | 5070.00  | 646.38         | 963.61   | 703.39  |

**Errors**
| Type of error                                                                                     | Number of errors | % in errors | % in all samples |
| ------------------------------------------------------------------------------------------------- | ---------------- | ----------- | ---------------- |
| ToNon HTTP response code: java.net.SocketException/Non HTTP response message: Too many open files | 440926           | 88.96%      | 68.48%           |
| 502/Bad Gateway                                                                                   | 48582            | 9.80%       | 7.54%            |
| Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed         | 6144             | 1.24%       | 0.95%            |

**Top 5 Errors by sampler**
| Sample   | #Samples | #Errors | Error                                                                                           | #Errors | Error           | #Errors | Error                                                                                     | #Errors | Error | #Errors | Error | #Errors |
| -------- | -------- | ------- | ----------------------------------------------------------------------------------------------- | ------- | --------------- | ------- | ----------------------------------------------------------------------------------------- | ------- | ----- | ------- | ----- | ------- |
| Total    | 643898   | 495652  | Non HTTP response code: java.net.SocketException/Non HTTP response message: Too many open files | 440926  | 502/Bad Gateway | 48582   | Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed | 6144    |       |         |       |         |
| account  | 214516   | 165300  | Non HTTP response code: java.net.SocketException/Non HTTP response message: Too many open files | 146975  | 502/Bad Gateway | 16276   | Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed | 2049    |       |         |       |         |
| status   | 215984   | 165898  | Non HTTP response code: java.net.SocketException/Non HTTP response message: Too many open files | 147017  | 502/Bad Gateway | 16825   | Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed | 2056    |       |         |       |         |
| subcount | 213397   | 164454  | Non HTTP response code: java.net.SocketException/Non HTTP response message: Too many open files | 146934  | 502/Bad Gateway | 15481   | Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed | 2039    |       |         |       |         |

**Tip**
1. Non HTTP response code: java.net.SocketException/Non HTTP response message: Too many open files
   - 因为我的 macOS 系统的文件描述符限制是 ulimit -n ：24576 ，需要增加文件描述符限制
2. Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed  
   - 我猜测也是文件描述符的问题 -> 不足以处理并发连接数，可能会导致连接失败
3. 502/Bad Gateway
   - 目标服务器可能无法处理由 JMeter 产生的大量并发请求，从而导致 502 错误

**重点关注**
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


## 8. 参数
::: warning 关键字段解释 
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