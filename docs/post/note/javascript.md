# JavaScript
## 1. 数据类型
:::info  数据类型
- 在JS中共有8种基础的数据类型，分别为：`Undefined`、`Null`、`Boolean`、`Number`、`String`、`Object`、`Symbol`、`BigInt`
- 其中`Symbol`和`BigInt`是`ES6`新增的数据类型:
   - `Symbol` 代表独一无二的值，最多的用法是用来定义对象的唯一属性名
   - `BigInt` 可以表示任意大小的整数
    
```javascript
let a = 100;
let b = a;
a = 200;
console.log(b); // 100
```
```javascript
let a = { age: 20 };
let b = a;
b.age = 30;
console.log(a.age); // 30
```
:::  
:::info 数据类型的判断：
 1. `typeof`：能判断所有值类型，函数。不可对`null`、对象、数组进行精确判断，因为都返回`object`
    ```javascript
    console.log(typeof undefined); // undefined
    console.log(typeof 2); // number
    console.log(typeof true); // boolean
    console.log(typeof "str"); // string
    console.log(typeof Symbol("foo")); // symbol
    console.log(typeof 2172141653n); // bigint
    console.log(typeof function () {}); // function
    // 不能判别
    console.log(typeof []); // object
    console.log(typeof {}); // object
    console.log(typeof null); // object
    ```
 

   2. `instanceof`：能判断对象类型，不能判断基本数据类型，其内部运行机制是判断在其原型链中能否找到该类型的原型
      ```javascript
      class People {}
      class Student extends People {}
      const s = new Student();
      console.log(s instanceof People); // true
      console.log(s instanceof Student); // true
      ```
  
   3. `Object.prototype.toString.call`()：所有原始数据类型都是能判断的，还有`Error`对象`Date`对象等

      ```javascript
      Object.prototype.toString.call(2); // "[object Number]"
      Object.prototype.toString.call(""); // "[object String]"
      Object.prototype.toString.call(true); // "[object Boolean]"
      Object.prototype.toString.call(undefined); // "[object Undefined]"
      Object.prototype.toString.call(null); // "[object Null]"
      Object.prototype.toString.call(Math); // "[object Math]"
      Object.prototype.toString.call({}); // "[object Object]"
      Object.prototype.toString.call([]); // "[object Array]"
      Object.prototype.toString.call(function () {}); // "[object Function]"
      ```
   4. 如何判断变量是否为数组

      ```javascript
      Array.isArray(arr); // true
      arr.__proto__ === Array.prototype; // true
      arr instanceof Array; // true
      Object.prototype.toString.call(arr); // "[object Array]"
      ```
  :::
## 2. 原型和原型链
:::info 原型和原型链
- **原型**：每个对象拥有一个原型对象，通过 `__proto__ `指针指向上一个原型 ，并从中继承方法和属性，同时原型对象也可能拥有原型，这样一层一层，最终指向`null`，这就是原型链
- **原型链**：由相互关联的原型组成的链状结构就是原型链

  ```javascript
  function Person(name){
    this.name = name
  }
  let p1 = new Person('Tom')
  p1.__proto__ === Person.prototype  //true
  Person.prototype.__proto__ === Object.prototype  //true
  Object.prototype.__proto__ === null  //true
  Person.__proto__ === Function.prototype //true
  Object.__proto__ === Function.prototype //true
  ```
:::

## 3. 作用域与作用域链
:::info 作用域与作用域链
- 作用域：
  - 规定了如何查找变量，也就是确定当前执行代码对变量的访问权限
  - 作用域决定了代码区块中变量和其他资源的可见性（`全局作用域`、`函数作用域`、`块级作用域`）
- 作用域链：
  - 当在`Javascript`中使用一个变量的时候，首先`Javascript`引擎会尝试在当前作用域下去寻找该变量
  - 如果没找到，再到它的上层作用域寻找，以此类推直到找到该变量或是已经到了全局作用域
  - 如果在全局作用域里仍然找不到该变量，它就会在全局范围内隐式声明该变量(非严格模式下)或是直接报错
```javascript
// 作用域
function showMessage(){
  let message = 'hello'
}
console.log(message) // message is not defined
// 函数showMessage内部创建一个message变量，当我们在全局访问这个变量的时候，系统会报错
// 这就说明我们在全局是无法获取到（闭包除外）函数内部的变量
```
```javascript
// 作用域链
var sex = '男'
function person() {
  var name = '张三'
  function student() {
    var age = 18
    console.log(name) // 张三
    console.log(sex) // 男 
  }
  student()
    console.log(age); // Uncaught ReferenceError: age is not defined
}
person()
// student函数内部属于最内层作用域，找不到name，向上一层作用域person函数内部找，找到了输出“张三”
// student内部输出sex时找不到，向上一层作用域person函数找，还找不到继续向上一层找，即全局作用域，找到了输出“男”
// 在person函数内部输出age时找不到，向上一层作用域找，即全局作用域，还是找不到则报错

```
:::
:::info 全局作用域
  - 任何不在函数中或是大括号中声明的变量，都是在全局作用域下
  - 全局作用域下声明的变量可以在程序的任意位置访问
```javascript
var message = 'Hello World!'
function showMessage() {
  console.log(message);
}
showMessage() // Hello World!
```
:::
:::info 函数作用域
  - 函数作用域也叫局部作用域，如果一个变量是在函数内部声明的它就在一个函数作用域下面
  - 这些变量只能在函数内部访问，不能在函数以外去访问
```javascript
function showMessage() {
  var message = 'Hello World!'
  console.log(message)
}
showMessage() // Hello World!
console.log(message) // message is not defined
```
:::
:::info 块级作用域
  - 在大括号中使用`let`和`const`声明的变量存在于块级作用域中
  - 在大括号之外不能访问这些变量
```javascript
{
  let message1 = 'Hello World1!'
  var message2 = 'Hello World2!'
}
console.log(message2) //  Hello World2!
console.log(message1) //  message1 is not defined
```
:::
:::info 词法作用域
  - 词法作用域，又叫静态作用域，变量被创建时就确定好了，而非执行阶段确定的
  - 也就是说我们写好代码时它的作用域就确定了，`JavaScript`遵循的就是词法作用域
  ```javascript
  var a = 1
  function foo(){
      console.log(a)
  }
  function bar(){
      var a = 2
      foo()
  }
  bar() // 1
  ```
:::

## 4. 闭包
:::info 闭包
- 在`JavaScript`中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。可以在一个内层函数中访问到其外层函数的作用域
- 闭包是指那些能够访问自由变量的函数。自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。闭包=函数+函数能够访问的自由变量
```javascript
  // showName() 没有自己的局部变量。然而，由于闭包的特性，它可以访问到外部函数的变量
  function init(){
    let name = 'Tom'
    function showName(){
      alert(name) // Tom
    }
    showName()
  }
  init()
```
:::
:::info 使用场景
  - 任何闭包的使用场景都离不开这两点：
    - 创建私有变量
    - 延长变量的生命周期
:::


##  5. 事件循环
:::info Even Loop
- **浏览器中的事件循环:**
  - `JavaScript`代码的执行过程中，除了依靠函数调用栈来搞定函数的执行顺序外，还依靠任务队列(`task queue`)来搞定另外一些代码的执行。整个执行过程，我们称为事件循环过程。一个线程中，事件循环是唯一的，但是任务队列可以拥有多个。任务队列又分为`macro-task`（宏任务）与`micro-task`（微任务)
- **`macro-task`（宏任务）:**
    - `script`(整体代码)
    - `setTimeout`
    - `setInterval`
    - `setImmediate`
    - `I/O`
    - `UI render`
- **`micro-task`（微任务）:**
    - `process.nextTick`
    - `Promise`
    - `Async/Await`(实际就是promise)
    - `MutationObserver`(html5新特性)
:::

```javascript
// demo.js
console.log(1)
async function async1() {
  await async2()
  console.log(2)
}
async function async2() {
  console.log(3)
}
async1()
setTimeout(function() {
  console.log(4)
}, 0)
new Promise(resolve => {
  console.log(5)
  resolve()
})
.then(()=>{
    console.log(6)
})
.then(()=> {
  console.log(7)
})
console.log(8)
// 执行顺序：1-3-5-8-2-6-7-4
```
:::info 分析：
  - 执行代码，输出`1`
  - 执行`async1()`,会调用`async2()`,然后输出`3`,此时将会保留`async1`函数的上下文
  - 跳出`async1`函数。
  - 遇到`setTimeout`，产生一个宏任务
  - 执行`Promise`，输出`5`。遇到`then`，产生第一个微任务
  - 继续执行代码，输出`8`
  - 代码逻辑执行完毕(当前宏任务执行完毕)，开始执行当前宏任务产生的微任务队列，输出`2`，接着就是`6`
  - 产生一个新任务遇到then的微任务
  - 执行产生的微任务，输出`7`,当前微任务队列执行完毕。执行权回到`async1`
  - 执行`await`,实际上会产生一个`promise`返回，即:
  ```javascript
  let p1 = new Promise((resolve,reject){ resolve(undefined)})
  ```
  - 最后，执行下一个宏任务，即执行`setTimeout`，输出`4`
