## 1. 数据类型
:::tip  数据类型
- 在JS中共有8种基础的数据类型，分别为：`Undefined`、`Null`、`Boolean`、`Number`、`String`、`Object`、`Symbol`、`BigInt`
- 其中`Symbol`和`BigInt`是`ES6`新增的数据类型:
   - `Symbol` 代表独一无二的值，最多的用法是用来定义对象的唯一属性名
   - `BigInt` 可以表示任意大小的整数
:::      
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
:::tip 数据类型的判断：
  1. `typeof`：能判断所有值类型，函数。不可对`null`、对象、数组进行精确判断，因为都返回`object`
:::
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
  :::tip 2. `instanceof`：能判断对象类型，不能判断基本数据类型，其内部运行机制是判断在其原型链中能否找到该类型的原型
   
  :::
  ```javascript
  class People {}
  class Student extends People {}
  const s = new Student();
  console.log(s instanceof People); // true
  console.log(s instanceof Student); // true
  ```
  :::tip 3. `Object.prototype.toString.call`()：所有原始数据类型都是能判断的，还有`Error`对象`Date`对象等
  
  :::
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
  :::warning 4 如何判断变量是否为数组
  :::
  ```javascript
  Array.isArray(arr); // true
  arr.__proto__ === Array.prototype; // true
  arr instanceof Array; // true
  Object.prototype.toString.call(arr); // "[object Array]"
  ```

## 2. 原型和原型链
:::tip 
- **原型**：每个对象拥有一个原型对象，通过 `__proto__ `指针指向上一个原型 ，并从中继承方法和属性，同时原型对象也可能拥有原型，这样一层一层，最终指向`null`，这就是原型链
- **原型链**：由相互关联的原型组成的链状结构就是原型链
:::
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


## 3. 作用域与作用域链
:::danger 作用域与作用域链
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
:::warning 全局作用域
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
:::warning 函数作用域
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
:::warning 块级作用域
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
:::danger 词法作用域
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
:::tip
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
:::tip 使用场景
  - 任何闭包的使用场景都离不开这两点：
    - 创建私有变量
    - 延长变量的生命周期
:::


##  5. 事件循环
:::tip Even Loop
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

