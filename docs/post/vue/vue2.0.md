
# Vue2.0相关
## 1. 为什么 data 是一个函数
    1. 组件中的 `data` 写成一个函数，数据以函数返回值形式定义，
    2. 这样每复用一次组件，就会返回一份新的 `data`，
    3. 类似于给每个组件实例创建一个私有的数据空间，让各个组件实例维护各自的数据。
    4. 而单纯的写成对象形式，就使得所有组件实例共用了一份 `data`，就会造成一个变了全都会变的结果

## 2. Vue 组件通讯有哪几种方式
  1. `props`:父组件向子组件传递数据是通过 `prop`传递的
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
  7. `v-if`从 `false`到 `true`会触发 `beforeCreate`,`created`钩子，而 `v-show`则不会;
  `v-if`从 `true`到 `false`会触发 `beforeDestroy`,`destroyed`钩子，而 `v-show`则不会

## 4. computed 和 watch 的区别

1. `computed`能做到的`watch`的都能做到,反过来 `watch`能做到的`computed`不一样能做到
2. `computed`： 是计算属性，依赖其它属性值，并且 `computed` 的值有缓存，只有它依赖的属性值发生改变，下一次获取 `computed` 的值时才会重新计算
3. `watch`： 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作


## 5. 怎样理解 Vue 的单向数据流
1. `props`传递数据都是父到子这样的一个单向流转过程，父组件中的`props`数据更新会使得与它关联的子组件数据也发生改变
2. 反过来则不行，这是为了防止子组件意外改变父组件`props`数据的状态，
3. 如果子组件想修改父组件的数据，可以通过`$emit`派发一个自定义事件，父组件接收后，再由父组件去修改
4. 有2种常见的方式去修改`props`:
   ```js
   //  prop 用来传递一个初始值,本地的 data 将这个 prop 用作其初始值
    props:[count]
    data(){
      return{
        num:this.count * 10
      }
    }
   ```
   ```js
   //  prop 用来传递一个初始值,通过computed对其进行加工
    props:[count]
    computed{
      show(){
        return this.count * 10
      }
    }
   ```
##  6. v-model 的原理？
```js
<input type="text" v-model="message">
<input type="text" :value="message" @input="message = $event.target.value">
```
1. 表单元素上使用`v-model`指令时，会自动绑定一个value属性和一个`input`事件，
2. 当表单元素的值改变时，会触发这个`input`事件并将新的值赋给`value`属性

## 7. vue-router 路由模式有几种？ 
## 8. Vue 中的 key 有什么作用？
1. `key` 是为 `Vue` 中 `vnode` 的唯一标记，通过这个 `key`，我们的 `diff` 操作可以更准确、更快速
2. 相关代码如下：
```js
// 判断两个vnode的标签和key是否相同 如果相同 就可以认为是同一节点就地复用
function isSameVnode(oldVnode, newVnode) {
  return oldVnode.tag === newVnode.tag && oldVnode.key === newVnode.key;
}s
// 根据key来创建老的儿子的index映射表  
// 类似 {'a':0,'b':1} 代表key为'a'的节点在第一个位置 key为'b'的节点在第二个位置
function makeIndexByKey(children) {
  let map = {};
  children.forEach((item, index) => {
    map[item.key] = index;
  });
  return map;
}
// 生成的映射表
let map = makeIndexByKey(oldCh);
```
## 9. 你有对 Vue 项目进行哪些优化？
1. 代码层面的优化:
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

2. `Webpack` 层面的优化:
   1. `Webpack` 对图片进行压缩
   2. 减少 `ES6` 转为 `ES5` 的冗余代码
   3. 提取公共代码
   4. 提取组件的 `CSS`
   5. 优化 `SourceMap`
   6. 构建结果输出分析
   7. `Vue` 项目的编译优化
3. 基础的 `Web` 技术的优化:
   1. 开启 `gzip` 压缩
   2. 浏览器缓存
   3. `CDN` 的使用
   4. 使用 `Chrome Performance` 查找性能瓶颈
## 10. Vue2中的Object.defineProperty 与 Proxy 优劣对比
1. Proxy 的优势如下:
   - `Proxy` 可以直接监听对象而非属性
   - `Proxy` 可以直接监听数组的变化；
   - `Proxy` 有多达 13 种拦截方法,不限于 `apply`、`ownKeys`、`deleteProperty`、`has` 等等是 `Object.defineProperty` 不具备的
   - `Proxy` 返回的是一个新对象,我们可以只操作新的对象达到目的,而 `Object.defineProperty` 只能遍历对象属性直接修改；
   - `Proxy` 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；
2.  `Object.defineProperty` 的优势如下:
    - 兼容性好，支持 `IE9`，而 `Proxy` 的存在浏览器兼容性问题,而且无法用 `polyfill` 磨平
## 11. Vue2.0 响应式数据的原理
1. Vue2.0中响应式数据的原理就是使用 Object.defineProperty()把 data 对象中的所有属性转为 getter/setter，
2. 建立依赖关系，当属性的值发生变化时，setter 方法会通知依赖追踪器，
3. 然后通知所有的依赖更新。Vue接下来会重新渲染模板，展示更新后的数据。
4. 相关代码如下:
    ```js
    // 7种数组（push,shift,pop,splice,unshift,sort,reverse）
    //方法进行重写(AOP 切片思想)
    const { arrayMethods } = require('./array')
    class Observe {
      constructor(value) {
        Object.defineProperty(value, __ob__, {
          value: this,
          enumerable: false,
          writable: true,
          configurable: true
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
## 12. Vue2.0 如何检测数组变化
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
    // this代表的就是数据本身 比如数据是{a:[1,2,3]} 那么我们使用a.push(4)  
    //this就是a  ob就是a.__ob__ 这个属性就是上段代码增加的 
    //代表的是该数据已经被响应式观察过了指向Observer实例
    const ob = this.__ob__
    // 这里的标志就是代表数组有新增操作
    let inserted
    switch (method) {
      case "push":
      case "unshift":
        inserted = args
        break;
      case "splice":
        inserted = args.slice(2)
      default:
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