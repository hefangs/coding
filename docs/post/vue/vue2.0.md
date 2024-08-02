
# Vue2.0

## 1. 为什么 data 是一个函数
:::info data
  1. 组件中的 `data` 写成一个函数，数据以函数返回值形式定义，
  2. 这样每复用一次组件，就会返回一份新的 `data`，
  3. 类似于给每个组件实例创建一个私有的数据空间，让各个组件实例维护各自的数据。
  4. 而单纯的写成对象形式，就使得所有组件实例共用了一份 `data`，就会造成一个变了全都会变的结果
:::
## 2. Vue 组件通讯有哪几种方式
:::info Vue 组件通讯方式
  1. `props`：父组件向子组件传递数据是通过 `prop`传递的
  2. 子组件传递数据给父组件是通过 `$emit` 触发自定义事件
  3. `$parent`,`$children` 获取当前组件的父组件和当前组件的子组件
  4. `$attrs`和 `$listeners`,Vue2.4开始提供了 `$attrs`和 `$listeners`来解决这个问题
  5. 父组件中通过 `provide` 来提供变量，然后在子组件中通过 `inject` 来注入变量
  6. `$refs` 获取组件实例
  7. `eventBus` 兄弟组件数据传递 这种情况下可以使用事件总线的方式
  8. `vueX` 状态管理
