

 # 防抖


### 原理

防抖（`debounce`）：在事件被触发`n`秒后再执行回调，如果再这n秒内事件又被触发，则重新计算，最终只执行一次。



代码：
```js
function debounce(fn,delay){
  let timer
  return function(){
    if(timer) && clearTimeout(timer)
    timer =  setTimeout(()=>{
      fn.apply(this,arguments)
    },delay)
  }
}
let onInput = debounce(e=>{
  console.log(e.target.value)
},1000)
document.querySelector('input').addEventListener('input',onInput)
```

