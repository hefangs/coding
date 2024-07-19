# Jmeter
## 创建 Ant 构建脚本
```xml{6-8,11-14,18-19,64}
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
        <delete dir="${jmeter.result.jtl.dir}" />
        <mkdir dir="${jmeter.result.jtl.dir}" />
        <delete dir="${jmeter.result.html.dir}" />
        <mkdir dir="${jmeter.result.html.dir}" />
    </target>

    <target name="run" depends="clean-reports,test,report">
        <echo>${jmeter.result.html.dir}</echo>
        <echo>${jmeter.result.jtl.dir}</echo>
    </target>

    <!-- 生成的报告的前缀-->
    <property name="ReportName" value="TestReport" />
    <property name="jmeter.result.jtlName" value="${jmeter.result.jtl.dir}/${ReportName}${time}.jtl" />
    <property name="jmeter.result.htmlName" value="${jmeter.result.html.dir}/${ReportName}${time}.html" />
    
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
        <tstamp>
            <format property="report.datestamp" pattern="yyyy-MM-dd HH:mm" />
        </tstamp>
        <xslt
            classpathref="xslt.classpath"
            force="true"
            in="${jmeter.result.jtlName}"
            out="${jmeter.result.htmlName}"
            style="${jmeter.home}/extras/jmeter-results-detail-report_21.xsl">
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
## 创建 JMeter 测试脚本
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
## 生成报告
```bash
使用 Ant 生成 XML 报告并通过 XSLT 转换成 HTML
# jmeter.properties
jmeter.save.saveservice.output_format=xml
# build.xml
style="${jmeter.home}/extras/jmeter-results-shanhe-me.xsl">
# 执行命令
ant 或者  ant run
```
```bash
# 使用 JMeter Dashboard 生成报告
# jmeter.properties
jmeter.save.saveservice.output_format=csv
# Dashboard Report
# 每次执行前需要删除dashboard文件夹和HTTP.jtl文件
jmeter -n -t HTTP.jmx -l HTTP.jtl -e -o report/dashboard/
```
```bash
brew install nginx
```
```nginx
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
    
    # HTTP
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

    include servers/*;
}

```


```bash
brew services start nginx
```

```bash
# Nginx 搭建 Web 服务器 ——> 包括本地和网络接口
http://localhost:8080
http://192.168.0.101:8080
```
