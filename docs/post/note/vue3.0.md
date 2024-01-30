
# Vue3.0相关
## 1. Vue3.0做了哪些优化?

:::warning 优化内容
  - 更小
  - 更快
  - `TypeScript`支持
  - `API`设计一致性
  - 提高自身可维护性
  - 开放更多底层功能
:::
:::warning 更小
  - `Vue3`移除一些不常用的`API`
  - 引入`tree-shaking`，可以将无用模块“剪辑”，仅打包需要的，使打包的整体体积变小了
:::
:::warning 更快
  - 主要体现在编译方面：
    - `diff`算法优化
    - 静态提升
    - 事件监听缓存
    - `SSR`优化
:::
:::warning 更友好
  - `vue3`在兼顾`vue2`的`options API`的同时还推出了`composition API`，大大增加了代码的逻辑组织和代码复用能力
  - 这里代码简单演示下：
    - 存在一个获取鼠标位置的函数
    ```javascript
    import { toRefs, reactive } from 'vue'
    function useMouse(){
      const state = reactive({x:0,y:0})
      const update = e =>{
        state.x = e.pageX
        state.y = e.pageY
      }
      onMounted(()=>{
        window.addEventListener('mousemove',update)
      })
      onUnmounted(()=>{
        window.removeEventListener('mousemove',update)
      })
      return toRefs(state)
    }
    ```
    - 我们只需要调用这个函数，即可获取`x`、`y`的坐标，完全不用关注实现过程
    - 如果很多类似的第三方库，我们只需要调用即可，不必关注实现过程，开发效率大大提高
    - `Vue3`是基于`typeScript`编写的，可以享受到自动的类型定义提示
:::

:::danger 优化方案
  - Vue3从很多层面都做了优化，可以分成三个方面：
    - 源码
      - `Vue3`整个源码是通过`monorepo`的方式维护的，根据功能将不同的模块拆分到`packages`目录下面不同的子目录中
      - 这样使得模块拆分更细化，职责划分更明确，模块之间的依赖关系也更加明确，开发人员也更容易阅读、理解和更改所有模块源码，提高代码的可维护性
      - 另外一些`package`（比如`reactivity`响应式库）是可以独立于`Vue`使用的，这样用户如果只想使用`Vue3`的响应式能力，可以单独依赖这个响应式库而不用去依赖整个`Vue`
      - `Vue3`是基于`typeScript`编写的，提供了更好的类型检查，能支持复杂的类型推导
    - 性能
      - 体积优化
      - 编译优化
      - 数据劫持优化
    - 语法`API`
      - `Composition API`，其两大显著的优化：
        - 优化逻辑组织
          - 一张图，我们可以很直观地感受到 `Composition API`在逻辑组织方面的优势
          - 相同功能的代码编写在一块，而不像`Options API`那样，各个功能的代码混成一块
          - ![pic](/optionsApi.png "notice")
        - 优化逻辑复用
          - 在`Vue2`中，我们是通过`mixin`实现功能混合，如果多个`mixin`混合，会存在两个非常明显的问题：命名冲突和数据来源不清晰
          - 而通过`Composition API`这种形式，可以将一些复用的代码抽离出来作为一个函数，只要的使用的地方直接进行调用即可
          - 同样是上文的获取鼠标位置的例子:
          ```javascript
          import { toRefs, reactive, onUnmounted, onMounted } from 'vue';
          function useMouse(){
            const state = reactive({x:0,y:0})
            const update = e=>{
              state.x = e.pageX
              state.y = e.pageY
            }
            onMounted(()=>{
              window.addEventListener('mousemove',update)
            })
            onUnmounted(()=>{
              window.removeEventListener('mousemove',update)
            })
            return toRefs(state)
          }
          // 组件使用
          import useMousePosition from './mouse'
          export default {
            setup() {
              const { x, y } = useMousePosition()
              return { x, y }
            }
          }
          ```
          - 可以看到整个数据来源清晰了，即使去编写更多的`hook`函数，也不会出现命名冲突的问题
:::

## 2. Vue3.0性能提升主要是通过哪几方面体现的

:::warning 编译阶段
  - 回顾`Vue2`我们知道每个组件实例都对应一个`watcher`实例，它会在组件渲染的过程中把用到的数据`property`记录为依赖，当依赖发生改变，触发`setter`，则会通知`watcher`，从而使关联的组件重新渲染
  ![pic](/compile.png)
    ```javascript
    <template>
      <div id="content">
          <p class="text">静态文本</p>
          <p class="text">静态文本</p>
          <p class="text">{{ message }}</p>
          <p class="text">静态文本</p>
          ...
          <p class="text">静态文本</p>
      </div>
    </template>
    ```
  - 可以看到上面例子中，组件内部只有一个动态节点，剩余一堆都是静态节点，所以这里很多`Diff`和遍历其实都是不需要的，造成性能浪费
  - 因此`Vue3`在编译阶段，做了进一步优化。主要有如下：
    - `Diff`算法优化
    - 静态提升
    - 事件监听缓存
    - `SSR`优化
