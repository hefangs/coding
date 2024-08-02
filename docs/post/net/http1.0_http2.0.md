# HTTP 1.0 / HTTP 1.1 / HTTP 2.0




## HTTP 请求头
:::info 
- `HTTP`头字段（`HTTP header fields`）,是指在超文本传输协议（`HTTP`）的请求和响应消息中的消息头部分
- 它们定义了一个超文本传输协议事务中的操作参数
- `HTTP`头部字段可以自己根据需要定义，因此可能在`Web`服务器和浏览器上发现非标准的头字段
```js
// 下面是一个HTTP请求的请求头：
:authority: sponsors.vuejs.org
:method: GET
:path: /data.json
:scheme: https
accept-encoding: gzip, deflate, br
accept-language: zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7
cache-control: no-cache
origin: https://cn.vuejs.org
referer: https://cn.vuejs.org/
user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36
accept: */*
```
:::
:::details  常见的请求字段：
| 字段名            | 说明                                                                                                                                                                          | 示例                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Accept            | 能够接受的回应内容类型（Content-Types）                                                                                                                                       | Accept: text/plain                                                               |
| Accept-Charset    | 能够接受的字符集                                                                                                                                                              | Accept-Charset: utf-8                                                            |
| Accept-Encoding   | 能够接受的编码方式列表                                                                                                                                                        | Accept-Encoding: gzip, deflate                                                   |
| Accept-Language   | 能够接受的回应内容的自然语言列表                                                                                                                                              | Accept-Language: en-US                                                           |
| Authorization     | 用于超文本传输协议的认证的认证信息                                                                                                                                            | Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==                                |
| Cache-Control     | 用来指定在这次的请求/响应链中的所有缓存机制 都必须 遵守的指令                                                                                                                 | Cache-Control: no-cache                                                          |
| Connection        | 该浏览器想要优先使用的连接类型                                                                                                                                                | Connection: keep-alive Connection: Upgrade                                       |
| Cookie            | 服务器通过 Set- Cookie （下文详述）发送的一个 超文本传输协议Cookie                                                                                                            | Cookie: $Version=1; Skin=new;                                                    |
| Content-Length    | 以 八位字节数组 （8位的字节）表示的请求体的长度                                                                                                                               | Content-Length: 348                                                              |
| Content-Type      | 请求体的 多媒体类型                                                                                                                                                           | Content-Type: application/x-www-form-urlencoded                                  |
| Date              | 发送该消息的日期和时间                                                                                                                                                        | Date: Tue, 15 Nov 1994 08:12:31 GMT                                              |
| Expect            | 表明客户端要求服务器做出特定的行为                                                                                                                                            | Expect: 100-continue                                                             |
| Host              | 服务器的域名(用于虚拟主机 )，以及服务器所监听的传输控制协议端口号                                                                                                             | Host: en.wikipedia.org:80 Host: en.wikipedia.org                                 |
| If-Match          | 仅当客户端提供的实体与服务器上对应的实体相匹配时，才进行对应的操作。主要作用时，用作像 PUT 这样的方法中，仅当从用户上次更新某个资源以来，该资源未被修改的情况下，才更新该资源 | If-Match: "737060cd8c284d8af7ad3082f209582d"                                     |
| If-Modified-Since | 允许在对应的内容未被修改的情况下返回304未修改                                                                                                                                 | If-Modified-Since: Sat, 29 Oct 1994 19:43:31 GMT                                 |
| If-None-Match     | 允许在对应的内容未被修改的情况下返回304未修改                                                                                                                                 | If-None-Match: "737060cd8c284d8af7ad3082f209582d"                                |
| If-Range          | 如果该实体未被修改过，则向我发送我所缺少的那一个或多个部分；否则，发送整个新的实体                                                                                            | If-Range: "737060cd8c284d8af7ad3082f209582d"                                     |
| Range             | 仅请求某个实体的一部分                                                                                                                                                        | Range: bytes=500-999                                                             |
| User-Agent        | 浏览器的浏览器身份标识字符串                                                                                                                                                  | User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/21.0 |
| Origin            | 发起一个针对 跨来源资源共享 的请求                                                                                                                                            | Origin: http://www.baidu.com                                                     |
:::







## HTTP 1.0

:::info 
- `HTTP`协议的第二个版本，第一个在通讯中指定版本号的`HTTP`协议版本
- `HTTP1.0`浏览器与服务器只保持短暂的连接，每次请求都需要与服务器建立一个`TCP`连接
- 服务器完成请求处理后立即断开`TCP`连接，服务器不跟踪每个客户也不记录过去的请求
- 简单来讲，每次与服务器交互，都需要新开一个连接
:::

