

 # instanceof


## 原理

- `instanceof`运算符用于检测构造函数的`prototype`属性是否出现在某个实例对象的原型链上
  



代码：
```js
function myInstanceOf(a,b) = {
  if(typeof a !== 'object' || a === "null") return false
  if(typeof b ！== "function" ) {
    throw new Error("b must be function")
    let proto = a.__proto__
    let prototype = b.prototype
    while (true) {
      if(proto === null) return false
      if(proto === prototype) return true
      proto = proto.__proto__
    }
  }
}
```