:::

:::warning Diff算法优化
  - `Vue3`在`Diff`算法中相比`Vue2`增加了静态标记
  - 关于这个静态标记，其作用是为了会发生变化的地方添加一个`flag`标记，下次发生变化的时候直接找该地方进行比较
  - 下图这里，已经标记静态节点的`p`标签在`Diff`过程中则不会比较，把性能进一步提高
   ![pic](/vue3-diff.png)
  - 关于静态类型枚举如下：
    ```javascript
    export const enum PatchFlags {
      TEXT = 1,// 动态的文本节点
      CLASS = 1 << 1,  // 2 动态的 class
      STYLE = 1 << 2,  // 4 动态的 style
      PROPS = 1 << 3,  // 8 动态属性，不包括类名和样式
      FULL_PROPS = 1 << 4,  // 16 动态 key，当 key 变化时需要完整的 diff 算法做比较
      HYDRATE_EVENTS = 1 << 5,  // 32 表示带有事件监听器的节点
      STABLE_FRAGMENT = 1 << 6,   // 64 一个不会改变子节点顺序的 Fragment
      KEYED_FRAGMENT = 1 << 7, // 128 带有 key 属性的 Fragment
      UNKEYED_FRAGMENT = 1 << 8, // 256 子节点没有 key 的 Fragment
      NEED_PATCH = 1 << 9,   // 512
      DYNAMIC_SLOTS = 1 << 10,  // 动态 solt
      HOISTED = -1,  // 特殊标志是负整数表示永远不会用作 diff
      BAIL = -2 // 一个特殊的标志，指代差异算法
    }
    ```
:::

:::warning 静态提升
  - `Vue3`中对不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用
  - 这样就免去了重复的创建节点，大型应用会受益于这个改动，免去了重复的创建操作，优化了运行时候的内存占用
  - 例子：
    ```javascript
    <span>你好</span>
    <div>{{ message }}</div>
    ```
  - 没有做静态提升之前：
    ```javascript
    export function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (_openBlock(), _createBlock(_Fragment, null, [
        _createVNode("span", null, "你好"),
        _createVNode("div", null, _toDisplayString(_ctx.message), 1 /* TEXT */)
      ], 64 /* STABLE_FRAGMENT */))
    }
    ```
  - 做了静态提升之后：
    ```javascript
    const _hoisted_1 = /*#__PURE__*/_createVNode("span", null, "你好", -1 /* HOISTED */)
    export function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (_openBlock(), _createBlock(_Fragment, null, [
        _hoisted_1,
        _createVNode("div", null, _toDisplayString(_ctx.message), 1 /* TEXT */)
      ], 64 /* STABLE_FRAGMENT */))
    }
    // Check the console for the AST
    ```
  - 静态内容`_hoisted_1`被放置在`render`函数外，每次渲染的时候只要取`_hoisted_1`即可
  - 同时`_hoisted_1`被打上了`PatchFlag`，静态标记值为`-1`，特殊标志是负整数表示永远不会用于`Diff`
:::

:::warning 事件监听缓存
  - 默认情况下绑定事件行为会被视为动态绑定，所以每次都会去追踪它的变化
    ```javascript
    <div>
      <button @click = 'onClick'>点我</button>
    </div>
    ```
  - 没开启事件监听器缓存
    ```javascript
    export const render = /*#__PURE__*/_withId(function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (_openBlock(), _createBlock("div", null, [
        _createVNode("button", { onClick: _ctx.onClick }, "点我", 8 /* PROPS */, ["onClick"])
        // PROPS=1<<3,// 8 //动态属性，但不包含类名和样式
      ]))
    })
    ```
  - 开启事件侦听器缓存后
    ```javascript
    export function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (_openBlock(), _createBlock("div", null, [
        _createVNode("button", {
          onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.onClick(...args)))
        }, "点我")
      ]))
    }
    ```
::: warning SSR优化
  - 当静态内容大到一定量级时候，会用`createStaticVNode`方法在客户端去生成一个`static node`，这些静态`node`，会被直接`innerHtml`，就不需要创建对象，然后根据对象渲染
    ```javascript
    <div>
      <div>
        <span>你好</span>
      </div>
      ...  // 很多个静态属性
      <div>
        <span>{{ message }}</span>
      </div>
    </div>
    ```
  - 编译后
    ```javascript
    import { mergeProps as _mergeProps } from "vue"
    import { ssrRenderAttrs as _ssrRenderAttrs, ssrInterpolate as _ssrInterpolate } from "@vue/server-renderer"
    export function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
      const _cssVars = { style: { color: _ctx.color }}
      _push(`<div${
        _ssrRenderAttrs(_mergeProps(_attrs, _cssVars))
      }><div><span>你好</span>...<div><span>你好</span><div><span>${
        _ssrInterpolate(_ctx.message)
      }</span></div></div>`)
    }
    ```
