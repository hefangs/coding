

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

## 装饰器



:::info
- 装饰器是 Python 中的一种设计模式，允许用户向现有对象添加新功能而无需修改其结构
- 装饰器通常在要装饰的函数定义之前调用
:::

#### 创建装饰器
:::info
要创建装饰函数，我们需要一个带有内部包装函数的外部函数
:::
```py
# Normal function
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

#### 将多个装饰器应用于单个函数
```py
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

#### 在装饰器函数中接受参数
:::info
大多数时候我们需要我们的函数接受参数，所以我们可能需要定义一个接受参数的装饰器
:::
```py
def decorator_with_parameters(function):
	def wrapper_accepting_parameters(para1, para2, para3):
		function(para1, para2, para3)
		print("I live in {}".format(para3))
	return wrapper_accepting_parameters

@decorator_with_parameters
def print_full_name(first_name, last_name, country):
	print("I am {} {}. I love to teach.".format(
		first_name, last_name, country))

print_full_name("Asabeneh", "Yetayeh",'Finland')
```


## 列表推导式
#### 将字符串更改为字符列表
```python
# One way
language = 'Python'
lst = list(language) # changing the string to list
print(type(lst))     # list
print(lst)           # ['P', 'y', 't', 'h', 'o', 'n']

# Second way: list comprehension
lst = [i for i in language]
print(type(lst)) # list
print(lst)       # ['P', 'y', 't', 'h', 'o', 'n']

```
####  生成一个数字列表
```python
# Generating numbers
numbers = [i for i in range(11)]  # to generate numbers from 0 to 10
print(numbers)                    # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# It is possible to do mathematical operations during iteration
squares = [i * i for i in range(11)]
print(squares)                    # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# It is also possible to make a list of tuples
numbers = [(i, i * i) for i in range(11)]
print(numbers)                             # [(0, 0), (1, 1), (2, 4), (3, 9), (4, 16), (5, 25)]

```

#### 列表推导式可以与 if 表达式结合使用
```python
# Generating even numbers
even_numbers = [i for i in range(21) if i % 2 == 0]  # to generate even numbers list in range 0 to 21
print(even_numbers)                    # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

# Generating odd numbers
odd_numbers = [i for i in range(21) if i % 2 != 0]  # to generate odd numbers in range 0 to 21
print(odd_numbers)                      # [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
# Filter numbers: let's filter out positive even numbers from the list below
numbers = [-8, -7, -3, -1, 0, 1, 3, 4, 5, 7, 6, 8, 10]
positive_even_numbers = [i for i in range(21) if i % 2 == 0 and i > 0]
print(positive_even_numbers)                    # [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

# Flattening a three dimensional array
list_of_lists = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened_list = [ number for row in list_of_lists for number in row]
print(flattened_list)    # [1, 2, 3, 4, 5, 6, 7, 8, 9]
```



## Lambda 函数

:::info
- Lambda 函数是一个没有名称的小型匿名函数,它可以接受任意数量的参数，但只能有一个表达式
- Lambda 函数类似于 JavaScript 中的匿名函数,当我们想在另一个函数中编写匿名函数时,我们需要它
:::

#### 创建 Lambda 函数
:::info
使用lambda关键字，后跟一个或多个参数，再跟一个表达式
:::
```python
x = lambda param1, param2, param3: param1 + param2 + param2
print(x(arg1, arg2, arg3))

# Named function
def add_two_nums(a, b):
  return a + b

print(add_two_nums(2, 3))     # 5
# Lets change the above function to a lambda function
add_two_nums = lambda a, b: a + b
print(add_two_nums(2,3))    # 5

# Self invoking lambda function
(lambda a, b: a + b)(2,3) # 5 - need to encapsulate it in print() to see the result in the console

square = lambda x : x ** 2
print(square(3))    # 9
cube = lambda x : x ** 3
print(cube(3))    # 27

# Multiple variables
multiple_variable = lambda a, b, c: a ** 2 - 3 * b + 4 * c
print(multiple_variable(5, 5, 3)) # 22
```
#### 在另一个函数内运行 Lambda 函数
```py
def power(x):
  return lambda n : x ** n

cube = power(2)(3)   # function power now need 2 arguments to run, in separate rounded brackets
print(cube)          # 8
two_power_of_five = power(2)(5) 
print(two_power_of_five)  # 32
```