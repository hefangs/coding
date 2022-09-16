

 # promise


### promise的规定：

- `Promise`存在三个状态（`state`）`pending`、`fulfilled`、`rejected`,
- `pending`为初始态，并可以转化为`fulfilled`和`rejected`,
- 成功时，不可转为其他状态，且必须有一个不可改变的值（`value`）
- 失败时，不可转为其他状态，且必须有一个不可改变的原因（`reason`）
- 若是`executor`函数报错 直接执行`reject`);

代码：
```js
class Promise {
  constructor(executor)
  this.promiseState = "pending"
  this.promiseResult = null
  let resolve = data => {
    if(this.promiseState == "pending"){
      this.promiseState = "resolved"
      this.promiseResult = data
    }
  }
  let reject = data => {
    if(this.promiseState = "rejected"){
      this.promiseResult = data
    }
  }
  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
  Promise.prototype.then = (onResolved, onRejected) =>{
    if(this.promiseState == "resolved"){
      onResolved(this.promiseResult)
    }else{
      onRejected(this.promiseResult)
    }
  }
}
```

