
# Vue2.0相关
## 1. 为什么 data 是一个函数
  1. 组件中的 `data` 写成一个函数，数据以函数返回值形式定义，
  2. 这样每复用一次组件，就会返回一份新的 `data`，
  3. 类似于给每个组件实例创建一个私有的数据空间，让各个组件实例维护各自的数据。
  4. 而单纯的写成对象形式，就使得所有组件实例共用了一份 `data`，就会造成一个变了全都会变的结
## 2. Vue 组件通讯有哪几种方式
  1. `props`：父组件向子组件传递数据是通过 `prop`传递的
  2. 子组件传递数据给父组件是通过 `$emit` 触发自定义事件
  3. `$parent`,`$children` 获取当前组件的父组件和当前组件的子组件
  4. `$attrs`和 `$listeners`,Vue2.4开始提供了 `$attrs`和 `$listeners`来解决这个问题
  5. 父组件中通过 `provide` 来提供变量，然后在子组件中通过 `inject` 来注入变量
  6. `$refs` 获取组件实例
  7. `eventBus` 兄弟组件数据传递 这种情况下可以使用事件总线的方式
  8. `vueX` 状态管理
## 3. v-if 和 v-show 的区别

  1. `v-if` 是真正的条件渲染，
  2. 因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建
  3. 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块
  4. `v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染
  5. 并且只是简单地基于 CSS 的 `display` 属性进行切换
  6. 所以，`v-if` 适用于在运行时很少改变条件，不需要频繁切换条件的场景,`v-show` 则适用于需要非常频繁切换条件的场景
  7. `v-if`从 `false`到 `true`会触发 `beforeCreate`,`created`钩子，而 `v-show`则不会
  `v-if`从 `true`到 `false`会触发 `beforeDestroy`,`destroyed`钩子，而 `v-show`则不会
## 4. computed 和 watch 的区别

1. `computed`能做到的`watch`的都能做到,反过来 `watch`能做到的`computed`不一样能做到
2. `computed`： 是计算属性，依赖其它属性值，并且 `computed` 的值有缓存，只有它依赖的属性值发生改变，下一次获取 `computed` 的值时才会重新计算
3. `watch`： 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作
## 5. 怎样理解 Vue 的单向数据流
1. `props`传递数据都是父到子这样的一个单向流转过程，父组件中的`props`数据更新会使得与它关联的子组件数据也发生改变
2. 反过来则不行，这是为了防止子组件意外改变父组件`props`数据的状态，
3. 如果子组件想修改父组件的数据，可以通过`$emit`派发一个自定义事件，父组件接收后，再由父组件去修改
4. 有2种常见的方式去修改`props`：
   ```js
   //  prop 用来传递一个初始值,本地的 data 将这个 prop 用作其初始值
    props：[count]
    data(){
      return{
        num：this.count * 10
      }
    }
   ```
   ```js
   //  prop 用来传递一个初始值,通过computed对其进行加工
    props：[count]
    computed{
      show(){
        return this.count * 10
      }
    }
   ```
##  6. v-model 的原理？
1. `v-model` 本质就是 ：v`value` + `input` 方法的语法糖
2. 可以通过 `model` 属性的 `prop` 和 `event` 属性来进行自定义
3. 原生的 `v-model`，会根据标签的不同生成不同的事件和属性
4. `text` 和 `textarea` 元素使用 `value` 属性和 `input` 事件
5. `checkbox` 和 `radio` 使用 `checked` 属性和 `change` 事件
6. `select` 字段将 `value` 作为 `prop` 并将 `change` 作为事件
    ```js
    // 表单元素上使用`v-model`指令时，会自动绑定一个value属性和一个`input`事件
    // 当表单元素的值改变时，会触发这个`input`事件并将新的值赋给`value`属性
    <input type="text" v-model="message">
    <input type="text" ：value="message" @input="message = $event.target.value">
    ```
## 7. vue-router 路由模式有几种？ 
1. `hash`模式：
   - `hash` 就是`URL`#后的那一部分内容，后面 `hash` 值的变化，不会导致浏览器向服务器发出请求，浏览器不发出请求，就不会刷新页面
   - 通过监听 `hashChange` 事件来监测 `hash` 值的改变，然后根据 `hash` 变化来实现更新页面部分内容的操作
2. `history` 模式：
   - 通过 `pushState` 和 `replaceState`，这两个 `API` 可以在改变 `URL`，但是不会发送请求
   - 这样就可以监听 `url` 变化来实现更新页面部分内容的操作
3. 两种模式的区别：
   - 首先是在 `URL` `的展示上，hash` 模式有“#`”，history` 模式没有
   - 刷新页面时，`hash` 模式可以正常加载到 `hash` 值对应的页面，而 `history` 没有处理的话，会返回 404，一般需要后端将所有页面都配置重定向到首页路由
   - 在兼容性上，`hash` 可以支持低版本浏览器和 `IE`
## 8. Vue 中的 key 有什么作用？
1. `key` 是为 `Vue` 中 `vnode` 的唯一标记，通过这个 `key`，我们的 `diff` 操作可以更准确、更快速
2. 相关代码如下：
```js
// 判断两个vnode的标签和key是否相同 如果相同 就可以认为是同一节点就地复用
function isSameVnode(oldVnode, newVnode) {
  return oldVnode.tag === newVnode.tag && oldVnode.key === newVnode.key
}s
// 根据key来创建老的儿子的index映射表  
// 类似 {'a'：0,'b'：1} 代表key为'a'的节点在第一个位置 key为'b'的节点在第二个位置
function makeIndexByKey(children) {
  let map = {};
  children.forEach((item, index) => {
    map[item.key] = index
  })
  return map
}
// 生成的映射表
let map = makeIndexByKey(oldCh);
```
## 9. 你有对 Vue 项目进行哪些优化？
1. 代码层面的优化：
   1. `v-if` 和 `v-show` 区分使用场景
   2. `computed `和 `watch`  区分使用场景
   3. `v-for` 遍历必须为 `item` 添加 `key`，且避免同时使用 `v-if`
   4. 长列表性能优化
   5. 事件的销毁
   6. 图片资源懒加载
   7. 路由懒加载
   8. 第三方插件的按需引入
   9. 优化无限列表性能
   10. 服务端渲染 `SSR` or 预渲染

2. `Webpack` 层面的优化：
   1. `Webpack` 对图片进行压缩
   2. 减少 `ES6` 转为 `ES5` 的冗余代码
   3. 提取公共代码
   4. 提取组件的 `CSS`
   5. 优化 `SourceMap`
   6. 构建结果输出分析
   7. `Vue` 项目的编译优化
3. 基础的 `Web` 技术的优化：
   1. 开启 `gzip` 压缩
   2. 浏览器缓存
   3. `CDN` 的使用
   4. 使用 `Chrome Performance` 查找性能瓶颈
## 10. Vue2中的Object.defineProperty 与 Proxy 优劣对比
1. Proxy 的优势如下：
   - `Proxy` 可以直接监听对象而非属性
   - `Proxy` 可以直接监听数组的变化；
   - `Proxy` 有多达 13 种拦截方法,不限于 `apply`、`ownKeys`、`deleteProperty`、`has` 等等是 `Object.defineProperty` 不具备的
   - `Proxy` 返回的是一个新对象,我们可以只操作新的对象达到目的,而 `Object.defineProperty` 是劫持对象属性的 `getter` 和 `setter` 方法，不支持数组，更准确的说是不支持数组的各种 `API` (所以 Vue 重写了数组方法）
   - `Proxy` 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；
2.  `Object.defineProperty` 的优势如下：
    - 兼容性好，支持 `IE9`，而 `Proxy` 的存在浏览器兼容性问题,而且无法用 `polyfill` 磨平
## 11. Vue2.0 如何检测数组变化
1. 数组考虑性能原因没有用 `defineProperty` 对数组的每一项进行拦截，
2. 而是选择对 7 种数组（`push`,`shift`,`pop`,`splice`,`unshift`,`sort`,`reverse`）方法进行重写(AOP 切片思想)
3. 所以在 `Vue` 中修改数组的索引和长度是无法监控到的。需要通过以上 7 种变异方法修改数组才会触发数组对应的 `watcher` 进行更新
4. 相关代码如下：
```js
// src/observe/array.js
// 先保留数组原型
const arrayProto = Array.prototype
// 然后将arrayMethods继承自数组原型
// 这里是面向切片编程思想（AOP）--不破坏封装的前提下，动态的扩展功能
export const arrayMethods = Object.create(arrayProto)
let methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "reverse",
  "sort",
];
methodsToPatch.forEach((method) => {
  arrayMethods[method] = function (...args) {
    //   这里保留原型方法的执行结果
    const result = arrayProto[method].apply(this, args)
    // 这句话是关键
    // this代表的就是数据本身 比如数据是{a：[1,2,3]} 那么我们使用a.push(4)  
    //this就是a  ob就是a.__ob__ 这个属性就是上段代码增加的 
    //代表的是该数据已经被响应式观察过了指向Observer实例
    const ob = this.__ob__
    // 这里的标志就是代表数组有新增操作
    let inserted
    switch (method) {
      case "push"：
      case "unshift"：
        inserted = args
        break;
      case "splice"：
        inserted = args.slice(2)
      default：
        break;
    }
    // 如果有新增的元素 inserted是一个数组 
    // 调用Observer实例的observeArray对数组每一项进行观测
    if (inserted) ob.observeArray(inserted)
    // 之后咱们还可以在这里检测到数组改变了之后从而触发视图更新的操作
    return result
  }
})
```
## 12. Vue2.0 响应式数据的原理
1. Vue2.0中响应式数据的原理就是使用 Object.defineProperty()把 data 对象中的所有属性转为 getter/setter，
2. 建立依赖关系，当属性的值发生变化时，setter 方法会通知依赖追踪器，
3. 然后通知所有的依赖更新。Vue接下来会重新渲染模板，展示更新后的数据。
4. 相关代码如下：
    ```js
    // 7种数组（push,shift,pop,splice,unshift,sort,reverse）
    //方法进行重写(AOP 切片思想)
    const { arrayMethods } = require('./array')
    class Observe {
      constructor(value) {
        Object.defineProperty(value, __ob__, {
          value： this,
          enumerable： false,
          writable： true,
          configurable： true
        })
        if (Array.isArray(value)) {
          value.__proto__ = arrayMethods
          this.observeArray(value)
        } else {
          this.walk(value)
        }
      }
      observeArray(items) {
        // 对数组上的所有属性依次进行观测
        for (var i = 0; i < items.length; i++) {
          observe(items[i])
        }
      }
      walk(data) {
        // 对对象上的所有属性依次进行观测
        let keys = Object.keys(data)
        for (let i = 0; i < keys.length; i++) {
          let key = keys[i]
          let value = data[key]
          defineReactive(data, key, value)
        }
      }
    }
    // Object.defineProperty数据劫持核心 兼容性在ie9以及以上
    function defineReactive(data, key, value) {
      // 递归---如果value还是一个对象会继续走一遍defineReactive 
      // 层层遍历一直到value不是对象才停止
      observe(value)
      Object.defineProperty(data, key, {
        get(value) {
          //需要做依赖收集过程 这里代码没写出来
          return value
        },
        set(newValue) {
          //需要做派发更新过程 这里代码没写出来
          newValue = value
        }
      })
    }
    function observe(value) {
      if (
        // 如果传过来的是对象或者数组 进行属性劫持
        Object.prototype.toString.call(value) === '[object Object]' ||
        Array.isArray(value)
      ) {
        return new Observe(value)
      }
    }
    ```
## 13. nextTick 的作用是什么？它的实现原理是什么？
1. 作用：
   - `vue` 更新 `DOM` 是异步更新的，数据变化，`DOM` 的更新不会马上完成，`nextTick` 的回调是在下次 `DOM` 更新循环结束之后执行的延迟回调
2. 实现原理：
   - `nextTick` 主要使用了宏任务和微任务。根据执行环境分别尝试采用
      - `Promise` 可以将函数延迟到当前函数调用栈最末端
      - `MutationObserver` 是 `H5` 新加的一个功能，其功能是监听 `DOM` 节点的变动，在所有` DOM` 变动完成后，执行回调函数
      - `setImmediate` 用于中断长时间运行的操作，并在浏览器完成其他操作（如事件和显示更新）后立即运行回调函数
      - 如果以上都不行则采用 `setTimeout` 把函数延迟到 `DOM` 更新之后再使用，原因是宏任务消耗大于微任务，优先使用微任务，最后使用消耗最大的宏任务
```javascript
import { noop } from 'shared/util'
import { handleError } from './error'
import { isIE, isIOS, isNative } from './env'
//  上面三行与核心代码关系不大，了解即可
//  noop 表示一个无操作空函数，用作函数默认值，防止传入 undefined 导致报错
//  handleError 错误处理函数
//  isIE, isIOS, isNative 环境判断函数，
//  isNative 判断某个属性或方法是否原生支持，如果不支持或通过第三方实现支持都会返回 false
export let isUsingMicroTask = false     // 标记 nextTick 最终是否以微任务执行
const callbacks = []     // 存放调用 nextTick 时传入的回调函数
let pending = false     // 标记是否已经向任务队列中添加了一个任务，如果已经添加了就不能再添加了
    // 当向任务队列中添加了任务时，将 pending 置为 true，当任务被执行时将 pending 置为 false
    // 声明 nextTick 函数，接收一个回调函数和一个执行上下文作为参数
    // 回调的 this 自动绑定到调用它的实例上
