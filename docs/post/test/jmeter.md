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
    <property name="jmeter.home" value="/usr/local/Cellar/jmeter/5.6.3/libexec" />
    <property name="jmeter.result.jtl.dir" value="/Users/he/Documents/local/netApiJmeter/report/jtl" />
    <property name="jmeter.result.html.dir" value="/Users/he/Documents/local/netApiJmeter/report/html" />
    
    <target name="clean-reports">
        <!-- 删除整文件  -->
        <!-- <delete dir="${jmeter.result.jtl.dir}" />
        <mkdir dir="${jmeter.result.jtl.dir}" />
        <delete dir="${jmeter.result.html.dir}" />
        <mkdir dir="${jmeter.result.html.dir}" /> -->
        <!-- 删除特定的 .jtl 文件 -->
        <!-- <delete file="${jmeter.result.html.dir}/TestReport_*.html" /> -->
        <!-- 删除特定的 .html 文件 -->
        <!-- <delete file="${jmeter.result.jtl.dir}/TestReport_*.jtl" /> -->
    </target>

    <target name="run" depends="clean-reports,test,report">
        <echo>${jmeter.result.html.dir}</echo>
        <echo>${jmeter.result.jtl.dir}</echo>
    </target>

    <!-- 生成的报告的前缀-->
    <property name="ReportName" value="TestReport" />
    <property name="jmeter.result.jtlName" value="${jmeter.result.jtl.dir}/${ReportName}_${time}.jtl" />
    <property name="jmeter.result.htmlName" value="${jmeter.result.html.dir}/${ReportName}_${time}.html" />
    <!-- <property name="jmeter.result.htmlName" value="${jmeter.result.html.dir}/${ReportName}_latest.html" />
    <property name="jmeter.result.jtlName" value="${jmeter.result.jtl.dir}/${ReportName}_latest.jtl" /> -->
    
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
            <!-- jmeter-results-shanhe-me.xsl 这里的文件名可以换成你想要的报告效果 -->
            <!-- jmeter-results-detail-report_21.xsl 这里的文件名可以换成你想要的报告效果 -->
            <!-- 显示dateReport的时间 -->
            <param name="dateReport" expression="${report.datestamp}"/>
        </xslt>
        <!-- 手动拷贝生成报告时所需的图片 -->
        <copy todir="${jmeter.result.html.dir}">
            <fileset dir="${jmeter.home}/extras">
                <include name="collapse.png" />
                <include name="expand.png" />
                <include name="favicon.ico" />
            </fileset>
        </copy>
    </target>
</project>
```
:::

## 2.jmeter.properties
:::details
```bash
#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to you under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

################################################################################
# Apache JMeter Property file
################################################################################

################################################################################
#
#                      THIS FILE SHOULD NOT BE MODIFIED
#
# This avoids having to re-apply the modifications when upgrading JMeter
# Instead only user.properties should be modified:
# 1/ copy the property you want to modify to user.properties from jmeter.properties
# 2/ Change its value there
#
################################################################################

# JMeter properties are described in the file
# http://jmeter.apache.org/usermanual/properties_reference.html
# A local copy can be found in
# printable_docs/usermanual/properties_reference.html

#Preferred GUI language. Comment out to use the JVM default locale's language.
#language=en


# Additional locale(s) to add to the displayed list.
# The current default list is: en, fr, de, no, es, tr, ja, zh_CN, zh_TW, pl, pt_BR
# [see JMeterMenuBar#makeLanguageMenu()]
# The entries are a comma-separated list of language names
#locales.add=zu


#---------------------------------------------------------------------------
# XML Parser
#---------------------------------------------------------------------------

# Path to a Properties file containing Namespace mapping in the form
# prefix=Namespace
# Example:
# ns=http://biz.aol.com/schema/2006-12-18
#xpath.namespace.config=


# XPath2 query cache for storing compiled XPath queries
#xpath2query.parser.cache.size=400

#---------------------------------------------------------------------------
# SSL configuration
#---------------------------------------------------------------------------

## SSL System properties are now in system.properties

# JMeter no longer converts javax.xxx property entries in this file into System properties.
# These must now be defined in the system.properties file or on the command-line.
# The system.properties file gives more flexibility.

# By default, SSL session contexts are now created per-thread, rather than being shared.
# The original behaviour can be enabled by setting the JMeter property to true
#https.sessioncontext.shared=false

# Be aware that https default protocol may vary depending on the version of JVM
# See https://blogs.oracle.com/java-platform-group/entry/diagnosing_tls_ssl_and_https
# See https://bz.apache.org/bugzilla/show_bug.cgi?id=58236
# Default HTTPS protocol level:
#https.default.protocol=TLS
# This may need to be changed here (or in user.properties) to:
#https.default.protocol=SSLv3

# List of protocols to enable. You may have to select only a subset if you find issues with target server.
# This is needed when server does not support Socket version negotiation, this can lead to:
# javax.net.ssl.SSLPeerUnverifiedException: peer not authenticated
# java.net.SocketException: Connection reset
# see https://bz.apache.org/bugzilla/show_bug.cgi?id=54759
#https.socket.protocols=SSLv2Hello SSLv3 TLSv1

# Control if we allow reuse of cached SSL context between iterations
# set the value to 'false' to reset the SSL context each iteration
# Deprecated since 5.0
#https.use.cached.ssl.context=true

#
# Reset HTTP State when starting a new Thread Group iteration which means:
# true means next iteration is associated to a new user
# false means next iteration is associated to same user
# true involves:
# - Closing opened connection
# - resetting SSL State
#httpclient.reset_state_on_thread_group_iteration=true

# Start and end index to be used with keystores with many entries
# The default is to use entry 0, i.e. the first
#https.keyStoreStartIndex=0
#https.keyStoreEndIndex=0

#---------------------------------------------------------------------------
# Look and Feel configuration
#---------------------------------------------------------------------------

#Classname of the Swing default UI
#
# The LAF classnames that are available are now displayed as ToolTip text
# when hovering over the Options/Look and Feel selection list.
#
# You can either use a full class name, as shown below,
# or one of the strings "System" or "CrossPlatform" which means
#  JMeter will use the corresponding string returned by UIManager.get<name>LookAndFeelClassName()

# LAF can be overridden by os.name (lowercased, spaces replaced by '_')
# Sample os.name LAF:
#jmeter.laf.windows_xp=javax.swing.plaf.metal.MetalLookAndFeel

# Failing that, the OS family = os.name, but only up to first space:
# Sample OS family LAF:
#jmeter.laf.windows=com.sun.java.swing.plaf.windows.WindowsLookAndFeel

# Custom settings for Mac using System LAF if you don't want to use Darcula
#jmeter.laf.mac=System

# Failing that, the JMeter default LAF can be defined:
#jmeter.laf=System

# If none of the above jmeter.laf properties are defined, JMeter uses the CrossPlatform LAF.
# This is because the CrossPlatform LAF generally looks better than the System LAF.
# See https://bz.apache.org/bugzilla/show_bug.cgi?id=52026 for details
# N.B. the LAF can be defined in user.properties.

# Enable custom window chrome for Darklaf Look and Feels.
# defaults to false
# darklaf.decorations=false

# Enables the unified menubar for Darklaf Look and Feels.
# defaults to true
# darklaf.unifiedMenuBar=true

# LoggerPanel display
# default to false
#jmeter.loggerpanel.display=false

