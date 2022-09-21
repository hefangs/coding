

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