:::info 存在问题
- 解析`html`文件，当发现文件中存在资源文件的时候，这时候又创建单独的链接
- 最终导致，一个`html`文件的访问包含了多次的请求和响应，每次请求都需要创建连接、关系连接这种形式明显造成了性能上的缺陷
- 如果需要建立长连接，需要设置一个非标准的`Connection`字段 `Connection: keep-alive`
:::details
![pic](/http2.png "notice")
:::


## HTTP 1.1
:::info 
- 在`HTTP1.1`中，默认支持长连接（`Connection: keep-alive`），即在一个`TCP`连接上可以传送多个`HTTP`请求和响应，减少了建立和关闭连接的消耗和延迟
- 建立一次连接，多次请求均由这个连接完成，这样在加载`html`文件的时候，文件中多个请求和响应就可以在一个连接中传输
- 同时，`HTTP 1.1`还允许客户端不用等待上一次请求结果返回，就可以发出下一次请求，但服务器端必须按照接收到客户端请求的先后顺序依次回送响应结果，以保证客户端能够区分出每次请求的响应内容，这样也显著地减少了整个下载过程所需要的时间
:::
::: info 增加内容
- `HTTP1.1`在`HTTP1.0`的基础上，增加更多的请求头和响应头来完善的功能，如下：
  - 引入了更多的缓存控制策略，如`If-Unmodified-Since`, `If-Match`, `If-None-Match`等缓存头来控制缓存策略
  - 引入`range`，允许值请求资源某个部分
  - 引入`host`，实现了在一台`WEB`服务器上可以在同一个`IP`地址和端口号上使用不同的主机名来创建多个虚拟`WEB`站点
- 并且还添加了其他的请求方法：
  - `put`
  - `delete`
  - `options`
  - ...
:::details
![pic](/http3.png "notice")
:::


## HTTP2.0
:::info 
- 而`HTTP2.0`在相比之前版本，性能上有很大的提升，如添加了一个特性：
  - 多路复用
  - 二进制分帧
  - 首部压缩
  - 服务器推送
:::
:::info 多路复用
  - `HTTP/2`复用`TCP`连接，在一个连接里，客户端和浏览器都可以同时发送多个请求或回应，而且不用按照顺序一一对应，这样就避免了”队头堵塞”
  - 下图中，可以看到第四步中`css`、`js`资源是同时发送到服务端
  :::details 
  ![pic](/http4.png "notice")
:::
:::info 二进制分帧
  - 帧是`HTTP2`通信中最小单位信息
  - `HTTP/2`采用二进制格式传输数据，而非 `HTTP 1.x`的文本格式，解析起来更高效
  - 将请求和响应数据分割为更小的帧，并且它们采用二进制编码
  - `HTTP2`中，同域名下所有通信都在单个连接上完成，该连接可以承载任意数量的双向数据流
  - 每个数据流都以消息的形式发送，而消息又由一个或多个帧组成。多个帧之间可以乱序发送，根据帧首部的流标识可以重新组装，这也是多路复用同时发送数据的实现条件
:::
:::info 首部压缩
  - `HTTP/2`在客户端和服务器端使用“首部表”来跟踪和存储之前发送的键值对，对于相同的数据，不再通过每次请求和响应发送
  - 首部表在`HTTP/2`的连接存续期内始终存在，由客户端和服务器共同渐进地更新
  - 下图中的两个请求， 请求一发送了所有的头部字段，第二个请求则只需要发送差异数据，这样可以减少冗余数据，降低开销
  :::details
  ![pic](/http5.png "notice")
:::

:::info 服务器推送
- `HTTP2`引入服务器推送，允许服务端推送资源给客户端
- 服务器会顺便把一些客户端需要的资源一起推送到客户端，如在响应一个页面请求中，就可以随同页面的其它资源
- 免得客户端再次创建连接发送请求到服务器端获取，合适加载静态资源
:::details
![pic](/http6.png "notice")
:::

## 总结
:::tip
- `HTTP1.0`：
  - 浏览器与服务器只保持短暂的连接，浏览器的每次请求都需要与服务器建立一个`TCP`连接
- `HTTP1.1`：
  - 引入了持久连接，即`TCP`连接默认不关闭，可以被多个请求复用
  - 在同一个`TCP`连接里面，客户端可以同时发送多个请求
  - 虽然允许复用`TCP`连接，但是同一个`TCP`连接里面，所有的数据通信是按次序进行的，服务器只有处理完一个请求，才会接着处理下一个请求。如果前面的处理特别慢，后面就会有许多请求排队等着
  - 新增了一些请求方法
  - 新增了一些请求头和响应头
- `HTTP2.0`：
  - 采用二进制格式而非文本格式
  - 完全多路复用，而非有序并阻塞的、只需一个连接即可实现并行
  - 使用报头压缩，降低开销
  - 服务器推送
:::