:::tip  例子：
:::
  ```javascript
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
:::warning 分析：
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
:::warning 再分析：
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
:::danger 总结
  - 此时执行完`await`并不先把`await`后面的代码注册到微任务队列中去，
  - 而是执行完`await`之后，直接跳出`async1`函数，执行其他代码
  - 然后遇到`promise`的时候，把`promise.then`注册为微任务
  - 其他代码执行完毕后，需要回到`async1`函数去执行剩下的代码
  - 再把`await`后面的代码注册到微任务队列当中，注意此时微任务队列中是有之前注册的微任务的
  - 所以这种情况会先执行`async1`函数之外的微任务(p1,p2)，然后才执行async1内注册的微任务
  - 可以理解为：这种情况下，`await`后面的代码会在本轮循环的最后被执行
::: 
## 6. 浏览器的垃圾回收机制（Garbage Collection）
:::tip 标记清除算法

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

  :::tip  引用计数算法
  - 它把对象是否不再需要简化定义为对象有没有其他对象引用到它。如果没有引用指向该对象（引用计数为 0），对象将被垃圾回收机制回收
  - **过程**
    -  当声明了一个变量并且将一个引用类型赋值给该变量的时候这个值的引用次数就为 1
    -  如果同一个值又被赋给另一个变量，那么引用数加 1
    -  如果该变量的值被其他的值覆盖了，则引用次数减 1
    -  当这个值的引用次数变为 0 的时候，说明没有变量在使用，这个值没法被访问了，回收空间，垃圾回收器会在运行的时候清理掉引用次数为 0 的值占用的内存
:::
## 7. http 缓存
:::tip 定义
 - 什么是缓存？把一些不需要重新获取的内容再重新获取一次
 - 为什么需要缓存？网络请求相比于`CPU`的计算和页面渲染是非常非常慢的
 - 哪些资源可以被缓存？静态资源，比如 `js`,`css`,`img`
:::

:::tip  强制缓存
  :::details
  ![图片描述](/cache1.png)
  :::
  :::tip Cache-Control
  - 在 `Response Headers` 中控制强制缓存的逻辑，例如:`Cache-Control`: `max-age`=3153600（单位是秒）
  - **Cache-Control** 有哪些值:
    - **max-age**：缓存最大过期时间
    - **no-cache**：可以在客户端存储资源，每次都必须去服务端做新鲜度校验，来决定从服务端获取新的资源（200）还是使用客户端缓存（304)
    - **no-store**：永远都不要在客户端存储资源，永远都去原始服务器去获取资源
:::

:::tip 协商缓存
  - 服务端缓存策略
  - 服务端判断客户端资源，是否和服务端资源一样
  - 一致则返回304，否则返回200和最新的资源
  :::details
  ![图片描述](/cache2.png)
  :::
  :::tip  资源标识
  - 在 `Response` `Headers`中，有两种:`Last-Modified`和 `Etag`
    - `Last-Modified`：资源的最后修改时间
      :::details
      - ![图片描述](/last-Modified.png)
      :::
      - 服务端拿到 `if-Modified-Since` 之后拿这个时间去和服务端资源最后修改时间做比较
      - 如果一致则返回 304，不一致（也就是资源已经更新了）就返回200和新的资源及新的`Last-Modified`
    - `Etag`：资源的唯一标识（一个字符串，类似于人类的指纹）
      :::details
      - ![图片描述](/etag.png)
      :::
      - 其实`Etag`和`Last-Modified`一样的
      - 只不过 `Etag` 是服务端对资源按照一定方式（比如 `contenthash`）计算出来的唯一标识
      - 就像人类指纹一样，传给客户端之后，客户端再传过来时候，服务端会将其与现在的资源计算出来的唯一标识做比较
      - 一致则返回304，不一致就返回200和新的资源及新的`Etag`
  :::
  :::warning 比较
  - 优先使用`Etag`
  - `Last-Modified`只能精确到秒级
  - 如果资源被重复生成，而内容不变，则`Etag`更精确
  :::
  :::danger 总结
  ![图片描述](/cache3.png)
  :::

## 8.  数组的方法
:::tip Array.prototype.push()
  - `push()`方法将一个或多个元素添加到数组的末尾，`并返回该数组的新长度`
  ```javascript
  const colors = ['red', 'green'];
  const length = colors.push('blue');
  console.log(colors) // ['red', 'green', 'blue']
  console.log(length) //  3
  ```
:::
:::tip Array.prototype.pop()
  - `pop()`方法从数组中删除最后一个元素，并返回该元素的值。`此方法会更改数组的长度`
  ```javascript
  const colors = ['red', 'green','blue']
  const item = colors.pop()
  console.log(item) //  'blue'
  console.log(colors) // ['red', 'green']
  ```
:::
:::tip Array.prototype.unshift()
  - `unshift()`方法将一个或多个元素添加到数组的开头，`并返回该数组的新长度`
  ```javascript
  const colors = ['red', 'green','blue']
  const item = colors.shift()
  console.log(item) //  'red'
  console.log(colors) // ['green', 'blue']
  ```
:::
:::tip Array.prototype.shift()
  - `shift()`方法从数组中删除第一个元素，`并返回该元素的值。此方法更改数组的长度`
  ```javascript
  const colors = ['red','green','blue']
  const item = colors.shift()
  console.log(item) //  red
  console.log(colors) // ['red', 'green', 'blue']
  ```
:::
:::warning Array.prototype.splice()
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
:::warning Array.prototype.slice()
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
:::tip Array.prototype.concat()
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
:::tip Array.prototype.reverse()
  - `reverse()`方法将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个
  - 该方法`会改变原数组`
  ```javascript
  const colors = ['red','green','blue']
  const colors2 = colors.reverse()
  console.log(colors) //   ['blue', 'green', 'red']
  console.log(colors2) //  ['blue', 'green', 'red']
  ```
:::
:::tip Array.prototype.sort()
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

:::tip
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

:::warning Array.prototype.filter()
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
:::warning Array.prototype.forEach()
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
:::warning Array.prototype.map()
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

:::warning Array.prototype.reduce()
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
:::tip Array.prototype.some()
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
:::tip Array.prototype.every()
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


:::tip Array.prototype.indexOf()
  - `indexOf()`方法返回在数组中可以找到给定元素的第一个索引
  - 如果不存在，则返回`-1`
  ```javascript
  const colors = ['red','green','blue','red']
  console.log(colors.indexOf('red')) // 0
  console.log(colors.indexOf('red',1)) // 3
  console.log(colors.indexOf('yellow')) // -1
  ```
:::
:::tip Array.prototype.lastIndexOf()
  - `lastIndexOf()`方法返回指定元素（也即有效的`JavaScript`值或变量）在数组中的最后一个的索引
  - 如果不存在则返回 -1。从数组的后面向前查找，从`fromIndex`处开始
  ```javascript
  const colors = ['red','green','blue','red']
  console.log(colors.lastIndexOf('red')) // 3
  console.log(colors.indexOf('green')) // 1
  ```
:::

:::tip Array.prototype.includes()
  - `includes()`方法用来判断一个数组是否包含一个指定的值
  - 如果包含则返回`true`，否则返回`false`
  ```javascript
  const colors = ['red','green','blue']
  console.log(colors.includes('red')) // true
  console.log(colors.includes('yellow')) // false
  console.log(colors.includes()) // false
  ```
:::

:::tip Array.prototype.find()
  - `find()`方法返回数组中满足提供的测试函数的第一个元素的值，否则返回 `undefined`
  ```javascript
  const arr = [1,2,3,4,5]
  console.log(arr.find((item)=> item > 3)) // 4
  console.log(arr.find((item)=> item > 5)) // undefined
  ```
:::

:::tip Array.prototype.fill()
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

:::tip Array.prototype.flat()
  - `flat()`方法创建一个新的数组，并根据指定深度递归地将所有子数组元素拼接到新的数组中
  ```javascript
  const arr1 = [0, 1, 2, [3, 4], 5]
  console.log(arr1.flat()) // [0, 1, 2, 3, 4, 5]
  ```
:::

:::tip Array.from()
  - `Array.from()`静态方法从可迭代或类数组对象创建一个新的浅拷贝的数组实例
  ```javascript
  const arrayLike = {length:5}
  const arr = Array.from(arrayLike)
  console.log(Array.isArray(arr))  // true
  ```
:::
:::tip Array.of()
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

:::tip Object.assign()
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
:::tip Object.create()
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
:::tip Object.entries()
  - `Object.entries()`方法返回一个给定对象自身可枚举属性的键值对数组
  ```javascript
  const obj1 = {a:1,b:2}
  const entries = Object.entries(obj1)
  console.log(entries) // [ ['a', 1], ['b', 2]] 
  ```
:::
:::warning Object.hasOwn()
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

:::tip Object.is()
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

## 10. 谈谈 JavaScript 中的类型转换机制
:::tip 概述
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

:::warning 显示转换
  - 常见的方法有：
    - `Number()`
    - `parseInt()`
    - `String()`
    - `Boolean()`
:::
:::danger Number()
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

:::danger parseInt()
  - `parseInt`函数逐个解析字符，遇到不能转换的字符就停下来
  ```javascript
  parseInt('123abc123') // 123
  ```
:::
:::danger Sting()
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

:::danger Boolean()
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

:::warning 隐式转换
  - 两种情况发生隐式转换的场景：
    - 比较运算（`==`、`!=`、`>`、`<`）、`if`、`while`需要布尔值地方
    - 算术运算（`+`、`-`、`*`、`/`、`%`）
    - 除了上面的场景，还要求运算符两边的操作数不是同一类型
:::
  :::danger 自动转换为布尔值
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
  :::danger 自动转换成字符串
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

  :::danger 自动转换成数值
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


## 11. this

:::danger this
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

:::warning 绑定规则
  - 根据不同的使用场合，`this`有不同的值，主要分为下面几种情况：
    - 默认绑定
    - 隐式绑定
    - `new`绑定
    - 显示绑定
:::

:::danger 默认绑定
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
:::danger 隐式绑定
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

:::danger new绑定
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

:::danger 显示修改
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

:::danger 箭头函数
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