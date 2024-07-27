# HTML & CSS
## 1. HTML语义化
:::info HTML语义化
  - 正确的标签做正确的事情
  - 适合搜索引擎的爬虫爬取有效信息，
  - 有利于 SEO
  - 支持读屏软件
  - 增强了可读性，结构更加清晰，便于团队的开发与维护
  :::
## 2. HTML5新特性
:::info HTML5新特性
  - 多媒体，用于媒介回放的 `video` 和 `audio` 元素。
  - 图像效果，用于绘画的 `canvas` 元素，`svg` 元素等。
  - 离线&存储，对本地离线存储能够更好地支持，比如 `localStorage`,`Cookies` 等。
  - 性能与集成特性，`HTML5` 会通过 `XML HttpRequest2`等技术，帮助您的 `Web` 应用和网站在多样化的环境中更快速地工作
:::
## 3. 行内元素 块级元素 空(void)元素
:::info 行内元素 块级元素 空(void)元素
  - 行内元素：`span` `img` `input` `select` `strong`
  - 块级元素：`div` `ul` `ol` `li` `dl` `dt` `dd` `h1` `h2` `h3` `h4` `h5` `h6` `p`
  - 空(void)元素：`br` `hr` `img` `input` `link` `meta`
:::
## 4. link 和@import 的区别
:::info 区别
  -  `link` 引用 `CSS` 时，在页面载入时同时加载；`@import` 需要页面网页完 全载入以后加载
  - ` link` 是 `XHTML` 标签，无兼容问题；`@import` 是在 CSS2.1 提出的，低版本的浏览器不支持
  -  `link` 支持使用 `Javascript` 控制 `DOM` 去改变样式；而 `@import` 不支持
:::
## 5. CSS3 中有哪些新特性
:::info 新特性
  - `border-radius` 圆角属性 border-radius: 10px;
  - `text-shadow` 文字阴影 text-shadow: 1px 1px 2px black;
  - `gradient` 线性渐变 background: linear-gradient(blue, pink);
  - `transform` 位移，旋转，缩放 transform: translate(50px 50px);
  - `transition` 过渡 transition: all .3s ease;
  - `animation` 动画 animation: 3s ease-in 1s infinite reverse both running slidein;
:::
## 6. CSS 选择器及优先级
:::info 选择器
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
:::info 优先级
- !important
- 内联样式（1000）
- ID 选择器（0100）
- 类选择器/属性选择器/伪类选择器（0010）
- 元素选择器/伪元素选择器（0001）
- 关系选择器/通配符选择器（0000）
:::
## 7.  CSS 布局单位
:::info CSS 布局单位
- `px`: 像素单位
- `rpx`: 小程序布局单位
- `%`: 相对于父元素的百分比单位
- `em`: 相对单位 1em 等同于父元素的文字大小
- `rem`: 相对单位 1rem 等同于 html 根元素的文字大小
- `vh`: 相对单位 1vh 等同于屏幕高度的 1%
- `vw`: 相对单位 1vw 等同于屏幕快读的 1%
- `vmin`: 选取 vh 和 vw 的最小值为基准
- `vmax`: 选取 vh 和 vw 的最大值为基准
:::


## 8. script 标签中属性 async 和 defer 的区别
  ```html
  <script src='xxx'></script>
  <script src='xxx' async></script>
  <script src='xxx' defer></script>
  ```
  ::: tip 区别
  - `script` 会阻碍 `HTML` 解析，只有下载好并执行完脚本才会继续解析 `HTML`
  - `async script`：解析 `HTML` 的过程中会进行脚本的异步下载，下载成功后立马执行，因此有可能会阻断 `HTML` 的解析。多个脚本的执行顺序无法保证
  - `defer script`：也是异步下载脚步，加载完成后，如果此时 `HTML` 还没有解析完，浏览器不会暂停解析去执行 `JS` 代码，而是等待 `HTML` 解析完毕再执行 `JS` 代码
  :::
  :::info 继续比较
  | script 标签  |   JS 执行顺序    | 是否阻塞解析 HTML      |
  | ------------ | :--------------: | ---------------------- |
  | script       | 在 HTML 中的顺序 | 阻塞                   |
  | script async | 网络请求返回顺序 | 可能阻塞，也可能不阻塞 |
  | script defer | 在 HTML 中的顺序 | 不阻塞                 |

  

  ![图片描述](/script.png)
  :::
## 9. 盒模型
  :::info 定义
  - `IE` 盒模型： `width` + `height` + `padding` + `border`
  - `W3C` 标准盒模型： `width` + `height，不包含` `border` 和 `padding`
  :::
