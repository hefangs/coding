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
  ```


## 3. 作用域与作用域链
:::tip 
- **作用域**：规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。换句话说，作用域决定了代码区块中变量和其他资源的可见性。（全局作用域、函数作用域、块级作用域）
- **作用域链**：从当前作用域开始一层层往上找某个变量，如果找到全局作用域还没找到，就放弃寻找 。这种层级关系就是作用域链
::: 

## 4. 闭包
:::tip
- 在`JavaScript`中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。可以在一个内层函数中访问到其外层函数的作用域
- 闭包是指那些能够访问自由变量的函数。自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。闭包=函数 +函数能够访问的自由变量
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
  - **`2`种情况分析`await`后面跟的内容：**
    - 如果`await`后面直接跟的为一个变量，比如：`await` 1
      - 这种情况的话相当于直接把`await`后面的代码注册为一个微任务，
      - 可以简单理解为`promise.then`(await下面的代码)
      - 然后跳出`async1`函数，执行其他代码，
      - 当遇到`promise`函数的时候，会注册`promise.then`()函数到微任务队列
      - 注意此时微任务队列里面已经存在`await`后面的微任务，所以这种情况会先执行`await`后面的代码（console.log(2)），再执行`async1`函数后面注册的微任务代码（ console.log(6)， console.log(7)）
    - 如果`await`后面跟的是一个异步函数的调用，比如上面的代码，将代码改成这样
:::
  ```javascript
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
    -  此时执行完`await`并不先把`await`后面的代码注册到微任务队列中去，
    -  而是执行完`await`之后，直接跳出`async1`函数，执行其他代码
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
  :::warning 总结
  :::details
  - ![图片描述](/cache3.png)
  :::
  :::