:::

:::tip 源码体积
  - 相比`Vue2`，`Vue3`整体体积变小了，除了移出一些不常用的API，再重要的是`Tree shanking`
  - 任何一个函数如`ref`、`reactive`、`computed`等，仅仅在用到的时候才打包，没用到的模块都被摇掉，打包的整体体积变小
  ```javascript
  import { computed, defineComponent, ref } from 'vue'
  export default defineComponent({
    setup(props, context) {
      const age = ref(18)
      let state = reactive({
        name: 'test'
      })
      const readOnlyAge = computed(() => age.value++) // 19
      return {
        age,
        state,
        readOnlyAge
      }
    }
  })
  ```
:::

:::danger 响应式系统
  - `Vue2`中采用`defineProperty`来劫持整个对象，然后进行深度遍历所有属性，给每个属性添加`getter`和`setter`，实现响应式
    - 对象新增或者删除一个属性无法实现响应式（可以通过Vue.set/Vue.delete来实现响应式）
    - 通过修改数组的length，下标无法实现响应式（通过改写数组的7种方法实现响应式）
    - 如果对象的层级很深，需要深度遍历影响性能
  - `Vue3`采用`proxy`重写了响应式系统，因为`proxy`可以对整个对象进行监听，所以不需要深度遍历
    - 可以监听动态属性的添加
    - 可以监听到数组的索引和数组`length`属性
    - 可以监听删除属性
:::

## 3. Vue3.0里为什么要用 Proxy API 替代 defineProperty API ？
:::warning Object.defineProperty
  - 定义：`Object.defineProperty()`方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象
    - `get`：属性的`getter` 函数，当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入`this`对象（由于继承关系，这里的this并不一定是定义该属性的对象）该函数的返回值会被用作属性的值
    - `set`：属性的`setter`函数，当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的`this`对象。默认为`undefined`
  - 定义一个响应式函数`defineReactive`
    ```javascript
    function update() {
      app.innerText = obj.foo
    }
    function defineReactive(obj, key, val) {
      Object.defineProperty(obj, key, {
        get() {
          console.log(`get ${key}:${val}`);
          return val
        },
          set(newVal) {
            if (newVal !== val) {
              val = newVal
              update()
            }
          }
        })
      }
    ```
  - 调用defineReactive，数据发生变化触发update方法，实现数据响应式
    ```javascript
    const obj = {}
    defineReactive(obj, 'foo', '')
    setTimeout(()=>{
      obj.foo = new Date().toLocaleTimeString()
    },1000)
    ```
  - 在对象存在多个`key`情况下，需要进行遍历
    ```javascript
    function observe(obj) {
      if (typeof obj !== 'object' || obj == null) {
        return
      }
      Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
      })
    }
    ```
  - 如果存在嵌套对象的情况，还需要在`defineReactive`中进行递归
    ```javascript
    function defineReactive(obj, key, val) {
      observe(val)
      Object.defineProperty(obj, key, {
        get() {
          console.log(`get ${key}:${val}`);
          return val
        },
        set(newVal) {
          if (newVal !== val) {
            val = newVal
            update()
          }
        }
      })
    }
    ```
  - 当给`key`赋值为对象的时候，还需要在`set`属性中进行递归
    ```javascript
    set(newVal) {
      if (newVal !== val) {
        observe(newVal) // 新值是对象的情况
        notifyUpdate()
      }
    }
    ```
  - 上述例子能够实现对一个对象的基本响应式，但仍然存在诸多问题：
    - 现在对一个对象进行`删除`与`添加属性`操作，无法劫持
      ```javascript
      const person = {
        name: 'Tom',
        age:18
      }
      observe(person)
      person.sex = 'male' // 无法劫持
      delete person.name  // 无法劫持
      ```
    - 对一个数组进行监听的时候，也不是响应式的了
      ```javascript
      const arr = [1,2,3,4,5]
      arrData.forEach((val,index)=>{
          defineProperty(arrData,index,val)
      })
      arrDate[0] = 99 // 无法劫持
      ```
  - `小结`：
    - 检测不到对象属性的添加和删除
    - 数组`API`方法无法监听到
    - 需要对每个属性进行遍历监听，如果嵌套对象，需要深层监听，造成性能问题
:::

