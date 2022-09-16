

 # 节流


### 原理

节流（`throttle`）：在规定的时间间隔内不会触发，只有大于时间间隔才会触发，把频繁触发变为少量触发



代码：
```js
function throttle(fn, delay) {
  let timer
  let lastTime = Date.now()
  return function () {
    let currentTime = Date.now()
    if (timer) clearTimeout(timer)
    if (currentTime - lastTime > delay) {
      fn.apply(this, arguments)
      lastTime = currentTime
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, delay)
    }
  }
}
let mouseMove = throttle(e => {
  console.log(e.pageX, e.pageY)
}, 1000)
document.querySelector("#div").addEventListener("mousemove", mouseMove)
```

