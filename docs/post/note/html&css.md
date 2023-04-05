## 1. BFC
- 定义:
   - 块级格式化上下文
   - 是一个独立的渲染区域，让处于`BFC`内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响

- 触发条件：
   - 根元素
   - `position`: `absolute`/`fixed`
   - `display`: `inline-block` /`table`
   - `float`元素
   - `overflow` !== `visible`

- 规则：
   - 属于同一个`BFC`的两个相邻`Box`垂直排列
   - 属于同一个`BFC`的两个相邻`Box`的`margin`会发生重叠
   - `BFC`中子元素的左边 `margin`，与包含块 (`BFC`) `border` `box`的左边相接触
   - `BFC`的区域不会与 `float` 的元素区域重叠
   - 计算 `BFC` 的高度时，浮动子元素也参与计算


## 2. 两栏布局
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

## 3. 三栏布局
- 圣杯布局
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
- 双飞翼布局
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
**总结：**
- 使用`float`布局
- 两侧使用`margin`负值，以便和中间内容横向重叠
- 防止中间内容被两侧覆盖，圣杯布局用`padding`，双飞翼布局用`margin`

## 4. 水平垂直居中
- 利用绝对定位，设置`left`: 50%和`top`:50%,现将子元素左上角移到父元素中心位置，然后再通过`translate`来调整子元素的中心点到父元素的中心。(该方法可以不定宽高)
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
- 利用绝对定位，子元素所有方向都为0，将`margin`设置为`auto`，由于宽高固定，对应方向实现平分。(该方法必须定宽高)
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

- 利用绝对定位，设置`left`:50%和`top`:50%现将子元素左上角移到父元素中心位置，然后再通过`margin-left`和`margin-top`以子元素自己的一半宽高进行负值赋值。(该方法必须定宽高)
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
- 利用`flex`，最经典最方便的一种了，不用解释，定不定宽高无所谓的
```css
.father {
  display: flex
  justify-content: center
  align-items: center
}
``` 

  - 利用`grid`(该方法必须定宽高)
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