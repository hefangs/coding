

# 高阶函数

## 函数作为参数
```py
def sum_numbers(nums):  # normal function
	return sum(nums)    # a sad function abusing the built-in sum function :<

def higher_order_function(f, lst):  # function as a parameter
	summation = f(lst)
	return summation
result = higher_order_function(sum_numbers, [1, 2, 3, 4, 5])
print(result)       # 15
```

## 函数作为返回值

```py
def square(x):          # a square function
	return x ** 2

def cube(x):            # a cube function
	return x ** 3

def absolute(x):        # an absolute value function
	if x >= 0:
		return x
	else:
		return -(x)

def higher_order_function(type): # a higher order function returning a function
	if type == 'square':
		return square
	elif type == 'cube':
		return cube
	elif type == 'absolute':
		return absolute

result = higher_order_function('square')
print(result(3))       # 9
result = higher_order_function('cube')
print(result(3))       # 27
result = higher_order_function('absolute')
print(result(-3))      # 3
```

## 闭包
:::info 
- 定义：闭包就是能够读取外部函数内的变量的函数
- 条件:
  - 我们必须有一个嵌套函数（函数在函数内部）
  - 嵌套函数必须引用在封闭函数中定义的值
  - 封闭函数必须返回嵌套函数
- 作用
  - 闭包是将外层函数内的局部变量和外层函数的外部连接起来的一座桥梁
  - 将外层函数的变量持久地保存在内存中
:::

```py
def add_ten():
	ten = 10
	def add(num):
		return num + ten
	return add

closure_result = add_ten()
print(closure_result(5))  # 15
print(closure_result(10))  # 20
```


## map
:::info
- map(`function`, `iterable`, `*iterables`)
- `map()`函数是一个内置函数，它以函数和可迭代对象作为参数
:::
```py
numbers = [1, 2, 3, 4, 5] # iterable
def square(x):
    return x ** 2
numbers_squared = map(square, numbers)
print(list(numbers_squared))    # [1, 4, 9, 16, 25]
# Lets apply it with a lambda function
numbers_squared = map(lambda x : x ** 2, numbers)
print(list(numbers_squared))    # [1, 4, 9, 16, 25]
```
```py
numbers_str = ['1', '2', '3', '4', '5']  # iterable
numbers_int = map(int, numbers_str)
print(list(numbers_int))    # [1, 2, 3, 4, 5]
```

```py
names = ['Asabeneh', 'Lidiya', 'Ermias', 'Abraham']  # iterable

def change_to_upper(name):
	return name.upper()

names_upper_cased = map(change_to_upper, names)
print(list(names_upper_cased))    # ['ASABENEH', 'LIDIYA', 'ERMIAS', 'ABRAHAM']

# Let us apply it with a lambda function
names_upper_cased = map(lambda name: name.upper(), names)
print(list(names_upper_cased))    # ['ASABENEH', 'LIDIYA', 'ERMIAS', 'ABRAHAM']
```

## filter

:::info
- filter(`function`, `iterable`)
- `filter()`函数调用指定的函数，该函数为指定的可迭代对象（列表）的每个项目返回布尔值,它过滤满足过滤条件的项目
:::
```py
# Lets filter only even nubers
numbers = [1, 2, 3, 4, 5]  # iterable

def is_even(num):
	if num % 2 == 0:
		return True
	return False

even_numbers = filter(is_even, numbers)
print(list(even_numbers))       # [2, 4]
```
```py
numbers = [1, 2, 3, 4, 5]  # iterable

def is_odd(num):
	if num % 2 != 0:
		return True
	return False

odd_numbers = filter(is_odd, numbers)
print(list(odd_numbers))       # [1, 3, 5]
```

```py
# Filter long name
names = ['Asabeneh', 'Lidiya', 'Ermias', 'Abraham']  # iterable
def is_name_long(name):
	if len(name) > 7:
		return True
	return False

long_names = filter(is_name_long, names)
print(list(long_names))         # ['Asabeneh']
```

## reduce

:::info
- reduce(`function`, `iterable`, `initializer=None`)
- 需要两个参数，一个函数和一个可迭代对象
- 它不会返回另一个可迭代对象，而是返回单个值
:::
```py
numbers_str = ['1', '2', '3', '4', '5']  # iterable
def add_two_nums(x, y):
	return int(x) + int(y)

total = reduce(add_two_nums, numbers_str)
print(total)    # 15
```