:::warning Proxy
  - `Proxy`的监听是针对一个对象的，那么对这个对象的所有操作会进入监听操作，这就完全可以代理所有属性了
    - 定义一个响应式方法`reactive`
      ```javascript
      function reactive(obj) {
        if (typeof obj !== 'object' && obj != null) {
            return obj
        }
        // Proxy相当于在对象外层加拦截
        const observed = new Proxy(obj, {
            get(target, key, receiver) {
              const res = Reflect.get(target, key, receiver)
              console.log(`获取${key}:${res}`)
              return res
            },
            set(target, key, value, receiver) {
              const res = Reflect.set(target, key, value, receiver)
              console.log(`设置${key}:${value}`)
              return res
            },
            deleteProperty(target, key) {
              const res = Reflect.deleteProperty(target, key)
              console.log(`删除${key}:${res}`)
              return res
            }
        })
        return observed
      }
      ```
    - 测试一下简单数据的操作，发现都能劫持
      ```javascript
      const person = reactive({
          name: 'John'
      })
      // 1.获取
      state.name  // John
      // 2.设置已存在属性
      state.name = 'Joy' // ok
      // 3.设置不存在属性
      state.age = 18  // ok
      // 4.删除属性
      delete state.name // ok
      ```
    - 再测试嵌套对象情况，这时候发现就不那么OK了
      ```javascript
      const person = reactive({
        hobby: {
          running:true
        }
      })
      // 设置嵌套对象属性
      person.hobby.running = false // no ok
      ```
    - 解决上面问题需要在`get`之上再进行一层代理
      ```javascript
      function reactive(obj) {
        if (typeof obj !== 'object' && obj != null) {
          return obj
        }
        // Proxy相当于在对象外层加拦截
        const observed = new Proxy(obj, {
          get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver)
            console.log(`获取${key}:${res}`)
            return isObject(res) ? reactive(res) : res
          }
          return observed
        })
      }
      ```
:::
::: danger 总结
  - `Object.defineProperty`只能遍历对象属性进行劫持 
    ```javascript
      function observe(obj) {
        if (typeof obj !== 'object' || obj == null) {
          return 
      }
        Object.keys(obj).forEach(key => {
          defineReactive(obj, key, obj[key])
        })
      }
    ```
  - `Proxy`直接可以劫持整个对象，并返回一个新对象，我们可以只操作新的对象达到响应式目的
    ```javascript
      function reactive(obj) {
      if (typeof obj !== 'object' && obj != null) {
        return obj
      }
      // Proxy相当于在对象外层加拦截
      const observed = new Proxy(obj, {
        get(target, key, receiver) {
          const res = Reflect.get(target, key, receiver)
          console.log(`获取${key}:${res}`)
          return res
        },
        set(target, key, value, receiver) {
          const res = Reflect.set(target, key, value, receiver)
          console.log(`设置${key}:${value}`)
          return res
        },
        deleteProperty(target, key) {
          const res = Reflect.deleteProperty(target, key)
          console.log(`删除${key}:${res}`)
          return res
        }
      })
        return observed
      }
    ```
  - `Proxy`可以直接监听数组的变化（`push`、`shift`、`splice`）
    ```javascript
    const arr = [1,2,3]
    const arrP = reactive(arr)
    arr.push(4) // ok
    ```
  - `Proxy`有多达13种拦截方法,不限于`apply`、`ownKeys`、`deleteProperty`、`has`等等，这是`Object.defineProperty`不具备的
  - 正因为`defineProperty`自身的缺陷，导致`Vue2`在实现响应式过程需要实现其他的方法辅助（如`重写数组方法`、增加额外`set`、`delete`方法）
    ```javascript
    // 数组重写
    const originalProto = Array.prototype
    const arrayProto = Object.create(originalProto)
    ['push', 'pop', 'shift', 'unshift', 'splice', 'reverse', 'sort'].forEach(method => {
      arrayProto[method] = function () {
        originalProto[method].apply(this.arguments)
        dep.notice()
      }
    })
    // set、delete
    Vue.set(obj,'bar','newbar')
    Vue.delete(obj,'bar')
    ```
  - `Proxy`不兼容`IE`，也没有`polyfill`, `defineProperty`能支持到`IE9`
:::


## 4.  watch与watchEffect

:::tip 不同形式的“数据源”
  - `Vue3`中`watchEffect`的作用和`Vue2`中的`watch`作用是一样的，他们都是用来监听响应式状态发生变化的，当响应式状态发生变化时，都会触发一个回调函数
    - 侦听数据源类型： 
      - 它可以是一个ref(包括计算属性)
      - 一个响应式对象
      - 一个getter函数
      - 或多个数据源组成的数组
:::


:::tip 监听ref代理的单个数据
```javascript{2}
let num1 = ref(1)
watch(num1, (newValue, oldValue) => {
  console.log(newValue, oldValue)
})
let update = () =>{
  num1.value += 1
}
```
:::
:::tip 监听ref代理的多个数据
```javascript{3}
let num1 = ref(1)
let num2 = ref(2)
watch([num1,num2], (newValue, oldValue) => {
  console.log(newValue, oldValue)
})
let update =()=>{
  num1.value += 1
  num2.value += 2
}
```
:::

