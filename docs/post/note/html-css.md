## 1. HTML语义化
:::tip HTML语义化
  - 正确的标签做正确的事情
  - 适合搜索引擎的爬虫爬取有效信息，
  - 有利于 SEO
  - 支持读屏软件
  - 增强了可读性，结构更加清晰，便于团队的开发与维护
  :::
## 2. HTML5新特性
:::tip HTML5新特性
  - 多媒体，用于媒介回放的 `video` 和 `audio` 元素。
  - 图像效果，用于绘画的 `canvas` 元素，`svg` 元素等。
  - 离线&存储，对本地离线存储能够更好地支持，比如 `localStorage`,`Cookies` 等。
  - 性能与集成特性，`HTML5` 会通过 `XML HttpRequest2`等技术，帮助您的 `Web` 应用和网站在多样化的环境中更快速地工作
:::
## 3. 行内元素 块级元素 空(void)元素
:::tip
  - 行内元素：`span` `img` `input` `select` `strong`
  - 块级元素：`div` `ul` `ol` `li` `dl` `dt` `dd` `h1` `h2` `h3` `h4` `h5` `h6` `p`
  - 空(void)元素：`br` `hr` `img` `input` `link` `meta`
:::
## 4. link 和@import 的区别
:::tip
  -  `link` 引用 `CSS` 时，在页面载入时同时加载；`@import` 需要页面网页完 全载入以后加载
  - ` link` 是 `XHTML` 标签，无兼容问题；`@import` 是在 CSS2.1 提出的，低版本的浏览器不支持
  -  `link` 支持使用 `Javascript` 控制 `DOM` 去改变样式；而 `@import` 不支持
:::
## 5. CSS3 中有哪些新特性
:::tip
  - `border-radius` 圆角属性 border-radius: 10px;
  - `text-shadow` 文字阴影 text-shadow: 1px 1px 2px black;
  - `gradient` 线性渐变 background: linear-gradient(blue, pink);
  - `transform` 位移，旋转，缩放 transform: translate(50px 50px);
  - `transition` 过渡 transition: all .3s ease;
  - `animation` 动画 animation: 3s ease-in 1s infinite reverse both running slidein;