## 10. BFC
:::info 定义:
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


## 11. 两栏布局
:::info 两栏布局
- 利用浮动，左边元素宽度固定，设置向左浮动。将右边元素的 `margin-left` 设为固定宽度 。注意，因为右边元素的 `width` 默认为 `auto`，所以会自动撑满父元素
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
- 同样利用浮动，左边元素宽度固定，设置向左浮动。右侧元素设置`overflow`:`hidden` 这样右边就触发了`BFC` ，`BFC`的区域不会与浮动元素发生重叠，所以两侧就不会发生重叠
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
- 利用`flex`布局，左边元素固定宽度，右边的元素设置`flex`: 1
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
- 利用绝对定位，父级元素设为相对定位。左边元素`absolute`定位，宽度固定。右边元素的`margin-left`的值设为左边元素的宽度值
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
- 利用绝对定位，父级元素设为相对定位。左边元素宽度固定，右边元素`absolute`定位，`left`为宽度大小，其余方向定位为0
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
:::
## 12. 三栏布局
:::info 圣杯布局

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
:::
:::info 双飞翼布局

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
:::
:::tip 总结：
- 使用`float`布局
- 两侧使用`margin`负值，以便和中间内容横向重叠
- 防止中间内容被两侧覆盖，圣杯布局用`padding`，双飞翼布局用`margin`
:::
## 13. 水平垂直居中
:::info 绝对定位
- 设置`left`: 50%和`top`:50%,现将子元素左上角移到父元素中心位置，然后再通过`translate`来调整子元素的中心点到父元素的中心。(该方法可以不定宽高)
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
:::

:::info 绝对定位
- 子元素所有方向都为0，将`margin`设置为`auto`，由于宽高固定，对应方向实现平分(该方法必须定宽高)
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
- 设置`left`:50%和`top`:50%现将子元素左上角移到父元素中心位置，然后再通过`margin-left`和`margin-top`以子元素自己的一半宽高进行负值赋值。(该方法必须定宽高)
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
:::

:::info flex
- 利用`flex`，最经典最方便的一种了，不用解释，定不定宽高无所谓的
  ```css
  .father {
    display: flex
    justify-content: center
    align-items: center
  }
  ``` 
- 也是`flex`，需要定义`min-height`
  ```css{3,10}
  .father{
    display:flex;
    min-height:100vh;
  }
  .son {
    width: 200px;
    height: 200px;
    border:1px red solid;
    background-color:red;
    margin:auto;
  }
  ```
:::
:::info 利用`grid`(该方法必须定宽高)
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
:::
## 14. 清除浮动
:::info 定义
 - 非IE浏览器下，容器不设高度且子元素浮动时，容器高度不能被内容撑开
 - 内容会溢出到容器外面而影响布局。这种现象被称为浮动（溢出）
:::
:::info 浮动的工作原理
 - 浮动元素脱离文档流，不占据空间（引起“高度塌陷”现象）
 - 浮动元素碰到包含它的边框或者其他浮动元素的边框停留
:::
:::info 浮动元素引起的问题
 - 父元素的高度无法被撑开，影响与父元素同级的元素
 - 与浮动元素同级的非浮动元素会跟随其后
 - 若浮动的元素不是第一个元素，则该元素之前的元素也要浮动，否则会影响页面的显示结构
:::
:::info 清除浮动的方式如下
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
## 15. 伪元素和伪类的区别
:::info 伪元素
  - 在内容元素的前后插入额外的元素或样式，但是这些元素实际上并不在文档中生成
  - 它们只在外部显示可见，但不会在文档的源代码中找到它们，因此，称为“伪”元素

  ```css
  p::before {content:"第一章：";}
  p::after {content:"Hot!";}
  p::first-line {background:red;}
  p::first-letter {font-size:30px;}
  ```
:::
:::info 伪类
  - 将特殊的效果添加到特定选择器上
  - 它是已有元素上添加类别的，不会产生新的元素
  ```css
  a:hover {color: blue}
  p:first-child {color: green}
  ```
:::



## 16. Flex
:::info flex
  - `Flexible Box`简称`flex`，意为”弹性布局”，可以简便、完整、响应式地实现各种页面布局
  - 采用`Flex`布局的元素，称为`flex`容器`container`
  - 它的所有子元素自动成为容器成员，称为`flex`项目`item`
  ![pic](/flex1.png "notice")
  - 容器中默认存在两条轴，主轴和交叉轴，呈90度关系。项目默认沿主轴排列，通过`flex-direction`来决定主轴的方向
  - 每根轴都有起点和终点，这对于元素的对齐非常重要
