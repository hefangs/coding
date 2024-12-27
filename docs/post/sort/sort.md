
# 排序
## 选择排序
::: code-group

```py [Python]
def selection_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    for i in range(n-1):
        k = i
        for j in range(i+1, n):
            if arr[j] < arr[k]:
                k = j
        arr[i], arr[k] = arr[k], arr[i]
    return arr

arr = [2, 1, 3, 5, 4]
print(selection_sort(arr)) # [1, 2, 3, 4, 5]
```

```js [JS]
function selectionSort(arr) {
	let n = arr.length
	for (let i = 0; i < n - 1; i++) {
		let k = i
		for (let j = i + 1; j < n; j++) {
			if (arr[j] < arr[k]) {
				k = j
			}
		}
		[arr[i], arr[k]] = [arr[k], arr[i]]
	}
	return arr
}
arr = [1, 2, 4, 5, 6, 3, 9, 7, 8]
console.log(selectionSort(arr)) // [1, 2, 3, 4, 5, 6, 7, 8, 9]

```

:::
## 冒泡排序
::: code-group

```py [Python]
def bubble_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    for i in range(n-1, 0, -1):
        for j in range(i):
            if arr[j] > arr[j+1]:
                ;arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

arr = [2, 1, 3, 5, 4]
print(bubble_sort(arr)) # [1, 2, 3, 4, 5]
```

```js [JS]
function bubbleSort(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		for (let j = 0; j < i; j++) {
			if (arr[j] > arr[j + 1]) {
				;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
			}
		}
	}
	return arr
}
arr = [1, 2, 4, 5, 6, 3, 9, 7, 8]
console.log(bubbleSort(arr)) // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

:::
## 插入排序
::: code-group

```py [Python]
def insertion_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    for i in range(1, n):
        base = arr[i]
        j = i-1
        while j >= 0 and arr[j] > base:
            arr[j+1] = arr[j]
            j -= 1
        arr[j+1] = base
    return arr

arr = [2, 1, 3, 5, 4]
print(insertion_sort(arr))  # [1, 2, 3, 4, 5]
```

```js [JS]
function insertionSort(arr) {
	for (let i = 1; i < arr.length; i++) {
		let base = arr[i],
			j = i - 1
		while (j >= 0 && arr[j] > base) {
			arr[j + 1] = arr[j]
			j--
		}
		arr[j + 1] = base
	}
	return arr
}
arr = [1, 2, 4, 5, 6, 3, 9, 7, 8]
console.log(insertionSort(arr)) // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

:::
## 快速排序
::: code-group

```py [Python]
def quick_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr
    pivot = arr[-1]
    left = [x for x in arr[:-1] if x <= pivot]
    right = [x for x in arr[:-1] if x > pivot]
    return quick_sort(left) + [pivot] + quick_sort(right)

arr = [2, 1, 3, 5, 4]
print(quick_sort(arr))  # [1, 2, 3, 4, 5]
```

```js [JS]
function quickSort(arr) {
	if (arr.length <= 1) return arr
	let n = arr.length
	let pivot = arr[n - 1]
	let left = []
	let right = []
	for (i = 0; i < n - 1; i++) {
		if (arr[i] <= pivot) {
			left.push(arr[i])
		} else {
			right.push(arr[i])
		}
	}

	return [...quickSort(left), pivot, ...quickSort(right)]
}
arr = [1, 2, 4, 5, 6, 3, 9, 7, 8]
console.log(quickSort(arr)) // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

:::