# Enable LogViewer Panel to receive log event even if closed
# Enabled since 2.12
# Note this has some impact on performances, but as GUI mode must
# not be used for Load Test it is acceptable
#jmeter.loggerpanel.enable_when_closed=true

# Max lines kept in LoggerPanel, default to 1000 chars
# 0 means no limit
#jmeter.loggerpanel.maxlength=1000

# Interval period in ms to process the queue of events of the listeners
#jmeter.gui.refresh_period=500

# HiDPI mode (default: false)
# Activate a 'pseudo'-HiDPI mode. Allows to increase size of some UI elements
# which are not correctly managed by JVM with high resolution screens in Linux or Windows
#jmeter.hidpi.mode=false
# To enable pseudo-HiDPI mode change to true
#jmeter.hidpi.mode=true
# HiDPI scale factor
#jmeter.hidpi.scale.factor=1.0
# Suggested value for HiDPI
#jmeter.hidpi.scale.factor=2.0

# Toolbar display
# Toolbar icon definitions
#jmeter.toolbar.icons=org/apache/jmeter/images/toolbar/icons-toolbar.properties
# Toolbar list
#jmeter.toolbar=new,open,close,save,save_as_testplan,|,cut,copy,paste,|,expand,collapse,toggle,|,test_start,test_stop,test_shutdown,|,test_start_remote_all,test_stop_remote_all,test_shutdown_remote_all,|,test_clear,test_clear_all,|,search,search_reset,|,function_helper,help
# Toolbar icons default size: 22x22. Available sizes are: 22x22, 32x32, 48x48
#jmeter.toolbar.icons.size=22x22
# Suggested value for HiDPI
#jmeter.toolbar.icons.size=48x48

# Icon definitions
# default:
#jmeter.icons=org/apache/jmeter/images/icon.properties
# alternate:
#jmeter.icons=org/apache/jmeter/images/icon_1.properties
# Historical icon set (deprecated)
#jmeter.icons=org/apache/jmeter/images/icon_old.properties

# Tree icons default size: 19x19. Available sizes are: 19x19, 24x24, 32x32, 48x48
# Useful for HiDPI display (see below)
#jmeter.tree.icons.size=19x19
# Suggested value for HiDPI screen like 3200x1800:
#jmeter.tree.icons.size=32x32

#Components to not display in JMeter GUI (GUI class name or static label)
# These elements are deprecated and will be removed in next version:
# MongoDB Script, MongoDB Source Config, Monitor Results
# BSF Elements
not_in_menu=org.apache.jmeter.protocol.mongodb.sampler.MongoScriptSampler,org.apache.jmeter.protocol.mongodb.config.MongoSourceElement,\
    org.apache.jmeter.timers.BSFTimer,org.apache.jmeter.modifiers.BSFPreProcessor,org.apache.jmeter.extractor.BSFPostProcessor,org.apache.jmeter.assertions.BSFAssertion,\
    org.apache.jmeter.visualizers.BSFListener,org.apache.jmeter.protocol.java.sampler.BSFSampler,\
    org.apache.jmeter.protocol.http.control.gui.SoapSamplerGui

# Number of items in undo history
# Feature is disabled by default (0) due to known and not fixed bugs:
# https://bz.apache.org/bugzilla/show_bug.cgi?id=57043
# https://bz.apache.org/bugzilla/show_bug.cgi?id=57039
# https://bz.apache.org/bugzilla/show_bug.cgi?id=57040
# Set it to a number > 0 (25 can be a good default)
# The bigger it is, the more it consumes memory
#undo.history.size=0

# Hotkeys to add JMeter components, will add elements when you press Ctrl+0 .. Ctrl+9 (Command+0 .. Command+9 on Mac)
gui.quick_0=ThreadGroupGui
gui.quick_1=HttpTestSampleGui
gui.quick_2=RegexExtractorGui
gui.quick_3=AssertionGui
gui.quick_4=ConstantTimerGui
gui.quick_5=TestActionGui
gui.quick_6=JSR223PostProcessor
gui.quick_7=JSR223PreProcessor
gui.quick_8=DebugSampler
gui.quick_9=ViewResultsFullVisualizer


#---------------------------------------------------------------------------
# JMX Backup configuration
#---------------------------------------------------------------------------
#Enable auto backups of the .jmx file when a test plan is saved.
#When enabled, before the .jmx is saved, it will be backed up to the directory pointed
#by the jmeter.gui.action.save.backup_directory property (see below). Backup file names are built
#after the .jmx file being saved. For example, saving test-plan.jmx will create a test-plan-000012.jmx
#in the backup directory provided that the last created backup file is test-plan-000011.jmx.
#Default value is true indicating that auto backups are enabled
#jmeter.gui.action.save.backup_on_save=true

#Set the backup directory path where JMX backups will be created upon save in the GUI.
#If not set (what it defaults to) then backup files will be created in
#a sub-directory of the JMeter base installation. The default directory is ${JMETER_HOME}/backups
#If set and the directory does not exist, it will be created.
#jmeter.gui.action.save.backup_directory=

#Set the maximum time (in hours) that backup files should be preserved since the save time.
#By default no expiration time is set which means we keep backups for ever.
#jmeter.gui.action.save.keep_backup_max_hours=0

#Set the maximum number of backup files that should be preserved. By default 10 backups will be preserved.
#Setting this to zero will cause the backups to not being deleted (unless keep_backup_max_hours is set to a non zero value)
#jmeter.gui.action.save.keep_backup_max_count=10

#Enable auto saving of the .jmx file before start run a test plan
#When enabled, before the run, the .jmx will be saved and also backed up to the directory pointed
#save_automatically_before_run=true

#---------------------------------------------------------------------------
# Remote hosts and RMI configuration
#---------------------------------------------------------------------------

# Remote Hosts - comma delimited
remote_hosts=127.0.0.1
#remote_hosts=localhost:1099,localhost:2010

# RMI port to be used by the server (must start rmiregistry with same port)
#server_port=1099

# To change the port to (say) 1234:
# On the server(s)
# - set server_port=1234
# - start rmiregistry with port 1234
# On Windows this can be done by:
# SET SERVER_PORT=1234
# JMETER-SERVER
#
# On Unix:
# SERVER_PORT=1234 jmeter-server
#
# On the client:
# - set remote_hosts=server:1234

# Parameter that controls the base for RMI ports used by RemoteSampleListenerImpl and RemoteThreadsListenerImpl (The Controller)
# Default value is 0 which means ports are randomly assigned
# If you specify a base port, JMeter will (at the moment) use the ports that start one after the given base.
# You may need to open Firewall port on the Controller machine
#client.rmi.localport=0

# When distributed test is starting, there may be several attempts to initialize
# remote engines. By default, only single try is made. Increase following property
# to make it retry for additional times
#client.tries=1

# If there is initialization retries, following property sets delay between attempts
#client.retries_delay=5000

# When all initialization tries was made, test will fail if some remote engines are failed
# Set following property to true to ignore failed nodes and proceed with test
#client.continue_on_fail=false

# To change the default port (1099) used to access the server:
#server.rmi.port=1234

# To use a specific port for the JMeter server engine, define
# the following property before starting the server:
#server.rmi.localport=4000

# The JMeter server creates by default the RMI registry as part of the server process.
# To stop the server creating the RMI registry:
#server.rmi.create=false

# Define the following property to cause JMeter to exit after the first test
#server.exitaftertest=true