:::
## 3. v-if 和 v-show 的区别
:::info 区别
  1. `v-if` 是真正的条件渲染，
  2. 因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建
  3. 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块
  4. `v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染
  5. 并且只是简单地基于 CSS 的 `display` 属性进行切换
  6. 所以，`v-if` 适用于在运行时很少改变条件，不需要频繁切换条件的场景,`v-show` 则适用于需要非常频繁切换条件的场景
  7. `v-if`从 `false`到 `true`会触发 `beforeCreate`,`created`钩子，而 `v-show`则不会
  `v-if`从 `true`到 `false`会触发 `beforeDestroy`,`destroyed`钩子，而 `v-show`则不会
:::
## 4. computed 和 watch 的区别
:::info 区别
1. `computed`能做到的`watch`的都能做到,反过来 `watch`能做到的`computed`不一样能做到
2. `computed`： 是计算属性，依赖其它属性值，并且 `computed` 的值有缓存，只有它依赖的属性值发生改变，下一次获取 `computed` 的值时才会重新计算
3. `watch`： 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作
:::
## 5. 怎样理解 Vue 的单向数据流
:::info 单向数据流
1. `props`传递数据都是父到子这样的一个单向流转过程，父组件中的`props`数据更新会使得与它关联的子组件数据也发生改变
2. 反过来则不行，这是为了防止子组件意外改变父组件`props`数据的状态，
3. 如果子组件想修改父组件的数据，可以通过`$emit`派发一个自定义事件，父组件接收后，再由父组件去修改
4. 有2种常见的方式去修改`props`：
   ```js
    // prop 用来传递一个初始值,本地的 data 将这个 prop 用作其初始值
    props：[count]
    data(){
      return{
        num：this.count * 10
      }
    }
   ```
   ```js
    // prop 用来传递一个初始值,通过computed对其进行加工
    props：[count]
    computed{
      show(){
        return this.count * 10
      }
    }
   ```
:::
##  6. v-model 的原理
:::tip 原理
1. `v-model` 本质就是 ：`value` + `input` 方法的语法糖
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
:::
## 7. vue-router 路由模式有几种
:::info  `hash`模式：
- `hash` 就是`URL`#后的那一部分内容，后面 `hash` 值的变化，不会导致浏览器向服务器发出请求，浏览器不发出请求，就不会刷新页面
- 通过监听 `hashChange` 事件来监测 `hash` 值的改变，然后根据 `hash` 变化来实现更新页面部分内容的操作
:::
:::info  `history`模式：
 - 通过 `pushState` 和 `replaceState`，这两个 `API` 可以在改变 `URL`，但是不会发送请求
 - 这样就可以监听 `url` 变化来实现更新页面部分内容的操作
:::

:::tip 区别
 - 首先是在 `URL` `的展示上，hash` 模式有“#`”，history` 模式没有
 - 刷新页面时，`hash` 模式可以正常加载到 `hash` 值对应的页面，而 `history` 没有处理的话，会返回 404，一般需要后端将所有页面都配置重定向到首页路由
 - 在兼容性上，`hash` 可以支持低版本浏览器和 `IE`
:::
## 8. Vue 中的 key 有什么作用
:::tip 作用
1. `key` 是为 `Vue` 中 `vnode` 的唯一标记
2. Vue 判断两个节点是否相同时，主要是判断两者的key和元素类型tag
3. 因此，如果不设置key，它的值就是 undefined
4. 则可能永远认为这是两个相同的节点，只能去做更新操作，将造成大量的 DOM 更新操作
5. 通过这个 `key`，我们的 `diff` 操作可以更准确、更快速
6. 相关代码如下：
:::
```js
// 判断两个vnode的标签和key是否相同 如果相同 就可以认为是同一节点就地复用
function isSameVnode(oldVnode, newVnode) {
  return oldVnode.tag === newVnode.tag && oldVnode.key === newVnode.key
}s
// 根据key来创建老的儿子的index映射表  
// 类似 {'a'：0,'b'：1} 代表key为'a'的节点在第一个位置 key为'b'的节点在第二个位置
function makeIndexByKey(children) {
  let map = {}
  children.forEach((item, index) => {
    map[item.key] = index
  })
  return map
}
// 生成的映射表
let map = makeIndexByKey(oldCh)
```

## 9. 你有对 Vue 项目进行哪些优化
:::info  1. 代码层面的优化：
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
:::
:::info  2. `Webpack` 层面的优化：
   1. `Webpack` 对图片进行压缩
   2. 减少 `ES6` 转为 `ES5` 的冗余代码
   3. 提取公共代码
   4. 提取组件的 `CSS`
   5. 优化 `SourceMap`
   6. 构建结果输出分析
   7. `Vue` 项目的编译优化
:::
:::info  3. 基础的 `Web` 技术的优化：
1. 开启 `gzip` 压缩
2. 浏览器缓存
3. `CDN` 的使用
4. 使用 `Chrome Performance` 查找性能瓶颈
:::
## 10. Vue2中的Object.defineProperty 与 Proxy 优劣对比
:::info Proxy 的优势如下：
   - `Proxy` 可以直接监听对象而非属性
   - `Proxy` 可以直接监听数组的变化；
   - `Proxy` 有多达 13 种拦截方法,不限于 `apply`、`ownKeys`、`deleteProperty`、`has` 等等是 `Object.defineProperty` 不具备的
   - `Proxy` 返回的是一个新对象,我们可以只操作新的对象达到目的,而 `Object.defineProperty` 是劫持对象属性的 `getter` 和 `setter` 方法，不支持数组，更准确的说是不支持数组的各种 `API` (所以 Vue 重写了数组方法）
   - `Proxy` 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利
:::
:::info `Object.defineProperty` 的优势如下：
   - 兼容性好，支持 `IE9`，而 `Proxy` 的存在浏览器兼容性问题,而且无法用 `polyfill` 磨平
:::
## 11. Vue2.0 如何检测数组变化
:::tip  改写数组方法
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
]
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
        break
      case "splice"：
        inserted = args.slice(2)
      default：
        break
    }
    // 如果有新增的元素 inserted是一个数组 
    // 调用Observer实例的observeArray对数组每一项进行观测
    if (inserted) ob.observeArray(inserted)
    // 之后咱们还可以在这里检测到数组改变了之后从而触发视图更新的操作
    return result
  }
})
```
:::
## 12. Vue2.0 响应式数据的原理
:::tip 原理
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
      for (var i = 0 i < items.length i++) {
        observe(items[i])
      }
    }
    walk(data) {
      // 对对象上的所有属性依次进行观测
      let keys = Object.keys(data)
      for (let i = 0 i < keys.length i++) {
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
:::
## 13. nextTick 的作用是什么？它的实现原理是什么
:::info 作用
   - `vue` 更新 `DOM` 是异步更新的，数据变化，`DOM` 的更新不会马上完成，`nextTick` 的回调是在下次 `DOM` 更新循环结束之后执行的延迟回调
:::
:::warning 实现原理
   - `nextTick` 主要使用了宏任务和微任务。根据执行环境分别尝试采用
      - `Promise` 可以将函数延迟到当前函数调用栈最末端
      - `MutationObserver` 是 `H5` 新加的一个功能，其功能是监听 `DOM` 节点的变动，在所有` DOM` 变动完成后，执行回调函数
      - `setImmediate` 用于中断长时间运行的操作，并在浏览器完成其他操作（如事件和显示更新）后立即运行回调函数
      - 如果以上都不行则采用 `setTimeout` 把函数延迟到 `DOM` 更新之后再使用，原因是宏任务消耗大于微任务，优先使用微任务，最后使用消耗最大的宏任务
:::
```javascript
//  noop 表示一个无操作空函数，用作函数默认值，防止传入 undefined 导致报错
//  handleError 错误处理函数
//  isIE, isIOS, isNative 环境判断函数，
//  isNative 判断某个属性或方法是否原生支持，如果不支持或通过第三方实现支持都会返回 false
import { noop } from 'shared/util'
import { handleError } from './error'
import { isIE, isIOS, isNative } from './env'
// 标记 nextTick 最终是否以微任务执行
export let isUsingMicroTask = false     
// 存放调用 nextTick 时传入的回调函数
const callbacks = []     
// 标记是否已经向任务队列中添加了一个任务，如果已经添加了就不能再添加了
// 当向任务队列中添加了任务时，将 pending 置为 true，当任务被执行时将 pending 置为 false
let pending = false     
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
        // 这里的 setTimeout 是用来强制刷新微任务队列的
        // 因为在 ios 下 promise.then 后面没有宏任务的话，微任务队列不会刷新
        if (isIOS) setTimeout(noop)
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
    for (let i = 0 i < copies.length i++) {    // 遍历执行传入的回调
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
## 14. Vue.set 和 this.$set 
:::info
1. 对象和数组在某些情况下无法触发响应式数据更新
  - 对象属性的新增和删除
  - 通过修改数组下标来改变数组某一项
2. `Vue.set`和 `vm.$set` 是要将传入的对象的属性变成响应式的
:::
```javascript
function set(target, key, val) {
    if (isUndef(target) || isPrimitive(target)) {
      warn(
        'Cannot set reactive property on undefined, null, or primitive value： ' +
          target
      )
    }
    // 如果 target 是数组并且 key 为有效数组索引
    if (Array.isArray(target) && isValidArrayIndex(key)) {
      // 为了防止某些情况下会报错，比如： 设置的key值，大于数组的长度
      target.length = Math.max(target.length, key)
      // 使用 splice 方法插入新的元素，将key位置的值替换为val，并触发界面更新
      target.splice(key, 1, val)
      return val
    }
    // 如果 target 中已经存在 key，直接修改目标属性值并触发界面更新
    if (key in target && !(key in Object.prototype)) {
      target[key] = val
      return val
    }
    // 获取响应式数据的 ob 对象
    var ob = target.__ob__
    if (target._isVue || (ob && ob.vmCount)) {
      warn(
        'Avoid adding reactive properties to a Vue instance or its root $data ' +
          'at runtime - declare it upfront in the data option.'
      )
      return val
    }
     // 非响应式对象，直接赋值并结束方法
    if (!ob) {
      target[key] = val
      return val
    }
    // 将新添加的属性设置为响应式数据
    defineReactive$$1(ob.value, key, val)
    // 让dep通知所有watcher重新渲染组件
    ob.dep.notify()
    return val
 }
```
## 15. vue 内置指令&事件修饰符&v-model修饰符
:::info 内置指令
 - `v-on`：给元素绑定事件监听器
 - `v-bind`： 动态的绑定一个或多个 `attribute` ,也可以是组件的 `prop`
 - `v-if`：基于表达式值的真假性，来条件性地渲染元素或者模板片段
 - `v-else`： 表示 `v-if` 或 `v-if` / `v-else-if` 链式调用的 `else` 块
 - `v-else-if`：表示 `v-if` 的e`lse if` 块,可以进行链式调用
 - `v-for`：基于原始数据多次渲染元素或模板块
 - `v-show`：基于表达式值的真假性，来改变元素的可见性
 - `v-model`：在表单输入元素或组件上创建双向绑定
 - `v-slot`：用于声明具名插槽或是期望接收 `prop`的作用域插槽
 - `v-html`：更新元素的 `innerHTML`
 - `v-text`：更新元素的文本内容
 - `v-pre`：跳过该元素及其所有子元素的编译
 - `v-cloak`：用于隐藏尚未完成编译的 `DOM` 模板
 - `v-once`：仅渲染元素和组件一次，并跳过之后的更新
:::
:::info 事件修饰符
  - `stop`：阻止事件冒泡(`event.stopPropagation`()方法)
  - `prevent`：用于阻止事件的默认行为(`event.preventDefault`()方法)
  - `self`：只当事件是从事件绑定的元素本身触发时才触发回调
  - `once`：只能触发一次，第二次就不会触发
  - `capture`：向下捕获方式触发（完整的事件机制是：捕获阶段--目标阶段--冒泡阶段）
  - `passive`： 滚动事件延迟
:::
:::info `v-model`修饰符：
  - `lazy` ——监听 `change` 事件而不是 `input`
  - `number` ——将输入的合法符串转为数字
  - `trim` ——移除输入内容两端空格
:::

## 16. keep-alive 是什么
:::info keep-alive
- 作用：实现组件缓存，保持组件的状态，避免反复渲染导致的性能问题
- 工作原理：
  - `Vue.js` 内部将 DOM 节点，抽象成了一个个的 `VNode` 节点
  - `keep-alive`组件的缓存也是基于 `VNode` 节点的
  - 它将满足条件的组件在 `cache` 对象中缓存起来
  - 重新渲染的时候再将 `VNode` 节点从 `cache` 对象中取出并渲染
- 可以设置以下属性：
  - `include`：字符串或正则，只有名称匹配的组件会被缓存
  - `exclude`：字符串或正则，任何名称匹配的组件都不会被缓存
  - `max`：数字，最多可以缓存多少组件实例
- 匹配规则：
  - 首先检查组件的`name`选项，如果`name`选项不可用
  - 则匹配它的局部注册名称（父组件 `components` 选项的键值
  - 匿名组件不能被匹配
- 生命周期钩子：`activated`、`deactivated`
- 首次进入组件时：`beforeCreate` --> `created` --> `beforeMount` --> `mounted` --> `activated` --> `beforeUpdate` --> `updated` --> `deactivated`
- 再次进入组件时：`activated` --> `beforeUpdate` --> `updated` --> `deactivated`
:::

## 17. 说说你对slot的理解？slot使用场景有哪些？
:::info 使用场景
  - 通过插槽可以让用户可以拓展组件，去更好地复用组件和对其做定制化处理
  - 如果父组件在使用到一个复用组件的时候，获取这个组件在不同的地方有少量的更改，如果去重写组件是一件不明智的事情
  - 通过`slot`插槽向组件内部指定位置传递内容，完成这个复用组件在不同场景的应用
  - 比如布局组件、表格列、下拉选、弹框显示内容等
:::
:::tip 分类
  - 默认插槽
  - 具名插槽
  - 作用域插槽
:::
:::info 默认插槽
```javascript
  // 父组件
  <Child>
    <div>父组件给子组件准备的插槽内容</div>  
  </Child>
```

```javascript
  // 子组件Child.vue
  <template>
    <slot>
      <p>子组件默认内容，如果父组件不传，就展示默认内容</p>
    </slot>
  </template>
```
:::

:::info 具名插槽
- 子组件用`name`属性来表示插槽的名字，不传为默认插槽
- 父组件中在使用时在默认插槽的基础上加上`slot`属性，值为子组件插槽`name`属性值
```javascript
// 父组件
<Child>
  <template v-slot:default>具名插槽</template>
  <!-- 具名插槽⽤插槽名做参数 -->
  <template v-slot:content>内容...</template>
</Child>
```
```javascript
// 子组件Child.vue
<template>
  <slot>插槽后备的内容</slot>
  <slot name="content">插槽后备的内容</slot>
</template>
```
:::
:::info 作用域插槽
- 子组件在作用域上绑定属性来将子组件的信息传给父组件使用，这些属性会被挂在父组件`v-slot`接受的对象上
- 父组件中在使用时通过`v-slot`:（简写：#）获取子组件的信息，在内容中使用

```javascript
// 父组件
// 把v-slot的值指定为作⽤域上下⽂对象
<Child> 
  <template v-slot:default="slotProps">
    来⾃⼦组件数据：{{slotProps.testProps}}
  </template>
  <template #default="slotProps">
    来⾃⼦组件数据：{{slotProps.testProps}}
  </template>
</Child>
```
```javascript
// 子组件Child.vue
<template> 
  <slot name="footer" testProps="子组件的值">
    <h3>没传footer插槽</h3>
    </slot>
</template>
```
:::

:::tip 总结
  - `v-slot`属性只能在`template`上使用，但在只有默认插槽时可以在组件标签上使用
  - 默认插槽名为`default`，可以省略`default`直接写`v-slot`
  - 缩写为`#`时不能不写参数，写成`#default`
  - 可以通过解构获取`v-slot={user}`，还可以重命名`v-slot="{user: newName}"`和定义默认值`v-slot="{user = '默认值'}`"
:::


## 18. 虚拟DOM
:::info Virtual DOM
  - 实际上它只是一层对真实`DOM`的抽象，以`JavaScript`对象 `(VNode`节点) 作为基础的树，用对象的属性来描述节点，最终可以通过一系列操作使这棵树映射到真实环境上
  - 在`Javascript`对象中，虚拟`DOM`表现为一个`Object`对象。并且最少包含标签名 (`tag`)、属性 (`attrs`) 和子元素对象 (`children`) 三个属性，不同框架对这三个属性的名命可能会有差别
  - 创建虚拟`DOM`就是为了更好将虚拟的节点渲染到页面视图中，所以虚拟`DOM`对象的节点与真实`DOM`的属性一一照应
```html
<div id="name">
  <p class="p1">a</p>
  <p class="p2">b</p>
  <p class="p3">c</p>
</div>
```
```javascript
let oldVDOM = { // 旧虚拟DOM
  tagName: 'div', // 标签名
  props: { // 标签属性
    id: 'name'
  },
  children: [ // 标签子节点
    {
      tagName: 'p', 
      props: { class: 'p1' },
      children: ['a']
    },
    {
      tagName: 'p', 
      props: { class: 'p2' },
      children: ['b']
    },
    {
      tagName: 'p',
      props: { class: 'p3' },
      children: ['c']
    }
  ]
}
```
:::
:::info h函数
```javascript
  /**
 * @description:把传入的参数作为对象返出去
 * @param {*} sel
 * @param {*} data
 * @param {*} children
 * @param {*} text
 * @param {*} elm
 * @return {*} sel, data, children, text, elm
 */
function vNode(sel, data, children, text, elm) {
  return {
    sel,
    data,
    children,
    text,
    elm
  }
}
/**
 * @description: 这里要求参数必须是3个参数
 * 调用的时候必须是下面3种情况:(暂时只考虑这3种情况)
 * 1.h(div,{},'文字')
 * 2.h(div,{},[])
 * 3.h(div,{},h())
 * @param {*} sel
 * @param {*} b
 * @param {*} c
 * @return {*} vNode
 */
function h(sel, b, c) {
  if (arguments.length !== 3) throw new Error('Error')
  // 情况1:
  if (typeof c === 'string' || typeof c === 'number') {
    return vNode(sel, data, undefined, c, undefined)
  }
  // 情况2:
  else if (isArray(c)) {
    let children = []
    for (let i = 0 index < c.length i++) {
      if (!(typeof c === 'object' && c[i].hasOwnProperty('sel')))
        throw new Error('Error')
      children.push(c[i])
    }
    return vNode(sel, data, children, undefined, undefined)
  }
  // 情况3:
  else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    let children = [c]
    return vNode(sel, data, children, undefined, undefined)
  } else {
    throw new Error('Error')
  }
}
```
:::


## 19. diff算法

:::info diff
  - `diff`算法是一种通过同层的树节点进行比较的高效算法
  - 其有两个特点：
    - 比较只会在同层级进行, 不会跨层级比较
    - 在`diff`比较的过程中，循环从两边向中间比较
  - `diff`算法在很多场景下都有应用，在`vue`中，作用于虚拟`DOM`渲染成真实`DOM`的新旧`VNode`节点比较
:::
:::info 原理分析
  - 当数据发生改变时，`setter`方法会调用`Dep.notify`通知所有订阅者`Watcher`，订阅者就会调用`patch`给真实的`DOM`打补丁，更新相应的视图
  :::details
  ![pic](/diff1.png)
:::
:::tip patch方法
  - 对比当前同层的虚拟节点是否为同一种类型的标签
    - 是：继续执行`patchVnode`方法进行深层比对
    - 否：没必要比对了，直接整个节点替换成新虚拟节点
```javascript
function patch(oldVnode, newVnode) {
  // 比较是否为一个类型的节点
  if (sameVnode(oldVnode, newVnode)) {
    // 是：继续进行深层比较
    patchVnode(oldVnode, newVnode)
  } else {
    // 否
    const oldEl = oldVnode.el // 旧虚拟节点的真实DOM节点
    const parentEle = api.parentNode(oldEl) // 获取父节点
    createEle(newVnode) // 创建新虚拟节点对应的真实DOM节点
    if (parentEle !== null) {
      api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl)) // 将新元素添加进父元素
      api.removeChild(parentEle, oldVnode.el)  // 移除以前的旧元素节点
      // 设置null，释放内存
      oldVnode = null
    }
  }
  return newVnode
}
```
:::


:::info sameVnode方法
  - `sameVnode`方法判断是否为同一类型节点
```javascript
function sameVnode(oldVnode, newVnode) {
  return (
    oldVnode.key === newVnode.key && // key值是否一样
    oldVnode.tagName === newVnode.tagName && // 标签名是否一样
    oldVnode.isComment === newVnode.isComment && // 是否都为注释节点
    isDef(oldVnode.data) === isDef(newVnode.data) && // 是否都定义了data
    sameInputType(oldVnode, newVnode) // 当标签为input时，type必须是否相同
  )
}
```
:::

:::tip patchVnode方法
  - 找到对应的真实`DOM`，称为`el`
  - 判断`newVnode`和`oldVnode`是否指向同一个对象，如果不是，那么直接`return`，直接替换成新的`newVnode`
  - 如果他们都有文本节点并且不相等，那么将`el`的文本节点设置为`newVnode`的文本节点
  - 如果`oldVnode`有子节点而`newVnode`没有，则删除`el`的子节点
  - 如果`oldVnode`没有子节点而`newVnode`有，则将`newVnode`的子节点真实化之后添加到`el`
  - 如果两者都有子节点，则执行`updateChildren`函数比较子节点
```javascript
function patchVnode(oldVnode, newVnode) {
  const el = newVnode.el = oldVnode.el // 获取真实DOM对象
  // 获取新旧虚拟节点的子节点数组
  const oldCh = oldVnode.children, newCh = newVnode.children
  // 如果新旧虚拟节点是同一个对象，则终止
  if (oldVnode === newVnode) return
  // 如果新旧虚拟节点是文本节点，且文本不一样
  if (oldVnode.text !== null && newVnode.text !== null && oldVnode.text !== newVnode.text) {
    // 则直接将真实DOM中文本更新为新虚拟节点的文本
    api.setTextContent(el, newVnode.text)
  } else {
    // 否则
    if (oldCh && newCh && oldCh !== newCh) {
      // 新旧虚拟节点都有子节点，且子节点不一样
      // 对比子节点，并更新
      updateChildren(el, oldCh, newCh)
    } else if (newCh) {
      // 新虚拟节点有子节点，旧虚拟节点没有
      // 创建新虚拟节点的子节点，并更新到真实DOM上去
      createEle(newVnode)
    } else if (oldCh) {
      // 旧虚拟节点有子节点，新虚拟节点没有
      //直接删除真实DOM里对应的子节点
      api.removeChild(el)
    }
  }
}
```
:::

:::warning updateChildren 方法
- 使用`sameVnode`方法 (`oldChStartIdx`  `oldChEndIdx` `newChStartIdx` `newChEndIdx`)
   1. `oldChStartIdx`和`newChStartIdx`使用`sameVnode`方法进行比较，sameVnode(oldChStartIdx, newChStartIdx)
   2. `oldChStartIdx`和`newChEndIdx`使用`sameVnode`方法进行比较，sameVnode(oldChStartIdx, newChEndIdx)
   3. `oldChEndIdx`和`newChStartIdx`使用`sameVnode`方法进行比较，sameVnode(oldChEndIdx, newChStartIdx)
   4. `oldChEndIdx`和`newChEndIdx`使用`sameVnode`方法进行比较，sameVnode(oldChEndIdx, newChEndIdx)
   5. 以上逻辑都匹配不到，再把所有旧子节点的`key`做一个映射到旧节点下标的`key`->`index`表，然后用新`vNode`的`key`去找出在旧节点中可以复用的位置。
```javascript
function updateChildren(parentElm, oldCh, newCh) {
  let oldStartIdx = 0, newStartIdx = 0
  let oldEndIdx = oldCh.length - 1
  let oldStartVnode = oldCh[0]
  let oldEndVnode = oldCh[oldEndIdx]
  let newEndIdx = newCh.length - 1
  let newStartVnode = newCh[0]
  let newEndVnode = newCh[newEndIdx]
  let oldKeyToIdx
  let idxInOld
  let elmToMove
  let before
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx]
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx]
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      patchVnode(oldStartVnode, newEndVnode)
      api.insertBefore(parentElm, oldStartVnode.el, api.nextSibling(oldEndVnode.el))
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      patchVnode(oldEndVnode, newStartVnode)
      api.insertBefore(parentElm, oldEndVnode.el, oldStartVnode.el)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      // 使用key时的比较
      if (oldKeyToIdx === undefined) {
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx) // 有key生成index表
      }
      idxInOld = oldKeyToIdx[newStartVnode.key]
      if (!idxInOld) {
        api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
        newStartVnode = newCh[++newStartIdx]
      }
      else {
        elmToMove = oldCh[idxInOld]
        if (elmToMove.sel !== newStartVnode.sel) {
          api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
        } else {
          patchVnode(elmToMove, newStartVnode)
          oldCh[idxInOld] = null
          api.insertBefore(parentElm, elmToMove.el, oldStartVnode.el)
        }
        newStartVnode = newCh[++newStartIdx]
      }
    }
  }
  if (oldStartIdx > oldEndIdx) {
    before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].el
    addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx)
  } else if (newStartIdx > newEndIdx) {
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
  }
}
```
:::details
![pic](/diff2.png)
:::

## 20. vue要做权限管理该怎么做？
:::info 权限
  - 权限是对特定资源的访问许可，所谓权限控制，也就是确保用户只能访问到被分配的资源
  - 而前端权限归根结底是请求的发起权，请求的发起可能有下面两种形式触发
    - 页面加载触发
    - 页面上的按钮点击触发
:::
::: tip 前端权限控制：
  - 接口权限
  - 按钮权限
  - 菜单权限
  - 路由权限
:::
::: info 接口权限
  - 接口权限目前一般采用`jwt`的形式来验证，没有通过的话一般返回`401`
  - 跳转到登录页面重新进行登录,登录完拿到`token`，将`token`存起来
  - 通过`axios`请求拦截器进行拦截，每次请求的时候头部携带`token`
```javascript
axios.interceptors.request.use(config => {
  config.headers['token'] = cookie.get('token')
  return config
})
axios.interceptors.response.use(res=>{},{response}=>{
  //token过期或者错误
  if (response.data.code === 40099 || response.data.code === 40098) { 
    router.push('/login')
  }
})
```
:::


:::info 按钮权限
  - 方案1
    - 按钮权限用`v-if`判断
    - 但是如果页面过多，每个页面页面都要获取用户权限`role`和路由表里的`meta.btnPermissions`，然后再做判断
  - 方案2
    - 通过自定义指令进行按钮权限的判断
      ```javascript
      // 配置路由
      {
        path: '/permission',
        component: Layout,
        name: '权限测试',
        meta: {
          btnPermissions: ['admin', 'supper', 'normal']
        },
        //页面需要的权限
        children: [{
          path: 'supper',
          component: _import('system/supper'),
          name: '权限测试页',
          meta: {
            btnPermissions: ['admin', 'supper']
          } //页面需要的权限
        },
        {
          path: 'normal',
          component: _import('system/normal'),
          name: '权限测试页',
          meta: {
            btnPermissions: ['admin']
          } //页面需要的权限
        }]
      }
      ```
      ```javascript
      // 自定义权限鉴定指令
      import Vue from 'vue'
      /**权限指令**/
      const has = Vue.directive('has', {
        bind: function (el, binding, vnode) {
          // 获取页面按钮权限
          let btnPermissionsArr = []
          if(binding.value){
            // 如果指令传值，获取指令参数，根据指令参数和当前登录人按钮权限做比较
            btnPermissionsArr = Array.of(binding.value)
          }else{
            // 否则获取路由中的参数，根据路由的btnPermissionsArr和当前登录人按钮权限做比较
            btnPermissionsArr = vnode.context.$route.meta.btnPermissions
          }
          if (!Vue.prototype.$_has(btnPermissionsArr)) {
            el.parentNode.removeChild(el)
          }
        }
      })
      // 权限检查方法
      Vue.prototype.$_has = function (value) {
        let isExist = false
        // 获取用户按钮权限
        let btnPermissionsStr = sessionStorage.getItem("btnPermissions")
        if (btnPermissionsStr == undefined || btnPermissionsStr == null) {
          return false
        }
        if (value.indexOf(btnPermissionsStr) > -1) {
          isExist = true
        }
        return isExist
      }
      export {has}
      ```
      ```javascript
      // 在使用的按钮中只需要引用v-has指令
      <el-button @click='editClick' type="primary" v-has>编辑</el-button>
      ```
:::

:::info 菜单权限
  - 方案1
    - 菜单与路由分离，菜单由后端返回
    - 每次路由跳转的时候都要判断权限，这里的判断也很简单，因为菜单的`name`与路由的`name`是一一对应的，而后端返回的菜单就已经是经过权限过滤的
    - 如果根据路由`name`找不到对应的菜单，就表示用户有没权限访问
    - 如果路由很多，可以在应用初始化的时候，只挂载不需要权限控制的路由。取得后端返回的菜单后，根据菜单与路由的对应关系，筛选出可访问的路由，通过`addRoutes`动态挂载
    - 这种方式的缺点：
      - 菜单需要与路由做一一对应，前端添加了新功能，需要通过菜单管理功能添加新的菜单，如果菜单配置的不对会导致应用不能正常使用
      - 全局路由守卫里，每次路由跳转都要做判断
      ```javascript
      // 定义路由信息
      {
        name: "login",
        path: "/login",
        component: () => import("@/pages/Login.vue")
      } 
      ```
      ```javascript
      // 全局路由守卫
      function hasPermission(router, accessMenu) {
        if (whiteList.indexOf(router.path) !== -1) {
          return true
        }
        let menu = Util.getMenuByName(router.name, accessMenu)
        if (menu.name) {
          return true
        }
        return false
      }
      Router.beforeEach(async (to, from, next) => {
        if (getToken()) {
          let userInfo = store.state.user.userInfo
          if (!userInfo.name) {
            try {
              await store.dispatch("GetUserInfo")
              await store.dispatch('updateAccessMenu')
              if (to.path === '/login') {
                next({ name: 'home_index' })
              } else {
                //Util.toDefaultPage([...routers], to.name, router, next)
                next({ ...to, replace: true })//菜单权限更新完成,重新进一次当前路由
              }
            }  
            catch (e) {
              if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
                next()
              } else {
                next('/login')
              }
            }
          } else {
            if (to.path === '/login') {
              next({ name: 'home_index' })
            } else {
              if (hasPermission(to, store.getters.accessMenu)) {
                Util.toDefaultPage(store.getters.accessMenu,to, routes, next)
              } else {
                next({ path: '/403',replace:true })
              }
            }
          }
        } else {
          if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
          } else {
            next('/login')
          }
        }
        let menu = Util.getMenuByName(to.name, store.getters.accessMenu)
        Util.title(menu.title)
      })
      Router.afterEach((to) => {
        window.scrollTo(0, 0)
      })
      ```
  - 方案2
    - 菜单和路由都由后端返回
    - 在将后端返回路由通过addRoutes动态挂载之间，需要将数据处理一下，将component字段换为真正的组件
    - 如果有嵌套路由，后端功能设计的时候，要注意添加相应的字段，前端拿到数据也要做相应的处理
    - 这种方法也会存在缺点：
      - 全局路由守卫里，每次路由跳转都要做判断
      - 前后端的配合要求更高
      ```javascript
      // 路由组件
      const Home = () => import("../pages/Home.vue")
      const UserInfo = () => import("../pages/UserInfo.vue")
      export default {
        home: Home,
        userInfo: UserInfo
      }
      ```
      ```javascript
      // 后端路由组件返回以下格式
      [
        {
          name: "home",
          path: "/",
          component: "Home"
        },
        {
          name: "about",
          path: "/about",
          component: "About"
        }
      ]
      ```
:::

:::info 路由权限
  - 方案1
    - 初始化即挂载全部路由，并且在路由上标记相应的权限信息，每次路由跳转前做校验
    - 这种方式存在以下四种缺点：
      - 加载所有的路由，如果路由很多，而用户并不是所有的路由都有权限访问，对性能会有影响
      - 全局路由守卫里，每次路由跳转都要做权限判断
      - 菜单信息写死在前端，要改个显示文字或权限信息，需要重新编译
      - 菜单跟路由耦合在一起，定义路由的时候还有添加菜单显示标题，图标之类的信息，而且路由不一定作为菜单显示，还要多加字段进行标识
      ```javascript
      const routerMap = [
        {
          path: '/permission',
          component: Layout,
          redirect: '/permission/index',
          alwaysShow: true, // will always show the root menu
          meta: {
            title: 'permission',
            icon: 'lock',
            roles: ['admin', 'editor'] // you can set roles in root nav
          },
          children: [{
            path: 'page',
            component: () => import('@/views/permission/page'),
            name: 'pagePermission',
            meta: {
              title: 'pagePermission',
              roles: ['admin'] // or you can only set roles in sub nav
            }
          }, {
            path: 'directive',
            component: () => import('@/views/permission/directive'),
            name: 'directivePermission',
            meta: {
              title: 'directivePermission'
              // if do not set roles, means: this page does not require permission
            }
          }]
        }]
      ```
  -  方案2
     -  初始化的时候先挂载不需要权限控制的路由，比如登录页，`404`等错误页
     -  如果用户通过`URL`进行强制访问，则会直接进入`404`，相当于从源头上做了控制
     -  登录后，获取用户的权限信息，然后筛选有权限访问的路由，在全局路由守卫里进行调用`addRoutes`添加路由
     -  按需挂载，路由就需要知道用户的路由权限，也就是在用户登录进来的时候就要知道当前用户拥有哪些路由权限
     -  这种方式也存在了以下的缺点：
        -  全局路由守卫里，每次路由跳转都要做判断
        -  菜单信息写死在前端，要改个显示文字或权限信息，需要重新编译
        -  菜单跟路由耦合在一起，定义路由的时候还有添加菜单显示标题，图标之类的信息，而且路由不一定作为菜单显示，还要多加字段进行标识
        ```javascript
        import router from './router'
        import store from './store'
        import { Message } from 'element-ui'
        import NProgress from 'nprogress' 
        import 'nprogress/nprogress.css'
        import { getToken } from '@/utils/auth' 
        NProgress.configure({ showSpinner: false }) // NProgress Configuration
        // permission judge function
        function hasPermission(roles, permissionRoles) {
          if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
          if (!permissionRoles) return true
          return roles.some(role => permissionRoles.indexOf(role) >= 0)
        }
        const whiteList = ['/login', '/authredirect']// no redirect whitelist
        router.beforeEach((to, from, next) => {
          NProgress.start() // start progress bar
          if (getToken()) { // determine if there has token
            /* has token*/
            if (to.path === '/login') {
              next({ path: '/' })
              NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
            } else {
              if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
                store.dispatch('GetUserInfo').then(res => { // 拉取user_info
                  const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
                  store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
                    router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                    next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                  })
                }).catch((err) => {
                  store.dispatch('FedLogOut').then(() => {
                    Message.error(err || 'Verification failed, please login again')
                    next({ path: '/' })
                  })
                })
              } else {
                // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
                if (hasPermission(store.getters.roles, to.meta.roles)) {
                  next()//
                } else {
                  next({ path: '/401', replace: true, query: { noGoBack: true }})
                }
              }
            }
          } else {
            /* has no token*/
            if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
              next()
            } else {
              next('/login') // 否则全部重定向到登录页
              NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
            }
          }
        })
        router.afterEach(() => {
          NProgress.done() // finish progress bar
        })
        ```
:::


## 21. Vue项目中你是如何解决跨域的呢？
:::info 跨域
  - 跨域本质是浏览器基于同源策略的一种安全手段
  - 同源策略（`Sameoriginpolicy`），是一种约定，它是浏览器最核心也最基本的安全功能
    - 所谓同源（即指在同一个域）具有以下三个相同点
      - 协议相同（`protocol`）
      - 主机相同（`host`）
      - 端口相同（`port`）
  - 反之非同源请求，也就是协议、端口、主机其中一项不相同的时候，这时候就会产生跨域
:::

:::tip 如何解决
  - 解决跨域的方法有很多，下面列举了三种：
    - `JSONP`
    - `CORS`
    - `Proxy`
  - 在vue项目中，我们主要针对`CORS`或`Proxy`这两种方案进行展开
:::

:::info CORS
  - `CORS` （`Cross-Origin Resource Sharing`，跨域资源共享）是一个系统，它由一系列传输的`HTTP`头组成，这些`HTTP`头决定浏览器是否阻止前端`JavaScript`代码获取跨域请求的响应
  - `CORS`实现起来非常方便，只需要增加一些`HTTP`头，让服务器能声明允许的访问来源，只要后端实现了`CORS`就实现了跨域
  - `Access-Control-Allow-Origin`设置为`*`其实意义不大，可以说是形同虚设，实际应用中，上线前我们会将`Access-Control-Allow-Origin`值设为我们目标`host`
  :::details
  ![pic](/cors.png "notice")
:::

:::info Proxy
  - 代理（`Proxy`）也称网络代理，是一种特殊的网络服务，允许一个（一般为客户端）通过这个服务与另一个网络终端（一般为服务器）进行非直接的连接
  - 一些网关、路由器等网络设备具备网络代理功能。一般认为代理服务有利于保障网络终端的隐私或安全，防止攻击
  - 方案1
    - 如果是通过`vue-cli`脚手架工具搭建项目，我们可以通过`webpack`为我们起一个本地服务器作为请求的代理对象
    - 通过该服务器转发请求至目标服务器，得到结果再转发给前端，但是最终发布上线时如果`web`应用和接口服务器不在一起仍会跨域
    ```javascript
      // vue.config.js
      module.exports = {
        devServer: {
          host: '127.0.0.1',
          port: 8080,
          open: true,// vue项目启动时自动打开浏览器
          proxy: {
            // '/api'是代理标识，用于告诉node，url前面是/api的就是使用代理的
            '/api': { 
            //目标地址，一般是指后台服务器地址
            target: "http://xxx.xxx.xx.xx:8080", 
            //是否跨域
            changeOrigin: true, 
            // pathRewrite 的作用是把实际Request Url中的'/api'用""代替
            pathRewrite: { 
              '^/api': "" 
            }
          }
        }
      }
    }
    ```
    ```javascript
    // 通过axios发送请求中，配置请求的根路径
      axios.defaults.baseURL = '/api'
    ```
  - 方案2
    - 通过服务端实现代理请求转发
    ```javascript
    // 以express框架为例
      var express = require('express')
      const proxy = require('http-proxy-middleware')
      const app = express()
      app.use(express.static(__dirname + '/'))
      app.use('/api', proxy({ 
        target: 'http://localhost:4000', 
        changeOrigin: false
      }))
      module.exports = app
    ```
  - 方案3
    - 通过配置`nginx`实现代理
    ```javascript
      server {
      listen    80
      # server_name www.josephxia.com
      location / {
          root  /var/www/html
          index  index.html index.htm
          try_files $uri $uri/ /index.html
      }
      location /api {
        proxy_pass  http://127.0.0.1:3000
        proxy_redirect   off
        proxy_set_header  Host       $host
        proxy_set_header  X-Real-IP     $remote_addr
        proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for
      }
    }
    ```
:::

## 22. vue 项目本地开发完成后部署到服务器后报 404 是什么原因？

:::info 404
  - `Vue`项目在本地时运行正常，但部署到服务器中，刷新页面，出现了`404`错误
  - `HTTP 404`错误意味着链接指向的资源不存在
:::
:::info history 模式 404 问题
  - `Vue`是属于单页应用（`single-page application`）
  - 而`SPA`是一种网络应用程序或网站的模型，所有用户交互是通过动态重写当前页面，前面我们也看到了，不管我们应用有多少页面，构建物都只会产出一个`index.html`
  - `Nginx`配置：
    ```javascript
    server {
      listen  80
      server_name  www.xxx.com
      location / {
        index  /data/dist/index.html
      }
    }
    ```
  - 可以根据`Nginx`配置得出，当我们在地址栏输入`www.xxx.com`时，这时会打开我们`dist`目录下的`index.html`文件，然后我们在跳转路由进入到 `www.xxx.com/login`
  - 当我们在`xxx.com/login`页执行刷新操作，`Nginx location` 是没有相关配置的，所以就会出现`404`的情况
:::
:::info 解决 history 模式 404 问题
  - 产生问题的本质是因为我们的路由是通过`JS`来执行视图切换的
  - 当我们进入到子路由时刷新页面，`web`容器没有相对应的页面此时会出现`404`
  - 所以我们只需要配置将任意页面都重定向到`index.html`，把路由交由前端处理
  - 对`Nginx`配置文件`.conf`修改，添加`try_files $uri $uri/ /index.html`
    ```javascript
    server {
      listen  80
      server_name  www.xxx.com
      location / {
        index  /data/dist/index.html
        try_files $uri $uri/ /index.html
      }
    }
    ```
  - 修改完需要更新配置文件
    ```javascript
    nginx -s reload
    ```
  - 服务器就不再返回`404`错误页面，因为对于所有路径都会返回`index.html`文件
  - `Vue`应用里面覆盖所有的路由情况，然后在给出一个`404`页面
    ```javascript
    const router = new VueRouter({
      mode: 'history',
      routes: [
        { path: '*', component: NotFoundComponent }
      ]
    })
    ```
:::
## 23. vue2 自定义的事件总线 Bus
```ts
// 定义事件总线类所需的接口
type busClass = {
  emit: (name: string) => void
  on: (name: string, callback: Function) => void
}
// 定义事件名称的类型
type ParamsKey = string | number | symbol
// 定义存储事件处理程序的键值对集合
type List = {
  [key: ParamsKey]: Array<Function>
}
// 实现事件总线类
class Bus implements busClass {
  list: List
  constructor() {
    this.list = {}
    // console.log(this.list)
  }
  // 发布特定事件
  emit(name: string, ...args: any[]) {
    let eventName: Array<Function> = this.list[name]
    eventName.forEach((fn) => {
      fn.apply(this, args)
    })
  }
  // 订阅特定事件的处理程序
  on(name: string, callback: Function) {
    let fn: Array<Function> = this.list[name] || []
    fn.push(callback)
    this.list[name] = fn
  }
}
export default new Bus()
```
