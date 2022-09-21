

 # new

## 原理

- 创建一个空对象,作为即将要返回的那个对象实例
- 将这个对象的`__proto__`指向构造函数的`prototype`
- 执行构造函数并将this绑定到新创建的对象上
- 判断构造函数的返回值类型，
- 如果是引用类型，就返回这个引用类型的对象，
- 否则就返回创建的那个对象 

```js
function myNew(context){
  let obj  = new Object()
  obj.__proto__ = Object.prototype
  let res = context.apply(obj,[...args].slice(1))
  return typeof res === "object" ? res : obj
}
```