#
# Configuration of Secure RMI connection
#
# Type of keystore : JKS
#server.rmi.ssl.keystore.type=JKS
#
# Keystore file that contains private key
#server.rmi.ssl.keystore.file=rmi_keystore.jks
#
# Password of keystore
#server.rmi.ssl.keystore.password=changeit
#
# Key alias
#server.rmi.ssl.keystore.alias=rmi
#
# Type of truststore : JKS
#server.rmi.ssl.truststore.type=JKS
#
# Keystore file that contains certificate
#server.rmi.ssl.truststore.file=rmi_keystore.jks
#
# Password of truststore
#server.rmi.ssl.truststore.password=changeit
#
# Set this if you don't want to use SSL for RMI
#server.rmi.ssl.disable=false
#---------------------------------------------------------------------------
#         Include Controller
#---------------------------------------------------------------------------

# Prefix used by IncludeController when building file name
#includecontroller.prefix=

#---------------------------------------------------------------------------
# Shared HTTP configuration between HC4 and Java Implementations
#---------------------------------------------------------------------------

#
# Should JMeter add to POST request content-type header if missing:
# Content-Type: application/x-www-form-urlencoded
# Was true before version 5.0
#post_add_content_type_if_missing=false

#---------------------------------------------------------------------------
# HTTP Java configuration
#---------------------------------------------------------------------------

# Number of connection retries performed by HTTP Java sampler before giving up
# 0 means no retry since version 3.0
#http.java.sampler.retries=0

#---------------------------------------------------------------------------
# Following properties apply to Apache HttpClient
#---------------------------------------------------------------------------

# set the socket timeout (or use the parameter http.socket.timeout)
# for AJP Sampler implementation.
# Value is in milliseconds
#httpclient.timeout=0
# 0 == no timeout

# Set the http version (defaults to 1.1)
#httpclient.version=1.1 (or use the parameter http.protocol.version)

# Define characters per second > 0 to emulate slow connections
#httpclient.socket.http.cps=0
#httpclient.socket.https.cps=0

#Enable loopback protocol
#httpclient.loopback=true

# Define the local host address to be used for multi-homed hosts
#httpclient.localaddress=1.2.3.4

#---------------------------------------------------------------------------
# AuthManager Kerberos configuration
#---------------------------------------------------------------------------

# AuthManager Kerberos configuration
# Name of application module used in jaas.conf
#kerberos_jaas_application=JMeter

# Should ports be stripped from URLs before constructing SPNs
# for SPNEGO authentication
#kerberos.spnego.strip_port=true

# Should the host name for constructing SPN be canonicalized
# for SPNEGO authentication
#kerberos.spnego.use_canonical_host_name=true

# Should credentials be delegated to webservers when using
# SPNEGO authentication
#kerberos.spnego.delegate_cred=false

#---------------------------------------------------------------------------
# Apache HttpComponents HTTPClient configuration (HTTPClient4)
#---------------------------------------------------------------------------

# define a properties file for overriding Apache HttpClient parameters
# Uncomment this line if you put anything in hc.parameters file
#hc.parameters.file=hc.parameters

# If true, default HC4 User-Agent will not be added
#httpclient4.default_user_agent_disabled=false

# Preemptively send Authorization Header when BASIC auth is used
#httpclient4.auth.preemptive=true

# Number of retries to attempt (default 0)
#httpclient4.retrycount=0

# true if it's OK to retry requests that have been sent
# This will retry Idempotent and non Idempotent requests
# This should usually be false, but it can be useful
# when testing against some Load Balancers like Amazon ELB
#httpclient4.request_sent_retry_enabled=false

# Idle connection timeout (Milliseconds) to apply if the server does not send
# Keep-Alive headers (default 0)
# Set this > 0 to compensate for servers that don't send a Keep-Alive header
# If <= 0, idle timeout will only apply if the server sends a Keep-Alive header
#httpclient4.idletimeout=0

# Check connections if the elapsed time (Milliseconds) since the last
# use of the connection exceed this value
#httpclient4.validate_after_inactivity=4900

# TTL (in Milliseconds) represents an absolute value.
# No matter what, the connection will not be re-used beyond its TTL.
#httpclient4.time_to_live=60000

# Ignore EOFException that some edgy application may emit to signal end of GZIP stream
# Defaults to false
#httpclient4.gzip_relax_mode=false

# Ignore EOFException that some edgy application may emit to signal end of Deflated stream
# Defaults to false
#httpclient4.deflate_relax_mode=false

#---------------------------------------------------------------------------
# HTTP Cache Manager configuration
#---------------------------------------------------------------------------
#
# Space or comma separated list of methods that can be cached
#cacheable_methods=GET
# N.B. This property is currently a temporary solution for Bug 56162

# Since 2.12, JMeter does not create anymore a Sample Result with 204 response
# code for a resource found in cache which is inline with what browser do.
#cache_manager.cached_resource_mode=RETURN_NO_SAMPLE

# You can choose between 3 modes:
# RETURN_NO_SAMPLE (default)
# RETURN_200_CACHE
# RETURN_CUSTOM_STATUS

# Those mode have the following behaviours:
# RETURN_NO_SAMPLE:
# this mode returns no Sample Result, it has no additional configuration

# RETURN_200_CACHE:
# this mode will return Sample Result with response code to 200 and
# response message to "(ex cache)", you can modify response message by setting
# RETURN_200_CACHE.message=(ex cache)

# RETURN_CUSTOM_STATUS:
# This mode lets you select what response code and message you want to return,
# if you use this mode you need to set those properties
# RETURN_CUSTOM_STATUS.code=
# RETURN_CUSTOM_STATUS.message=

#---------------------------------------------------------------------------
# Results file configuration
#---------------------------------------------------------------------------

# This section helps determine how result data will be saved.
# The commented out values are the defaults.

# legitimate values: xml, csv, db.  Only xml and csv are currently supported.
jmeter.save.saveservice.output_format=csv

# The below properties are true when field should be saved; false otherwise
#
# assertion_results_failure_message only affects CSV output
#jmeter.save.saveservice.assertion_results_failure_message=true
#
# legitimate values: none, first, all
#jmeter.save.saveservice.assertion_results=none
#
jmeter.save.saveservice.data_type=true
jmeter.save.saveservice.label=true
jmeter.save.saveservice.response_code=true
# response_data is not currently supported for CSV output
jmeter.save.saveservice.response_data=true
# Save ResponseData for failed samples
jmeter.save.saveservice.response_data.on_error=true
jmeter.save.saveservice.response_message=true
jmeter.save.saveservice.successful=true
jmeter.save.saveservice.thread_name=true
jmeter.save.saveservice.time=true
jmeter.save.saveservice.subresults=true
jmeter.save.saveservice.assertions=true
jmeter.save.saveservice.latency=true
# Only available with HttpClient4
jmeter.save.saveservice.connect_time=true
jmeter.save.saveservice.samplerData=true
jmeter.save.saveservice.responseHeaders=true
jmeter.save.saveservice.requestHeaders=true
jmeter.save.saveservice.encoding=true
jmeter.save.saveservice.bytes=true
# Only available with HttpClient4
jmeter.save.saveservice.sent_bytes=true
jmeter.save.saveservice.url=true
jmeter.save.saveservice.filename=true
jmeter.save.saveservice.hostname=true
jmeter.save.saveservice.thread_counts=true
jmeter.save.saveservice.sample_count=true
jmeter.save.saveservice.idle_time=true

# Timestamp format - this only affects CSV output files
# legitimate values: none, ms, or a format suitable for SimpleDateFormat
#jmeter.save.saveservice.timestamp_format=ms
#jmeter.save.saveservice.timestamp_format=yyyy/MM/dd HH:mm:ss.SSS

