


# 懒加载 

## 图片的懒加载
 ### 思路:
- 把图片真正的URL放在另一个属性data-src中
- 然后遍历所有的图片是否到达可视区域
- 到达可视区域后给src设置真实的图片地址

**如何判断元素是否在可视区域**
1. 通过`document.documentElement.clientHeight`获取屏幕可视窗口高度
2. 通过`document.documentElement.scrollTop`获取滚动条滚动的距离
3. 通过`element.offsetTop`获取元素相对于文档顶部的距离

```js
let num = document.getElementByTagName("img")
let n = 0 // 存储图片加载到的位置，避免每次都从第一张图片开始遍历
function lazyLoad() {
  let seeHeight = document.documentElement.clientHeight
  let scrollTop = document.documentElement.scrollTop
  for(let i = n; i < num.length; i++){
    if(img[i].offsetTop < seeHeight + scrollTop){
      if(img[i].getAttribute("src") == default.jpg){
        img[i].src = img[i].getAttribute("data-src")
      }
    }
  }
}
```
## IntersectionObserver
##### `IntersectionObserver` 接口（从属于 `Intersection Observer API`）提供了一种异步观察目标元素与其祖先元素或顶级文档视口（`viewport`）交叉状态的方法。其祖先元素或视口被称为根（`root`）
```javascript
IntersectionObserver
```