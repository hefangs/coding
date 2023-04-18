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



## 14. Flex
:::tip flex
  - `Flexible Box`简称`flex`，意为”弹性布局”，可以简便、完整、响应式地实现各种页面布局
  - 采用`Flex`布局的元素，称为`flex`容器`container`
  - 它的所有子元素自动成为容器成员，称为`flex`项目`item`
  ![pic](/flex1.png "notice")
  - 容器中默认存在两条轴，主轴和交叉轴，呈90度关系。项目默认沿主轴排列，通过`flex-direction`来决定主轴的方向
  - 每根轴都有起点和终点，这对于元素的对齐非常重要
:::
:::tip 属性
  - 关于`flex`常用的属性，我们可以划分为`容器属性`和`容器成员属性`
    - 容器属性有：
      - `flex-direction`决定主轴的方向(即项目的排列方向)
        - `row`（默认值）：主轴为水平方向，起点在左端
        - `row-reverse`：主轴为水平方向，起点在右端
        - `column`：主轴为垂直方向，起点在上沿。
        - `column-reverse`：主轴为垂直方向，起点在下沿
        ```javascript
        .container {   
          flex-direction: row | row-reverse | column | column-reverse
        } 
        ```
        ![pic](/flex2.png "notice")
      - `flex-wrap`弹性元素永远沿主轴排列，那么如果主轴排不下，通过`flex-wrap`决定容器内项目是否可换行
        - `nowrap`（默认值）：不换行(但这里也不会任由元素直接溢出容器，会涉及到元素的弹性伸缩)
        - `wrap`：换行，第一行在下方
        - `wrap-reverse`：换行，第一行在上方
        ```javascript
        .container {   
          flex-wrap: nowrap | wrap | wrap-reverse
        } 
        ```
      - `flex-flow`是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`
        ```javascript
        .box {
          flex-flow: flex-direction | flex-wrap
        }
        ```
      - `justify-content`定义了项目在主轴上的对齐方式
        - `flex-start`（默认值）：左对齐
        - `flex-end`：右对齐
        - `center`：居中
        - `space-between`：两端对齐，项目之间的间隔都相等
        - `space-around`：两个项目两侧间隔相等
        ```javascript
        .box {
          justify-content: flex-start | flex-end | center | space-between | space-around
        }
        ```
        ![pic](/flex3.png "notice")
      - `align-items`定义项目在交叉轴上如何对齐
        - `flex-start`：交叉轴的起点对齐
        - `flex-end`：交叉轴的终点对齐
        - `center`：交叉轴的中点对齐
        - `baseline`: 项目的第一行文字的基线对齐
        - `stretch`（默认值）：如果项目未设置高度或设为
        ```javascript
        .box {
          align-items: flex-start | flex-end | center | baseline | stretch
        }
        ```
      - `align-content`定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用
        - `flex-start`：与交叉轴的起点对齐
        - `flex-end`：与交叉轴的终点对齐
        - `center`：与交叉轴的中点对齐
        - `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布
        - `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍
        - `stretch`（默认值）：轴线占满整个交叉轴
        ```javascript
        .box {
          align-content: flex-start | flex-end | center | space-between | space-around | stretch
        }
        ```
        ![pic](/flex4.png "notice")
    - 容器成员属性：
      - `order`定义项目的排列顺序。数值越小，排列越靠前，默认为0
        ```javascript
        .item {
          order: integer
        }
        ```
      - `flex-grow`当容器设为`flex-wrap: nowrap`不换行的时候，容器宽度有不够分的情况，弹性元素会根据`flex-grow`来决定
        - 定义项目的放大比例（容器宽度>元素总宽度时如何伸展）
        - 默认为0，即如果存在剩余空间，也不放大
        ```javascript
        .item {
          flex-grow: number // default 0 
        }
        ```
        - 如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）
        - 弹性容器的宽度正好等于元素宽度总和，无多余宽度，此时无论`flex-grow`是什么值都不会生效

        ![pic](/flex5.png "notice")
        ![pic](/flex6.png "notice")
      - `flex-shrink`定义了项目的缩小比例（容器宽度<元素总宽度时如何收缩），默认为1，即如果空间不足，该项目将缩小
        - 如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小
        - 如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小
        - 在容器宽度有剩余时，`flex-shrink`也是不会生效的
        ```javascript
        .item {
          flex-shrink: number // default 1
        }
        ```

        ![pic](/flex7.png "notice")
      - `flex-basis`设置的是元素在主轴上的初始尺寸，所谓的初始尺寸就是元素在`flex-grow`和`flex-shrink`生效前的尺寸
        - 浏览器根据这个属性，计算主轴是否有多余空间，默认值为`auto`，即项目的本来大小
        - 如设置了`width`则元素尺寸由`width/height`决定（主轴方向），没有设置则由内容决定
        - 当设置为0的是，会根据内容撑开
        - 它可以设为跟`width`或`height`属性一样的值（比如350px），则项目将占据固定空间
        ```javascript
        .item {
          flex-basis: length | auto // default auto
        }
        ```
      - `flex`flex属性是`flex-grow`、`flex-shrink`、`flex-basis`的简写，默认值为`0 1 auto`，也是比较难懂的一个复合属性
        - 属性：
          - `flex: 1 = flex: 1 1 0%`
          - `flex: 2 = flex: 2 1 0%`
          - `flex: auto = flex: 1 1 auto`
          - `flex: none = flex: 0 0 auto`，常用于固定尺寸不伸缩
        - `flex:1`和`flex:auto`的区别，可以归结于`flex-basis:0`和`flex-basis:auto`的区别
        - 当设置为`0`时（绝对弹性元素），此时相当于告诉`flex-grow`和`flex-shrink`在伸缩的时候不需要考虑我的尺寸
        - 当设置为`auto`时（相对弹性元素），此时则需要在伸缩时将元素尺寸纳入考虑
        - 注意：建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值
        ```javascript
        .item {
          flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
        }
        ```
      - `align-self`允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性
        - 默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`
        ```javascript
        .item {
          align-self: auto | flex-start | flex-end | center | baseline | stretch
        }
        ```
        ![pic](/flex8.png "notice")
