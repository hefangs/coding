

# 去重



## 1.filter

```javascript
  function unique(arr){
    return arr.filter((item,index,array) => {
    //return array.lastIndexOf(item) === index // [3, 1, 2, 4]
      return array.indexOf(item) === index
    })
  }
  let arr = [1,2,3,1,2,4]
  unique(arr) // [1, 2, 3, 4]
```
## 2.Set
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
## 3.数组中重复的元素
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

## 4.数组展平
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
// Array.prototype.flat(depth=1)
let arr = [[1, 2], 3, [4], 5]
let res =arr.flat() //  [1, 2, 3, 4, 5]
```