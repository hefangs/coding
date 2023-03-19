
# 让一个对象能够使用 for...of 循环遍历
## Object.values()
```javascript
const obj = {a:1,b:2,c:3}
const values= Object.values(obj)
for(let value of values){
  console.log(value) // 1 2 3
}
```
## Object.entries()
```javascript
const obj = {a:1,b:2,c:3}
const entries = Object.entries(obj)
for(let [key,value] of entries){
  console.log(value) // 1 2 3
}
```
## Symbol.iterator
```javascript
const obj={
  a:1,
  b:2,
  c:3,
  [Symbol.iterator](){
    let index = 0
    return{
      next(){
        if(index < Object.values(obj).length){
          return{
            value:Object.values(obj)[index++],
            done:false
          }
        }else{
          return {
            value:undefined,
            done:true
          }
        }
      }
    }
  }
}
for(let value of obj){
  console.log(value) // 1 2 3
}
```
## 例子
```javascript
[a,b] ={a:1,b:2}
Object.prototype[Symbol.iterator] = function(){
 return Object.values(this)[Symbol.iterator]()
}
```