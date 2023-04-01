


# 懒加载 

## 图片的懒加载
 ### 思路:
- 把图片真正的URL放在另一个属性`data-src`中
- 然后遍历所有的图片是否到达可视区域
- 到达可视区域后把`data-src`值赋给`src`

```js
let imgList = document.querySelectorAll("img")
function lazyLoad() {
  // 获取屏幕可视窗口高度
  let clientHeight = document.documentElement.clientHeight
  // 获取滚动条滚动的距离
  let scrollTop = document.documentElement.scrollTop
  for(let i = 0; i < imgList.length; i++){
    if(imgList[i].offsetTop < clientHeight + scrollTop){
      if(imgList[i].getAttribute("src") == default.jpg){
        imgList[i].src = imgList[i].getAttribute("data-src")
      }
    }
  }
}
```
## 通过IntersectionObserver实现
- `IntersectionObserver` 接口（从属于 `Intersection Observer API`）提供了一种异步观察目标元素与其祖先元素或顶级文档视口（`viewport`）交叉状态的方法
- 其祖先元素或视口被称为根（`root`）
```javascript
IntersectionObserver
```