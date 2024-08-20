

# Function

## 无参数函数
```python
# 函数可以在没有参数的情况下声明
def generate_full_name ():
  first_name = 'he'
  last_name = 'fang'
  space = ' '
  full_name = first_name + space + last_name
  print(full_name)
generate_full_name () # calling a function

def add_two_numbers ():
  num_one = 2
  num_two = 3
  total = num_one + num_two
  print(total)
add_two_numbers()
```
## 函数有返回值
```python
# 函数没有return语句，则函数的值为None
def generate_full_name ():
  first_name = 'he'
  last_name = 'fang'
  space = ' '
  full_name = first_name + space + last_name
  return full_name
print(generate_full_name())

def add_two_numbers ():
  num_one = 2
  num_two = 3
  total = num_one + num_two
  return total
print(add_two_numbers())
```

## 带参数的函数
```python
# 单参数
def greetings (name):
  message = name + ', welcome to Python for Everyone!'
  return message

print(greetings('he'))

def add_ten(num):
  ten = 10
  return num + ten
print(add_ten(90))

def square_number(x):
  return x * x
print(square_number(2))

def area_of_circle (r):
  PI = 3.14
  area = PI * r ** 2
  return area
print(area_of_circle(10))

def sum_of_numbers(n):
  total = 0
  for i in range(n+1):
    total+=i
  print(total)
print(sum_of_numbers(10)) # 55
print(sum_of_numbers(100)) # 5050
```
```python
# 两个参数
def generate_full_name (first_name, last_name):
  space = ' '
    full_name = first_name + space + last_name
    return full_name
print('Full Name: ', generate_full_name('Asabeneh','Yetayeh'))

def sum_two_numbers (num_one, num_two):
  sum = num_one + num_two
  return sum
print('Sum of two numbers: ', sum_two_numbers(1, 9))

def calculate_age (current_year, birth_year):
  age = current_year - birth_year
  return age

print('Age: ', calculate_age(2021, 1819))

def weight_of_object (mass, gravity):
  weight = str(mass * gravity)+ ' N' # the value has to be changed to a string first
  return weight
print('Weight of an object in Newtons: ', weight_of_object(100, 9.81))
```

## 传递带有键和值的参数
```python
# 传递带有key和value的参数,那么参数的顺序并不重要
def print_full_name(first_name, last_name):
  space = ' '
  full_name = first_name  + space + last_name
  print(full_name)
print(print_full_name(first_name = 'he', last_name = 'fang'))

def add_two_numbers (num1, num2):
  total = num1 + num2
  print(total)
print(add_two_numbers(num2 = 3, num1 = 2)) # Order does not matter
```

## 函数的返回值
```python
# 返回一个字符串
def print_name(first_name):
  return first_name
print_name('he') # he

def print_full_name(first_name, last_name):
  space = ' '
  full_name = first_name  + space + last_name
  return full_name
print_full_name(first_name='he', last_name='fang')
```

```python
# 返回一个数字
def add_two_numbers (num1, num2):
  total = num1 + num2
  return total
print(add_two_numbers(2, 3))

def calculate_age (current_year, birth_year):
  age = current_year - birth_year
  return age
print('Age: ', calculate_age(2019, 1819))
```

```python
# 返回一个布尔值
def is_even (n):
  if n % 2 == 0:
    print('even')
    return True    # return stops further execution of the function, similar to break 
  return False
print(is_even(10)) # True
print(is_even(7))  # False
```

```python
# 返回一个列表
def find_even_numbers(n):
  evens = []
  for i in range(n + 1):
    if i % 2 == 0:
      evens.append(i)
  return evens
print(find_even_numbers(10))
```

## 带默认参数的函数
```python
# 将默认值传递给参数,如果不传递参数,则将使用它们的默认值
def greetings (name = 'Peter'):
  message = name + ', welcome to Python for Everyone!'
  return message
print(greetings())
print(greetings('he'))

def generate_full_name (first_name = 'he', last_name = 'fang'):
  space = ' '
  full_name = first_name + space + last_name
  return full_name

print(generate_full_name())
print(generate_full_name('David','Smith'))

def calculate_age (birth_year,current_year = 2021):
  age = current_year - birth_year
  return age
print('Age: ', calculate_age(1821))

def weight_of_object (mass, gravity = 9.81):
  weight = str(mass * gravity)+ ' N' # the value has to be changed to string first
  return weight
print('Weight of an object in Newtons: ', weight_of_object(100)) # 9.81 - average gravity on Earth's surface
print('Weight of an object in Newtons: ', weight_of_object(100, 1.62)) # gravity on the surface of the Moon
```

## 任意数量的参数
```python
# 不知道传递给函数的参数的数量
# 通过在参数名前添加 * 来创建一个可以接受任意数量参数的函数
def sum_all_nums(*nums):
  total = 0
  for num in nums:
    total += num     # same as total = total + num 
  return total
print(sum_all_nums(2, 3, 5)) # 10
```

## 默认参数和任意数量的参数
```python
def generate_groups (team,*args):
  print(team)
  for i in args:
    print(i)
print(generate_groups('Team-1','he','Brook','David','fang'))
```

## 函数作为参数

```python
#You can pass functions around as parameters
def square_number (n):
  return n * n
def do_something(f, x):
  return f(x)
print(do_something(square_number, 3)) # 27
```

## 列表推导式
###### 将字符串更改为字符列表
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

######  生成一个数字列表
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

###### 列表推导式可以与 if 表达式结合使用
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

```python
# 创建 Lambda 函数
# 使用lambda关键字，后跟一个或多个参数，再跟一个表达式
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

# 在另一个函数内运行 Lambda 函数
def power(x):
  return lambda n : x ** n

cube = power(2)(3)   # function power now need 2 arguments to run, in separate rounded brackets
print(cube)          # 8
two_power_of_five = power(2)(5) 
print(two_power_of_five)  # 32
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