:::warning 用ref监听对象(需要手动增加deep:true)
```javascript{8,10}
let person = ref({
  name: 'John',
  age: 18
  foo:{
    bar:'running'
  }
})
watch(person, (newValue, oldValue) => {
  console.log(newValue, oldValue)
},{deep:true})
let update = () =>{
  person.value.name += '!'
  person.value.age += 1
  person.value.foo.bar += '~'
}
```
:::

:::tip 用reactive监听一个对象
```javascript{8}
let person = reactive({
  name: 'John',
  age: 18,
  foo:{
    bar:'running'
  }
})
watch(person, (newValue, oldValue) => {
  console.log(newValue, oldValue)
})
let update = () =>{
  person.name += '!'
  person.age += 1
  person.foo.bar += '~'
}
```
:::
:::tip 用reactive监听对象上的一个属性
```javascript{8}
let person = reactive({
  name: 'John',
  age: 18,
  foo:{
    bar:'running'
  }
})
watch(()=> person.name, (newValue, oldValue) => {
  console.log(newValue, oldValue)
})
let update = () =>{
  person.name += '!'
  person.age += 1
  person.foo.bar += '~'
}
```
:::
:::tip 用reactive监听对象上的多个属性
```javascript{8}
let person = reactive({
  name: 'John',
  age: 18,
  foo:{
    bar:'running'
  }
})
watch([()=> person.name,()=> person.foo.bar], (newValue, oldValue) => {
  console.log(newValue, oldValue)
})
let update = () =>{
  person.name += '!'
  person.age += 1
  person.foo.bar += '~'
}
```
:::


:::tip watchEffect
- 使用`watchEffect`方法，它立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数
  ```javascript{11-12}
  let num1 = ref(1)
  let num2 = ref(2)
  let person = reactive({
    name: 'John',
    age: 18,
    foo:{
      bar:'running'
    }
  })
  watchEffect(() => {
    console.log(num1.value, num2.value)
    console.log(person.name, person.age,person.foo.bar)
  })
  let update = () =>{
    num1.value += 1
    num2.value += 2
    person.name += '!'
    person.age += 1
    person.foo.bar += '~'
  }
  ```
- 清除副作用
  - 副作用就是执行某种操作，如对外部可变数据或变量的修改，外部接口的调用等
  - `watchEffect`的回调函数就是一个副作用函数，因为我们使用`watchEffect`就是侦听到依赖的变化后执行某些操作
  - 当执行副作用函数时，它势必会对系统带来一些影响
  - 如在副作用函数里执行了一个定时器`setInterval`，因此我们必须处理副作用
  - Vue3的`watchEffect`侦听副作用传入的函数可以接收一个`onInvalidate`函数作为入参
  - 用来注册清理失效时的回调。当以下情况发生时，这个失效回调会被触发：
    - 副作用即将重新执行时（即依赖的值改变）
    - 侦听器被停止 (通过显示调用返回值停止侦听，或组件被卸载时隐式调用了停止侦听)
    ```javascript
    // 定时器注册和销毁
    watchEffect((onInvalidate) => {
      const timer = setInterval(()=> {
        // ...
      }, 1000)
      onInvalidate(() => clearInterval(timer))
    })
    const handleClick = () => {
    // ...
    }
    // dom的监听和取消监听
    onMounted(()=>{
      watchEffect((onInvalidate) => {
        document.querySelector('.btn').addEventListener('click', handleClick, false)
        onInvalidate(() => document.querySelector('.btn').removeEventListener('click', handleClick))
      })
    })
    // 利用watchEffect作一个防抖节流（如取消请求）
    const id = ref(13)
    watchEffect(onInvalidate => {
      // 异步请求
      const token = performAsyncOperation(id.value)
      // 如果id频繁改变，会触发失效函数，取消之前的接口请求
      onInvalidate(() => {
        // id has changed or watcher is stopped.
        // invalidate previously pending async operation
        token.cancel()
      })
    })
    ```
:::
:::tip 停止监听器
```javascript
const unWatch1 = watch(person,() => {})
const unWatch2 = watchEffect(() => {})
unWatch1()
unWatch2()
```
:::

:::danger 总结
  - `watch`是惰性执行的，而`watchEffect`不是
  - 不考虑`watch`第三个配置参数的情况下，`watch`在组件第一次执行的时候是不会执行的
  - 只有在之后依赖项变化的时候再执行，而`watchEffect`是在程序执行到此处的时候就会立即执行，而后再响应其依赖变化执行
  - `watch`需要传递监听的对象，`watchEffect`不需要

:::

## 5. 自定义指令 (Custom Directives)

- 自定义指令+后台返回数据-鉴权
  ```vue{5-7,11}
  <script setup lang="ts">
  import { ref, reactive, Directive } from 'vue'
  localStorage.setItem('userId', 'userId001')
  const permission = [
    // 'userId001:product:create',
    'userId001:product:edit',
    'userId001:product:delete'
  ]
  const userId = localStorage.getItem('userId') as string
  const vHasShow: Directive<HTMLElement, string> = (el, binding) => {
    if (!permission.includes(userId + ':' + binding.value)) {
      el.style.display = 'none'
    }
  }
  </script>
  <template>
    <button v-has-show="'product:create'">创建</button>
    <button v-has-show="'product:edit'">修改</button>
    <button v-has-show="'product:delete'">删除</button>
  </template>
  <style scoped>
  ```


