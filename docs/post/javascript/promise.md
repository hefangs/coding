

 # promise


## promise的规定：

- `Promise`存在三个状态（`state`）`pending`、`fulfilled`、`rejected`,
- `pending`为初始态，并可以转化为`fulfilled`和`rejected`,
- 成功时，不可转为其他状态，且必须有一个不可改变的值（`value`）
- 失败时，不可转为其他状态，且必须有一个不可改变的原因（`reason`）
- 若是`executor`函数报错 直接执行`reject`);

## promise
```js
// promise
function Promise(executor){
  this.promiseState === 'pending'
  this.promiseResult === 'null'
  const self = this
  function resolve(data){
    if(self.promiseState === 'pending'){
      self.promiseState ==='fulfilled'
      self.promiseResult = data
    }
  }
  function reject(data){
      if(self.promiseState === 'pending'){
      self.promiseState ==='reject'
      self.promiseResult = data
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
    this.promiseResult = undefined
    this.reason = undefined
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
Promise.resolve = function(data){
  return new Promise((resolve,reject) => {
    resolve(data)
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
Promise.prototype.catch = function(errCallback){
  return this.then(null,errCallback)
}
```
## all方法
```js
// all方法多个异步并发获取最终的结果
// 如果有一个失败则失败,全部成功则成功
Promise.all = function(arr){
  return new Promise((resolve,reject) => {
    if(arr.length === 0){
      resolve([])
    }else{
      let res = []
      let count = 0
      for(let i = 0; i < arr.length; i++) {
        Promise.resolve(arr[i])
        .then(data =>{
          res[i] = data
          count += 1
          if(count === arr.length){
            resolve(res)
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
  return this.then(value => {
    callback()
    return value
  }),
  err => {
    callback()
    throw err
  }
}
```
## race方法
```js
// race用来处理多个请求，采用最快的（谁先完成用谁的）
Promise.finally = function(arr){
  return new Promise((resolve, reject) => {
    if(arr.length === 0){
      resolve([])
    }else{
      for(let i = 0; i < arr.length; i++) {
        Promise.resolve(arr[i])
        .then(data => {
          resolve(data)
        })
      }.catch(error => {
        reject(error)
      })
    }
  })
}
```