:::

## 15. Grid

:::tip Grid
  - `Grid`布局即网格布局，是一个二维的布局方式，由纵横相交的两组网格线形成的框架性布局结构，能够同时处理行与列
  - 将一个页面划分为几个主要区域，以及定义这些区域的大小、位置、层次等关系
  - 设置`display:grid/inline-grid`的元素就是网格布局容器，这样就能出发浏览器渲染引擎的网格布局算法
    ```javascript
    <div class="container">
      <div class="item item-1">
        <p class="sub-item"></p >
      </div>
      <div class="item item-2"></div>
      <div class="item item-3"></div>
    </div> 
    ```
  - 上述代码实例中，`.container`元素就是网格布局容器，`.item`元素就是网格的项目，由于网格元素只能是容器的顶层子元素，所以`p`元素并不是网格元素
  - 网格线，即划分网格的线，如下图所示：
    - 下图是一个`2 x 3`的网格，共有3根水平网格线和4根垂直网格线
    ![pic](/grid2.png "notice")
:::

:::tip 属性
  - Grid 布局属性可以分为两大类：
    - 容器属性：
      - `display`属性
        - 在元素上设置`display：grid`或`display：inline-grid`来创建一个网格容器
        - `display：grid`则该容器是一个块级元素
        - `display: inline-grid`则容器元素为行内元素
      - `grid-template-columns`和`grid-template-rows`
        - `grid-template-columns`属性设置列宽，`grid-template-rows`属性设置行高
          ```javascript
          .wrapper {
            display: grid
            //  声明了三列，宽度分别为 200px 200px 200px 
            grid-template-columns: 200px 200px 200px
            grid-gap: 5px
            //  声明了两行 行高分别为 50px 50px  
            grid-template-rows: 50px 50px
          }
          ```
          - 上述代码可以看到重复写单元格宽高，通过使用`repeat()`函数，可以简写重复的值
            - 第一个参数是重复的次数
            - 第二个参数是重复的值
          - 所以上述代码可以简写成：
          ```javascript
          .wrapper {
            display: grid
            grid-template-columns: repeat(3,200px)
            grid-gap: 5px
            grid-template-rows:repeat(2,50px)
          }
          ```
          - 除了上述的`repeat()`函数，还有：
            - `auto-fill`：示自动填充，让一行（或者一列）中尽可能的容纳更多的单元格
            ```javascript
            .wrapper {
              display: grid
              // 表示列宽是 200px，但列的数量是不固定的
              // 只要浏览器能够容纳得下，就可以放置元素
              grid-template-columns: repeat(auto-fill, 200px)
              grid-gap: 5px
              // 表示行高是 50px，但列的数量是不固定的
              // 只要浏览器能够容纳得下，就可以放置元素
              grid-template-rows:repeat(auto-fill,50px)
            }
            ```
            - `fr`：片段，为了方便表示比例关系
            ```javascript
            .wrapper {
              display: grid
              // 表示第一个列宽设置为 200px
              // 后面剩余的宽度分为两部分，宽度分别为剩余宽度的 1/3 和 2/3
              grid-template-columns: 200px 1fr 2fr
              grid-gap: 5px
              // 表示第一个行高设置为 50px
              // 后面剩余的宽度分为两部分，宽度分别为剩余宽度的 1/3 和 2/3
              grid-template-rows: 50px 1fr 2fr
            }
            ```
            - `minmax`：产生一个长度范围，表示长度就在这个范围之中都可以应用到网格项目中。第一个参数就是最小值，第二个参数就是最大值
            ```javascript
            .wrapper {
              display: grid
              // minmax(100px, 1fr)表示列宽不小于100px，不大于1fr
              grid-template-columns: 1fr 1fr minmax(100px, 1fr)
              grid-gap: 5px
              // minmax(50px, 1fr)表示行高不小于50px，不大于1fr
              grid-template-rows: 1fr 1fr minmax(50px, 1fr)
            }
            ```
            - `auto`：由浏览器自己决定长度
            ```javascript
            .wrapper {
              display: grid
              // 表示第一第三列为 100px，中间由浏览器决定长度
              grid-template-columns: 100px auto 100px
              grid-gap: 5px
              // 表示第一第三行为 50px，中间由浏览器决定长度
              grid-template-rows: 50px auto 50px
            }
            ```
      - `grid-row-gap`，`grid-column-gap`，`grid-gap`属性
        - `grid-row-gap`属性和`grid-column-gap`属性分别设置行间距和列间距
        - `grid-gap`属性是两者的简写形式：
        ```javascript
        .wrapper{
          // 表示行间距是 10px
          grid-row-gap: 10px
          // 表示列间距是 20px 
          grid-column-gap: 20px
          // 等同上述两个属性
          grid-gap: 10px 20px
        }
        ```
      - `grid-template-areas`属性
        - 用于定义区域，一个区域由一个或者多个单元格组成
        ```javascript
        .container {
          display: grid
          grid-template-columns: 100px 100px 100px
          grid-template-rows: 100px 100px 100px
          grid-template-areas: 'a b c'
                               'd e f'
                               'g h i'
        }
        ```
        - 上面代码先划分出`9`个单元格，然后将其定名为`a`到`i`的九个区域，分别对应这九个单元格
        - 多个单元格合并成一个区域的写法如下：
        ```javascript
        .container {
          display: grid
          grid-template-columns: 100px 100px 100px
          grid-template-rows: 100px 100px 100px
          grid-template-areas: 'a a a'
                               'b b b'
                               'c c c'
        }
        ```
        - 上面代码将9个单元格分成a、b、c三个区域，如果某些区域不需要利用，则使用"点"（`.`）表示
      - `grid-auto-flow`属性
        - 划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格
        - 顺序就是由grid-auto-flow决定，默认为行(`grid-auto-flow: row`)，代表"先行后列"，即先填满第一行，再开始放入第二行
        ![pic](/grid3.png "notice")
        - 当修改成column后(`grid-auto-flow: column`)，放置变为如下：
        ![pic](/grid4.png "notice")
      - `justify-items`，`align-items`，`place-items`属性
        - `justify-items`：设置单元格内容的水平位置（左中右）
        - `align-items`：设置单元格的垂直位置（上中下）
        - `place-items`：是`align-items`属性和`justify-items`属性的合并简写形式
        - 两者属性的值完成相同，属性对应如下：
          - `start`：对齐单元格的起始边缘
          - `end`：对齐单元格的结束边缘
          - `center`：单元格内部居中
          - `stretch`：拉伸，占满单元格的整个宽度（默认值）
      - `justify-content`、`align-content`、`place-content`属性
        - `justify-content`：是整个内容区域在容器里面的水平位置（左中右）
        - `align-content`：是整个内容区域的垂直位置（上中下）
        - `place-content`：是`align-content`属性和`justify-content`属性的合并简写形式。
        - 两者属性的值完成相同，属性对应如下：
          - `start`：对齐容器的起始边框
          - `end`：对齐容器的结束边框
          - `center`：容器内部居中
          - `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍
          - `space-between`：项目与项目的间隔相等，项目与容器边框之间没有间隔
          - `space-evenly`：项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔
          - `stretch`：项目大小没有指定时，拉伸占据整个网格容器
          ![pic](/grid5.png "notice")
          ![pic](/grid6.png "notice")
      - `grid-auto-columns`、`grid-auto-rows`属性
        - 有时候，一些项目的指定位置，在现有网格的外部。比如网格只有3列，但是某一个项目指定在第5行。这时，浏览器会自动生成多余的网格，以便放置项目
        - `grid-auto-columns`属性和`grid-auto-rows`属性用来设置，浏览器自动创建的多余网格的列宽和行高
    - 项目属性：
      - `grid-column-start`、`grid-column-end`、`grid-row-start`、`grid-row-end`属性
        - 指定网格项目所在的四个边框，分别定位在哪根网格线，从而指定项目的位置：
          - `grid-column-start`：左边框所在的垂直网格线
          - `grid-column-end`：右边框所在的垂直网格线
          - `grid-row-start`：上边框所在的水平网格线
          - `grid-row-end`：下边框所在的水平网格线
      - `grid-area`属性
        - `grid-area`：指定项目放在哪一个区域
        - 与上述讲到的`grid-template-areas`搭配使用
        ```javascript
        .item-1 {
          grid-area: e
        }
        ```
        - 意思为将1号项目位于`e区域`
      - `justify-self`、`align-self`、`place-self`属性
        - `justify-self`属性设置单元格内容的水平位置（左中右），跟`justify-items`属性的用法完全一致，但只作用于单个项目
        - `align-self`属性设置单元格内容的垂直位置（上中下），跟`align-items`属性的用法完全一致，也是只作用于单个项目
        - `place-self`属性是`align-self`属性和`justify-self`属性的合并简写形式：
          ```javascript
          .item{
            place-self: <align-self> <justify-self>
          }
          ```
        - 这两个属性都可以取下面四个值：
          - start：对齐单元格的起始边缘
          - end：对齐单元格的结束边缘
          - center：单元格内部居中
          - stretch：拉伸，占满单元格的整个宽度（默认值）
          ```javascript
          .item {
            justify-self: start | end | center | stretch
            align-self: start | end | center | stretch
          }
          ```
:::


## 16. CSS3动画有哪些？

:::warning transition(实现渐变动画)
  - `transition`的属性如下：
    - `property`：填写需要变化的css属性
    - `duration`：完成过渡效果需要的时间单位(s或者ms)
    - `timing-function`：完成效果的速度曲线
      - `linear`：匀速（等于 cubic-bezier(0,0,1,1)）
      - `ease`：从慢到快再到慢（cubic-bezier(0.25,0.1,0.25,1)）
      - `ease-in`：慢慢变快（等于 cubic-bezier(0.42,0,1,1)）
      - `ease-out`：慢慢变慢（等于 cubic-bezier(0,0,0.58,1)）	
      - `ease-in-out`：先变快再到慢（等于 cubic-bezier(0.42,0,0.58,1)），渐显渐隐效果
      - `cubic-bezier(n,n,n,n)`：在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值
    - `delay`: 动画效果的延迟触发时间
    - 举个例子：
      ```html
      <div class="box"></div>
      ```
      ```css{5}
      .box {
        width: 100px;
        height: 100px;
        background-color: red;
        transition: all 1s linear;
      }
      .box:hover {
        background-color: green;
        width:200px;
        height:200px;
      }
      ```
:::

:::warning transform(转变动画)
  - 包含四个常用的功能：
    - `translate`：位移
    - `scale`：缩放
    - `rotate`：旋转
    - `skew`：倾斜
  - 一般配合`transition`过度使用，注意的是，`transform不支持inline元素，使用前把它变成block`
  - 举个例子：
    ```html
    <div class="box"></div>
    ```
    ```css{5,11-14}
    .box {
        width: 100px;
        height: 100px;
        background-color: red;
        transition: all 1s linear
    }
    .box:hover {
        background-color: green;
        width:200px;
        height:200px;
        transform:rotate(360deg); 
        /* transform: translate(120px, 120px); */
        /* transform: scale(2, 0.5); */
        /* transform: skew(30deg, 20deg); */
    }
    ```
:::

:::warning animation(自定义动画)
  - animation是由 8 个属性的简写，分别如下：
    | 属性                                   | 描述                                                              | 属性值                                        |
    | :------------------------------------- | :---------------------------------------------------------------- | :-------------------------------------------- |
    | animation-duration                     | 指定动画完成一个周期所需要时间，单位秒（s）或毫秒（ms），默认是 0 |                                               |
    | animation-timing-function              | 指定动画计时函数，即动画的速度曲线，默认是 "ease"                 | linear、ease、ease-in、ease-out、ease-in-out  |
    | animation-delay                        | 指定动画延迟时间，即动画何时开始，默认是 0                        |                                               |
    | animation-iteration-count              | 指定动画播放的次数，默认是 1                                      |                                               |
    | animation-direction 指定动画播放的方向 | 默认是 normal                                                     | normal、reverse、alternate、alternate-reverse |
    | animation-fill-mode                    | 指定动画填充模式。默认是 none                                     | forwards、backwards、both                     |
    | animation-play-state                   | 指定动画播放状态，正在运行或暂停。默认是 running                  | running、pauser                               |
    | animation-name                         | 指定 @keyframes 动画的名称指定 @keyframes 动画的名称              |                                               |
  - 通过`@keyframes`来定义关键帧，CSS动画只需要定义一些关键的帧，而其余的帧，浏览器会根据计时函数插值计算出来
  - 举个例子：
    ```html
    <div class="box"></div>
    ```
    ```css{7,10-15}
    .box{
      width:100px;
      height:100px;
      background-color:red;
    }
    .box:hover{
        animation: rotate 1s;
        background-color:green;
    }
    @keyframes rotate {
      from { 
        transform: rotate(0deg);
      }
      to { 
        transform: rotate(360deg);
      }
    }
    ```
:::

:::tip 总结
  | 属性               | 描述                                                                                                      |
  | :----------------- | :-------------------------------------------------------------------------------------------------------- |
  | transition（过度） | 用于设置元素的样式过度，和animation有着类似的效果，但细节上有很大的不同                                   |
  | transform（变形）  | 用于元素进行旋转、缩放、移动或倾斜，和设置样式的动画并没有什么关系，就相当于color一样用来设置元素的“外表” |
  | animation（动画    | 用于设置动画属性，他是一个简写的属性，包含6个属性                                                         |
:::