## 6. ref 和 reactive

:::info 总结
- ref:`基本类型数据` 和`对象类型数据`
- reactive:`对象类型数据`
- 区别：
  - `ref`定义的变量必须使用`.value`
  - `reactive`重写分配一个新对象，会失去响应式（可以使用`Object.assign(obj,obj1)`）
- 使用规则：
  - 若需要一个基本类型的响应式数据，必须使用`ref`
  - 若需要一个响应式对象，层级不深，`ref`和`reactive`都可以
  - 若需要一个响应式对象，且层级较深，推荐使用`reactive`
- 实例：
  ```vue{6}
  <script setup lang="ts">
   import { ref, reactive } from 'vue'
    let name = ref('张三')
    let person1 = reactive({ name: 'John', age: 18 })
    let updatePerson1 = () => {
      Object.assign(person1, { name: 'Joy', age: 19 })}
  </script>
  <template>
    <div>姓名:{{ name }}</div>
    <div>姓名:{{ person1.name }}</div>
    <div>年龄:{{ person1.age }}</div>
    <button @click="updatePerson1">修改person1</button>
  </template>

  ```
:::


## 7. toRef 和 toRefs

:::warning 总结
- 将一个响应式对象里的每个属性，转换为`ref`对象
- `toRef`和`toRefs`功能一致，但是`toRefs`可以批量操作
- 实例：
  ```vue{7,9-10}
  <template>
    <div>姓名:{{ name }}</div>
    <div>年龄:{{ age }}</div>
    <div>年龄:{{ age1 }}</div>
  </template>

  <script setup lang="ts">
    import { toRefs, toRef, reactive } from 'vue'
    let person1 = reactive({ name: 'John', age: 18 })
    let age1 = toRef(person1, 'age') //单个数据操作
    let {name,age} = toRefs(person1)   //批量操作
  </script>

  ```
:::

## 8. computed(计算属性)
- 通过计算属性的`fullName`是一个只读属性
  ```vue{4,11-16}
  <template>
    姓：<input type="text" v-model="firstName" /> <br />
    名：<input type="text" v-model="lastName" /><br />
    <div>fullName:{{ fullName }}</div>
  </template>

  <script setup lang="ts">
    import { ref, computed } from 'vue'
    let firstName = ref('zhang')
    let lastName = ref('san')
    let fullName = computed(() => {
      return (
        firstName.value.slice(0, 1).toUpperCase() +
        firstName.value.slice(1) +
        '-' +
        lastName.value
      )
    })
  </script>
  ```
- 通过计算属性的`fullName`是一个可读可写属性
  ```vue{13-18,21-24,27-28}
  <template>
    姓：<input type="text" v-model="firstName" /> <br />
    名：<input type="text" v-model="lastName" /><br />
    <div>fullName:{{ fullName }}</div>
    <button @click="changeFullName">更新fullName</button>
  </template>
  <script setup lang="ts">
    import { ref, computed } from 'vue'
    let firstName = ref('zhang')
    let lastName = ref('san')
    let fullName = computed({
      get() {
        return (
          firstName.value.slice(0, 1).toUpperCase() +
          firstName.value.slice(1) +
          '-' +
          lastName.value
        )
      },
      set(val) {
        let [str1, str2] = val.split('-')
        firstName.value = str1
        lastName.value = str2
      }
    })
    let changeFullName = () => {
      fullName.value = 'li-si'
    }
  </script>

  ```
  
  ## 9. Router
  :::tip 实例：
  ```typescript
  // main.ts
  import { createRouter, createWebHistory } from 'vue-router'
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        name: 'zhuye',
        path: '/home',
        component: () => import('@/components/Home.vue')
      },
      {
        name: 'xinwen',
        path: '/news',
        component: () => import('@/components/News.vue'),
        children: [
          {
            name: 'xiangqing',
            path: 'details',
            component: () => import('@/components/Details.vue')
          }
        ]
      },
      {
        name: 'guanyu',
        path: '/about',
        component: () => import('@/components/About.vue')
      }
    ]
  })
  export default router
  ```
  ```javascript
  // App.vue
  <RouterLink to="home" active-class="active">主页</RouterLink>
  <RouterLink to="news" active-class="active">新闻</RouterLink>
  <RouterLink to="about " active-class="active">关于</RouterLink>
  ```
:::
:::warning query传参
- `query`的第一种写法:`直接通过模版字符串拼接`
  ```javascript{4}
  <div>
    <ul>
      <li v-for="item in newsList" :key="item.id">
        <RouterLink :to="`/news/details?id=${item.id}&title=${item.title}&content=${item.content}`">{{ item.title }}
        </RouterLink>
      </li>
    </ul>
    <div>
      <RouterView></RouterView>
    </div>
  </div>
  ```
