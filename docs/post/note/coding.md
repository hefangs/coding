

## 1. Array



:::tip 去重

```javascript
// filter去重
function unique(arr){
  return arr.filter((item,index,array) => {
  //return array.lastIndexOf(item) === index // [3, 1, 2, 4]
    return array.indexOf(item) === index
  })
}
let arr = [1,2,3,1,2,4]
unique(arr) // [1, 2, 3, 4]
```
```javascript
// reduce去重
function Uniq(arr = []) {
  return arr.reduce((prev, next) => prev.includes(next) ? prev : [...prev, next], [])
}
let arr = [1,2,3,1,2,4]
Uniq(arr) // [1, 2, 3, 4] 
```
:::
:::tip set去重


```javascript
let unique = arr => Array.from(new Set(arr))
let arr = [1,2,3,1,2,4]
unique(arr) // [1, 2, 3, 4]
```
```javascript
let unique = arr => [...new Set(arr)]
let arr = [1,2,3,1,2,4]
unique(arr) // [1, 2, 3, 4]
```
:::

:::tip 找到数组中重复的元素


```javascript
function repeat(arr) {
  let res =  arr.filter((item,index,array) =>{
   // return array.indexOf(item) !== index  // [1,2]
    return  array.lastIndexOf(item) !== index
  })
  return res
}
let arr = [1,2,3,1,2,4]
repeat(arr) //[1,2]
```
:::

:::tip 数组扁平

```javascript
function flatten(arr) {
  return [].concat(...arr.map(item =>{
    return Array.isArray(item) ? flatten(item) : item
    })
  )
}
let arr = [[1, 2], 3, [[[4], 5]]]
flatten(arr) // [1, 2, 3, 4, 5]
```
```javascript
// Array.prototype.flat(depth = 1)
let arr = [[1, 2], 3, [4], 5]
let res =arr.flat() //  [1, 2, 3, 4, 5]
```
```javascript
// reduce
function Flat(arr = []){
  return arr.reduce((prev, next) => prev.concat(Array.isArray(next) ? Flat(next) : next),[] )
}
const arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]]
Flat(arr) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]  
```
:::

:::warning 类数组转换为数组

```javascript
let arrayLike = {
  length: 3,
  0: 'a',
  1: 'b',
  2: 'c',
  3: 'd',
  4: 'e',
}
let arr1 = Array.from(arrayLike) // ['a', 'b', 'c']
let arr2 = Array.prototype.slice.call(arrayLike) // ['a', 'b', 'c']
```
:::




## 2. 浅拷贝
:::tip clone
- 如果属性是基本类型，拷贝的就是基本类型的值
- 如果属性是引用类型，拷贝的就是内存地址，所以如果其中一个对象改变了这个地址，就会影响到另一个对象
```js
function clone(obj) {
  let target
  for(key in obj){
    target[key] = obj[key]
  }
  return target
}
```
:::

:::tip Object.assign()
Object.assign方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象

```js
let obj1 = {person:{name:"Tom",age:20},job:"teacher"}
let obj2 = Object.assign({},obj1)
```
:::

:::tip 函数库lodash的_.clone方法


```js
let _ = require("lodash")
let obj1 = {person:{name:"Tom",age:20},job:"teacher"}
let obj2 = _.clone(obj1) 
```
:::


:::tip 展开运算符 ...



```javascript
let obj1 = {person:{name:"Tom",age:20},job:"teacher"}
let obj2 = {... obj1}
```
:::

:::tip Array.prototype.concat()


```js
let arr1 = [1,2,3]
let arr2 = [4,5,6]
let arr3 = arr1.concat(arr2)
```
:::
:::tip Array.prototype.slice()


```js
let arr1 = [1,2,3]
let arr2 = arr1.slice()

```
:::

## 3. 深拷贝
:::tip deepClone
- 深拷贝是将一个对象从内存中完整的拷贝一份出来
- 从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象

```js
function deepClone(obj){
  let target
  if(typeof obj !== Object){
    throw new Error("obj must be an Object!")
  }
  if(typeof obj === Object){
    for(key in obj){
      target[key] = deepClone(obj[key])
    }
    return target
  }else{
    return obj
  }
}
```
:::
:::warning JSON.parse(JSON.stringify())
  - 这种方法虽然可以实现数组或对象深拷贝,但不能处理正则和函数
  - 如果使用这种方法正则变为空对象，函数变为null

```js
let data1 = [1,{name: "John", age: 20},/\d$/,function(){}]
let data2 = JSON.parse(JSON.stringify(data1))
console.log(data2)
// 0: 1
// 1: {name: 'John', age: 20}
// 2: {} // 正则变为空对象
// 3: null  // 函数变为null
// length: 4
```
:::
  
