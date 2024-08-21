

# 装饰器


:::info
- 装饰器是 Python 中的一种设计模式，允许用户向现有对象添加新功能而无需修改其结构
- 装饰器通常在要装饰的函数定义之前调用
:::

## 创建装饰器
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

## 将多个装饰器应用于单个函数
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

## 在装饰器函数中接受参数
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