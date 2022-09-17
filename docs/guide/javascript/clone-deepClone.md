 # clone和deepClone

## 浅拷贝
- 如果属性是基本类型，拷贝的就是基本类型的值
- 如果属性是引用类型，拷贝的就是内存地址，所以如果其中一个对象改变了这个地址，就会影响到另一个对象
  
```js
function clone(obj) {
  let target
  for(key in obj){
    target[key] = obj[key]
  }
  return target
}
```
## 浅拷贝的实现方式：

## 1.`Object.assign()`
  Object.assign()方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象
```js
let obj1 = {person:{name:"Tom",age:20},job:"teacher"}
let obj2 = Object.assign({},obj1)
```
## 2.函数库`lodash`的`_.clone`方法
```js
let _ = require("lodash")
let obj1 = {person:{name:"Tom",age:20},job:"teacher"}
let obj2 = _.clone(obj1) 
```
## 3.展开运算符...
展开运算符提供了一种非常方便的方式来执行浅拷贝，这与 `Object.assign` ()的功能相同。
```js
let obj1 = {person:{name:"Tom",age:20},job:"teacher"}
let obj2 = {... obj1}
```
## 4.Array.prototype.concat()
```js
let arr1 = [1,2,3]
let arr2 = [4,5,6]
let arr3 = arr1.concat(arr2)
```
## 5.Array.prototype.slice()
```js
let arr1 = [1,2,3]
let arr2 = arr1.slice()

```

## 深拷贝
- 深拷贝是将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象
```js
function deepClone(obj){
  let target
  if(typeof obj !== Object){
    throw new Error("Object must be an Object!")
  }
  if(typeof obj === Object){
    for(key in obj){
      target[key] = deepClone(obj[key])
    }
    return target
  }else{
    return obj
  }
}
```
## 深拷贝的实现方式：
## 1.JSON.parse(JSON.stringify())
- 这种方法虽然可以实现数组或对象深拷贝,但不能处理正则和函数
- 如果使用这种方法正则变为空对象，函数变为null
```js
let data1 = [1,{name: "John", age: 20},/\d$/,function(){}]
let data2 = JSON.parse(JSON.stringify(data1))
console.log(data2)
// 0: 1
// 1: {name: 'John', age: 20}
// 2: {}
// 3: null
// length: 4
```
## 2.函数库lodash的_.cloneDeep方法
```js
let _ = require("lodash")
let obj1 = {person:{name:"Tom",age:20},job:"teacher"}
let obj2 = _.cloneDeep(obj1) 
```
## 3.jQuery.extend()方法
```js
var $ = require('jquery');
var obj1 = {person:{name:"Tom",age:20},job:"teacher"}
var obj2 = $.extend(true, {}, obj1)
```