


# 排序

## 冒泡排序

```js
function bubbleSort(arr){
  for(let i=0;i<arr.length-1;i++){
    for(let j=0;j<arr.length-1-i;j++){
      if(arr[j] > arr[j+1]){
        let tmp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = tmp
      }
    } 
  }  
  return arr  
}
let arr = [5,3,7,9,6,1,8,4,2]
bubbleSort(arr)  // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```