# For use with Comma-separated value (CSV) files or other formats
# where the fields' values are separated by specified delimiters.
# Default:
#jmeter.save.saveservice.default_delimiter=,
# For TAB, one can use:
#jmeter.save.saveservice.default_delimiter=\t

# Only applies to CSV format files:
# Print field names as first line in CSV
#jmeter.save.saveservice.print_field_names=true

# Optional list of JMeter variable names whose values are to be saved in the result data files.
# Use commas to separate the names. For example:
#sample_variables=SESSION_ID,REFERENCE
# N.B. The current implementation saves the values in XML as attributes,
# so the names must be valid XML names.
# By default JMeter sends the variable to all servers
# to ensure that the correct data is available at the client.

# Optional XML processing instruction for line 2 of the file:
# Example:
#jmeter.save.saveservice.xml_pi=<?xml-stylesheet type="text/xsl" href="../extras/jmeter-results-detail-report.xsl"?>
# Default value:
#jmeter.save.saveservice.xml_pi=

# Prefix used to identify filenames that are relative to the current base
#jmeter.save.saveservice.base_prefix=~/

# AutoFlush on each line written in XML or CSV output
# Setting this to true will result in less test results data loss in case of Crash
# but with impact on performances, particularly for intensive tests (low or no pauses)
# Since JMeter 2.10, this is false by default
#jmeter.save.saveservice.autoflush=false

#---------------------------------------------------------------------------
# Settings that affect SampleResults
#---------------------------------------------------------------------------

# Save the start time stamp instead of the end
# This also affects the timestamp stored in result files
sampleresult.timestamp.start=true

# Whether to use System.nanoTime() - otherwise only use System.currentTimeMillis()
#sampleresult.useNanoTime=true

# Use a background thread to calculate the nanoTime offset
# Set this to <= 0 to disable the background thread
#sampleresult.nanoThreadSleep=5000

# Since version 5.0 JMeter has a new SubResult Naming Policy which numbers subresults by default
# This property if set to true discards renaming policy. This can be required if you're using JMeter for functional testing.
# Defaults to: false
#subresults.disable_renaming=false

#---------------------------------------------------------------------------
# Upgrade property
#---------------------------------------------------------------------------

# File that holds a record of name changes for backward compatibility issues
upgrade_properties=/bin/upgrade.properties

#---------------------------------------------------------------------------
# JMeter Test Script recorder configuration
#
# N.B. The element was originally called the Proxy recorder, which is why the
# properties have the prefix "proxy".
#---------------------------------------------------------------------------

# If the recorder detects a gap of at least 5s (default) between HTTP requests,
# it assumes that the user has clicked a new URL
#proxy.pause=5000

# Add numeric suffix to Sampler names (default true)
#proxy.number.requests=true

# Default format string for new samplers when 'Use format string' is selected as 'naming scheme'
#proxy.sampler_format=#{counter,number,000} - #{path} (#{name})

# List of URL patterns that will be added to URL Patterns to exclude
# Separate multiple lines with ;
#proxy.excludes.suggested=.*\\.(bmp|css|js|gif|ico|jpe?g|png|swf|woff|woff2)

# Change the default HTTP Sampler (currently HttpClient4)
# Java:
#jmeter.httpsampler=HTTPSampler
#or
#jmeter.httpsampler=Java
#
# HttpClient4.x
#jmeter.httpsampler=HttpClient4

# By default JMeter tries to be more lenient with RFC 2616 redirects and allows
# relative paths.
# If you want to test strict conformance, set this value to true
# When the property is true, JMeter follows http://tools.ietf.org/html/rfc3986#section-5.2
#jmeter.httpclient.strict_rfc2616=false

# Default content-type include filter to use
#proxy.content_type_include=text/html|text/plain|text/xml
# Default content-type exclude filter to use
#proxy.content_type_exclude=image/.*|text/css|application/.*

# Default headers to remove from Header Manager elements
# (Cookie and Authorization are always removed)
#proxy.headers.remove=If-Modified-Since,If-None-Match,Host

# Binary content-type handling
# These content-types will be handled by saving the request in a file:
#proxy.binary.types=application/x-amf,application/x-java-serialized-object,binary/octet-stream
# The files will be saved in this directory:
#proxy.binary.directory=user.dir
# The files will be created with this file filesuffix:
#proxy.binary.filesuffix=.binary

#---------------------------------------------------------------------------
# Test Script Recorder certificate configuration
#---------------------------------------------------------------------------

#proxy.cert.directory=<JMeter bin directory>
#proxy.cert.file=proxyserver.jks
#proxy.cert.type=JKS
#proxy.cert.keystorepass=password
#proxy.cert.keypassword=password
#proxy.cert.factory=SunX509
# define this property if you wish to use your own keystore
#proxy.cert.alias=<none>
# The default validity for certificates created by JMeter
#proxy.cert.validity=7
# Use dynamic key generation (if supported by JMeter/JVM)
# If false, will revert to using a single key with no certificate
#proxy.cert.dynamic_keys=true

#---------------------------------------------------------------------------
# Test Script Recorder miscellaneous configuration
#---------------------------------------------------------------------------

# Whether to attempt disabling of samples that resulted from redirects
# where the generated samples use auto-redirection
#proxy.redirect.disabling=true

# SSL configuration
#proxy.ssl.protocol=TLS

#---------------------------------------------------------------------------
# JMeter Proxy configuration
#---------------------------------------------------------------------------
# use command-line flags for user-name and password
#http.proxyDomain=NTLM domain, if required by HTTPClient sampler

#---------------------------------------------------------------------------
# HTTPSampleResponse Parser configuration
#---------------------------------------------------------------------------

# Space-separated list of parser groups
HTTPResponse.parsers=htmlParser wmlParser cssParser
# for each parser, there should be a parser.types and a parser.className property

# CSS Parser based on ph-css
cssParser.className=org.apache.jmeter.protocol.http.parser.CssParser
cssParser.types=text/css

# CSS parser LRU cache size
# This cache stores the URLs found in a CSS to avoid continuously parsing the CSS
# By default the cache size is 400
# It can be disabled by setting its value to 0
#css.parser.cache.size=400

# Let the CSS Parser ignore all CSS errors
#css.parser.ignore_all_css_errors=true

#---------------------------------------------------------------------------
# HTML Parser configuration
#---------------------------------------------------------------------------

# Define the HTML parser to be used.
# Default parser:
# This new parser (since 2.10) should perform better than all others
# see https://bz.apache.org/bugzilla/show_bug.cgi?id=55632
# Do not comment this property
htmlParser.className=org.apache.jmeter.protocol.http.parser.LagartoBasedHtmlParser

# Other parsers:
# Default parser before 2.10
#htmlParser.className=org.apache.jmeter.protocol.http.parser.JTidyHTMLParser
# Note that Regexp extractor may detect references that have been commented out.
# In many cases it will work OK, but you should be aware that it may generate
# additional references.
#htmlParser.className=org.apache.jmeter.protocol.http.parser.RegexpHTMLParser
# This parser is based on JSoup, it should be the most accurate but less
# performant than LagartoBasedHtmlParser
#htmlParser.className=org.apache.jmeter.protocol.http.parser.JsoupBasedHtmlParser

#Used by HTTPSamplerBase to associate htmlParser with content types below
htmlParser.types=text/html application/xhtml+xml application/xml text/xml

