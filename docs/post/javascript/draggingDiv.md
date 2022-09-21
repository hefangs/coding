


# 可拖拽的div


## js实现一个可以拖拽的div

```js
document.body.style.margin = 0
document.body.style.padding = 0
let newDiv = document.createElement("div")
newDiv.style.position = "absolute"
newDiv.style.width = "100px"
newDiv.style.height = "100px"
newDiv.style.border = "2px red solid"
document.body.appendChild(newDiv)
let dragging = false
let position = []
newDiv.addEventListener("mousedown", e => {
  dragging = true
  position = [e.pageX, e.pageY]
  // console.log(e.pageX, e.pageY, "===>初始位置")
})
document.addEventListener("mousemove", e => {
  if (dragging) {
    let x = e.pageX
    let y = e.pageY
    // console.log(e.pageX, e.pageY, "===>移动位置")
    let deltaX = x - position[0]
    let deltaY = y - position[1]
    // console.log(deltaX, deltaY, "===>位移距离")
    let left = parseInt(newDiv.style.left || 0)
    let top = parseInt(newDiv.style.top || 0)
    // console.log(left, top, "===>left,top")
    newDiv.style.left = left + deltaX + "px"
    newDiv.style.top = top + deltaY + "px"
    // 判断不能移出屏幕左侧
    if (left < 0) {
      newDiv.style.left = 0
    }
    // 判断不能移出屏幕上方
    if (top < 0) {
      newDiv.style.top = 0
    }
    position = [x, y]
  }
})
document.addEventListener("mouseup", e => {
  dragging = false
})
```