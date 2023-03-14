


# 排序

## 冒泡排序

```js
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}
let arr = [5,3,7,9,6,1,8,4,2]
bubbleSort(arr)  // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```


## 选择排序
```js
function selectSort(arr){
  let minIndex
  for(let i=0; i<arr.length - 1; i++){
    minIndex = i 
    for(let j = i + 1; j < arr.length; j++){
      if(arr[j] < arr[minIndex]){
        minIndex = j 
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
  return arr
}
let arr = [5,3,7,9,6,1,8,4,2]
selectSort(arr)  //[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## 快速排序
```js
function quickSort(arr) {
  let target = arr[0]
  let left = []
  let right = []
  if(arr.length <= 1) return arr
  for(let i = 1; i < arr.length; i++) {
    if(arr[i] < target){
      left.push(arr[i])
    }else{
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([target],quickSort(right))
}
let arr = [5,3,7,9,6,1,8,4,2]
quickSort(arr) //[1, 2, 3, 4, 5, 6, 7, 8, 9]
```