:::
:::info 属性
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

## 17. Grid

:::info Grid
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

:::info 属性
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


## 18. CSS3动画有哪些？

:::info transition(实现渐变动画)
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

:::info transform(转变动画)
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

:::info animation(自定义动画)
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

#### 总结
  |        属性        | 描述                                                                                                      |
  | :----------------: | :-------------------------------------------------------------------------------------------------------- |
  | transition（过度） | 用于设置元素的样式过度，和animation有着类似的效果，但细节上有很大的不同                                   |
  | transform（变形）  | 用于元素进行旋转、缩放、移动或倾斜，和设置样式的动画并没有什么关系，就相当于color一样用来设置元素的“外表” |
  |  animation（动画   | 用于设置动画属性，他是一个简写的属性，包含6个属性                                                         |



## 19. 重排与重绘

:::info 重排与重绘
  - 具体的浏览器解析渲染机制如下所示：
    1. `HTML`被`HTML`解析器解析成`DOM`树
    2. `CSS`被`CSS`解析器解析成`CSSOM`树
    3. 结合`DOM`树和`CSSOM`树，生成一棵渲染树(`Render Tree`)
    4. 生成布局（`flow`），即将所有渲染树的所有节点进行平面合成
    5. 将布局绘制（`paint`）在屏幕上
  - 第四步和第五步是最耗时的部分，这两步合起来，就是我们通常所说的渲染（如下图）
  ![pic](/reflow1.png "notice")
  - 当元素的样式发生变化时，浏览器需要触发更新，重新绘制元素
  - 这个过程中，有两种类型的操作，即重排与重绘
    - 重排(`reflow`)：当元素的尺寸、结构或触发某些属性时，浏览器会重新渲染页面，称为重排。此时，浏览器需要重新经过计算，计算后还需要重新页面布局，因此是较重的操作
    - 会触发回流的操作：
      - 页面初次渲染
      - 浏览器窗口大小改变
      - 元素尺寸、位置、内容发生改变
      - 元素字体大小变化
      - 添加或者删除可见的`dom`元素
      - 激活`CSS`伪类（例如：`:hover`）
      - 查询某些属性或调用某些方法：
      	- clientWidth、clientHeight、clientTop、clientLeft
      	- offsetWidth、offsetHeight、offsetTop、offsetLeft
      	- scrollWidth、scrollHeight、scrollTop、scrollLeft
      	- getComputedStyle()
      	- getBoundingClientRect()
      	- scrollTo()
  
    - 重绘(`repaint`)：当元素样式的改变不影响布局时，浏览器将使用重绘对元素进行更新，此时由于只需要`UI`层面的重新像素绘制，因此损耗较少
  - `回流必定触发重绘，重绘不一定触发回流。重绘的开销较小，回流的代价较高`
:::
## 20. 什么是响应式设计？

:::info  响应式
  - 响应式网站设计（`Responsive Web design`）是一种网络页面设计布局，页面的设计与开发应当根据用户行为以及设备环境(系统平台、屏幕尺寸、屏幕定向等)进行相应的响应和调整
  - 响应式网站常见特点：
    - 同时适配PC + 平板 + 手机等
    - 标签导航在接近手持终端设备时改变为经典的抽屉式导航
    - 网站的布局会根据视口来调整模块的大小和位置
    ![pic](/viewport1.png "notice")
:::

