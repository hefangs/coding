

# 去重



## 1.filter

```js
  function unique(arr){
    return arr.filter((item,index,array) => {
      return array.indexOf(item) === index
    })
  }
  let arr = [1,2,3,1,2,4]
  unique(arr) // [1, 2, 3, 4]
```
## 2.Set
```js
  let unique = arr => Array.from(new Set(arr))
  let arr = [1,2,3,1,2,4]
  unique(arr) // [1, 2, 3, 4]
```
```js
  let unique = arr => [...new Set(arr)]
  let arr = [1,2,3,1,2,4]
  unique(arr) // [1, 2, 3, 4]
```
## 3.找出数组中重复出现过的元素
```js
function repeat(arr) {
  let res =  arr.filter((item,index,array) =>{
    return  array.lastIndexOf(item) !==index
  })
  return res
}
let arr = [1,2,3,1,2,4]
repeat(arr) //[1,2]
```

## 4.数组展平
```js
function flatten(arr) {
  return [].concat(...arr.map(item =>{
    return Array.isArray(item) ? flatten(item) : item
    })
  )
}
let arr = [[1, 2], 3, [[[4], 5]]]
flatten(arr) // [1, 2, 3, 4, 5]
```