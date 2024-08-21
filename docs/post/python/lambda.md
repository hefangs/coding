# Lambda 函数

:::info
- Lambda 函数是一个没有名称的小型匿名函数,它可以接受任意数量的参数，但只能有一个表达式
- Lambda 函数类似于 JavaScript 中的匿名函数,当我们想在另一个函数中编写匿名函数时,我们需要它
:::

## 创建 Lambda 函数
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
## 在另一个函数内运行 Lambda 函数
```py
def power(x):
  return lambda n : x ** n

cube = power(2)(3)   # function power now need 2 arguments to run, in separate rounded brackets
print(cube)          # 8
two_power_of_five = power(2)(5) 
print(two_power_of_five)  # 32
```