:::tip 函数库lodash的_.cloneDeep方法

```js
let _ = require("lodash")
let obj1 = {person:{name:"Tom",age:20},job:"teacher"}
let obj2 = _.cloneDeep(obj1) 
```
:::

:::tip jQuery.extend()方法

```js
var $ = require('jquery')
var obj1 = {person:{name:"Tom",age:20},job:"teacher"}
var obj2 = $.extend(true, {}, obj1)
```
:::



## 4. 防抖

:::tip 防抖
防抖（`debounce`）：在事件被触发`n`秒后再执行回调，如果再这n秒内事件又被触发，则重新计算，最终只执行一次


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
document.getElementByTagName('input').addEventListener('input',onInput)
```
:::





 ## 5. 节流

:::tip 节流
节流（`throttle`）：在规定的时间间隔内不会触发，只有大于时间间隔才会触发，把频繁触发变为少量触发

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
:::






## 6. 继承
:::tip 原型链继承
  - 将子类的原型对象指向父类的实例
    - 继承了父类的模板，又继承了父类的原型对象
    - 如果要给子类的原型上新增属性和方法，就必须放在`Student.prototype = new Person()`这样的语句后面
    - 创建子类时，无法向父类构造函数传参
  
```js
function Person(name,age) { 
    this.name = name
    this.age = age
}
Person.prototype.run = function() {
    console.log(`${this.name}-${this.age}`)
}
function Student(sex) {
    this.sex = sex
}
Student.prototype = new Person('张三',"20")
Student.prototype.constructor = Student
Student.prototype.run = function() {
    console.log(`学生信息: ${this.name}-${this.age}-${this.sex}`)
}
var s1 = new Student('男')
s1.run() // 学生信息: 张三-20-男
```
:::

:::tip 构造函数继承
  - 在子类构造函数内部使用`call`或`apply`来调用父类构造函数
    - 解决了原型链继承中子类实例共享父类引用对象的问题，实现多继承
    - 创建子类实例时，可以向父类传递参数
    - 构造继承只能继承父类的实例属性和方法，不能继承父类原型的属性和方法
    - 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能

```js
function Person (name,age) {
  this.name = name
  this.age = age
}
Person.prototype.run = function () {
  console.log(`${this.name}-${this.age}`)
}
function Student (sex) {
  this.sex = sex
  Person.call(this,"张三",20)
}
Student.prototype.run = function () {
   console.log(`学生信息: ${this.name}-${this.age}-${this.sex}`)
}
var s1 = new Student('男')
s1.run() // 学生信息: 张三-20-男
```
:::

:::tip 组合继承
- 原型链继承+构造继承
  - 可以继承父类实例属性和方法，也能够继承父类原型属性和方法
  - 弥补了原型链继承中引用属性共享的问题
  - 可传参，可复用
  - 使用组合继承时，父类构造函数会被调用两次
  - 并且生成了两个实例，子类实例中的属性和方法会覆盖子类原型(父类实例)上的属性和方法，所以增加了不必要的内存

```js
function Person (name, age) {
  this.name = name
  this.age = age
}
Person.prototype.run = function(){
    console.log(`${this.name}-${this.age}`)
}
function Student (sex) {
  Person.call(this, '张三',20)
  this.sex = sex
}
Student.prototype = new Person()
Student.prototype.constructor = Student
Student.prototype.run = function(){
   console.log(`学生信息: ${this.name}-${this.age}-${this.sex}`)
}
var s1 = new Student('男')
s1.run()   // 学生信息: 张三-20-男
```
:::

:::tip 寄生式继承
- 寄生组合继承算是`ES6`之前一种比较完美的继承方式
  - 只调用了一次父类构造函数，只创建了一份父类属性
  - 子类可以用到父类原型链上的属性和方法

```js
function Person (name,age) {
  this.name = name
  this.age = age
}
Person.prototype.run = function () {
  console.log(`${this.name}-${this.age}`)
}
function Student (sex) {
  this.sex = sex
  Person.call(this,'张三',20)
}
// 与组合继承的区别
Student.prototype = Object.create(Person.prototype)
Student.prototype.constructor = Student
Student.prototype.run = function(){
  console.log(`学生信息: ${this.name}-${this.age}-${this.sex}`)
}
var s1 = new Student('男')
s1.run()  // 学生信息: 张三-20-男
```
:::

:::tip ES6继承
- 主要是依赖`extends`关键字来实现继承，且继承的效果类似于寄生组合继承**

```js
class Person {
  constructor (name,age) {
    this.name = name
    this.age = age
  }
  run () {
     console.log(`学生信息: ${this.name}-${this.age}`)
  }
}
class Student extends Person {
  constructor (name,age,sex) {
    super(name,age)
    this.sex = sex
  }
  run(){
    console.log(`学生信息: ${this.name}-${this.age}-${this.sex}`)
  }
}
var s1 = new Student('张三',20,'男')
s1.run()  //   学生信息: 张三-20-男
```
:::



## 7. new

:::tip new
- 创建一个空对象,作为即将要返回的那个对象实例
- 将这个对象的`__proto__`指向构造函数的`prototype`
- 执行构造函数并将this绑定到新创建的对象上
- 判断构造函数的返回值类型，
- 如果是引用类型，就返回这个引用类型的对象，
- 否则就返回创建的那个对象 

```js
function myNew(context){
  let obj  = new Object()
  obj.__proto__ = Object.prototype
  let res = context.apply(obj,[...args].slice(1))
  return typeof res === "object" ? res : obj
}
```
:::






## 8. 懒加载 
:::tip 懒加载

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
:::
:::tip 通过IntersectionObserver实现
  - `IntersectionObserver` 接口（从属于 `Intersection Observer API`）提供了一种异步观察目标元素与其祖先元素或顶级文档视口（`viewport`）交叉状态的方法
  - 其祖先元素或视口被称为根（`root`）

```javascript
const observer = new IntersectionObserver(entries => {
  entries.forEach(item => {
    // 如果 intersectionRatio 为 0，则目标在视野外
    if (item.intersectionRatio <= 0) return
    const { target } = item
    // 将元素的 data-src 属性设
    target.src = target.dataset.src
    // 停止观察该元素
    image.onload = () =>{
      observer.unobserve(target)
    }
  })
})
// 监听页面中所有 img 标签  
document.querySelectorAll('img').forEach(img => {  
  observer.observe(img)  
})  
```
:::


 ## 9. instanceof

:::tip instanceof
- `instanceof`运算符用于检测构造函数的`prototype`属性是否出现在某个实例对象的原型链上

```js
function myInstanceOf(a,b) = {
  if(typeof a !== 'object' || a === "null") return false
  if(typeof b ！== "function" ) {
    throw new Error("b must be function")
    let proto = a.__proto__
    let prototype = b.prototype
    while (true) {
      if(proto === null) return false
      if(proto === prototype) return true
      proto = proto.__proto__
    }
  }
}
```
:::





## 10. call,apply,bind


:::danger call
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
```js
let year = 2021
obj = {
  year: 2022
}
const getDate = function (month,day) {
  return `${this.year}-${month}-${day}`
}
console.log(getDate.call(obj,7,9)) // 2022-7-9
console.log(getDate.myCall(obj,7,9)) // 2022-7-9
```
:::


:::danger apply

- 可以改变函数指向
- 第一个参数与`call`相同,为函数内部`this`指向
- 函数的参数，则以数组的形式传递，作为`apply`第二参数


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
```js
let year = 2021
obj = {
  year: 2022
}
const getDate = function (month,day) {
  return `${this.year}-${month}-${day}`
}
console.log(getDate.apply(obj, [7,9]))    // 2022-7-9
console.log(getDate.myApply(obj, [7,9]))  // 2022-7-9
```
:::

:::danger bind
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
  return (...args2)=>{
    const fn = Symbol()
    context[fn] = this
    let result = context[fn](...args1,...args2)
    delete context[fn]
    return result
  }
}
```

