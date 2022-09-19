
 # 手写call,apply,bind方法

## call

- 可以改变函数指向
- 第一个参数是要改变指向的对象
- 之后的参数形式是 `arg1`, `arg2`... 的形式
  
```js
Function.prototype.myCall = function (context,...args){
  // 为null和undefined的this值会自动指向全局对象
  if(context === undefined || context === null){
    context = windows
  }else{
     // 值为原始值（数字，字符串，布尔值)的this会指向该原始值的实例对象
    context = Object(context)
  }
  // 用 Symbol 是防止跟上下文的原属性冲突
  const fn = Symbol()
  context[fn] = this
  let result = context[fn](...args)
  //把函数删除掉,为了还原外部obj对象,把添加到他上边的属性再删除掉
  delete context[fn]
  return result
}
```
## apply

- 可以改变函数指向
- 第一个参数与call相同,为函数内部this指向
- 函数的参数，则以数组的形式传递，作为apply第二参数
  
```js
Function.prototype.myApply = function (context,args){
  if(context === undefined || context === null){
    context = windows
  }else{
    context = Object(context)
  }
  const fn = Symbol()
  context[fn] = this
  let result = context[fn](...args)
  delete context[fn]
  return result
}
```

## bind
- 第一个参数为要绑定的`this`对象
- 可以传递多个参数，参数规则类似`call`，
- 后面的参数传递给要执行函数作为参数
- `bind`返回的是一个函数，所以需要在后面加上()去执行返回的函数，此()里面也可以加参数
```js
Function.prototype.myBind = function (context,...args1) {
  if(context === undefined || context === null){
    context = windows
  }else{
    context = Object(context)
  }
  let self = this
  return function(...args2) {
   const fn = Symbol()
   context[fn] = self
   let result = context[fn](...args1,...args2)
   delete context[fn]
   return result
  }
}
```