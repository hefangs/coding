

 # promise


## promise的规定：

- `Promise`存在三个状态（`state`）`pending`、`fulfilled`、`rejected`,
- `pending`为初始态，并可以转化为`fulfilled`和`rejected`,
- 成功时，不可转为其他状态，且必须有一个不可改变的值（`value`）
- 失败时，不可转为其他状态，且必须有一个不可改变的原因（`reason`）
- 若是`executor`函数报错 直接执行`reject`;

## promise
```js
// promise
function Promise(executor){
  this.promiseState = 'pending'
  this.promiseResult = 'null'
  const self = this
  function resolve(data){
    if(self.promiseState === 'pending'){
      self.promiseState ='fulfilled'
      self.promiseResult = data
    }
  }
  function reject(reason){
      if(self.promiseState === 'pending'){
      self.promiseState ='rejected'
      self.promiseResult = reason
    }
  }
  try{
    executor(resolve,reject)
  }
  catch(e){
  }
}
```
## then方法
```js
// then 第一种：只考虑了同步任务
class Promise{
    ......
  then(onResolved, onRejected) {
    if(this.promiseState === "fulfilled"){
      onResolved(this.promiseResult)
    }
    if(this.promiseState === "rejected"){
      onRejected(this.promiseResult)
    }
  }
}
```
```js
// then 第二种：
//当promise去调用then方法时，当前的promise一直处于pending状态，
//我们需要先将成功和失败的回调分别存放起来,触发resolve或reject,依次调用成功或失败的回调
class Promise{
  constructor(executor){
    this.promiseResult = "PENDING"
    this.promiseResult = null
    this.reason = null
    this.onResolvedCallbacks = [] // 存放成功的回调
    this.onRejectedCallbacks = [] // 存放失败的回调
    let resolve = data => {
      if(this.promiseState === "PENDING"){
        this.promiseState = "FULFILLED"
        this.promiseResult = data
        this.onResolvedCallbacks.forEach（fn =>{fn()}） // 依次将对应的函数执行
      }
    }
    let reject = reason => {
      if(this.promiseState === "PENDING"){
        this.promiseState = "REJECTED"
        this.reason = reason
        this.onRejectedCallbacks.forEach（fn =>{fn()}） // 依次将对应的函数执行
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onResolved, onRejected) {
    if(this.promiseState === "fulfilled"){
      onResolved(this.promiseResult)
    }else if(this.promiseState === "rejected"){
      onRejected(this.promiseResult)
    }else{
// 如果promise的状态是 PENDING，需要将 onResolved 和 onRejected函数存放起来
      this.onResolvedCallbacks.push(() => {
        onResolved(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}
```
## resolve方法
```js
// resolve方法用来生成一个直接处于FULFILLED状态的Promise
// 对于传入的数据需要判断是不是promise，如果是则正常流程走
// 如果不是表示则返回的是一个成功的promise
Promise.resolve = function(value){
  return new Promise((resolve,reject) => {
    if(value instanceOf Promise){
      value.then((value)=>{
        resolve(value)
      },err=>{
        reject(err)
      })
    }else{
      resolve(value)
    }
  })
}
```
## reject方法
```js
// reject方法用来生成一个直接处于REJECTED状态的Promise
Promise.reject = function(reason){
  return new Promise((resolve,reject) => {
    reject(reason)
  })
}
```
## catch方法
```js
// catch方法用来捕获promise的异常，就相当于一个没有成功的then
Promise.prototype.catch = function(onRejected){
  return this.then(null,onRejected)
}
```
## all方法
```js
// all方法多个异步并发获取最终的结果
// 如果有一个失败则失败,全部成功则成功
Promise.all = function(promiseAll){
  return new Promise((resolve,reject) => {
    let arr = []
    let count = 0
    if(promiseAll.length === 0){
      resolve([])
    }else{
      for(let i = 0; i < promiseAll.length; i++) {
        promiseAll[i].then((value) =>{
          arr[i] = value
          count += 1
          if(count === promiseAll.length){
            resolve(arr)
          }
        })
        .catch(error =>{
          reject(error)
        })
      }
    }
  })
}
```
## finally方法
```js
// 不管是resolve还是reject都会调用finally方法
Promise.prototype.finally = function(callback){
  return this.then((value) => {
    callback()
    return value
  }),
  (err) => {
    callback()
    throw err
  }
}
```
## race方法
```js
// race用来处理多个请求，采用最快的（谁先完成用谁的）
Promise.race = function(promiseRace){
  return new Promise((resolve, reject) => {
    if(promiseRace.length === 0){
      resolve([])
    }else{
      for(let i = 0; i < promiseRace.length; i++) {
       promiseRace[i].then((value) => {
          resolve(value)
        })
      }.catch((e) => {
        reject(e)
      })
    }
  })
}
```
## promiseLike
```javascript
 /**
  * @description: 判断一个值是否是Promise Like
  * @return {*}
  */
 function isPromiseLike(value) {
  return (
    value !== null &&
    (typeof value === 'object' || typeof value === 'function') &&
    typeof value.then === 'function'
  )
}


```