```js
let year = 2021
obj = {
  year: 2022
}
const getDate = function (month,day) {
  return `${this.year}-${month}-${day}`
}
console.log(getDate.bind(obj)(7,9)) // 2022-7-9
console.log(getDate.myBind(obj)(7,9)) // 2022-7-9
```
::: 






 ## 11. promise

:::warning  promise

- `Promise`存在三个状态（`state`）`pending`、`fulfilled`、`rejected`,
- `pending`为初始态，并可以转化为`fulfilled`和`rejected`,
- 成功时，不可转为其他状态，且必须有一个不可改变的值（`value`）
- 失败时，不可转为其他状态，且必须有一个不可改变的原因（`reason`）
- 若是`executor`函数报错 直接执行`reject`
:::

:::tip promise

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
    reject(e) 
  }
}
```
:::

:::tip promise.then

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
:::

:::tip promise.resolve


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
:::

:::tip promise.reject

```js
// reject方法用来生成一个直接处于REJECTED状态的Promise
Promise.reject = function(reason){
  return new Promise((resolve,reject) => {
    reject(reason)
  })
}
```
:::
:::tip promise.catch

```js
// catch方法用来捕获promise的异常，就相当于一个没有成功的then
Promise.prototype.catch = function(onRejected){
  return this.then(null,onRejected)
}
```
:::

:::tip promise.all

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
:::

:::tip promise.finally

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
:::

:::tip promise.race

```js
//  race用来处理多个请求，采用最快的（谁先完成用谁的）
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
:::

