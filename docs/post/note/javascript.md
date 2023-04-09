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