:::info 实现方式
  - 响应式设计的基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理，为了处理移动端，页面头部必须有`meta`声明`viewport`
    ```javascript
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no”>
    ```
  - 属性对应如下：
    - `width=device-width`：是自适应手机屏幕的尺寸宽度
    - `maximum-scale`：是缩放比例的最大值
    - `inital-scale`：是缩放的初始化
    - `user-scalable`：是用户的可以缩放的操作
  - 实现响应式布局的方式有如下：
    - 媒体查询
      - `CSS3`中的增加了更多的媒体查询，就像`if`条件表达式一样，我们可以设置不同类型的媒体条件，并根据对应的条件，给相应符合条件的媒体调用相对应的样式表
      - 使用@Media查询，可以针对不同的媒体类型定义不同的样式，如：
        ```css
        @media screen and (max-width: 1920px) { ... }
        @media screen (min-width: 375px) and (max-width: 600px) {
          body {
            font-size: 18px
          }
        }
        ```
    - 百分比
      - 通过百分比单位`% `来实现响应式的效果
      - 比如当浏览器的宽度或者高度发生变化时，通过百分比单位，可以使得浏览器中的组件的宽和高随着浏览器的变化而变化，从而实现响应式的效果
      - `height`、`width`属性的百分比依托于父标签的宽高，但是其他盒子属性则不完全依赖父元素：
        - 子元素的`top/left`和`bottom/right`如果设置百分比，则相对于直接非`static`定位(默认定位)的父元素的高度/宽度
        - 子元素的`padding`如果设置百分比，不论是垂直方向或者是水平方向，都相对于直接父亲元素的`width`，而与父元素的`height`无关
        - 子元素的`margin`如果设置成百分比，不论是垂直方向还是水平方向，都相对于直接父元素的`width`
        - `border-radius`不一样，如果设置`border-radius`为百分比，则是相对于自身的宽度
      - 可以看到每个属性都使用百分比，会照成布局的复杂度，所以不建议使用百分比来实现响应式
    - vw/vh
      - `vw`表示相对于视图窗口的宽度
      - `vh`表示相对于视图窗口高度
      - 任意层级元素，在使用`vw`单位的情况下，`1vw`都等于视图宽度的百分之一
    - rem
      - `rem`是相对于根元素`html`的`font-size`属性，默认情况下浏览器字体大小为`16px`，此时`1rem = 16px`
      - 可以利用前面提到的媒体查询，针对不同设备分辨率改变`font-size`的值，如下：
        ```css
        @media screen and (max-width: 414px) {
          html {
            font-size: 18px
          }
        }
        @media screen and (max-width: 375px) {
          html {
            font-size: 16px
          }
        }
        @media screen and (max-width: 320px) {
          html {
            font-size: 12px
          }
        }
        ```
      - 为了更准确监听设备可视窗口变化，我们可以在`css`之前插入`script`标签，内容如下：
        ```javascript
        //动态为根元素设置字体大小
        function init () {
          // 获取屏幕宽度
          var width = document.documentElement.clientWidth
          // 设置根元素字体大小。此时为宽的10等分
          document.documentElement.style.fontSize = width / 10 + 'px'
        }
        //首次加载应用，设置一次
        init()
        // 监听手机旋转的事件的时机，重新设置
        window.addEventListener('orientationchange', init)
        // 监听手机窗口变化，重新设置
        window.addEventListener('resize', init)
        ```
    - 无论设备可视窗口如何变化，始终设置`rem`为`width`的`1/10`，实现了百分比布局
    - 除此之外，我们还可以利用主流UI框架，如：`ElementUi`、`AntD`提供的栅格布局实现响应式
:::
:::tip 小结
  - 响应式设计实现通常会从以下几方面思考：
    - 弹性盒子（包括图片、表格、视频）和媒体查询等技术
    - 使用百分比布局创建流式布局的弹性`UI`，同时使用媒体查询限制元素的尺寸和内容变更范围
    - 使用相对单位使得内容自适应调节
    - 选择断点，针对不同断点实现不同布局和内容展示
:::

:::tip 总结
  - 响应式布局优点可以看到：
    - 面对不同分辨率设备灵活性强
    - 能够快捷解决多设备显示适应问题
  - 缺点：
    - 仅适用布局、信息、框架并不复杂的部门类型网站
    - 兼容各种设备工作量大，效率低下
    - 代码累赘，会出现隐藏无用的元素，加载时间加长
    - 其实这是一种折中性质的设计解决方案，多方面因素影响而达不到最佳效果
    - 一定程度上改变了网站原有的布局结构，会出现用户混淆的情况
:::