#---------------------------------------------------------------------------
# WML Parser configuration
#---------------------------------------------------------------------------

wmlParser.className=org.apache.jmeter.protocol.http.parser.RegexpHTMLParser

#Used by HTTPSamplerBase to associate wmlParser with content types below
wmlParser.types=text/vnd.wap.wml

#---------------------------------------------------------------------------
# Remote batching configuration
#---------------------------------------------------------------------------
# How is Sample sender implementations configured:
# - true (default) means client configuration will be used
# - false means server configuration will be used
#sample_sender_client_configured=true

# By default when Stripping modes are used JMeter since 3.1 will strip
# response even for SampleResults in error.
# If you want to revert to previous behaviour (no stripping of Responses in error)
# set this property to false
#sample_sender_strip_also_on_error=true

# Remote batching support
# Since JMeter 2.9, default is MODE_STRIPPED_BATCH, which returns samples in
# batch mode (every 100 samples or every minute by default)
# Note also that MODE_STRIPPED_BATCH strips response data from SampleResult, so if you need it change to
# another mode
# Batch returns samples in batches
# Statistical returns sample summary statistics
# mode can also be the class name of an implementation of org.apache.jmeter.samplers.SampleSender
#mode=Standard
#mode=Batch
#mode=Statistical
#Set to true to key statistical samples on threadName rather than threadGroup
#key_on_threadname=false
#mode=Stripped
#mode=StrippedBatch
#mode=org.example.load.MySampleSender
#
#num_sample_threshold=100
# Value is in milliseconds
#time_threshold=60000
#
# Asynchronous sender; uses a queue and background worker process to return the samples
#mode=Asynch
# default queue size
#asynch.batch.queue.size=100
# Same as Asynch but strips response data from SampleResult
#mode=StrippedAsynch
#
# DiskStore: Serialises the samples to disk, rather than saving in memory
#mode=DiskStore
# Same as DiskStore but strips response data from SampleResult
#mode=StrippedDiskStore
# Note: the mode is currently resolved on the client;
# other properties (e.g. time_threshold) are resolved on the server.

#---------------------------------------------------------------------------
# JDBC Request configuration
#---------------------------------------------------------------------------

# String used to indicate a null value
#jdbcsampler.nullmarker=]NULL[
#
# Max size of BLOBs and CLOBs to store in JDBC sampler. Result will be cut off
#jdbcsampler.max_retain_result_size=65536

# Database validation query
# based in https://stackoverflow.com/questions/10684244/dbcp-validationquery-for-different-databases list
jdbc.config.check.query=select 1 from INFORMATION_SCHEMA.SYSTEM_USERS|select 1 from dual|select 1 from sysibm.sysdummy1|select 1|select 1 from rdb$database
jdbc.config.jdbc.driver.class=com.mysql.jdbc.Driver|org.postgresql.Driver|oracle.jdbc.OracleDriver|com.ingres.jdbc.IngresDriver|com.microsoft.sqlserver.jdbc.SQLServerDriver|com.microsoft.jdbc.sqlserver.SQLServerDriver|org.apache.derby.jdbc.ClientDriver|org.hsqldb.jdbc.JDBCDriver|com.ibm.db2.jcc.DB2Driver|org.apache.derby.jdbc.ClientDriver|org.h2.Driver|org.firebirdsql.jdbc.FBDriver|org.mariadb.jdbc.Driver|org.sqlite.JDBC|net.sourceforge.jtds.jdbc.Driver|com.exasol.jdbc.EXADriver

#---------------------------------------------------------------------------
# OS Process Sampler configuration
#---------------------------------------------------------------------------
# Polling to see if process has finished its work, used when a timeout is configured on sampler
#os_sampler.poll_for_timeout=100

#---------------------------------------------------------------------------
# TCP Sampler configuration
#---------------------------------------------------------------------------

# The default handler class
#tcp.handler=TCPClientImpl
#
# eolByte = byte value for end of line
# set this to a value outside the range -128 to +127 to skip EOL checking
#tcp.eolByte=1000
#
# TCP Charset, used by org.apache.jmeter.protocol.tcp.sampler.TCPClientImpl
# default to Platform defaults charset as returned by Charset.defaultCharset().name()
#tcp.charset=
#
# status.prefix and suffix = strings that enclose the status response code
#tcp.status.prefix=Status=
#tcp.status.suffix=.
#
# status.properties = property file to convert codes to messages
#tcp.status.properties=mytestfiles/tcpstatus.properties

# The length prefix used by LengthPrefixedBinaryTCPClientImpl implementation
# defaults to 2 bytes.
#tcp.binarylength.prefix.length=2

#---------------------------------------------------------------------------
# Summariser - Generate Summary Results - configuration (mainly applies to non-GUI mode)
#---------------------------------------------------------------------------
#
# Comment the following property to disable the default non-GUI summariser
# [or change the value to rename it]
# (applies to non-GUI mode only)
summariser.name=summary
#
# interval between summaries (in seconds) default 30 seconds
#summariser.interval=30
#
# Write messages to log file
#summariser.log=true
#
# Write messages to System.out
#summariser.out=true

# Ignore SampleResults generated by TransactionControllers
# defaults to true
#summariser.ignore_transaction_controller_sample_result=true


#---------------------------------------------------------------------------
# Aggregate Report and Aggregate Graph - configuration
#---------------------------------------------------------------------------
#
# Percentiles to display in reports
# Can be float value between 0 and 100
# First percentile to display, defaults to 90%
#aggregate_rpt_pct1=90
# Second percentile to display, defaults to 95%
#aggregate_rpt_pct2=95
# Second percentile to display, defaults to 99%
#aggregate_rpt_pct3=99

#---------------------------------------------------------------------------
# BackendListener - configuration
#---------------------------------------------------------------------------
#
# Backend metrics window mode (fixed=fixed-size window, timed=time boxed)
#backend_metrics_window_mode=fixed
# Backend metrics sliding window size for Percentiles, Min, Max
#backend_metrics_window=100

# Backend metrics sliding window size for Percentiles, Min, Max
# when backend_metrics_window_mode is timed
# Setting this value too high can lead to OOM
#backend_metrics_large_window=5000

########################
# Graphite Backend
########################
# Send interval in second
# Defaults to 1 second
#backend_graphite.send_interval=1

########################
# Influx Backend
########################

# Send interval in second
# Defaults to 5 seconds
#backend_influxdb.send_interval=5
#Influxdb timeouts
#backend_influxdb.connection_timeout=1000
#backend_influxdb.socket_timeout=3000
#backend_influxdb.connection_request_timeout=100

#---------------------------------------------------------------------------
# BeanShell configuration
#---------------------------------------------------------------------------

# BeanShell Server properties
#
# Define the port number as non-zero to start the http server on that port
#beanshell.server.port=9000
# The telnet server will be started on the next port

#
# Define the server initialisation file
beanshell.server.file=../extras/startup.bsh

#
# Define a file to be processed at startup
# This is processed using its own interpreter.
#beanshell.init.file=

#
# Define the intialisation files for BeanShell Sampler, Function and other BeanShell elements
# N.B. Beanshell test elements do not share interpreters.
#      Each element in each thread has its own interpreter.
#      This is retained between samples.
#beanshell.sampler.init=BeanShellSampler.bshrc
#beanshell.function.init=BeanShellFunction.bshrc
#beanshell.assertion.init=BeanShellAssertion.bshrc
#beanshell.listener.init=etc
#beanshell.postprocessor.init=etc
#beanshell.preprocessor.init=etc
#beanshell.timer.init=etc

