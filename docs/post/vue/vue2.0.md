
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
2. `computed`： 是计算属性，依赖其它属性值，并且 `computed` 的值有缓存，只有它依赖的属性值发生改变，下一次获取 `computed` 的值时才会重新计算 `computed` 的值
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