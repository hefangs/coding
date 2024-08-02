

# 高阶函数

## 函数作为参数
```python
def sum_numbers(nums):  # normal function
  return sum(nums)    # a sad function abusing the built-in sum function :<

def higher_order_function(f, lst):  # function as a parameter
  summation = f(lst)
  return summation
result = higher_order_function(sum_numbers, [1, 2, 3, 4, 5])
print(result)       # 15
```

## 函数作为返回值
```python
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
```python
def add_ten():
  ten = 10
  def add(num):
    return num + ten
  return add

closure_result = add_ten()
print(closure_result(5))  # 15
print(closure_result(10))  # 20
```

## 装饰器

```python
# Normal function
# 创建装饰函数，我们需要一个带有内部包装函数的外部函数
def greeting():
  return 'Welcome to Python'
def uppercase_decorator(function):
  def wrapper():
    func = function()
    make_uppercase = func.upper()
    return make_uppercase
  return wrapper
g = uppercase_decorator(greeting)
print(g())          # WELCOME TO PYTHON

## Let us implement the example above with a decorator

'''This decorator function is a higher order function
that takes a function as a parameter'''
def uppercase_decorator(function):
  def wrapper():
    func = function()
    make_uppercase = func.upper()
    return make_uppercase
  return wrapper
@uppercase_decorator
def greeting():
  return 'Welcome to Python'
print(greeting())   # WELCOME TO PYTHON
```

```python
# 将多个装饰器应用于单个函数

'''These decorator functions are higher order functions
that take functions as parameters'''

# First Decorator
def uppercase_decorator(function):
  def wrapper():
    func = function()
    make_uppercase = func.upper()
    return make_uppercase
  return wrapper

# Second decorator
def split_string_decorator(function):
  def wrapper():
    func = function()
    splitted_string = func.split()
    return splitted_string
  return wrapper

@split_string_decorator
@uppercase_decorator     # order with decorators is important in this case - .upper() function does not work with lists
def greeting():
  return 'Welcome to Python'
print(greeting())   # WELCOME TO PYTHON
```

```python
# 在装饰器函数中接受参数
def decorator_with_parameters(function):
  def wrapper_accepting_parameters(para1, para2, para3):
    function(para1, para2, para3)
    print("I live in {}".format(para3))
  return wrapper_accepting_parameters

@decorator_with_parameters
def print_full_name(first_name, last_name, country):
  print("I am {} {}. I love to teach.".format(
    first_name, last_name, country))

print_full_name("he", "fang",'Finland')
```

## map
:::info
- 定义
  - 用于将一个函数应用到可迭代对象的每个元素上，并返回一个包含结果的新迭代器
- 语法
  - `map(function, iterable, ...)`
    - `function`: 一个函数对象，定义了如何处理 iterable 中的每个元素。这个函数可以接收一个或多个参数
    - `iterable`: 一个或多个可迭代对象，例如列表、元组、集合等。map() 会依次将 iterable 中的元素作为参数传递给 function
:::

```python
numbers = [1, 2, 3, 4, 5] # iterable
def square(x):
  return x ** 2
numbers_squared = map(square, numbers)
print(list(numbers_squared))    # [1, 4, 9, 16, 25]
# Lets apply it with a lambda function
numbers_squared = map(lambda x : x ** 2, numbers)
print(list(numbers_squared))    # [1, 4, 9, 16, 25]
```

```python
numbers_str = ['1', '2', '3', '4', '5']  # iterable
numbers_int = map(int, numbers_str)
print(list(numbers_int))    # [1, 2, 3, 4, 5]
```

```python
names = ['he', 'fang']  # iterable
def change_to_upper(name):
  return name.upper()

names_upper_cased = map(change_to_upper, names)
print(list(names_upper_cased))    # ['he', 'fang']

# Let us apply it with a lambda function
names_upper_cased = map(lambda name: name.upper(), names)
print(list(names_upper_cased))    # ['he', 'fang']
```


## filter
:::info
- 定义
  - 用于根据特定条件从可迭代对象中筛选出符合条件的元素
- 语法：
  - `filter(function, iterable)`
    - `function`: 一个布尔函数，用于测试可迭代对象中的每个元素
    - 函数应返回 True 或 False。如果 function 为 None，则会将 iterable 中的所有 True 值返回
    - `iterable`: 一个可迭代对象，如列表、元组、集合等
:::

```python
# Lets filter only even numbers
numbers = [1, 2, 3, 4, 5]  # iterable
def is_even(num):
  if num % 2 == 0:
    return True
  return False
even_numbers = filter(is_even, numbers)
print(list(even_numbers))       # [2, 4]
```

```python
# Lets filter only odd numbers
numbers = [1, 2, 3, 4, 5]  # iterable
def is_odd(num):
  if num % 2 != 0:
    return True
  return False
odd_numbers = filter(is_odd, numbers)
print(list(odd_numbers))       # [1, 3, 5]
```

```python
# Filter long name
names = ['he', 'fang']  # iterable
def is_name_long(name):
  if len(name) > 3:
    return True
  return False
long_names = filter(is_name_long, names)
print(list(long_names))         # ['fang']
```

## reduce
:::info
- 定义
  - 用于对一个序列进行累计操作
- 语法
  - `from functools import reduce`
  - `reduce(function, iterable[, initializer])`
    - `function`: 一个二元函数，用于将序列的前两个元素进行计算，随后将计算结果与下一个元素进行计算，依此类推
    - `iterable`: 一个可迭代对象，如列表、元组等
    - `initializer` (可选): 初始值。如果提供了初始值，则它会在第一个元素之前被计算
:::
```python
numbers_str = ['1', '2', '3', '4', '5']  # iterable
def add_two_nums(x, y):
  return int(x) + int(y)
total = reduce(add_two_nums, numbers_str)
print(total)    # 15
```