- `query`的第二种写法（对象写法：`path+query`）
  ```javascript{7-11}
  // News.vue
  <div>
    <ul>
      <li v-for="item in newsList" :key="item.id">
        <RouterLink
          :to="{
            path: '/news/details',
            query: {
              id: item.id,
              title: item.title,
              content: item.content
            }
          }"
          >{{ item.title }}
        </RouterLink>
      </li>
    </ul>
    <div>
      <RouterView></RouterView>
    </div>
  </div>
  ```
- `query`的第二种写法（对象写法：`name+query`）
  ```javascript{7-11}
  // News.vue
  <div>
    <ul>
      <li v-for="item in newsList" :key="item.id">
        <RouterLink
          :to="{
            name: 'xiangqing',
            query: {
              id: item.id,
              title: item.title,
              content: item.content
            }
          }"
          >{{ item.title }}
        </RouterLink>
      </li>
    </ul>
    <div>
      <RouterView></RouterView>
    </div>
  </div>
  ```
- Detail页面接收`query`参数和使用
  ```typescript
  // Detail.vue
  <script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { toRefs } from 'vue'
  let route = useRoute()
  let { query } = toRefs(route)
  </script>
  <template>
    <ul>
      <li>id:{{ query.id }}</li>
      <li>title:{{ query.title }}</li>
      <li>content:{{ query.content }}</li>
    </ul>
  </template>
  ```
:::

:::danger param传参
- `params`的第一种写法:`直接通过模版字符串拼接`
  ```javascript{2}
  <RouterLink
    :to="`/news/details/${item.id}/${item.title}/${item.content}`"
    >{{ item.title }}
  </RouterLink>
  ```
- `params`的第二种写法:（对象写法：`name+params`）
  ```typescript{3-7}
  <RouterLink
    :to="{
      name: 'xiangqing',
      params: {
        id: item.id,
        title: item.title,
        content: item.content
      }
    }"
    >{{ item.title }}
  </RouterLink>
  ```
- **`需要给参数设置占位符`**(*例如第12行*)
  ```javascript{12}
  import { createRouter, createWebHistory } from 'vue-router'
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        name: 'xinwen',
        path: '/news',
        component: () => import('@/components/News.vue'),
        children: [
          {
            name: 'xiangqing',
            path: 'details/:id/:title/:content',
            component: () => import('@/components/Details.vue')
          }
        ]
      }
    ]
  })
  export default router


  ```
- Detail页面接收`params`参数和使用
  ```typescript
  <script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { toRefs } from 'vue'
  let route = useRoute()
  console.log(route)
  let { params } = toRefs(route)
  </script>
  <template>
    <ul>
      <li>id:{{ params.id }}</li>
      <li>title:{{ params.title }}</li>
      <li>content:{{ params.content }}</li>
    </ul>
  </template>
  ```
:::

:::danger 路由的props配置
- 将路由参数作为props传给组件
```javascript
// Details.vue 页面直接使用id，title，content
<ul>
  <li>{{id}}<li>
  <li>{{title}}<li>
  <li>{{content}}<li>
<ul>
```
```typescript{2}
<script lang="ts" setup>
  defineProps(["id","title","content"])
</scrip>
```
  - 布尔写法
  ```javascript{11}
  routes: [
      {
        name: 'xinwen',
        path: '/news',
        component: () => import('@/components/News.vue'),
        children: [
          {
            name: 'xiangqing',
            path: 'details/:id/:title/:content',
            component: () => import('@/components/Details.vue'),
            props: true   // 只能传params参数
          }
        ]
      }
    ]
  ```
  - 函数写法
  ```javascript{11-13}
    routes: [
        {
          name: 'xinwen',
          path: '/news',
          component: () => import('@/components/News.vue'),
          children: [
            {
              name: 'xiangqing',
              path: 'details/:id/:title/:content',
              component: () => import('@/components/Details.vue'),
              props(route){
                // 函数写法，可以传query参数也可以传params参数
                return route.query //return route.query
              }
            }
          ]
        }
      ]
  ```
  - 对象写法
  ```javascript{11-14}
    routes: [
        {
          name: 'xinwen',
          path: '/news',
          component: () => import('@/components/News.vue'),
          children: [
            {
              name: 'xiangqing',
              path: 'details/:id/:title/:content',
              component: () => import('@/components/Details.vue'),
              props:{ // 可以自己决定将什么作为props传给路由组件
                a:1,
                b:2,
                c:3
              }
            }
          ]
        }
      ]
  ```
