
# 获取对象的key
## for in获取对象上的key  
```javascript
const obj = {a:1,b:2,c:3}
for(let key in obj) {
  console.log(key) // a b c
}
```
## Object.keys
```javascript
const obj = {a:1,b:2,c:3}
const keys = Object.keys(obj)
console.log(keys) // ['a', 'b', 'c']
```
## Object.getOwnPropertyNames
```javascript
const obj = {a:1,b:2,c:3}
const keys = Object.getOwnPropertyNames(obj)
console.log(keys)  // ['a', 'b', 'c']
```
## Object.getOwnPropertySymbols
```javascript
let d:symbol= Symbol(1)
const obj = {a:1,b:2,c:3,[d]:1}
const keys = Object.getOwnPropertySymbols(obj)
console.log(keys)  //  [Symbol(1)] 
```
## Reflect.ownKeys
```javascript
let d:symbol= Symbol(1)
const obj = {a:1,b:2,c:3,[d]:1}
const keys = Reflect.ownKeys(obj)
console.log(keys)  //  ["a", "b", "c", Symbol(1)] 
```