# The file BeanShellListeners.bshrc contains sample definitions
# of Test and Thread Listeners.

#---------------------------------------------------------------------------
# JSR-223 function
#---------------------------------------------------------------------------

# Path to JSR-223 file containing script to call on JMeter startup
# JMeter will try to guess the engine to use by the extension
# of the name of the file.
# This script can use pre-defined variables:
# log : Logger to log any message
# props : JMeter Property
# OUT : System.OUT
#jsr223.init.file=

#---------------------------------------------------------------------------
# Groovy function
#---------------------------------------------------------------------------

#Path to Groovy file containing utility functions to make available to __groovy function
#groovy.utilities=

# Example
#groovy.utilities=bin/utility.groovy

#---------------------------------------------------------------------------
# MailerModel configuration
#---------------------------------------------------------------------------

# Number of successful samples before a message is sent
#mailer.successlimit=2
#
# Number of failed samples before a message is sent
#mailer.failurelimit=2

#---------------------------------------------------------------------------
# CSVRead configuration
#---------------------------------------------------------------------------

# CSVRead delimiter setting (default ",")
# Make sure that there are no trailing spaces or tabs after the delimiter
# characters, or these will be included in the list of valid delimiters
#csvread.delimiter=,
#csvread.delimiter=;
#csvread.delimiter=!
#csvread.delimiter=~
# The following line has a tab after the =
#csvread.delimiter=

#---------------------------------------------------------------------------
# __time() function configuration
#
# The properties below can be used to redefine the default formats
#---------------------------------------------------------------------------
#time.YMD=yyyyMMdd
#time.HMS=HHmmss
#time.YMDHMS=yyyyMMdd-HHmmss
#time.USER1=
#time.USER2=

#---------------------------------------------------------------------------
# CSV DataSet configuration
#---------------------------------------------------------------------------

# String to return at EOF (if recycle not used)
#csvdataset.eofstring=<EOF>
#list in https://docs.oracle.com/javase/8/docs/technotes/guides/intl/encoding.doc.html
csvdataset.file.encoding_list=UTF-8|UTF-16|ISO-8859-15|US-ASCII


#---------------------------------------------------------------------------
# LDAP Sampler configuration
#---------------------------------------------------------------------------
# Maximum number of search results returned by a search that will be sorted
# to guarantee a stable ordering (if more results then this limit are returned
# then no sorting is done). Set to 0 to turn off all sorting, in which case
# "Equals" response assertions will be very likely to fail against search results.
#
#ldapsampler.max_sorted_results=1000

# Number of characters to log for each of three sections (starting matching section, diff section,
#   ending matching section where not all sections will appear for all diffs) diff display when an Equals
#   assertion fails. So a value of 100 means a maximum of 300 characters of diff text will be displayed
#   (+ a number of extra characters like "..." and "[[["/"]]]" which are used to decorate it).
#assertion.equals_section_diff_len=100
# test written out to log to signify start/end of diff delta
#assertion.equals_diff_delta_start=[[[
#assertion.equals_diff_delta_end=]]]

#---------------------------------------------------------------------------
# Miscellaneous configuration
#---------------------------------------------------------------------------

# Size of cache used by CSS Selector Extractor (for JODD implementation only)
# to store parsed CSS Selector expressions.
#cssselector.parser.cache.size=400


# Used to control what happens when you start a test and
# have listeners that could overwrite existing result files
# Possible values:
# ASK : Ask user
# APPEND : Append results to existing file
# DELETE : Delete existing file and start a new file
#resultcollector.action_if_file_exists=ASK

# If defined, then start the mirror server on the port
#mirror.server.port=8081

# ORO PatternCacheLRU size
#oro.patterncache.size=1000

# Cache function execution during test execution
# By default, JMeter caches function properties, however, it might cause unexpected results
# when the component is shared across threads and the expression depends on the thread variables.
# The caching behaviour would likely change in the upcoming versions
# Deprecation notice: the setting will likely disappear, so if you need it, consider raising an issue with the use-case.
#function.cache.per.iteration=false

#TestBeanGui
#
#propertyEditorSearchPath=null

# Turn expert mode on/off: expert mode will show expert-mode beans and properties
#jmeter.expertMode=true

# Max size of bytes stored in memory per SampleResult
# Ensure you don't exceed max capacity of a Java Array and remember
# that the higher it is, the higher JMeter will consume heap
# Defaults to 0, which means no truncation
#httpsampler.max_bytes_to_store_per_request=0

# Max size of buffer in bytes used when reading responses
# Defaults to 64k
#httpsampler.max_buffer_size=66560

# Maximum redirects to follow in a single sequence (default 20)
#httpsampler.max_redirects=20
# Maximum frame/iframe nesting depth (default 5)
#httpsampler.max_frame_depth=5

# Revert to BUG 51939 behaviour (no separate container for embedded resources) by setting the following false:
#httpsampler.separate.container=true

# If embedded resources download fails due to missing resources or other reasons, if this property is true
# Parent sample will not be marked as failed
#httpsampler.ignore_failed_embedded_resources=false

#keep alive time for the parallel download threads (in seconds)
#httpsampler.parallel_download_thread_keepalive_inseconds=60

# Don't keep the embedded resources response data : just keep the size and the MD5
# default to false
#httpsampler.embedded_resources_use_md5=false

# List of extra HTTP methods that should be available in select box
#httpsampler.user_defined_methods=VERSION-CONTROL,REPORT,CHECKOUT,CHECKIN,UNCHECKOUT,MKWORKSPACE,UPDATE,LABEL,MERGE,BASELINE-CONTROL,MKACTIVITY

# The encoding to be used if none is provided (default UTF-8 since JMeter 5.6.1)
#sampleresult.default.encoding=UTF-8

# CookieManager behaviour - should cookies with null/empty values be deleted?
# Default is true. Use false to revert to original behaviour
#CookieManager.delete_null_cookies=true

# CookieManager behaviour - should variable cookies be allowed?
# Default is true. Use false to revert to original behaviour
#CookieManager.allow_variable_cookies=true

# CookieManager behaviour - should Cookies be stored as variables?
# Default is false
#CookieManager.save.cookies=false

# CookieManager behaviour - prefix to add to cookie name before storing it as a variable
# Default is COOKIE_; to remove the prefix, define it as one or more spaces
#CookieManager.name.prefix=

# CookieManager behaviour - check received cookies are valid before storing them?
# Default is true. Use false to revert to previous behaviour
#CookieManager.check.cookies=true

# Netscape HTTP Cookie file
cookies=cookies

# Ability to switch to Nashorn as default JavaScript Engine used by IfController and __javaScript function
# JMeter works as following:
# - JDK >= 8 and javascript.use_rhino=false or not set : Nashorn
# - JDK >= 8 and javascript.use_rhino=true: Rhino
# If you want to use Rhino on JDK8, set this property to true
#javascript.use_rhino=false

# Ability to switch out the old Oro Regex implementation with the JDK built-in implementation
# Any value different to 'oro' will disable the Oro implementation and enable the JDK based.
#jmeter.regex.engine=oro

# We assist the JDK based Regex implementation by caching Pattern objects. The size of the
# cache can be set with this setting. It can be disabled by setting it to '0'.
#jmeter.regex.patterncache.size=1000

# Number of milliseconds to wait for a thread to stop
#jmeterengine.threadstop.wait=5000