:::
:::info 再分析：
  - `2`种情况分析`await`后面跟的内容：
    1. 如果`await`后面直接跟的为一个变量，比如：`await` 1
        - 这种情况的话相当于直接把`await`后面的代码注册为一个微任务
        - 可以简单理解为`promise.then`(await下面的代码)
        - 然后跳出`async1`函数，执行其他代码
        - 当遇到`promise`函数的时候，会注册`promise.then`()函数到微任务队列
        - 注意此时微任务队列里面已经存在`await`后面的微任务，所以这种情况会先执行`await`后面的代码（console.log(2)），再执行`async1`函数后面注册的微任务代码（ console.log(6)， console.log(7)）
    2. 如果`await`后面跟的是一个异步函数的调用，比如上面的代码，将代码改成这样：
:::
  ```javascript{8-10}
  console.log(1)
  async function async1() {
    await async2()
    console.log(2)
  }
  async function async2() {
    console.log(3)
    return Promise.resolve().then(()=>{
      console.log(4)
    })
  }
  async1()
  setTimeout(function() {
    console.log(5)
  }, 0)
  new Promise(resolve => {
    console.log(6)
    resolve()
  })
  .then(function() {
    console.log(7)
  })
  .then(function() {
    console.log(8)
  })
  console.log(9)
  // 1-3-6-9-4-7-8-2-5
  ```
:::warning 总结
  - 此时执行完`await`并不先把`await`后面的代码注册到微任务队列中去，
  - 而是执行完`await`之后，直接跳出`async1`函数，执行其他代码
  - 然后遇到`promise`的时候，把`promise.then`注册为微任务
  - 其他代码执行完毕后，需要回到`async1`函数去执行剩下的代码
  - 再把`await`后面的代码注册到微任务队列当中，注意此时微任务队列中是有之前注册的微任务的
  - 所以这种情况会先执行`async1`函数之外的微任务(p1,p2)，然后才执行async1内注册的微任务
  - 可以理解为：这种情况下，`await`后面的代码会在本轮循环的最后被执行
::: 
## 6. 浏览器的垃圾回收机制（Garbage Collection）
:::info 标记清除算法

  - 标记阶段即为所有活动对象做上标记，清除阶段则把没有标记（也就是非活动对象)
  - **过程**
    - 垃圾收集器在运行时会给内存中的所有变量都加上一个标记，假设内存中所有对象都是垃圾，全标记为 0
    - 然后从各个根对象开始遍历，把不是垃圾的节点改成 1
    - 清理所有标记为0的垃圾，销毁并回收它们所占用的内存空间
    - 最后，把所有内存中对象标记修改为 0，等待下一轮垃圾回收 
  - **优点**
    - 实现比较简单，打标记也无非打与不打两种情况，这使得一位二进制位（ 0 和 1 ）就可以为其标记，非常简单
  - **缺点**
    - 标记清除算法有一个很大的缺点，就是在清除之后，剩余的对象内存位置是不变的，也会导致空闲内存空间是不连续的，出现了**内存碎片**并且由于剩余空闲内存不是一整块，它是由不同大小内存组成的内存列表，这就牵扯出了**内存分配**的问题
      - **三种分配策略**
        -  **First-fit**，找到大于等于 `size` 的块立即返回
        - **Best-fit**，遍历整个空闲列表，返回大于等于 `size `的最小分块
        - **Worst-fit**，遍历整个空闲列表，找到最大的分块，然后切成两部分，一部分 size 大小，并将该部分返回
      - **内存碎片化**，空闲内存块是不连续的，容易出现很多空闲内存块，还可能会出现分配所需内存过大的对象时找不到合适的块
      - **分配速度慢**，因为即便是使用 First-fit 策略，其操作仍是一个 O(n) 的操作，最坏情况是每次都要遍历到最后，同时因为碎片化，大对象的分配效率会更慢
    - 针对标记清除算法的缺点引出标记整理（Mark-Compact）算法：
      -  它的标记阶段和标记清除算法没有什么不同，只是标记结束后，标记整理算法会将活着的对象（即不需要清理的对象）向内存的一端移动，最后清理掉边界的内存
  :::

  :::info  引用计数算法
  - 它把对象是否不再需要简化定义为对象有没有其他对象引用到它。如果没有引用指向该对象（引用计数为 0），对象将被垃圾回收机制回收
  - **过程**
    -  当声明了一个变量并且将一个引用类型赋值给该变量的时候这个值的引用次数就为 1
    -  如果同一个值又被赋给另一个变量，那么引用数加 1
    -  如果该变量的值被其他的值覆盖了，则引用次数减 1
    -  当这个值的引用次数变为 0 的时候，说明没有变量在使用，这个值没法被访问了，回收空间，垃圾回收器会在运行的时候清理掉引用次数为 0 的值占用的内存
:::
## 7. http 缓存
:::info 缓存
 - 什么是缓存？把一些不需要重新获取的内容再重新获取一次
 - 为什么需要缓存？网络请求相比于`CPU`的计算和页面渲染是非常非常慢的
 - 哪些资源可以被缓存？静态资源，比如 `js`,`css`,`img`
:::

:::tip Cache-Control
  - 在 `Response Headers` 中控制强制缓存的逻辑，例如:`Cache-Control`: `max-age`=3153600（单位是秒）
  - **Cache-Control** 有哪些值:
    - **max-age**：缓存最大过期时间
    - **no-cache**：可以在客户端存储资源，每次都必须去服务端做新鲜度校验，来决定从服务端获取新的资源（200）还是使用客户端缓存（304)
    - **no-store**：永远都不要在客户端存储资源，永远都去原始服务器去获取资源
    :::details
    ![图片描述](/cache1.png)

:::

:::tip 协商缓存
  - 服务端缓存策略
  - 服务端判断客户端资源，是否和服务端资源一样
  - 一致则返回304，否则返回200和最新的资源
  :::details
  ![图片描述](/cache2.png)
:::

:::info  资源标识
- 在 `Response` `Headers`中，有两种:`Last-Modified`和 `Etag`
  - `Last-Modified`：资源的最后修改时间
    - 服务端拿到 `if-Modified-Since` 之后拿这个时间去和服务端资源最后修改时间做比较
    - 如果一致则返回`304`，不一致（也就是资源已经更新了）就返回200和新的资源及新的`Last-Modified`
    :::details
     ![图片描述](/last-Modified.png)
   
  - `Etag`：资源的唯一标识（一个字符串，类似于人类的指纹）
    - 其实`Etag`和`Last-Modified`一样的
    - 只不过 `Etag` 是服务端对资源按照一定方式（比如 `contenthash`）计算出来的唯一标识
    - 就像人类指纹一样，传给客户端之后，客户端再传过来时候，服务端会将其与现在的资源计算出来的唯一标识做比较
    - 一致则返回304，不一致就返回`200`和新的资源及新的`Etag`
    :::details
    ![图片描述](/etag.png)
      
  :::

  :::tip 比较
  - 优先使用`Etag`
  - `Last-Modified`只能精确到秒级
  - 如果资源被重复生成，而内容不变，则`Etag`更精确
  :::
  #### 总结
  ![图片描述](/cache3.png)
  

## 8.  数组的方法
:::info Array.prototype.push()
  - `push()`方法将一个或多个元素添加到数组的末尾，`并返回该数组的新长度`
  ```javascript
  const colors = ['red', 'green'];
  const length = colors.push('blue');
  console.log(colors) // ['red', 'green', 'blue']
  console.log(length) //  3
  ```
:::
:::info Array.prototype.pop()
  - `pop()`方法从数组中删除最后一个元素，并返回该元素的值。`此方法会更改数组的长度`
  ```javascript
  const colors = ['red', 'green','blue']
  const item = colors.pop()
  console.log(item) //  'blue'
  console.log(colors) // ['red', 'green']
  ```
:::
:::info Array.prototype.unshift()
  - `unshift()`方法将一个或多个元素添加到数组的开头，`并返回该数组的新长度`
  ```javascript
  const colors = ['red', 'green','blue']
  const item = colors.shift()
  console.log(item) //  'red'
  console.log(colors) // ['green', 'blue']
  ```
:::
:::info Array.prototype.shift()
  - `shift()`方法从数组中删除第一个元素，`并返回该元素的值。此方法更改数组的长度`
  ```javascript
  const colors = ['red','green','blue']
  const item = colors.shift()
  console.log(item) //  red
  console.log(colors) // ['red', 'green', 'blue']
  ```