export function nextTick(cb?： Function, ctx?： Object) {
    let _resolve
    // 将传入的回调函数存放到数组中，后面会遍历执行其中的回调
    callbacks.push(() => {
        if (cb) {   // 对传入的回调进行 try catch 错误捕获
            try {
                cb.call(ctx)
            } catch (e) {    // 进行统一的错误处理
                handleError(e, ctx, 'nextTick')
            }
        } else if (_resolve) {
            _resolve(ctx)
        }
    })
    // 如果当前没有在 pending 的回调，
    // 就执行 timeFunc 函数选择当前环境优先支持的异步方法
    if (!pending) {
        pending = true
        timerFunc()
    }   
    // 如果没有传入回调，并且当前环境支持 promise，就返回一个 promise
    // 在返回的这个 promise.then 中 DOM 已经更新好了，
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(resolve => {
            _resolve = resolve
        })
    }
}
// 判断当前环境优先支持的异步方法，优先选择微任务
// 优先级：Promise---> MutationObserver---> setImmediate---> setTimeout
// setTimeout 可能产生一个 4ms 的延迟，而 setImmediate 会在主线程执行完后立刻执行
// setImmediate 在 IE10 和 node 中支持
// 当在同一轮事件循环中多次调用 nextTick 时 ,timerFunc 只会执行一次
let timerFunc   
// 判断当前环境是否原生支持 promise
if (typeof Promise !== 'undefined' && isNative(Promise)) {  // 支持 promise
    const p = Promise.resolve()
    timerFunc = () => {
       // 用 promise.then 把 flushCallbacks 函数包裹成一个异步微任务
        p.then(flushCallbacks)
        if (isIOS) setTimeout(noop)
        // 这里的 setTimeout 是用来强制刷新微任务队列的
        // 因为在 ios 下 promise.then 后面没有宏任务的话，微任务队列不会刷新
    }
    // 标记当前 nextTick 使用的微任务
    isUsingMicroTask = true
    // 如果不支持 promise，就判断是否支持 MutationObserver
    // 不是IE环境，并且原生支持 MutationObserver，那也是一个微任务
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
    let counter = 1
    // new 一个 MutationObserver 类
    const observer = new MutationObserver(flushCallbacks) 
    // 创建一个文本节点
    const textNode = document.createTextNode(String(counter))   
    // 监听这个文本节点，当数据发生变化就执行 flushCallbacks 
    observer.observe(textNode, { characterData： true })
    timerFunc = () => {
        counter = (counter + 1) % 2
        textNode.data = String(counter)  // 数据更新
    }
    isUsingMicroTask = true    // 标记当前 nextTick 使用的微任务
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    timerFunc = () => { setImmediate(flushCallbacks)  }
} else {
    // 以上三种都不支持就选择 setTimeout
    timerFunc = () => { setTimeout(flushCallbacks, 0) }
}
// 如果多次调用 nextTick，会依次执行上面的方法，将 nextTick 的回调放在 callbacks 数组中
// 最后通过 flushCallbacks 函数遍历 callbacks 数组的拷贝并执行其中的回调
function flushCallbacks() {
    pending = false    
    const copies = callbacks.slice(0)    // 拷贝一份 callbacks
    callbacks.length = 0    // 清空 callbacks
    for (let i = 0; i < copies.length; i++) {    // 遍历执行传入的回调
        copies[i]()
    }
}
// 为什么要拷贝一份 callbacks
// 用 callbacks.slice(0) 将 callbacks 拷贝出来一份，
// 是因为考虑到在 nextTick 回调中可能还会调用 nextTick 的情况,
// 如果在 nextTick 回调中又调用了一次 nextTick，则又会向 callbacks 中添加回调，
// 而 nextTick 回调中的 nextTick 应该放在下一轮执行，
// 否则就可能出现一直循环的情况，
// 所以需要将 callbacks 复制一份出来然后清空，再遍历备份列表执行回调
```
## 14. Vue.set和this.$set 
1. 对象和数组在某些情况下无法触发响应式数据更新
  - 对象属性的新增和删除
  - 通过修改数组下标来改变数组某一项
2. `Vue.se`t和 `vm.$set` 是要将传入的对象的属性变成响应式的
```javascript
function set(target, key, val) {
    if (isUndef(target) || isPrimitive(target)) {
      warn(
        'Cannot set reactive property on undefined, null, or primitive value： ' +
          target
      );
    }
    // 如果 target 是数组并且 key 为有效数组索引
    if (Array.isArray(target) && isValidArrayIndex(key)) {
      // 为了防止某些情况下会报错，比如： 设置的key值，大于数组的长度
      target.length = Math.max(target.length, key);
      // 使用 splice 方法插入新的元素，将key位置的值替换为val，并触发界面更新
      target.splice(key, 1, val);
      return val;
    }
    // 如果 target 中已经存在 key，直接修改目标属性值并触发界面更新
    if (key in target && !(key in Object.prototype)) {
      target[key] = val;
      return val;
    }
    // 获取响应式数据的 ob 对象
    var ob = target.__ob__;
    if (target._isVue || (ob && ob.vmCount)) {
      warn(
        'Avoid adding reactive properties to a Vue instance or its root $data ' +
          'at runtime - declare it upfront in the data option.'
      );
      return val;
    }
     // 非响应式对象，直接赋值并结束方法
    if (!ob) {
      target[key] = val;
      return val;
    }
    // 将新添加的属性设置为响应式数据
    defineReactive$$1(ob.value, key, val);
    // 让dep通知所有watcher重新渲染组件
    ob.dep.notify();
    return val;
 }