:::tip promiseLike

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
:::




## 12. 可拖拽的div


:::tip js实现一个可以拖拽的div

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
:::




## 13. 排序

:::tip 冒泡排序

```js
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}
let arr = [5,3,7,9,6,1,8,4,2]
bubbleSort(arr)  // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
:::

:::tip 选择排序


```js
function selectSort(arr){
  let minIndex
  for(let i=0; i<arr.length - 1; i++){
    minIndex = i 
    for(let j = i + 1; j < arr.length; j++){
      if(arr[j] < arr[minIndex]){
        minIndex = j 
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
  return arr
}
let arr = [5,3,7,9,6,1,8,4,2]
selectSort(arr)  //[1, 2, 3, 4, 5, 6, 7, 8, 9]
```
:::

:::tip 快速排序


```js
function quickSort(arr) {
  let target = arr[0]
  let left = []
  let right = []
  if(arr.length <= 1) return arr
  for(let i = 1; i < arr.length; i++) {
    if(arr[i] < target){
      left.push(arr[i])
    }else{
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([target],quickSort(right))
}
let arr = [5,3,7,9,6,1,8,4,2]
quickSort(arr) //[1, 2, 3, 4, 5, 6, 7, 8, 9]
```
:::


## 14. Symbol.iterator

:::tip Object.values


```javascript
const obj = {a:1,b:2,c:3}
const values= Object.values(obj)
for(let value of values){
  console.log(value) // 1 2 3
}
```
:::

:::tip Object.entries


```javascript
const obj = {a:1,b:2,c:3}
const entries = Object.entries(obj)
for(let [key,value] of entries){
  console.log(value) // 1 2 3
}
```
:::

:::danger Symbol.iterator


```javascript
const obj={
  a:1,
  b:2,
  c:3,
  [Symbol.iterator](){
    let index = 0
    return{
      next(){
        if(index < Object.values(obj).length){
          return{
            value:Object.values(obj)[index++],
            done:false
          }
        }else{
          return {
            value:undefined,
            done:true
          }
        }
      }
    }
  }
}
for(let value of obj){
  console.log(value) // 1 2 3
}
```
:::

:::warning Example

 
```javascript
// 使左右俩边相等
[a,b] ={a:1,b:2}
Object.prototype[Symbol.iterator] = function(){
 return Object.values(this)[Symbol.iterator]()
}
```
:::

## 15. 获取对象的`key`

:::tip for...in 遍历

```javascript
const obj = {a:1,b:2,c:3}
for(let key in obj) {
  console.log(key) // a b c
}
```
:::

:::tip Object.keys

```javascript
const obj = {a:1,b:2,c:3}
const keys = Object.keys(obj)
console.log(keys) // ['a', 'b', 'c']
```
:::

:::tip Object.getOwnPropertyNames


```javascript
const obj = {a:1,b:2,c:3}
const keys = Object.getOwnPropertyNames(obj)
console.log(keys)  // ['a', 'b', 'c']
```
:::

:::tip Object.getOwnPropertySymbols

```javascript
let d:symbol= Symbol(1)
const obj = {a:1,b:2,c:3,[d]:1}
const keys = Object.getOwnPropertySymbols(obj)
console.log(keys)  //  [Symbol(1)] 
```
:::

:::tip Reflect.ownKeys


```javascript
let d:symbol= Symbol(1)
const obj = {a:1,b:2,c:3,[d]:1}
const keys = Reflect.ownKeys(obj)
console.log(keys)  //  ["a", "b", "c", Symbol(1)] 
```
:::

## 16. forEach,map,filter,reduce

:::tip `forEach`
1. 针对每一个元素执行提供的函数
2. `forEach`方法不会返回执行结果，而是`undefined`
3. `forEach`对原数组进行修改
4. 不能中止或跳出 `forEach` 循环(`return false`或者 `break`)

```javascript
let arr = [1, 2, 3, 4, 5]
arr.forEach((item, index) => {
  return (arr[index] = item * 2) 
})
console.log(arr) // [2, 4, 6, 8, 10]
```
:::

:::tip `map`
1. 创建一个新的数组，其中每一个元素由调用数组中的每一个元素执行提供的函数得来
2. `map`方法会得到一个新的数组并返回

```javascript
let arr = [1, 2, 3, 4, 5]
let doubled = arr.map(item => {
    return item * 2
})
console.log(arr)     // [1, 2, 3, 4, 5]
console.log(doubled) // [2, 4, 6, 8, 10]
```
:::

:::tip `filter`
1. `filter` 方法创建一个新数组，其包含通过所提供函数实现的测试的所有元素
2. `filter` 不会改变原数组，它返回过滤后的新数组

```javascript
let arr = [1, 2, 3, 4, 5]
let filter = arr.filter(item => {
    return item >= 3
})
console.log(arr)     // [1, 2, 3, 4, 5]
console.log(filter)  // [3, 4, 5]
```
:::

:::tip `reduce`
1. 对数组中的每个元素执行一个自定义的累计器，将其结果汇总为单个返回值
2. 形式：`Array.prototype.reduce`(`callback`, `initialValue`)
   - `callback`：回调函数(必选)
      - 回调函数的参数：
        - `previousValue`：累计器完成计算的返回值(必选)
        - `currentValue`：当前元素(必选)
        - `currentIndex`：当前元素的索引(可选)
        - `Array`：当前元素所属的数组对象(可选)
   - `initValue`：初始值(可选)
      - 如果调用 `reduce`() 时提供了 `initialValue` ，`previousValue` 取值则为 `initialValue`，`currentValue` 则取数组中的第一个值
      - 如果没有提供 `initialValue`，那么 `previousValue` 取数组中的第一个值，`currentValue` 取数组中的第二个值


 3. 累加累乘：
    ```javascript
    const arr = [1, 2, 3, 4, 5]
    const a = arr.reduce((pre, cur) => pre + cur) // 15
    // 等同于
    const b = arr.reduce((pre, cur) => pre + cur, 0) // 15
    ```
    ```javascript
    const Accumulation = (...args) =>{
      return args.reduce((pre,cur) => pre + cur,0)
    }
    Accumulation(1, 2, 3, 4, 5) // 15
    ```
    ```javascript
    const Multiplication = (...args) =>{
      return args.reduce((pre,cur) => pre * cur,1)
    }
    Accumulation(1, 2, 3, 4, 5) // 120
    ```
 4. 权重求和：
    ```javascript
    const scores = [
      { score: 90, subject: "Chinese", weight: 0.5 },
      { score: 95, subject: "Math", weight: 0.3 },
      { score: 85, subject: "English", weight: 0.2 }
    ]
    const res = scores.reduce((pre, cur) => pre + cur.score * cur.weight, 0) // 90.5
    ```
 5. 代替reverse：
    ```javascript
      const reverse = (arr = []) =>{
        return arr.reduceRight((pre,cur) => (pre.push(cur),pre),[])
      }
      reverse([1, 2, 3, 4, 5]) // [5, 4, 3, 2, 1]
    ```
 6. 代替 map 和 filter：
    ```javascript
      const arr = [1, 2, 3, 4, 5]
      // 代替map：[2, 4, 6, 8, 10]
      const a = arr.map(item => item * 2)
      const b = arr.reduce((pre, cur) => [...pre, cur * 2], [])
      // 代替filter：[4, 5]
      const c = arr.filter(item => item > 3)
      const d = arr.reduce((pre, cur) => cur > 3 ? [...pre, cur] : pre, [])
      // 代替map和filter：[4, 6, 8 ,10]
      const e = arr.map(item => item * 2).filter(item => item > 2)
      const f = arr.reduce((pre, cur) => cur * 2 > 2 ? [...pre, cur * 2] : t, [])
    ```
 7. 数组最大最小值：
    ```javascript
    // 最大值
    function Max(arr = []){
      return arr.reduce((pre, cur) => pre > cur ? pre : cur)
    }
    // 最小值
    function Min(arr = []){
      return arr.reduce((pre, cur) => pre < cur ? pre : cur)
    }
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    Max(arr) // 9
    Min(arr) // 1
    ```
 8. 字符串反转：
    ```javascript
    // reduceRight
      function ReverseStr(str){
      return str.split("").reduceRight((pre, cur) => pre + cur)
      } 
      ReverseStr("Rng牛逼") // '逼牛gnR'
      function ReverseStr2(str){
        return str.split("").reverse().join("")
      }
      ReverseStr2("Rng牛逼") // '逼牛gnR'
    ```
:::
## 17. 发布订阅