## 21. CSS提高性能的方法有哪些？
:::info 实现方式
  - 实现方式有很多种，主要有如下：
    - 内联首屏关键`CSS`
      - 在打开一个页面，页面首要内容出现在屏幕的时间影响着用户的体验，而通过内联`css`关键代码能够使浏览器在下载完`html`后就能立刻渲染
      - 而如果外部引用`css`代码，在解析`html`结构过程中遇到外部`css`文件，才会开始下载`css`代码，再渲染
      - 所以，`CSS`内联使用使渲染时间提前
      - 注意：但是较大的`css`代码并不合适内联（初始拥塞窗口、没有缓存），而其余代码则采取外部引用方式
    - 异步加载`CSS`
      - 在`CSS`文件请求、下载、解析完成之前，`CSS`会阻塞渲染，浏览器将不会渲染任何已处理的内容
      - 前面加载内联代码后，后面的外部引用`css`则没必要阻塞浏览器渲染。这时候就可以采取异步加载的方案，主要有如下：
        - 使用`javascript`将`link`标签插到`head`标签最后
          ```javascript
          // 创建link标签
          const myCSS = document.createElement( "link" )
          myCSS.rel = "stylesheet"
          myCSS.href = "mystyles.css"
          // 插入到header的最后位置
          document.head.insertBefore( myCSS, document.head.childNodes[ document.head.childNodes.length - 1 ].nextSibling )
          ```
        - 设置`link`标签`media`属性为`noexis`，浏览器会认为当前样式表不适用当前类型，会在不阻塞页面渲染的情况下再进行下载。加载完成后，将`media`的值设为`screen`或`all`，从而让浏览器开始解析`CSS`
          ```html
          <link rel="stylesheet" href="mystyles.css" media="noexist" onload="this.media='all'">
          ```
        - 通过`rel`属性将`link`元素标记为`alternate`可选样式表，也能实现浏览器异步加载。同样别忘了加载完成之后，将`rel`设回`stylesheet`
          ```html
          <link rel="alternate stylesheet" href="mystyles.css" onload="this.rel='stylesheet'">
          ```
    - 资源压缩
      - 利用`webpack`、`gulp/grunt`、`rollup`等模块化工具，将`css`代码进行压缩，使文件变小，大大降低了浏览器的加载时间
    - 合理使用选择器
      - `css`匹配的规则是从右往左开始匹配，例如`#markdown .content h3`匹配规则如下：
        - 先找到`h3`标签元素
        - 然后去除祖先不是`.content`的元素
        - 最后去除祖先不是`#markdown`的元素
      - 如果嵌套的层级更多，页面中的元素更多，那么匹配所要花费的时间代价自然更高
      - 所以我们在编写选择器的时候，可以遵循以下规则：
        - 不要嵌套使用过多复杂选择器，最好不要三层以上
        - 使用`id`选择器就没必要再进行嵌套
        - 通配符和属性选择器效率最低，避免使用
    - 减少使用昂贵的属性
      - 在页面发生重绘的时候，昂贵属性如`box-shadow`/`border-radius`/`filter`/`opacity`/`:nth-child`等，会降低浏览器的渲染性能
    - 不要使用`@import`
      - `css`样式文件有两种引入方式，一种是`link`元素，另一种是`@import`
      - `@import`会影响浏览器的并行下载，使得页面在加载时增加额外的延迟，增添了额外的往返耗时而且多个`@import`可能会导致下载顺序紊乱
      - 比如一个`css`文件`index.css`包含了以下内容：`@import url("reset.css")`那么浏览器就必须先把`index.css`下载、解析和执行后，才下载、解析和执行第二个文件`reset.css`
    - 其他：
      - 减少重排操作，以及减少不必要的重绘
      - 了解哪些属性可以继承而来，避免对这些属性重复编写
      - `cssSprite`，合成所有`icon`图片，用宽高加上`backgroud-position`的背景图方式显现出我们要的`icon`图，减少了`http`请求
      - 把小的`icon`图片转成`base64`编码
      - `CSS3`动画或者过渡尽量使用`transform`和`opacity`来实现动画，不要使用`left`和`top`属性
:::

:::tip 总结
  - `css`实现性能的方式可以从选择器嵌套、属性特性、减少`http`这三面考虑，同时还要注意`css`代码的加载顺序
:::


## 22. CSS 画图形

:::info 三角形
  ```html
  <div class="box"></div>
  ```
  ```css
  .box {
    width: 0px;
    height: 0px;
    border-style:solid;
    border-width: 100px ;
    border-color: green red yellow blue;
    border-color:transparent transparent green 
  }
  ```
:::
:::info 空心三角形
  ```html
  <div class="box"></div>
  ```
  ```css
  .box {
    width: 0px;
    height: 0px;
    border-style:solid;
    border-width: 50px;
    border-color:transparent transparent red transparent;
    position: relative;
  }
  .box:after{
    content: '';
    border-style:solid;
    border-width:40px;
    border-color: transparent transparent #eee transparent;
    position: absolute;
    top: -34px;
    left: -40px;
  } 
  ```
  :::