#Whether to invoke System.exit(0) in server exit code after stopping RMI
#jmeterengine.remote.system.exit=false

# Whether to call System.exit(1) on failure to stop threads in non-GUI mode.
# This only takes effect if the test was explicitly requested to stop.
# If this is disabled, it may be necessary to kill the JVM externally
#jmeterengine.stopfail.system.exit=true

# Whether to force call System.exit(0) at end of test in non-GUI mode, even if
# there were no failures and the test was not explicitly asked to stop.
# Without this, the JVM may never exit if there are other threads spawned by
# the test which never exit.
#jmeterengine.force.system.exit=false

# How long to pause (in ms) in the daemon thread before reporting that the JVM has failed to exit.
# If the value is <= 0, the JMeter does not start the daemon thread
#jmeter.exit.check.pause=0

# If running non-GUI, then JMeter listens on the following port for a shutdown message.
# To disable, set the port to 1000 or less.
#jmeterengine.nongui.port=4445
#
# If the initial port is busy, keep trying until this port is reached
# (to disable searching, set the value less than or equal to the .port property)
#jmeterengine.nongui.maxport=4455

# How often to check for shutdown during ramp-up (milliseconds)
#jmeterthread.rampup.granularity=1000

#Should JMeter expand the tree when loading a test plan?
# default value is false since JMeter 2.7
#onload.expandtree=false

#JSyntaxTextArea configuration
#jsyntaxtextarea.wrapstyleword=true
#jsyntaxtextarea.linewrap=true
#jsyntaxtextarea.codefolding=true
# Set 0 to disable undo feature in JSyntaxTextArea
#jsyntaxtextarea.maxundos=50
# Change the font on the (JSyntax) Text Areas. (Useful for HiDPI screens)
#jsyntaxtextarea.font.family=Hack
#jsyntaxtextarea.font.size=14

# Set this to false to disable the use of JSyntaxTextArea for the Console Logger panel
#loggerpanel.usejsyntaxtext=true

# Maximum size of HTML page that can be displayed; default=10 MB
# Set to 0 to disable the size check and display the whole response
#view.results.tree.max_size=10485760

# UI gets unresponsive when response contains very long lines,
# So we break lines by adding artificial line breaks
# The break is introduced somewhere in between soft_wrap_line_size..max_line_size
# We try to break on word boundaries first
#view.results.tree.max_line_size=110000
#view.results.tree.soft_wrap_line_size=100000

# Even with the above setting the UI can be unresponsive on large contents in the text view,
# so we allow to switch to a simpler view mode, that is faster, but does not break lines.
# Can be switched off by setting it to -1
#view.results.tree.simple_view_limit=10000

# Order of Renderers in View Results Tree
# Note full class names should be used for non JMeter core renderers
# For JMeter core renderers, class names start with '.' and are automatically
# prefixed with org.apache.jmeter.visualizers
view.results.tree.renderers_order=.RenderAsText,.RenderAsRegexp,.RenderAsBoundaryExtractor,.RenderAsCssJQuery,org.apache.jmeter.extractor.json.render.RenderAsJsonRenderer,.RenderAsXPath2,org.apache.jmeter.extractor.json.render.RenderAsJmesPathRenderer,.RenderAsXPath,.RenderAsHTML,.RenderAsHTMLFormatted,.RenderAsHTMLWithEmbedded,.RenderAsDocument,.RenderAsJSON,.RenderAsXML

# Maximum number of results in the results tree
# Set to 0 to store all results (might consume a lot of memory)
#view.results.tree.max_results=500

# Maximum size of Document that can be parsed by Tika engine; default=10 * 1024 * 1024 (10 MB)
# Set to 0 to disable the size check
#document.max_size=0

# Configures the maximum document length for rendering with kerning enabled
#text.kerning.max_document_size=10000

#JMS options
# Enable the following property to stop JMS Point-to-Point Sampler from using
# the properties java.naming.security.[principal|credentials] when creating the queue connection
#JMSSampler.useSecurity.properties=false

# Set the following value to true in order to skip the delete confirmation dialogue
#confirm.delete.skip=false

# Used by JSR-223 elements
# Size of compiled scripts cache
#jsr223.compiled_scripts_cache_size=100

#---------------------------------------------------------------------------
# Classpath configuration
#---------------------------------------------------------------------------

# List of directories (separated by ;) to search for additional JMeter plugin classes,
# for example new GUI elements and samplers.
# Any jar file in such a directory will be automatically included,
# jar files in sub directories are ignored.
# The given value is in addition to any jars found in the lib/ext directory.
# Do not use this for utility or plugin dependency jars.
#search_paths=/app1/lib;/app2/lib

# List of directories that JMeter will search for utility and plugin dependency classes.
# Use your platform path separator to separate multiple paths.
# Any jar file in such a directory will be automatically included,
# jar files in sub directories are ignored.
# The given value is in addition to any jars found in the lib directory.
# All entries will be added to the class path of the system class loader
# and also to the path of the JMeter internal loader.
# Paths with spaces may cause problems for the JVM
#user.classpath=../classes;../lib

# List of directories (separated by ;) that JMeter will search for utility
# and plugin dependency classes.
# Any jar file in such a directory will be automatically included,
# jar files in sub directories are ignored.
# The given value is in addition to any jars found in the lib directory
# or given by the user.classpath property.
# All entries will be added to the path of the JMeter internal loader only.
# For plugin dependencies this property should be used instead of user.classpath.
#plugin_dependency_paths=../dependencies/lib;../app1/;../app2/

# Classpath finder
# ================
# The classpath finder currently needs to load every single JMeter class to find
# the classes it needs.
# For non-GUI mode, it's only necessary to scan for Function classes, but all classes
# are still loaded.
# All current Function classes include ".function." in their name,
# and none include ".gui." in the name, so the number of unwanted classes loaded can be
# reduced by checking for these. However, if a valid function class name does not match
# these restrictions, it will not be loaded. If problems are encountered, then comment
# or change the following properties:
classfinder.functions.contain=.functions.
classfinder.functions.notContain=.gui.


#---------------------------------------------------------------------------
# Additional property files to load
#---------------------------------------------------------------------------

# Should JMeter automatically load additional JMeter properties?
# File name to look for (comment to disable)
user.properties=user.properties

# Should JMeter automatically load additional system properties?
# File name to look for (comment to disable)
system.properties=system.properties

# Comma separated list of files that contain reference to templates and their description
# Path must be relative to JMeter root folder
#template.files=/bin/templates/templates.xml


#---------------------------------------------------------------------------
# Thread Group Validation feature
#---------------------------------------------------------------------------

# Validation is the name of the feature used to rapidly validate a Thread Group runs fine
# Default implementation is org.apache.jmeter.gui.action.validation.TreeClonerForValidation
# It runs validation without timers, with 1 thread, 1 iteration and Startup Delay set to 0
# You can implement your own policy that must extend org.apache.jmeter.engine.TreeCloner
# JMeter will instantiate it and use it to create the Tree used to run validation on Thread Group
#testplan_validation.tree_cloner_class=org.apache.jmeter.validation.ComponentTreeClonerForValidation

# Number of threads to use to validate a Thread Group
#testplan_validation.nb_threads_per_thread_group=1

# Ignore BackendListener when validating the thread group of plan
#testplan_validation.ignore_backends=true

# Ignore timers when validating the thread group of plan
#testplan_validation.ignore_timers=true

# Number of iterations to use to validate a Thread Group
#testplan_validation.number_iterations=1

