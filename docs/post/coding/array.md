

# Array



## 1.数组去重
```javascript
// filter去重
function unique(arr){
  return arr.filter((item,index,array) => {
  //return array.lastIndexOf(item) === index // [3, 1, 2, 4]
    return array.indexOf(item) === index
  })
}
let arr = [1,2,3,1,2,4]
unique(arr) // [1, 2, 3, 4]
```
```javascript
// reduce去重
function Uniq(arr = []) {
  return arr.reduce((prev, next) => prev.includes(next) ? prev : [...prev, next], [])
}
let arr = [1,2,3,1,2,4]
Uniq(arr) // [1, 2, 3, 4] 
```

## 2.Set去重
```javascript
let unique = arr => Array.from(new Set(arr))
let arr = [1,2,3,1,2,4]
unique(arr) // [1, 2, 3, 4]
```
```javascript
let unique = arr => [...new Set(arr)]
let arr = [1,2,3,1,2,4]
unique(arr) // [1, 2, 3, 4]
```
## 3.找到数组中重复的元素
```javascript
function repeat(arr) {
  let res =  arr.filter((item,index,array) =>{
   // return array.indexOf(item) !== index  // [1,2]
    return  array.lastIndexOf(item) !== index
  })
  return res
}
let arr = [1,2,3,1,2,4]
repeat(arr) //[1,2]
```

## 4.数组扁平
```javascript
function flatten(arr) {
  return [].concat(...arr.map(item =>{
    return Array.isArray(item) ? flatten(item) : item
    })
  )
}
let arr = [[1, 2], 3, [[[4], 5]]]
flatten(arr) // [1, 2, 3, 4, 5]
```
```javascript
// Array.prototype.flat(depth = 1)
let arr = [[1, 2], 3, [4], 5]
let res =arr.flat() //  [1, 2, 3, 4, 5]
```
```javascript
// reduce
function Flat(arr = []){
  return arr.reduce((prev, next) => prev.concat(Array.isArray(next) ? Flat(next) : next),[] )
}
const arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]]
Flat(arr) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]  
```
## 5.类数组转换为数组
```javascript
  let arrayLike = {
    length: 3,
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'd',
    4: 'e',
}
  let arr1 = Array.from(arrayLike) // ['a', 'b', 'c']
  let arr2 = Array.prototype.slice.call(arrayLike) // ['a', 'b', 'c']
```