:::
  ## 10. 组件通信
  1. `props`是使用频率最高的一种通信方式 父子可以相互传递
      - 父传子：属性值非函数
      - 子传父：属性值是函数
      ```typescript{6-8,14-15}
      // 父组件
      <script setup lang="ts">
        import { ref } from 'vue'
        import Child from '@/pages/01-props/Child.vue'
        let name = ref('张三')
        let age = ref()
        let getAge = (value: number) => {
          age.value = value
      }
      </script>
      <template>
        <h1>父组件</h1>
        <h3>父亲姓名:{{ name }}</h3>
        <h3 v-show="age">通过子传父获取到的年龄:{{ age }}</h3>
        <Child :name="name" :sentAge="getAge" />
      </template>
      ```
      ```typescript{4,11,12}
      // 子组件
      <script setup lang="ts">
      import { ref } from 'vue'
      defineProps(['name', 'sentAge'])
      let age = ref(18)
      </script>
      <template>
        <div>
          <h1>子组件</h1>
          <h5>儿子年龄:{{ age }}</h5>
          <h5>name通过父传子过来的:{{ name }}</h5>
          <button @click="sentAge(age)">向父组件传递数据age</button>
        </div>
      </template>
      ```
  2. 自定义事件
     ```typescript{6-8,15}
      // 父组件
      <script setup lang="ts">
      import { ref } from 'vue'
      import Child from '@/pages/02-custom-event/Child.vue'
      let name = ref('张三')
      let age = ref()
      let getAge = (value) => {
        age.value = value
      }
      </script>
      <template>
        <h1>父组件</h1>
        <h3>父亲姓名:{{ name }}</h3>
        <h4 v-show="age">子传父获取到的年龄:{{ age }}</h4>
        <Child @sent-age="getAge" />
      </template>
      ```
      ```typescript{4,11}
      // 子组件
      <script setup lang="ts">
      import { ref } from 'vue'
      const emit = defineEmits(['sent-age'])
      let age = ref(18)
      </script>
      <template>
        <div>
          <h1>子组件</h1>
          <h5>儿子年龄:{{ age }}</h5>
          <button @click="emit('sent-age', age)">
            通过自定义事件向父组件传递数据age
          </button>
        </div>
      </template>
      ```
  3. mitt
     ```typescript
     // @/utils/emitter
      import mitt from 'mitt'
      export const emitter = mitt()

     ```
     ```typescript{6-12}
     // 子组件1
      <script setup lang="ts">
      import { ref } from 'vue'
      import { emitter } from '@/utils/emitter'
      let age = ref(18)
      let toy = ref('')
      let sentAge = () => {
        emitter.emit('sent-age', age.value)
      }
      emitter.on('sent-toy', (value: any) => {
        console.log('子组件1收到玩具', value)
        toy.value = value
      })
      </script>
      <template>
        <div>
          <h1>子组件1</h1>
          <h4>儿子的年龄:{{ age }}</h4>
          <h4 v-show="toy">子组件2传递的玩具:{{ toy }}</h4>
          <button @click="sentAge">把年龄传递给子组件2</button>
        </div>
      </template>
     ```

     ```typescript{6-12}
     // 子组件2
      <script setup lang="ts">
      import { ref } from 'vue'
      import { emitter } from '@/utils/emitter'
      let toy = ref('奥特曼')
      let age = ref()
      emitter.on('sent-age', (value: any) => {
        console.log('子组件2收到年龄', value)
        age.value = value
      })
      let sentToy = () => {
        emitter.emit('sent-toy', toy.value)
      }
      </script>
      <template>
        <div>
          <h1>子组件2</h1>
          <h4>儿子的玩具:{{ toy }}</h4>
          <h4 v-show="age">子组件1传递的年龄:{{ age }}</h4>
          <button @click="sentToy">把玩具传给子组件1</button>
        </div>
      </template>
     ```
  4. v-model
      ```typescript{13-17,22-23}
      // 父组件
      <script setup lang="ts">
      import { ref } from 'vue'
      import ModelInput from './ModelInput.vue'
      let username = ref('张三')
      let password = ref(123456)
      </script>
      <template>
        <h1>父组件</h1>
        <!-- v-model 用在html标签上 -->
        <!-- v-model 本质上是语法糖 -->
        <!-- 13行是12行底层实现原理 -->
        姓名：
        <input type="text" v-model="username" />
        <input
          type="text"
          :value="username"
          @input="username = (<HTMLInputElement>$event.target).value"
        />
        <br /><br />
        <!-- v-model用在组件标签上  -->
        密码：
        <ModelInput v-model="password" />
        <ModelInput :modelValue="password" @update:modelValue="password = $event" />
      </template>
      ```
      ```typescript{3-4,7-10}
      // 子组件
      <script setup lang="ts">
      defineProps(['modelValue'])
      let emit = defineEmits(['update:modelValue'])
      </script>
      <template>
        <input
          type="text"
          :value="modelValue"
          @input="emit('update:modelValue', (<HTMLInputElement>$event.target).value)"
        />
      </template>
      ```
  