# Force throughput controllers that work in percentage mode to be a 100%
# Disabled by default
#testplan_validation.tpc_force_100_pct=false

#---------------------------------------------------------------------------
# Think Time configuration
#---------------------------------------------------------------------------

#
# Apply a factor on computed pauses by the following Timers:
# - Gaussian Random Timer
# - Uniform Random Timer
# - Poisson Random Timer
#
#timer.factor=1.0f

# Default implementation that create the Timer structure to add to Test Plan
# Implementation of interface org.apache.jmeter.gui.action.thinktime.ThinkTimeCreator
#think_time_creator.impl=org.apache.jmeter.thinktime.DefaultThinkTimeCreator

# Default Timer GUI class added to Test Plan by DefaultThinkTimeCreator
#think_time_creator.default_timer_implementation=org.apache.jmeter.timers.gui.UniformRandomTimerGui

# Default constant pause of Timer
#think_time_creator.default_constant_pause=1000

# Default range pause of Timer
#think_time_creator.default_range=100


# Change this parameter if you want to override the APDEX satisfaction threshold.
jmeter.reportgenerator.apdex_satisfied_threshold=500

# Change this parameter if you want to override the APDEX tolerance threshold.
jmeter.reportgenerator.apdex_tolerated_threshold=1500

# Timeout in milliseconds for Report generation when using Tools > Generate HTML report
#generate_report_ui.generation_timeout=300000
#---------------------------------------------------------------------------
# Naming Policy configuration
#---------------------------------------------------------------------------

# Prefix used when naming elements
#naming_policy.prefix=
# Suffix used when naming elements
#naming_policy.suffix=

# Implementation of interface org.apache.jmeter.gui.action.TreeNodeNamingPolicy
#naming_policy.impl=org.apache.jmeter.gui.action.impl.DefaultTreeNodeNamingPolicy

#---------------------------------------------------------------------------
# Help Documentation
#---------------------------------------------------------------------------

# Switch that allows using Local documentation opened in JMeter GUI
# By default we use Online documentation opened in Browser
#help.local=false

#---------------------------------------------------------------------------
# Documentation generation
#---------------------------------------------------------------------------

# Path to XSL file used to generate Schematic View of Test Plan
# When empty, JMeter will use the embedded one in src/core/org/apache/jmeter/gui/action/schematic.xsl
#docgeneration.schematic_xsl=

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
配置 /usr/local/etc/nginx/nginx.conf
```nginx
# 配置NGINX
# nginx.conf
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;···
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
        listen       10001;
        server_name  192.168.1.4;

        location / {
        root /Users/he/Documents/local/netApiJmeter/report/html;
        autoindex on;      # 启用目录列表
        autoindex_exact_size off;  # 可选：以人类可读的格式显示文件大小
        autoindex_localtime on;     # 可选：显示文件的本地时间
    }
        
        error_page   500 502 503 504  /50x.html;
        location = /50x.html { 
            root   html;
        }
    }
    # HTTP 02
    server {
        listen       10002;
        server_name  192.168.1.4;

        location / {
            root /Users/he/Documents/local/netApiJmeter/report/dashboard;            
            index index.html;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    } 

    # HTTP 03
    server {
        listen       10003;
        server_name  192.168.1.4;

        location / {
            root /Users/he/Documents/local/netApiPost/newman;
            autoindex on;      # 启用目录列表
            autoindex_exact_size off;  # 可选：以人类可读的格式显示文件大小
            autoindex_localtime on;     # 可选：显示文件的本地时间
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
| Apdex | T (Toleration threshold) | F (Frustration threshold) |      Label       |
| :---: | :----------------------: | :-----------------------: | :--------------: |
| 0.591 |          500 ms          |       1 sec 500 ms        |      Total       |
| 0.001 |          500 ms          |       1 sec 500 ms        |   获取用户动态   |
| 0.064 |          500 ms          |       1 sec 500 ms        |   获取用户歌单   |
| 0.137 |          500 ms          |       1 sec 500 ms        | 获取每日推荐歌曲 |
| 0.223 |          500 ms          |       1 sec 500 ms        |   电台 - 分类    |
| 0.500 |          500 ms          |       1 sec 500 ms        |       登录       |
| 0.596 |          500 ms          |       1 sec 500 ms        |    vip 成长值    |
| 0.956 |          500 ms          |       1 sec 500 ms        |   获取账号信息   |
| 0.976 |          500 ms          |       1 sec 500 ms        |   云贝账户信息   |
| 0.980 |          500 ms          |       1 sec 500 ms        | 获取用户历史评论 |
| 0.988 |          500 ms          |       1 sec 500 ms        |   通知 - 私信    |
| 0.994 |          500 ms          |       1 sec 500 ms        |   获取用户信息   |
:::


::: info Statistics
![pic](/jmeter01.png "notice")
:::

::: details Errors
| Type of error                                                                                                                                                                              | Number of errors | % in errors | % in all samples |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------: | :---------: | :--------------: |
| Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 20,946; received: 6,681)    |        4         |    4.65     |       0.08       |
| Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 20,946; received: 969)      |        4         |    4.65     |       0.08       |
| Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 231,411; received: 219,323) |        4         |    4.65     |       0.08       |
| 502/Bad Gateway                                                                                                                                                                            |        3         |    3.49     |       0.06       |
| Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 231,411; received: 215,039) |        3         |    3.49     |       0.06       |
| Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 67,747; received: 25,244)   |        3         |    3.49     |       0.06       |
| Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 231,411; received: 229,319) |        3         |    3.49     |       0.06       |
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
| Apdex | T (Toleration threshold) | F (Frustration threshold) |      Label       |
| :---: | :----------------------: | :-----------------------: | :--------------: |
| 0.613 |          500 ms          |       1 sec 500 ms        |      Total       |
| 0.002 |          500 ms          |       1 sec 500 ms        |   获取用户动态   |
| 0.002 |          500 ms          |       1 sec 500 ms        | 获取每日推荐歌曲 |
| 0.094 |          500 ms          |       1 sec 500 ms        |   电台 - 分类    |
| 0.207 |          500 ms          |       1 sec 500 ms        |   获取用户歌单   |
| 0.828 |          500 ms          |       1 sec 500 ms        |    vip 成长值    |
| 0.980 |          500 ms          |       1 sec 500 ms        |   云贝账户信息   |
| 0.990 |          500 ms          |       1 sec 500 ms        |   获取账号信息   |
| 0.994 |          500 ms          |       1 sec 500 ms        | 获取用户历史评论 |
| 0.995 |          500 ms          |       1 sec 500 ms        |   通知 - 私信    |
| 0.996 |          500 ms          |       1 sec 500 ms        |   获取用户信息   |
| 1.000 |          500 ms          |       1 sec 500 ms        |       登录       |
:::



::: info Statistics
![pic](/jmeter02.png "notice")
:::

::: details Errors
| Type of error                                                                                                                                                                              | Number of errors | % in errors | % in all samples |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- | ----------- | ---------------- |
| 502/Bad Gateway                                                                                                                                                                            | 4                | 25.00%      | 0.03%            |
| Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 231,411; received: 210,755) | 1                | 6.25%       | 0.01%            |
| Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 231,411; received: 220,751) | 1                | 6.25%       | 0.01%            |
| Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 67,741; received: 23,815)   | 1                | 6.25%       | 0.01%            |
| Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 231,411; received: 215,039) | 1                | 6.25%       | 0.01%            |
| Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 67,754; received: 18,104)   | 1                | 6.25%       | 0.01%            |
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