:::
:::info Array.prototype.splice()
  - `splice()`方法通过删除或替换现有元素或者原地添加新的元素来修改数组，并以数组形式返回被修改的内容
  - 此方法会`改变原数组`
  ```javascript{1-4,19}
  splice(start)
  splice(start, deleteCount)
  splice(start, deleteCount, item1)
  splice(start, deleteCount, item1, item2, itemN)
   // 删除
  const colors = ['red','green','blue']
  const colors2 = colors.splice(0,1)
  console.log(colors)  // ['green', 'blue']
  console.log(colors2) // ['red']
   // 替换现有元素
  const colors = ['red','green','blue']
  const colors2 = colors.splice(0,1,'yellow')
  console.log(colors)  // ['yellow', 'green', 'blue']
  console.log(colors2) // ['red']
   // 原地添加新的元素
  const colors = ['red','green','blue']
  const colors2 = colors.splice(0,0,'yellow')
  console.log(colors) // ['yellow', 'red', 'green', 'blue']
  console.log(colors2) // [] // 如果没有删除元素，则返回空数组
:::
:::info Array.prototype.slice()
  - `slice()`方法`返回一个新的数组对象`
  - 这一对象是一个由`begin`和`end`决定的原数组的浅拷贝包括`begin`，不包括`end`原始数组不会被改变
  ```javascript
  slice()
  slice(start)
  slice(start, end)
  const colors = ['red','green','blue']
  const colors2 = colors.slice()
  const colors3 = colors.slice(1,5)
  console.log(colors) //   ['red', 'green', 'blue']
  console.log(colors2) //  ['red', 'green', 'blue']
  console.log(colors3) //  ['green', 'blue']
  ```
:::
:::info Array.prototype.concat()
  - `concat()`方法用于合并两个或多个数组，此方法不会更改现有数组，而是`返回一个新数组`
  ```javascript
  const colors = ['red','green','blue']
  const colors2 = ['yellow']
  const colors3 = colors.concat(colors2)
  console.log(colors) //   ['red', 'green', 'blue']
  console.log(colors2) //  ['yellow']
  console.log(colors3) //  ['red', 'green', 'blue', 'yellow']
  ```
:::
:::info Array.prototype.reverse()
  - `reverse()`方法将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个
  - 该方法`会改变原数组`
  ```javascript
  const colors = ['red','green','blue']
  const colors2 = colors.reverse()
  console.log(colors) //   ['blue', 'green', 'red']
  console.log(colors2) //  ['blue', 'green', 'red']
  ```
:::
:::info Array.prototype.sort()
  - `sort()`方法用[原地算法](https://zh.wikipedia.org/wiki/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95 "Markdown")，原地算法对数组的元素进行排序，`并返回数组`
  - 默认排序顺序是在将元素转换为字符串，然后比较它们的`UTF-16`代码单元值序列时构建的
  - 由于它取决于具体实现，因此无法保证排序的时间和空间复杂性
  ```javascript
  sort()
  // 用来指定按某种顺序进行排列的函数。
  // 如果省略，元素按照转换为的字符串的各个字符的 Unicode 位点进行排序
  sort(compareFn)
  compareFn(a,b)
  const colors = ['red','green','blue']
  const colors2 = colors.sort()
  console.log(colors) //   ['blue', 'green', 'red']
  console.log(colors2) //  ['blue', 'green', 'red']
  ```
:::

:::info Array.prototype.join()
  - `join()`方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串，用逗号或指定的分隔符字符串分隔
  - 如果数组只有一个元素，那么将返回该元素而不使用分隔符
  ```javascript
  const colors = ['red','green','blue']
  const colors2 = colors.join()
  const colors3 = colors.join("")
  console.log(colors) // ['red', 'green', 'blue']
  console.log(colors2) // 'red,green,blue'
  console.log(colors3) // 'redgreenblue'
  ```
:::

:::info Array.prototype.filter()
  - `filter()`方法创建给定数组一部分的浅拷贝，其包含通过所提供函数实现的测试的所有元素
  ```javascript
  filter(callbackFn)
  filter(callbackFn, thisArg)
  callbackFn(element,index,array)
  const colors = ['red','green','blue']
  const colors2 = colors.filter((item)=>item.length >= 4)
  console.log(colors)  //   ['red', 'green', 'blue']]
  console.log(colors2) //  ['green', 'blue']
  ```
:::
:::info Array.prototype.forEach()
  - `forEach()`方法对数组的每个元素执行一次给定的函数，
  - `forEach对原数组进行修改`，返回值为`undefined`
  ```javascript
  forEach(callbackFn)
  forEach(callbackFn, thisArg)
  callbackFn(element,index,array)
  const colors = ['red','green','blue']
  const colors2 = colors.forEach((item,index)=>colors[index] = item +'!'  )
  console.log(colors)  // ['red!', 'green!', 'blue!']
  console.log(colors2) // undefined
  ```
:::
:::info Array.prototype.map()
  - `map()`方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成
  - `返回一个新的数组`
  ```javascript
  map(callbackFn)
  map(callbackFn, thisArg)
  callbackFn(currentValue,index,array)
  const colors = ['red','green','blue']
  const colors2 = colors.map((item)=> item +'!'  )
  console.log(colors)  // ['red', 'green', 'blue']
  console.log(colors2) // ['red!', 'green!', 'blue!']
  ```
:::

:::info Array.prototype.reduce()
  - `reduce()`方法对数组中的每个元素按序执行一个由您提供的`reducer`函数
  - 每一次运行`reducer`会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值
  ```javascript
  reduce(callbackFn)
  reduce(callbackFn, initialValue)
  callbackFn(previousValue,currentValue,index,array)
  const arr = [1,2,3]
  const arr2 = arr.reduce((pre,cur)=> pre + cur )
  console.log(arr) // [1, 2, 3] 
  console.log(arr2) // 6
  ```
:::
:::info Array.prototype.some()
  - `reduce()`方法测试数组中是不是至少有`1`个元素通过了被提供的函数测试
  - 它返回的是一个`Boolean`类型的值
  - **如果用一个空数组进行测试，在任何情况下它返回的都是`False`**
  ```javascript
  reduce(callbackFn)
  reduce(callbackFn, thisArg)
  callbackFn(element,index,array)
  const arr = [1,2,3,4,5]
  const arr2 = arr.some((item)=> item % 2===0 )
  console.log(arr) // [1, 2, 3, 4, 5] 
  console.log(arr2) // true
  ```
:::
:::info Array.prototype.every()
  - `every()`方法测试一个数组内的所有元素是否都能通过指定函数的测试
  - 它返回的是一个`Boolean`类型的值
  ```javascript
  reduce(callbackFn)
  reduce(callbackFn, thisArg)
  callbackFn(element,index,array)
  const arr = [1,2,3,4,5]
  const arr2 = arr.every((item)=> item % 2===0 )
  console.log(arr) // [1, 2, 3, 4, 5] 
  console.log(arr2) // false
  ```
:::


:::info Array.prototype.indexOf()
  - `indexOf()`方法返回在数组中可以找到给定元素的第一个索引
  - 如果不存在，则返回`-1`
  ```javascript
  const colors = ['red','green','blue','red']
  console.log(colors.indexOf('red')) // 0
  console.log(colors.indexOf('red',1)) // 3
  console.log(colors.indexOf('yellow')) // -1
  ```
:::
:::info Array.prototype.lastIndexOf()
  - `lastIndexOf()`方法返回指定元素（也即有效的`JavaScript`值或变量）在数组中的最后一个的索引
  - 如果不存在则返回 -1。从数组的后面向前查找，从`fromIndex`处开始
  ```javascript
  const colors = ['red','green','blue','red']
  console.log(colors.lastIndexOf('red')) // 3
  console.log(colors.indexOf('green')) // 1
  ```
:::

:::info Array.prototype.includes()
  - `includes()`方法用来判断一个数组是否包含一个指定的值
  - 如果包含则返回`true`，否则返回`false`
  ```javascript
  const colors = ['red','green','blue']
  console.log(colors.includes('red')) // true
  console.log(colors.includes('yellow')) // false
  console.log(colors.includes()) // false
  ```
:::

:::info Array.prototype.find()
  - `find()`方法返回数组中满足提供的测试函数的第一个元素的值，否则返回 `undefined`
  ```javascript
  const arr = [1,2,3,4,5]
  console.log(arr.find((item)=> item > 3)) // 4
  console.log(arr.find((item)=> item > 5)) // undefined
  ```
:::

:::info Array.prototype.fill()
  - `fill()`方法用一个固定值填充一个数组中从起始索引（默认为`0`）到终止索引（默认为`array.length`）内的全部元素
  - 它返回修改后的数组
  ```javascript
  fill(value)
  fill(value, start)
  fill(value, start, end)
  const arr = [1,2,3,4,5]
  const arr1 = arr.fill(6)
  const arr2 = arr.fill(7, 1)
  const arr3 = arr.fill(8, 1, 3)
  console.log(arr1) //  [6, 6, 6, 6, 6]
  console.log(arr2) //  [6, 7, 7, 7, 7]
  console.log(arr3) //  [6, 8, 8, 7, 7]
  ```
:::

:::info Array.prototype.flat()
  - `flat()`方法创建一个新的数组，并根据指定深度递归地将所有子数组元素拼接到新的数组中
  ```javascript
  const arr1 = [0, 1, 2, [3, 4], 5]
  console.log(arr1.flat()) // [0, 1, 2, 3, 4, 5]
  ```
:::

:::info Array.from()
  - `Array.from()`静态方法从可迭代或类数组对象创建一个新的浅拷贝的数组实例
  ```javascript
  const arrayLike = {length:5}
  const arr = Array.from(arrayLike)
  console.log(Array.isArray(arr))  // true
  ```
:::
:::info Array.of()
  - `Array.of()`方法通过可变数量的参数创建一个新的`Array`实例，而不考虑参数的数量或类型
  - `Array.of()`和 `Array()`构造函数之间的区别在于对单个参数的处理
  ```javascript
  Array.of(7)// [7]
  Array(7) // [empty × 7]
  Array.of(1, 2, 3); // [1, 2, 3]
  Array(1, 2, 3);    // [1, 2, 3]
  ```
:::

## 9. 对象的方法

:::info Object.assign()
  - `Object.assign()`方法将所有可枚举（`Object.propertyIsEnumerable()` 返回`true`）的自有（`Object.hasOwnProperty()`返回`true`）属性从一个或多个源对象复制到目标对象
  - 返回修改后的对象
  ```javascript
  Object.assign(target, ...sources)
  const obj1 = {a:1,b:2}
  const obj2 = {b:3,c:4}
  const obj3 = Object.assign(obj1,obj2)
  console.log(obj1) // { a: 1, b: 3, c: 4 }
  console.log(obj2) // { b: 3, c: 4 }
  console.log(obj3) // { a: 1, b: 3, c: 4 }
  console.log(obj1 === obj3) // true
  ```
:::
:::info Object.create()
  - `Object.create()`方法用于创建一个新对象，使用现有的对象来作为新创建对象的原型（`prototype`）
  - 一个新对象，带着指定的原型对象及其属性
  ```javascript
  Object.create(proto)
  Object.create(proto, propertiesObject)
  const person = {
    isHuman: false,
    printIntroduction() {
      console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`)
      }
  }
  const p = Object.create(person)
  p.name = 'Joy'
  p.isHuman = true
  p.printIntroduction() // "My name is Joy. Am I human? true"
  ```
:::
:::info Object.entries()
  - `Object.entries()`方法返回一个给定对象自身可枚举属性的键值对数组
  ```javascript
  const obj1 = {a:1,b:2}
  const entries = Object.entries(obj1)
  console.log(entries) // [ ['a', 1], ['b', 2]] 
  ```
:::
:::info Object.hasOwn()
  - 如果指定的对象自身有指定的属性，则静态方法`Object.hasOwn()`返回`true`
  - 如果属性是继承的或者不存在，该方法返回`false`
  - *备注：`Object.hasOwn()`旨在取代`Object.hasOwnProperty()`*
  ```javascript
  hasOwn(instance, prop)
  const obj1 = {a:1,b:2}
  console.log(Object.hasOwn(obj1,'a')) // true
  console.log(Object.hasOwn(obj1,'toString')) // false
  console.log(Object.hasOwn(obj1,'c')) // false
  ```
:::

:::info Object.is()
  - `Object.is()`方法判断两个值是否为同一个值
  - `Object.is()`方法判断两个值是否为同一个值，如果满足以下任意条件则两个值相等：
    - 都是`undefined`
    - 都是`null`
    - 都是`true`或都是`false`
    - 都是相同长度、相同字符、按相同顺序排列的字符串
    - 都是相同对象（意味着都是同一个对象的值引用）
    - 都是数字且
      - 都是`+0`
      - 都是`-0`
      - 都是`NaN`
      - 都是同一个值，非零且都不是`NaN`
  ```javascript
  Object.is(1, 1)                  // true
  Object.is('abc', 'abc')          // true
  Object.is('abc', 'edf')          // false
  Object.is(null, null)            // true
  Object.is(undefined, undefined)  // true
  Object.is(window, window)        // true
  Object.is([], [])                // false
  const foo = { a: 1 }        
  const bar = { a: 1 }
  Object.is(foo, foo)              // true
  Object.is(foo, bar)              // false
  Object.is(0, -0)                 // false
  Object.is(+0, -0)                // false
  Object.is(-0, -0)                // true
  Object.is(0n, -0n)               // true
  Object.is(NaN, 0/0)              // true
  Object.is(NaN, Number.NaN)       // true
  ```
:::

## 10. JS 中的类型转换机制
:::info 概述
  - `JS`中有六种简单数据类型：`undefined`，`null`，`boolean`，`string`，`number`，`symbol`，`object`
  - 但是我们在声明的时候只有一种数据类型，只有到运行期间才会确定当前类型
    ```javascript
    let x = y ? 1 : 2
    ```
  - 上面代码中，x的值在编译阶段是无法获取的，只有等到程序运行时才能知道
  - 虽然变量的数据类型是不确定的，但是各种运算符对数据类型是有要求的，如果运算子的类型与预期不符合，就会触发类型转换机制
  - 常见的类型转换有：
    - 强制转换（显示转换）
    - 自动转换（隐式转换）
:::

:::tip 显示转换
  - 常见的方法有：
    - `Number()`
    - `parseInt()`
    - `String()`
    - `Boolean()`
:::
:::info Number()
  - 将任意类型的值转化为数值
    | 原始值    |             转换结果             |
    | --------- | :------------------------------: |
    | Undefined |               NaN                |
    | Null      |                0                 |
    | Boolean   |              1 、0               |
    | String    |     根据语法和转换规则来转换     |
    | Symbol    |   Throw a TypeError exception    |
    | Object    | 先调用toPrimitive,再调用toNumber |
  ```javascript{10,13}
  // test
  Number(123) // 123
  Number('123') // 123
  Number('123abc') // NaN
  Number('') // 0
  Number(true) // 1
  Number(false) // 0
  Number(undefined) // NaN
  Number(null) // 0
  Number({}) // NaN
  Number([1,2,3]) // NaN
  Number([1]) // 1
  Number([]) // 0
  ```
  - `Number`转换的时候是很严格的，只要有一个字符无法转成数值，整个字符串就会被转为`NaN`
:::

:::info parseInt()
  - `parseInt`函数逐个解析字符，遇到不能转换的字符就停下来
  ```javascript
  parseInt('123abc123') // 123
  ```
:::
:::info Sting()
  - 可以将任意类型的值转化成字符串
    | 原始值    |             转换结果             |
    | --------- | :------------------------------: |
    | Undefined |           'undefined'            |
    | Null      |              'null'              |
    | Boolean   |         'true'、'false'          |
    | Number    |              string              |
    | String    |              string              |
    | Symbol    |              string              |
    | Object    | 先调用toPrimitive,再调用toNumber |
  ```javascript{8-9}
  // test 
  String(undefined) // 'undefined'
  String(null) // 'null'
  String(true) // 'true'
  String(false) // 'false'
  String(1) // '1'
  String('abc') // 'abc'
  String(Symbol('abc')) // 'Symbol(abc)'
  String({}) // '[object Object]'
  ```
:::

:::info Boolean()
  - 可以将任意类型的值转为布尔值
    | 数据类型  |     转换为true的值     | 转换为false的值 |
    | --------- | :--------------------: | :-------------: |
    | Boolean   |          true          |      false      |
    | String    |       非空字符串       |       ""        |
    | Number    | 非零数值（包括无穷值） |     0、NaN      |
    | Object    |        任意对象        |      null       |
    | Undefined |      N/A(不存在)       |    undefined    |
    | Null      |      N/A(不存在)       |      null       |
  ```javascript
  // test
  Boolean(undefined) // false
  Boolean(null) // false
  Boolean(0) // false
  Boolean(NaN) // false
  Boolean('') // false
  Boolean({}) // true
  Boolean([]) // true
  Boolean(new Boolean(false)) // true
  ```
:::

:::tip 隐式转换
  - 两种情况发生隐式转换的场景：
    - 比较运算（`==`、`!=`、`>`、`<`）、`if`、`while`需要布尔值地方
    - 算术运算（`+`、`-`、`*`、`/`、`%`）
    - 除了上面的场景，还要求运算符两边的操作数不是同一类型
:::
:::info 自动转换为布尔值
- 在需要布尔值的地方，就会将非布尔值的参数自动转为布尔值，系统内部会调用`Boolean`函数
  - 可以得出个小结：
    - `undefined`
    - `null`
    - `false`
    - `+0`
    - `-0`
    - `NaN`
    - `""`
  - 除了上面几种会被转化成`false`，其他都换被转化成`true`
:::
:::info 自动转换成字符串
- 先将复合类型的值转为原始类型的值，再将原始类型的值转为字符串
- 常发生在+运算中，一旦存在字符串，则会进行字符串拼接操作
```javascript
'1' + 1 // '11'
'1' + true // "1true"
'1' + false // "1false"
'1' + {} // "1[object Object]"
'1' + [] // "1"
'1' + function (){} // "1function (){}"
'1' + undefined // "1undefined"
'1' + null // "1null"
```
:::

:::info 自动转换成数值
- 除了+有可能把运算子转为字符串，其他运算符都会把运算子自动转成数值
```javascript{11}
'1' - '2' // -1
'1' * '2' // 2
true - 1  // 0
false - 1 // -1
'1' - 1   // 0
'1' * []    // 0
false / '1' // 0
'abc' - 1   // NaN
null + 1 // 1
undefined + 1 // NaN
// null转为数值后值为0 ,undefined转为数值后值为NaN
```
:::

## 11. == 和 ===
:::info 等于操作符
  - 等于操作符用两个等于号（`==`）表示，如果操作数相等，则会返回`true`
  - 等于操作符（`==`）在比较中会先进行类型转换，再确定操作数是否相等
  - 遵循以下规则：
    - 如果任一操作数是布尔值，则将其转换为数值再比较是否相等
    ```javascript
      let result = (true == 1) // true
    ```
    - 如果一个操作数是字符串，另一个操作数是数值，则尝试将字符串转换为数值，再比较是否相等
    ```javascript
      let result = ("55" == 55) // true
    ```
    - 如果一个操作数是对象，另一个操作数不是，则调用对象的`valueOf()`方法取得其原始值，再根据前面的规则进行比较
    ```javascript
      let obj = {valueOf:function(){return 1}}
      let result = (obj == 1)  // true
    ```
    - 如果两个操作数都是对象，则比较它们是不是同一个对象，如果两个操作数都指向同一个对象，则相等操作符返回true
    ```javascript
      let obj1 = {name:"xxx"}
      let obj2 = {name:"xxx"}
      let result = (obj1 == obj2 ) // false
    ```
    - `null`和`undefined`相等
    ```javascript
      let result = (null == undefined )  // true
    ```
    - 如果有任一操作数是`NaN`，则相等操作符返回`false`
    ```javascript
      let result = (NaN == NaN )  // false
    ```
:::
:::tip 小结
  - 两个都为简单类型，字符串和布尔值都会转换成数值，再比较
  - 简单类型与引用类型比较，对象转化成其原始类型的值，再比较
  - 两个都为引用类型，则比较它们是否指向同一个对象
  - `null`和`undefined`相等
  - 存在`NaN`则返回`false`
:::

:::info 全等操作符
  - 全等操作符由 3 个等于号（`===`）表示，只有两个操作数在不转换的前提下相等才返回`true`。即类型相同，值也需相同
  ```javascript
  let result1 = ("55" === 55) // false，不相等，因为数据类型不同
  let result2 = (55 === 55) // true，相等，因为数据类型相同值也相同  
  ```
  - `undefined`和`null`与自身严格相等
  ```javascript
  let result1 = (null === null)  //true
  let result2 = (undefined === undefined)  //true
  ```
:::

:::info 区别
  - 相等操作符（`==`）会做类型转换，再进行值的比较
  - 全等运算符不会做类型转换
    ```javascript
    let result1 = ("55" === 55) // false，不相等，因为数据类型不同
    let result2 = (55 === 55) // true，相等，因为数据类型相同值也相同
    ```
  - `null`和`undefined`比较，相等操作符（`==`）为`true`，全等为`false`
    ```javascript
    let result1 = (null == undefined ) // true
    let result2 = (null === undefined) // false
    ```
:::

:::warning 总结
  - 相等运算符隐藏的类型转换，会带来一些违反直觉的结果
    ```javascript
    '' == '0' // false
    0 == '' // true
    0 == '0' // true
    false == 'false' // false
    false == '0' // true
    false == undefined // false
    false == null // false
    null == undefined // true
    '\t\r\n' == 0 // true
    ```
  - 但在比较`null`的情况的时候，我们一般使用相等操作符`==`
    ```javascript
    const obj = {}
    if(obj.x == null){
      console.log("1")  //执行
    }
    // 或者
    if(obj.x === null || obj.x === undefined) {
      // ...
    }
    ```
  - 使用相等操作符（`==`）的写法明显更加简洁了，所以除了在比较对象属性为`null`或者`undefined`的情况下，我们可以使用相等操作符（`==`），其他情况建议一律使用全等操作符（`===`）
:::

## 12. this

:::info this
  - `this`关键字是函数运行时自动生成的一个内部对象，只能在函数内部使用，总指向调用它的对象
  ```javascript
  function baz() {
    // 当前调用栈是：baz
    // 因此，当前调用位置是全局作用域
    console.log( "baz" );
    bar(); // <-- bar的调用位置
  }
  function bar() {
    // 当前调用栈是：baz --> bar
    // 因此，当前调用位置在baz中
    console.log( "bar" );
    foo(); // <-- foo的调用位置
  }
  function foo() {
    // 当前调用栈是：baz --> bar --> foo
    // 因此，当前调用位置在bar中
    console.log( "foo" );
  }
  baz(); // <-- baz的调用位置
  ```
  - 同时，`this`在函数执行过程中，`this`一旦被确定了，就不可以再更改
  ```javascript
  var a = 10
  var obj = {
    a: 20
  }
  function fn() {
    this = obj // 修改this，运行后会报错
    console.log(this.a)
  }
  fn()
  ```
:::

:::tip 绑定规则
  - 根据不同的使用场合，`this`有不同的值，主要分为下面几种情况：
    - 默认绑定
    - 隐式绑定
    - `new`绑定
    - 显示绑定
:::

:::info 默认绑定
  - 全局环境中定义`person`函数，内部使用`this`关键字
  ```javascript
  var name = 'Tom'
  function person() {
      console.log(this.name)
  }
  person() // Tom
  ```
  - 上述代码输出`Tom`，原因是调用函数的对象在浏览器中位`window`，因此`this`指向`window`
  - 注意:
    - 严格模式下，不能将全局对象用于默认绑定，`this`会绑定到`undefined`
    - 只有函数运行在非严格模式下，默认绑定才能绑定到全局对象
:::
:::info 隐式绑定
  - 函数还可以作为某个对象的方法调用，这时`this`就指这个上级对象
  ```javascript
  function showName2() {
    console.log(this.name)
  }
  var obj = {}
  obj.name = 'Tom'
  obj.showName1 = showName2
  obj.showName1() // Tom
  ```
  -  下面的代码`this`的上一级对象为`foo`，`foo`内部并没有`name`变量的定义，所以输出`undefined`
  ```javascript
  var obj = {
    name:"Tom",
    foo:{
      fn:function(){
        console.log(this.name)  // undefined
      }
    }
  }
  obj.foo.fn()
  ```
  - 下面的代码`this`指向的是`window`
  - `this`永远指向的是最后调用它的对象，虽然`fn`是对象`foo`的方法，但是`fn`赋值给`bar`时候并没有执行，所以最终指向`window`
  ```javascript
  var obj = {
    age:20,
    foo:{
      age:21,
      fn:function(){
          console.log(this.age) // undefined
          console.log(this)     // window
        }
      }
    }
  var bar = obj.foo.fn
  bar()
  ```
:::

:::info new绑定
  - 通过构建函数`new`关键字生成一个实例对象，此时`this`指向这个实例对象
    - `new`过程遇到`return`一个对象，此时`this`指向为返回的对象(`return {}`)
    - 如果返回一个简单类型的时候，则`this`指向实例对象(`return 1`)
    - 如果返回是`null`虽然也是对象，但是此时`new`仍然指向实例对象(`return null`)
  ```javascript
  function foo() {
  　this.name = 'Tom';
    }
  var p = new foo();
  p.name // Tom
  ```
:::

:::info 显示修改
  - `apply()`、`call()`、`bind()`是函数的一个方法，作用是改变函数的调用对象
  - 它的第一个参数就表示改变后的调用这个函数的对象。因此这时`this`指的就是这第一个参数
  ```javascript
  var name = '张三'
  function showName() {
  　console.log(this.name)
  }
  var obj = {}
  obj.name = '李四'
  obj.fn = showName
  obj.fn.call(obj) // 李四
  obj.fn.call(window) // 张三
  ```
:::

:::info 箭头函数
  - 箭头函数不能作为构建函数
  ```javascript
  const obj = {
    sayThis: () => {
      console.log(this)
    }
  }
  obj.sayThis() // window 
  // 因为 JavaScript 没有块作用域，
  // 所以在定义 sayThis 的时候，里面的 this 就绑到 window 上去了
  const globalSay = obj.sayThis;
  globalSay()  // window 浏览器中的global对象
  ```
  - 虽然箭头函数的`this`能够在编译的时候就确定了`this`的指向，但也需要注意一些潜在的坑
  ```javascript
  // 绑定事件监听
  const button = document.getElementById('id')
  button.addEventListener('click', ()=> {
      console.log(this === window) // true
      this.innerHTML = 'clicked button'
      // 我们其实是想要this为点击的button，但此时this指向了window
  })
  ```
  - 包括在原型上添加方法时候，此时`this`指向`window`
  ```javascript
  function Animals(name){
    this.name = name
    Animals.prototype.sayName = () => {
      console.log(this === window) //true
      console.log(this.name)  // Jerry
    }
  }
  const dog = new Animals('Jerry')
  dog.sayName() 
  ```
:::


## 13. DOM 常见的操作有哪些
:::info DOM
  - 文档对象模型(`DOM`)是`HTML`和`XML`文档的编程接口
  - 它提供了对文档的结构化的表述，并定义了一种方式可以使从程序中对该结构进行访问，从而改变文档的结构样式和内容
  - 任何`HTML`或`XML`文档都可以用`DOM`表示为一个由节点构成的层级结构
:::
:::tip 操作
  - `DOM`常见的操作主要分为：
    - 创建节点
    - 查询节点
    - 更新节点
    - 添加节点
    - 删除节点
:::

:::info 创建节点
  - 创建新元素，接受一个参数，即要创建元素的标签名
  ```javascript
  // createElement
  const divEle = document.createElement("div")
  // createTextNode
  const textEle = document.createTextNode("content")
  // createAttribute
  const dataAttribute = document.createAttribute('custom')
  ```
:::

:::info 获取节点
  - 创建新元素，接受一个参数，即要创建元素的标签名
  ```javascript
  document.getElementById('id属性值')  // 返回拥有指定id的对象的引用
  document.getElementsByClassName('class属性值')  // 返回拥有指定class的对象集合
  document.getElementsByTagName('标签名')  // 返回拥有指定标签名的对象集合
  document.getElementsByName('name属性值')  // 返回拥有指定名称的对象结合
  document.documentElement  // 获取页面中的HTML标签
  document.body // 获取页面中的BODY标签
  document.all[''] //   获取页面中的所有元素节点的对象集合型
  document/element.querySelector('CSS选择器')   //  仅返回第一个匹配的元素
  document/element.querySelectorAll('CSS选择器')  //   返回所有匹配的元素
  ```
:::

:::info 更新节点
  - innerHTML：不但可以修改一个`DOM`节点的文本内容，还可以直接通过HTML片段修改`DOM`节点内部的子树
  ```javascript
  // 获取<p id="p">...</p >
  var p = document.getElementById('p');
  // 设置文本为abc:
  p.innerHTML = 'ABC'; // <p id="p">ABC</p >
  // 设置HTML:
  p.innerHTML = 'ABC <span style="color:red">RED</span> XYZ'
  // <p>...</p >的内部结构已修改
  ```
  - innerText、textContent：自动对字符串进行`HTML`编码，保证无法设置任何`HTML`标签
    - 两者的区别在于读取属性时，`innerText`不返回隐藏元素的文本，而`textContent`返回所有文本
  ```javascript
  // 获取<p id="p-id">...</p >
  var p = document.getElementById('p-id');
  // 设置文本:
  p.innerText = '<script>alert("Hi")</script>';
  // HTML被自动编码，无法设置一个<script>节点:
  // <p id="p-id">&lt;script&gt;alert("Hi")&lt;/script&gt;</p >
  ```
:::
:::info 添加节点
  - appendChild：把一个子节点添加到父节点的最后一个子节点
  ```javascript
  // HTML结构 
  <p id="js">JavaScript</p >
  <div id="list">
    <p id="java">Java</p >
    <p id="python">Python</p >
    <p id="go">Go</p >
  </div>
  // js
  const php = document.getElementById('php')
  php.innerHTML = "Php"
  const list = document.getElementById('list')
  list.appendChild(php)
  ```
  - 动态添加
  ```javascript
  const list = document.getElementById('list')
  const newNode = document.createElement('n')
  newNode.id = 'newNode'
  newNode.innerText = 'NewNode'
  list.appendChild(newNode)
  ```
:::

:::info setAttribute
  - setAttribute：在指定元素中添加一个属性节点，如果元素中已有该属性改变属性值
  ```javascript
  const div = document.getElementById('id')
  div.setAttribute('class', 'white')//第一个参数属性名，第二个参数属性值
  ```
:::

:::info 删除节点
  - 删除一个节点，首先要获得该节点本身以及它的父节点
  - 调用父节点的`removeChild`把自己删掉
  - 删除后的节点虽然不在文档树中了，但其实它还在内存中，可以随时再次被添加到别的位置
  ```javascript
  // 拿到待删除节点:
  const remove = document.getElementById('remove')
  // 拿到父节点:
  const parent = remove.parentElement
  // 删除:
  const removed = parent.removeChild(remove)
  removed === remove // true
  ```
:::

## 14.  BOM 常见的操作有哪些
:::info BOM
  - `BOM` (`Browser Object Model`)浏览器对象模型，提供了独立于内容与浏览器窗口进行交互的对象
  - 其作用就是跟浏览器做一些交互效果,比如如何进行页面的后退，前进，刷新，浏览器的窗口发生变化，滚动条的滚动
  - 以及获取客户的一些信息如：浏览器品牌版本，屏幕分辨率
:::
:::info Window
  - `BOM`的核心对象是`window`，它表示浏览器的一个实例在浏览器中
  - `window`对象有双重角色，即是浏览器窗口的一个接口，又是全局对象
  - 因此所有在全局作用域中声明的变量、函数都会变成`window`对象的属性和方法
  ```javascript
  var name = 'Tom'
  function showName(){
    console.log(this.name)
  }
  console.log(window.name) // Tom
  showName() // Tom
  window.showName() // Tom
  ```
  - 关于窗口控制方法如下：
    - `moveBy(x,y)`：从当前位置水平移动窗体`x`个像素，垂直移动窗体`y`个像素，`x`为负数，将向左移动窗体，`y`为负数，将向上移动窗体
    - `moveTo(x,y)`：移动窗体左上角到相对于屏幕左上角的(`x`,`y`)点
    - `resizeBy(w,h)`：相对窗体当前的大小，宽度调整`w`个像素，高度调整`h`个像素。如果参数为负值，将缩小窗体，反之扩大窗体
    - `resizeTo(w,h)`：把窗体宽度调整为`w`个像素，高度调整为`h`个像素
    - `scrollTo(x,y)`：如果有滚动条，将横向滚动条移动到相对于窗体宽度为`x`个像素的位置，将纵向滚动条移动到相对于窗体高度为`y`个像素的位置
    - `scrollBy(x,y)`： 如果有滚动条，将横向滚动条向左移动`x`个像素，将纵向滚动条向下移动`y`个像素
:::

:::info location
  | 属性名   | 说明                                |
  | -------- | :---------------------------------- |
  | hash     | url中#后面的字符，没有则返回空串    |
  | host     | 服务器名称和端口号                  |
  | hostname | 域名，不带端口号                    |
  | href     | 完整url                             |
  | pathname | 服务器下面的文件路径                |
  | port     | url的端口号，没有则为空             |
  | protocol | 使用的协议                          |
  | search   | url的查询字符串，通常为？后面的内容 |
  -  除了`hash`之外，只要修改`location`的一个属性，就会导致页面重新加载新`URL`
  -  `location.reload()`，此方法可以重新刷新当前页面。这个方法会根据最有效的方式刷新页面
  -  如果页面自上一次请求以来没有改变过，页面就会从浏览器缓存中重新加载
  -  如果要强制从服务器中重新加载，传递一个参数`true`即可
:::

:::info navigator
  - `navigator`对象主要用来获取浏览器的属性，区分浏览器类型。属性较多，且兼容性比较复杂
  - 下表列出了`navigator`对象接口定义的属性和方法：
  ![pic](/bom1.png "notice")
  ![pic](/bom2.png "notice")
:::

:::info screen
  - 保存的纯粹是客户端能力信息，也就是浏览器窗口外面的客户端显示器的信息，比如像素宽度和像素高度
  ![pic](/bom3.png "notice")
:::
:::info history
  - `history`对象主要用来操作浏览器`URL`的历史记录，可以通过参数向前，向后，或者向指定`URL`跳转
  - 常用的属性如下：
    - `history.go()`：接收一个整数数字或者字符串参数，向最近的一个记录中包含指定字符串的页面跳转
    - `history.forward()`：向前跳转一个页面
    - `history.back()`：向后跳转一个页面
    - `history.length()`：获取历史记录数
:::


## 15.  JS 本地存储的方式有哪些
:::tip JavaScript本地缓存：
  - `Cookie`
  - `sessionStorage`
  - `localStorage`
  - `indexedDB`
:::

:::info Cookie
  - `Cookie`，类型为「小型文本文件」，指某些网站为了辨别用户身份而储存在用户本地终端上的数据。是为了解决`HTTP`无状态导致的问题
  - 作为一段一般不超过`4KB`的小型文本数据，它由一个名称（`Name`）、一个值（`Value`）和其它几个用于控制`Cookie`有效期、安全性、使用范围的可选属性组成
  - 但是`Cookie`在每次请求中都会被发送，如果不使用`HTTPS`并对其加密，其保存的信息很容易被窃取，导致安全风险。举个例子，在一些使用 `Cookie`保持登录态的网站上，如果 `Cookie`被窃取，他人很容易利用你的`Cookie`来假扮成你登录网站
  - 关于`Cookie`常用的属性如下：
    - `Expires`用于设置`Cookie`的过期时间
    ```javascript
    Expires=Wed, 12 Apr 2023 07:28:00 GMT
    ```
    - `Max-Age`用于设置在`Cookie`失效之前需要经过的秒数（优先级比`Expires`高）
    ```javascript
    Max-Age=604800
    ```
    - `Domain`指定了`Cookie`可以送达的主机名
    - `Path`指定了一个 URL路径，这个路径必须出现在要请求的资源的路径中才可以发送`Cookie`首部
    ```javascript
    Path=/docs   # /docs/Web/ 下的资源会带 Cookie 首部
    ```
    - 标记为`Secure`的`Cookie`只应通过被`HTTPS`协议加密过的请求发送给服务端
  - 通过上述，我们可以看到`Cookie`又开始的作用并不是为了缓存而设计出来，只是借用了`Cookie`的特性实现缓存
  - 关于`Cookie`的使用如下：
    ```javascript
    document.cookie = 'key=value'
    ```
    - 关于`Cookie`的修改，首先要确定`domain`和`path`属性都是相同的才可以，其中有一个不同得时候都会创建出一个新的`Cookie`
    ```javascript
    Set-cookie:name=aa; domain=aa.net; path=/  # 服务端设置
    document.cookie =name=bb; domain=aa.net; path=/  # 客户端设置
    ```
    - 最后`Cookie`的删除，最常用的方法就是给`Cookie`设置一个过期的事件，这样`Cookie`过期后会被浏览器删除
:::

:::info localStorage
  - `HTML5`新方法，`IE8`及以上浏览器都兼容
  - `localStorage`的特点：
    - 生命周期：持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的
    - 存储的信息在同一域中是共享的
    - 当本页操作（新增、修改、删除）了`localStorage`的时候，本页面不会触发`storage`事件,但是别的页面会触发`storage`事件
    - 大小：`5M`（跟浏览器厂商有关系）
    - `localStorage`本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡
    - 受同源策略的限制
  - `localStorage`的使用：
    - 设置
    ```javascript
    localStorage.setItem('username','hef')
    ```
    - 获取
    ```javascript
    localStorage.getItem('username')
    ```
    - 获取键名
    ```javascript
    localStorage.key(0) 
    ```
    - 删除
    ```javascript
    localStorage.removeItem('username')
    ```
    - 一次性清除所有存储
    ```javascript
    localStorage.clear()
    ```
  - localStorage 也不是完美的，它有两个缺点：
    - 无法像`Cookie`一样设置过期时间
    - 只能存入字符串，无法直接存对象
    ```javascript
    localStorage.setItem('key', {name: 'value'})
    console.log(localStorage.getItem('key')) // '[object, Object]'
    ```
:::

:::info sessionStorage
  - `sessionStorage`和`localStorage`使用方法基本一致
  - 唯一不同的是生命周期，一旦页面（会话）关闭，`sessionStorage` 将会删除数据
:::

:::info indexedDB
  - `indexedDB`是一种低级`API`，用于客户端存储大量结构化数据(包括, 文件/` blobs`)。该`API`使用索引来实现对该数据的高性能搜索
  - 虽然`Web Storage`对于存储较少量的数据很有用，但对于存储更大量的结构化数据来说，这种方法不太有用。`IndexedDB`提供了一个解决方案
  - 优点：
    - 储存量理论上没有上限
    - 所有操作都是异步的，相比`LocalStorage`同步操作性能更高，尤其是数据量较大时
    - 原生支持储存`JS`的对象
    - 是个正经的数据库，意味着数据库能干的事它都能干
  - 缺点：
    - 操作非常繁琐
    - 本身有一定门槛
  - 基本使用步骤：
    - 打开数据库并且开始一个事务
    - 创建一个`object store`
    - 构建一个请求来执行一些数据库操作，像增加或提取数据等
    - 通过监听正确类型的`DOM`事件以等待操作完成
    - 操作结果上进行一些操作（可以在`request`对象中找到）
:::

:::tip 区别
  - 关于`Cookie`、`sessionStorage`、`localStorage`三者的区别主要如下：
  - 存储大小：`cookie`数据大小不能超过4k，`sessionStorage`和`localStorage`虽然也有存储大小的限制，但比`Cookie`大得多，可以达到`5M`或更大
  - 有效时间：`localStorage`存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；`sessionStorage`数据在当前浏览器窗口关闭后自动删除；`Cookie`设置的`Cookie`过期时间之前一直有效，即使窗口或浏览器关闭
  - 数据与服务器之间的交互方式，`Cookie`的数据会自动的传递到服务器，服务器端也可以写`Cookie`到客户端；`sessionStorage`和`localStorage`不会自动把数据发给服务器，仅在本地保存
:::

:::info 应用场景
  - 针对不对场景的使用选择：
    - 标记用户与跟踪用户行为的情况，推荐使用`Cookie`
    - 适合长期保存在本地的数据（令牌），推荐使用`localStorage`
    - 敏感账号一次性登录，推荐使用`sessionStorage`
    - 存储大量数据的情况、在线文档（富文本编辑器）保存编辑历史的情况，推荐使用`indexedDB`
:::

## 16. JS 中的事件模型

:::info 事件与事件流
  - `Javascript`中的事件，可以理解就是在`HTML`文档或者浏览器中发生的一种交互操作，使得网页具备互动性，常见的有加载事件、鼠标事件、自定义事件等
  - 由于`DOM`是一个树结构，如果在父子节点绑定事件时候，当触发子节点的时候，就存在一个顺序问题，这就涉及到了事件流的概念
  - 事件流都会经历三个阶段：
    - 事件捕获阶段(`capture phase`)
    - 处于目标阶段(`target phase`)
    - 事件冒泡阶段(`bubbling phase`)
    ![pic](/event1.png "notice")
  - 事件冒泡是一种从下往上的传播方式，由最具体的元素（触发节点）然后逐渐向上传播到最不具体的那个节点，也就是`DOM`中最高层的父节点
    ```javascript
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Event Bubbling</title>
      </head>
      <body>
        <button id="clickMe">Click Me</button>
      </body>
    </html>
    ```
  - 然后，我们给`button`和它的父元素，加入点击事件
    ```javascript
    let button = document.getElementById('clickMe')
    button.onclick = function() {
      console.log('1.Button')
    }
    document.body.onclick = function() {
      console.log('2.body')
    }
    document.onclick = function() {
      console.log('3.document')
    }
    window.onclick = function() {
      console.log('4.window')
    }
    ```
  - 点击按钮，输出如下：
    ```javascript
    1.button
    2.body
    3.document
    4.window
    ```
  - 点击事件首先在`button`元素上发生，然后逐级向上传播
  - 事件捕获与事件冒泡相反，事件最开始由不太具体的节点最早接受事件, 而最具体的节点（触发节点）最后接受事件
:::

:::tip 事件模型
  - 事件模型可以分为三种：
    - 原始事件模型（DOM0级）
    - 标准事件模型（DOM2级）
    - IE事件模型（基本不用）
:::

:::info 原始事件模型（DOM0级）
  - 事件绑定监听函数比较简单, 有两种方式：
    - `HTML`代码中直接绑定
      ```javascript
      <input type="button" onclick="fn()">
      ```
    - 通过`JS`代码绑定
      ```javascript
      let btn = document.getElementById('.btn');
      btn.onclick = fn
      ```
  - 特性：
    - 绑定速度快
      - `DOM0`级事件具有很好的跨浏览器优势，会以最快的速度绑定，但由于绑定速度太快，可能页面还未完全加载出来，以至于事件可能无法正常运行
        - 只支持冒泡，不支持捕获
        - 同一个类型的事件只能绑定一次
        ```javascript
        <input type="button" id="btn" onclick="fn1()">
        var btn = document.getElementById('.btn')
        btn.onclick = fn2
        ```
        - 如上，当希望为同一个元素绑定多个同类型事件的时候（上面的这个`btn`元素绑定`2`个点击事件），是不被允许的，后绑定的事件会覆盖之前的事件，删除 `DOM0`级事件处理程序只要将对应事件属性置为`null`即可
        ```javascript
        btn.onclick = null
        ```
:::

:::info 标准事件模型
  - 在该事件模型中，一次事件共有三个过程：
    - 事件捕获阶段：事件从`document`一直向下传播到目标元素, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行
    - 事件处理阶段：事件到达目标元素, 触发目标元素的监听函数
    - 事件冒泡阶段：事件从目标元素冒泡到`document`，依次检查经过的节点是否绑定了事件监听函数，如果有则执行
  - 事件绑定监听函数的方式如下：
    ```javascript
    addEventListener(eventType, handler, useCapture)
    ```
  - 事件移除监听函数的方式如下：
    ```javascript
    addEventListener(eventType, handler, useCapture)
    ```
  - 参数如下：
    - `eventType`指定事件类型(不要加`on`)
    - `handler`是事件处理函数
    - `useCapture`是一个`boolean`用于指定是否在捕获阶段进行处理，一般设置为`false`与`IE`浏览器保持一致
    - 举个例子：
      ```javascript
      var btn = document.getElementById('.btn')
      btn.addEventListener(‘click’, showMessage, false)
      btn.removeEventListener(‘click’, showMessage, false)
      ```
  - 特性：
    - 可以在一个`DOM`元素上绑定多个事件处理器，各自并不会冲突
      ```javascript
      btn.addEventListener(‘click’, showMessage1, false)
      btn.addEventListener(‘click’, showMessage2, false)
      btn.addEventListener(‘click’, showMessage3, false)
      ```
    - 执行时机：
      - 当第三个参数(`useCapture`)设置为`true`就在捕获过程中执行，反之在冒泡过程中执行处理函数
      - 下面举个例子：
        ```javascript
        <div id='div'>
          <p id='p'>
            <span id='span'>Click Me!</span>
          </p >
        </div>
        ```
      - 设置点击事件
        ```javascript{5-6}
        var div = document.getElementById('div')
        var p = document.getElementById('p')
        function onClickFn (event) {
          var tagName = event.currentTarget.tagName
          var phase = event.eventPhase
          console.log(tagName, phase)
        }
        div.addEventListener('click', onClickFn, false)
        p.addEventListener('click', onClickFn, false)
        ```
      - 上述使用了`eventPhase`，返回一个代表当前执行阶段的整数值：
        - `1`为捕获阶段
        - `2`为事件对象触发阶段
        - `3`为冒泡阶段
      - 点击Click Me!，输出如下：
        ```javascript
        P 3
        DIV 3
        ```
      - 可以看到，`p`和`div`都是在冒泡阶段响应了事件，由于冒泡的特性，裹在里层的`p`率先做出响应
      - 如果把第三个参数都改为`true`
        ```javascript
        div.addEventListener('click', onClickFn, true)
        p.addEventListener('click', onClickFn, true)
        ```
      - 输出如下：
        ```javascript
        DIV 1
        P 1
        ```
      - 两者都是在捕获阶段响应事件，所以`div`比`p`标签先做出响应
:::

:::info IE事件模型
  - `IE`事件模型共有两个过程：
    - 事件处理阶段：事件到达目标元素, 触发目标元素的监听函数
    - 事件冒泡阶段：事件从目标元素冒泡到`document`，依次检查经过的节点是否绑定了事件监听函数，如果有则执行
  - 事件绑定监听函数的方式如下：
    ```javascript
    attachEvent(eventType, handler)
    ```
  - 事件移除监听函数的方式如下：
    ```javascript
    detachEvent(eventType, handler)
    ```
  - 举个例子：
    ```javascript
    var btn = document.getElementById('.btn')
    btn.attachEvent(‘onclick’, showMessage)
    btn.detachEvent(‘onclick’, showMessage)
    ```
:::

## 17. 事件代理（事件委托）
:::tip 事件代理
  - 事件代理：就是把一个元素响应事件（`click`、`keydown`......）的函数委托到另一个元素
  - 事件流的都会经过三个阶段：捕获阶段 -> 目标阶段 -> 冒泡阶段，`而事件委托就是在冒泡阶段完成`
  - 事件委托，会把一个或者一组元素的事件委托到它的父层或者更外层元素上，真正绑定事件的是外层元素，而不是目标元素
  - 当事件响应到目标元素上时，会通过事件冒泡机制从而触发它的外层元素的绑定事件上，然后在外层元素上去执行函数
:::

:::info 应用场景
  - 如果我们有一个列表，列表之中有大量的列表项，我们需要在点击列表项的时候响应一个事件
    ```javascript
    <ul id="list">
      <li>item1</li>
      <li>item2</li>
      <li>item3</li>
    </ul>
    ```
  - 如果给每个列表项一一都绑定一个函数，那对于内存消耗是非常大的
    ```javascript
    // 获取目标元素
    let list = document.getElementsByTagName("li")
    // 循环遍历绑定事件
    for (let i = 0; i < list.length; i++) {
      list[i].onclick = function(e){
        console.log(e.target.innerHTML)
      }
    }
    ```
  - 这时候就可以事件委托，把点击事件绑定在父级元素`ul`上面，然后执行事件的时候再去匹配目标元素
    ```javascript
    // 给父层元素绑定事件
    document.getElementById('list').addEventListener('click', function (e) {
      // 兼容性处理
      var event = e || window.event
      var target = event.target || event.srcElement
      // 判断是否匹配目标元素
      if (target.nodeName.toLocaleLowerCase === 'li') {
        console.log('the content is: ', target.innerHTML)
      }
    })
    ```
  - 还有一种场景是上述列表项并不多，我们给每个列表项都绑定了事件
  - 但是如果用户能够随时动态的增加或者去除列表项元素，那么在每一次改变的时候都需要重新给新增的元素绑定事件，给即将删去的元素解绑事件
  - 如果用了事件委托就没有这种麻烦了，因为事件是绑定在父层的，和目标元素的增减是没有关系的，执行到目标元素是在真正响应执行事件函数的过程中去匹配的
    ```javascript
    // 点击input可以动态添加元素
    <input type="button" name="" id="btn" value="添加" />
    <ul id="ul">
      <li>item1</li>
      <li>item2</li>
      <li>item3</li>
      <li>item4</li>
    </ul>
    // 使用事件委托
    const btn = document.getElementById("btn")
    const ul = document.getElementById("ul")
    const num = 4
    //事件委托，添加的子元素也有事件
    ul.onclick = (e) => {
      console.log(e.target.innerHTML)
    }
    //添加新节点
    btn.onclick = () => {
      num++
      const newLi = document.createElement('li')
      newLi.innerHTML = `item${num}`
      ul.appendChild(newLi)
    }
    ```
  - 可以看到，使用事件委托，在动态绑定事件的情况下是可以减少很多重复工作的
:::

:::tip 总结
  - 适合事件委托的事件有：`click`，`mousedown`，`mouseup`，`keydown`，`keyup`，`keypress`
  - 从上面应用场景中，我们就可以看到使用事件委托存在两大优点：
    - 减少整个页面所需的内存，提升整体性能
    - 动态绑定，减少重复工作
  - 但是使用事件委托也是存在局限性：
    - `focus`、`blur`这些事件没有事件冒泡机制，所以无法进行委托绑定事件
    - `mousemove`、`mouseout`这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，对性能消耗高，因此也是不适合于事件委托的
  - 如果把所有事件都用事件代理，可能会出现事件误判，即本不该被触发的事件被绑定上了事件
:::

## 18. 跨域

::: info 同源策略
  - 跨域本质是浏览器基于同源策略的一种安全手段
  - 同源策略（`Sameoriginpolicy`）是一种约定，它是浏览器最核心也最基本的安全功能
  - 所谓同源（即指在同一个域）具有以下三个相同点：
    - 协议相同（`protocol`）
    - 主机相同（`host`）
    - 端口相同（`port`）
  - 反之非同源请求，也就是协议、端口、主机其中一项不相同的时候，这时候就会产生跨域
:::
::: info JSONP
  - 利用`script`标签没有跨域限制的漏洞，网页可以得到从其他来源动态产生的`JSON`数据。`JSONP`请求一定需要对方的服务器做支持才可以
  - JSONP的实现流程：
    - 声明一个回调函数，其函数名(如show)当做参数值，要传递给跨域请求数据的服务器，函数形参为要获取目标数据(服务器返回的`data`)
    - 创建一个`script`标签，把那个跨域的API数据接口地址，赋值给`script`的`src`,还要在这个地址中向服务器传递该函数名（可以通过问号传参:`?cb=cb`）
    - 服务器接收到请求后，需要进行特殊的处理：把传递进来的函数名和它需要给你的数据拼接成一个字符串,例如：传递进去的函数名是show，它准备好的数据是`cb('hello')`
    - 最后服务器把准备的数据通过`HTTP`协议返回给客户端，客户端再调用执行之前声明的回调函数`cb()`，对返回的数据进行操作
    ```html
    <button onclick="jsonpData();">跨域请求</button>
    ```
    ```javascript
    function jsonpData() {
      let script = document.createElement('script')
      script.src =
        'http://www.jxntv.cn/data/jmd-jxtv2.html?callback=list'
      document.body.appendChild(script)
    }
    function list(res) {
      console.log(res.data[0].list)
      document.body.removeChild(script)
    }
    ```
  - JSONP的优缺点：
    - 它不像`XMLHttpRequest`对象实现的`Ajax`请求那样受到同源策略的限制
    - 它的兼容性更好，在更加古老的浏览器中都可以运行，不需要`XMLHttpRequest`或`ActiveX`的支持；并且在请求完毕后可以通过调用`callback`的方式回传结果
    - 支持`GET`请求而不支持`POST`等其它类型的`HTTP`请求；它只支持跨域`HTTP`请求这种情况，不能解决不同域的两个页面之间如何进行`JavaScript`调用的问题
:::

:::info CORS
  - `CORS`（Cross-Origin Resource Sharing，跨域资源共享）是一个系统，它由一系列传输的`HTTP`头组成，
  - 这些HTTP头决定浏览器是否阻止前端`JavaScript`代码获取跨域请求的响应
  - `CORS`实现起来非常方便，只需要增加一些 HTTP 头，让服务器能声明允许的访问来源，只要后端实现了`CORS`，就实现了跨域
  - 以`koa`框架举例，添加中间件，直接设置`Access-Control-Allow-Origin`响应头
    ```javascript
    app.use(async (ctx, next)=> {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
      ctx.body = 200; 
    } else {
      await next();
      }
    })
    ```
  - PS:`Access-Control-Allow-Origin`设置为`*`其实意义不大，可以说是形同虚设在实际应用中，上线前我们会将`Access-Control-Allow-Origin`值设为我们目标`host`
:::