:::info 麻将
- 一饼
```html
<div class="main">
  <div></div>
</div>
```
```css
.main {
  width: 100px;
  height: 200px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main div {
  width: 50px;
  height: 50px;
  background-color: aquamarine;
  border-radius: 50%;
}
```
- 二饼
```html
<div class="main">
  <div></div>
  <div></div>
</div>
```
```css{8}
.main {
  width: 100px;
  height: 200px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
.main div {
  width: 50px;
  height: 50px;
  background-color: aquamarine;
  border-radius: 50%;
}
```
- 三饼
```html
<div class="main">
  <div></div>
  <div></div>
  <div></div>
</div>
```
```css{17,20}
.main {
  width: 100px;
  height: 200px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
.main div {
  width: 50px;
  height: 50px;
  background-color: aquamarine;
  border-radius: 50%;
}
.main div:nth-child(1) {
  align-self: flex-start;
}
.main div:nth-child(3) {
  align-self: flex-end;
}
```
- 四饼
```html
<div class="main">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```
```css{6}
.main {
  width: 100px;
  height: 200px;
  border: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.main div {
  width: 50px;
  height: 50px;
  background-color: aquamarine;
  border-radius: 50%;
}
```
- 五饼
```html
<div class="main">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```
```css{17}
.main {
  width: 100px;
  height: 200px;
  border: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}
.main div {
  width: 50px;
  height: 50px;
  background-color: aquamarine;
  border-radius: 50%;
}
.main div:nth-child(3) {
  margin-left: 25px;
}
```
- 六饼
```html
<div class="main">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```
```css{6}
.main {
  width: 100px;
  height: 200px;
  border: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}
.main div {
  width: 50px;
  height: 50px;
  background-color: aquamarine;
  border-radius: 50%;
}
```
- 七饼
```html
<div class="main">
  <div></div>
  <div></div>
  <div></div>
</div>
<div class="footer">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```
```css{6,12-13,25,28}
.main {
  border: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  border-bottom:none;
}
.footer {
  border: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  border-top:none
}
.main div,.footer div  {
  width: 40px;
  height: 40px;
  background-color: aquamarine;
  border-radius: 50%;
}

.main div:nth-child(1) {
  align-self: flex-start;
}
.main div:nth-child(3) {
  align-self: flex-end;
}
body{
  width: 100px;
  height: 200px;
}
```
- 八饼
```html
<div class="main">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```
```css{8,11-12}
.main {
width: 100px;
height: 200px;
border: 1px solid #ccc;
display: flex;
justify-content: space-between;
align-items: center;
flex-wrap:wrap;
}
.main div  {
  width: 50px;
  height: 50px;
  background-color: aquamarine;
  border-radius: 50%;
}
```
- 九饼
```html
<div class="main">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```
```css{6,11-12}
.main {
width: 100px;
height: 200px;
border: 1px solid #ccc;
display: flex;
justify-content: space-around;
align-items: center;
flex-wrap:wrap;
}
.main div  {
  width: 30px;
  height: 30px;
  background-color: aquamarine;
  border-radius: 50%;
}
```
:::

## 23. CSS隐藏盒子的方式？
:::info 多种方式
  - `display: none`;：渲染树不会包含该渲染对象，因此该元素不会在页面中占据位置，也不会响应绑定的监听事件
  - `visibility: hidden;`：元素在页面中仍占据空间，但是不会响应绑定的监听事件
  - `opacity: 0;`：将元素的透明度设置为 0，以此来实现元素的隐藏。元素在页面中仍然占据空间，并且能够响应元素绑定的监听事件
  - `height: 0; width: 0`：将元素的高度和宽度设置为零，可以将其隐藏。这种方法只适用于元素的大小已经被固定的情况
  - `position: absolute; left: -9999px;`：将元素定位到屏幕左上角之外，使其不可见
  - `transform: scale(0);`：对元素进行缩放
  - `transform: translate(-1000px,-1000px);`：对元素进行缩放
  - `clip-path: circle(0);`：该属性指定元素应该被剪切的区域。使用这种方法可以将元素的内容隐藏，但它仍然占用空间
:::
:::info `display: none`与`visibility: hidden`的区别
   - `display: none`的元素不占据任何空间，`visibility: hidden`的元素空间保留；
   - `display: none`会影响`css3`的`transition`过渡效果，`visibility: hidden`不会
   - `display: none`隐藏产生重排和重绘，`visibility: hidden`只会触发重绘
   - `display: none`的节点和子孙节点元素全都不可见，`visibility: hidden`的节点的子孙节点元素可以设置`visibility: visible`显示；`visibility: hidden`属性值具有继承性，所以 子孙元素默认继承了`hidden`而隐藏，但是当子孙元素重置为`visibility: visible`就不会被隐藏
:::