:::
## 5. CSS 选择器及优先级
  :::tip 选择器
  - id 选择器(#myid)
  - 类选择器(.myclass)
  - 属性选择器(a[rel="external"])
  - 伪类选择器(a:hover, li:nth-child)
  - 标签选择器(div, h1,p)
  - 相邻选择器（h1 + p）
  - 子选择器(ul > li)
  - 后代选择器(li a)
  - 通配符选择器(\*)
  :::
  :::tip 优先级
  - !important
  - 内联样式（1000）
  - ID 选择器（0100）
  - 类选择器/属性选择器/伪类选择器（0010）
  - 元素选择器/伪元素选择器（0001）
  - 关系选择器/通配符选择器（0000）
  :::
## 6.  CSS 布局单位
:::tip
  - px: 像素单位
  - rpx: 小程序布局单位
  - %: 相对于父元素的百分比单位
  - em: 相对单位 1em 等同于父元素的文字大小
  - rem: 相对单位 1rem 等同于 html 根元素的文字大小
  - vh: 相对单位 1vh 等同于屏幕高度的 1%
  - vw: 相对单位 1vw 等同于屏幕快读的 1%
  - vmin: 选取 vh 和 vw 的最小值为基准
  - vmax: 选取 vh 和 vw 的最大值为基准
:::


## 7. script 标签中属性 async 和 defer 的区别
  ```html
  <script src='xxx'></script>
  <script src='xxx' async></script>
  <script src='xxx' defer></script>
  ```
  ::: tip
  - `script` 会阻碍 `HTML` 解析，只有下载好并执行完脚本才会继续解析 `HTML`
  - `async script`：解析 `HTML` 的过程中会进行脚本的异步下载，下载成功后立马执行，因此有可能会阻断 `HTML` 的解析。多个脚本的执行顺序无法保证
  - `defer script`：也是异步下载脚步，加载完成后，如果此时 `HTML` 还没有解析完，浏览器不会暂停解析去执行 `JS` 代码，而是等待 `HTML` 解析完毕再执行 `JS` 代码
  :::
  :::tip
  | script 标签  |   JS 执行顺序    |      是否阻塞解析 HTML |
  | ------------ | :--------------: | ---------------------: |
  | script       | 在 HTML 中的顺序 |                   阻塞 |
  | script async | 网络请求返回顺序 | 可能阻塞，也可能不阻塞 |
  | script defer | 在 HTML 中的顺序 |                 不阻塞 |

  :::
  ::: details
  ![图片描述](/script.png)
  :::
## 7. 盒模型
  :::tip
  - `IE` 盒模型： `width` + `height` + `padding` + `border`
  - `W3C` 标准盒模型： `width` + `height，不包含` `border` 和 `padding`
  :::
## 8. BFC
:::tip 定义:
   - 块级格式化上下文
   - 是一个独立的渲染区域，让处于`BFC`内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响
:::
:::tip 触发条件：
   - 根元素
   - `position`: `absolute`/`fixed`
   - `display`: `inline-block` /`table`
   - `float`元素
   - `overflow` !== `visible`
:::

 :::tip  规则：
   - 属于同一个`BFC`的两个相邻`Box`垂直排列
   - 属于同一个`BFC`的两个相邻`Box`的`margin`会发生重叠
   - `BFC`中子元素的左边 `margin`，与包含块 (`BFC`) `border` `box`的左边相接触
   - `BFC`的区域不会与 `float` 的元素区域重叠
   - 计算 `BFC` 的高度时，浮动子元素也参与计算
  :::


## 9. 两栏布局
:::tip
- 利用浮动，左边元素宽度固定，设置向左浮动。将右边元素的 `margin-left` 设为固定宽度 。注意，因为右边元素的 `width` 默认为 `auto`，所以会自动撑满父元素
:::
  ```css
  .outer {
    height: 100px
  }
  .left {
    float: left
    width: 200px
    height: 100%
    background: lightcoral
  }
  .right {
    margin-left: 200px
    /* width:auto */
    height: 100%
    background: lightseagreen
  }
  ```
:::tip
- 同样利用浮动，左边元素宽度固定，设置向左浮动。右侧元素设置`overflow`:`hidden` 这样右边就触发了`BFC` ，`BFC`的区域不会与浮动元素发生重叠，所以两侧就不会发生重叠
:::
  ```css
  .outer {
    height: 100px
  }
  .left {
    float: left
    width: 200px
    height: 100%
    background: lightcoral
  }
  .right {
    overflow: auto
    height: 100%
    background: lightseagreen
  }
  ```
:::tip
- 利用`flex`布局，左边元素固定宽度，右边的元素设置`flex`: 1
:::
  ```css
  .outer {
    height: 100px
    display:flex
  }
  .left {
    width: 200px
    height: 100%
    background: lightcoral
  }
  .right {
    flex:1
    height: 100%
    background: lightseagreen
  }
  ```
:::tip
- 利用绝对定位，父级元素设为相对定位。左边元素`absolute`定位，宽度固定。右边元素的`margin-left`的值设为左边元素的宽度值
:::
  ```css
  .outer {
    position: relative
    height: 100px
  }
  .left {
    position: absolute
    width: 200px
    height: 100%
    background: lightcoral
  }
  .right {
    margin-left: 200px
    height: 100%
    background: lightseagreen
  }
  ```
:::tip
- 利用绝对定位，父级元素设为相对定位。左边元素宽度固定，右边元素`absolute`定位，`left`为宽度大小，其余方向定位为0
:::
```css
  .outer {
    position: relative
    height: 100px
  }
  .left {
    width: 200px
    height: 100%
    background: lightcoral
  }
  .right {
    position: absolute
    left: 200px
    top: 0
    right: 0
    bottom: 0
    height: 100%
    background: lightseagreen
  }
```

## 10. 三栏布局
:::tip
- 圣杯布局
:::
```html
<div id="container" class="clearfix">
  <div class="center">我是中间</div>
  <div class="left">我是左边</div>
  <div class="right">我是右边</div>
</div>
```
```css
#container {
  padding-left: 200px
  padding-right: 150px
  overflow: auto
}
#container div {
  float: left
}
.center {
  width: 100%
  background-color: lightcoral
}
.left {
  width: 200px
  position: relative
  left: -200px
  margin-left: -100%
  background-color: lightcyan
}
.right {
  width: 150px
  margin-right: -150px
  background-color: lightgreen
}
.clearfix:after {
  content: ""
  display: table
  clear: both
}
```
:::tip
- 双飞翼布局
:::
```html
<div id="main" class="float">
  <div id="main-wrap">main</div>
</div>
<div id="left" class="float">left</div>
<div id="right" class="float">right</div>
```
```css
.float {
  float: left
}
#main {
  width: 100%
  height: 200px
  background-color: lightpink
}
#main-wrap {
  margin: 0 190px 0 190px
}
#left {
  width: 190px
  height: 200px
  background-color: lightsalmon
  margin-left: -100%
}
#right {
  width: 190px
  height: 200px
  background-color: lightskyblue
  margin-left: -190px
}
```
:::warning
**总结：**
- 使用`float`布局
- 两侧使用`margin`负值，以便和中间内容横向重叠
- 防止中间内容被两侧覆盖，圣杯布局用`padding`，双飞翼布局用`margin`
:::
## 11. 水平垂直居中
:::tip
- 利用绝对定位，设置`left`: 50%和`top`:50%,现将子元素左上角移到父元素中心位置，然后再通过`translate`来调整子元素的中心点到父元素的中心。(该方法可以不定宽高)
:::
```css
.father {
  position: relative
}   
.son {
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-50%, -50%)
}
```
:::tip
- 利用绝对定位，子元素所有方向都为0，将`margin`设置为`auto`，由于宽高固定，对应方向实现平分。(该方法必须定宽高)
:::
```css
.father {
  position: relative
}
.son {
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  margin: auto
  height: 100px
  width: 100px
}
```
:::tip
- 利用绝对定位，设置`left`:50%和`top`:50%现将子元素左上角移到父元素中心位置，然后再通过`margin-left`和`margin-top`以子元素自己的一半宽高进行负值赋值。(该方法必须定宽高)
:::
```css
.father {
  position: relative
}
.son {
  position: absolute
  left: 50%
  top: 50%
  width: 200px
  height: 200px
  margin-left: -100px
  margin-top: -100px
}
```
:::tip
- 利用`flex`，最经典最方便的一种了，不用解释，定不定宽高无所谓的
:::
```css
.father {
  display: flex
  justify-content: center
  align-items: center
}
``` 
:::tip
- 利用`grid`(该方法必须定宽高)
:::
```css
.father {
  width: 200px;
  height: 200px;
  border: 1px solid red;
  display: grid;
}
.son {
  width: 100px;
  height: 100px;
  background: yellow;
  margin: auto;
}
  ```
## 12. 清除浮动
:::tip 定义
 - 非IE浏览器下，容器不设高度且子元素浮动时，容器高度不能被内容撑开
 - 内容会溢出到容器外面而影响布局。这种现象被称为浮动（溢出）
:::
:::tip 浮动的工作原理
 - 浮动元素脱离文档流，不占据空间（引起“高度塌陷”现象）
 - 浮动元素碰到包含它的边框或者其他浮动元素的边框停留
:::
:::tip 浮动元素引起的问题
 - 父元素的高度无法被撑开，影响与父元素同级的元素
 - 与浮动元素同级的非浮动元素会跟随其后
 - 若浮动的元素不是第一个元素，则该元素之前的元素也要浮动，否则会影响页面的显示结构
:::
:::tip 清除浮动的方式如下
 1. clear清除浮动最佳实践
   ```css
  .clearfix:after {
      display: block;
      content: "";
      clear: both;
  }
   ```
 2. BFC清除浮动
   ```css
   .container {
      overflow: hidden;
   }
   ```
 3. 父元素结束标签之前插入清除浮动的块级元素
   ```css
    .clearDiv {
    clear: both; // or left
   }
   ```
:::
## 13. 伪元素和伪类的区别
:::tip 伪元素
  - 在内容元素的前后插入额外的元素或样式，但是这些元素实际上并不在文档中生成
  - 它们只在外部显示可见，但不会在文档的源代码中找到它们，因此，称为“伪”元素

  ```css
  p::before {content:"第一章：";}
  p::after {content:"Hot!";}
  p::first-line {background:red;}
  p::first-letter {font-size:30px;}
  ```
:::
:::tip 伪类
  - 将特殊的效果添加到特定选择器上
  - 它是已有元素上添加类别的，不会产生新的元素
  ```css
  a:hover {color: blue}
  p:first-child {color: green}
  ```
:::