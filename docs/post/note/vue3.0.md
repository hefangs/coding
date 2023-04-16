

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
:::tip 更小
  - `Vue3`移除一些不常用的`API`
  - 引入`tree-shaking`，可以将无用模块“剪辑”，仅打包需要的，使打包的整体体积变小了
:::
:::tip 更快
  - 主要体现在编译方面：
    - `diff`算法优化
    - 静态提升
    - 事件监听缓存
    - `SSR`优化
:::
:::tip 更友好
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