```
## 15. vue 内置指令&事件修饰符&v-model修饰符
1. 内置指令
    - `v-on`：给元素绑定事件监听器
    - `v-bind`： 动态的绑定一个或多个 `attribute` ,也可以是组件的 `prop`
    - `v-if`：基于表达式值的真假性，来条件性地渲染元素或者模板片段
    - `v-else`： 表示 `v-if` 或 `v-if` / `v-else-if` 链式调用的 `else` 块
    - `v-else-if`：表示 `v-if` 的e`lse if` 块,可以进行链式调用
    - `v-for`：基于原始数据多次渲染元素或模板块
    - `v-show`：基于表达式值的真假性，来改变元素的可见性
    - `v-model`：在表单输入元素或组件上创建双向绑定
    - `v-slot`：用于声明具名插槽或是期望接收 `prop`s 的作用域插槽
    - `v-html`：更新元素的 `innerHTML`
    - `v-text`：更新元素的文本内容
    - `v-pre`：跳过该元素及其所有子元素的编译
    - `v-cloak`：用于隐藏尚未完成编译的 `DOM` 模板
    - `v-once`：仅渲染元素和组件一次，并跳过之后的更新
2. 事件修饰符
    - `stop`：阻止事件冒泡(`event.stopPropagation`()方法)
    - `prevent`：用于阻止事件的默认行为(`event.preventDefault`()方法)
    - `self`：只当事件是从事件绑定的元素本身触发时才触发回调
    - `once`：只能触发一次，第二次就不会触发
    - `capture`：向下捕获方式触发（完整的事件机制是：捕获阶段--目标阶段--冒泡阶段）
    - passive： 滚动事件延迟
3. `v-model`修饰符：
    - `lazy` ——监听 `change` 事件而不是 `input`
    - `number` ——将输入的合法符串转为数字
    - `trim` ——移除输入内容两端空格