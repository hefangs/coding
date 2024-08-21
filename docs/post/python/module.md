# Module

:::info 什么是模块
- 模块是包含一组代码或一组函数的文件，可将其包含在应用程序中
- 模块可以是包含单个变量、函数或大型代码库的文件
:::

## 导入模块
```py
# main.py
import my_module
print(my_module.generate_full_name('he', 'fang'))
```

## 从模块导入函数
```py
# main.py
from my_module import generate_full_name, sum_two_num, person, gravity
print(generate_full_name('he','fang'))
print(sum_two_num(1,9))
mass = 100
weight = mass * gravity
print(weight)
print(person['first_name'])
```

## 从模块导入函数并重命名

```py
# main.py file
from my_module import generate_full_name as full_name, sum_two_num as total, person as p, gravity as g
print(full_name('he','fang'))
print(total(1, 9))
mass = 100
weight = mass * g
print(weight)
print(p)
print(p['first_name'])
```

## 导入内置模块
:::info
- 使用关键字 `import` 导入文件/函数来导入模块
- 常见的内置模块：
  - `math`
  - `datetime`
  - `os`
  - `sys`
  - `random`
  - `statistics`
  - `collections`
  - `json`
  - `re`
:::

## os 模块
:::info
- 使用 python os模块可以自动执行许多操作系统任务
- Python 中的 OS 模块提供创建、更改当前工作目录和删除目录（文件夹）、获取其内容、更改和识别当前目录的函数
:::
```py
# import the module
import os
# Creating a directory
os.mkdir('directory_name')
# Changing the current directory
os.chdir('path')
# Getting current working directory
os.getcwd()
# Removing directory
os.rmdir()
```

## sys 模块

:::info
- sys 模块提供用于操作 Python 运行时环境不同部分的函数和变量
- 函数 sys.argv 返回传递给 Python 脚本的命令行参数列表。此列表中索引 0 处的项目始终是脚本的名称，索引 1 处是从命令行传递的参数
:::
```py
import sys
#print(sys.argv[0], argv[1],sys.argv[2])  # this line would print out: filename argument1 argument2
print('Welcome {}. Enjoy  {} challenge!'.format(sys.argv[1], sys.argv[2]))
# to exit sys
sys.exit()
# To know the largest integer variable it takes
sys.maxsize
# To know environment path
sys.path
# To know the version of python you are using
sys.version 
```

## statistics 模块
:::info
- statistics 模块提供数值数据数学统计函数
- 此模块中定义了常用的统计函数：mean、median、mode、stdev等
:::

```py
from statistics import * # importing all the statistics modules
ages = [20, 20, 4, 24, 25, 22, 26, 20, 23, 22, 26]
print(mean(ages))       # ~22.9
print(median(ages))     # 23
print(mode(ages))       # 20
print(stdev(ages))      # ~2.3
```

## math 模块
:::info
包含许多数学运算和常数的模块
:::
```py
import math
print(math.pi)           # 3.141592653589793, pi constant
print(math.sqrt(2))      # 1.4142135623730951, square root
print(math.pow(2, 3))    # 8.0, exponential function
print(math.floor(9.81))  # 9, rounding to the lowest
print(math.ceil(9.81))   # 10, rounding to the highest
print(math.log10(100))   # 2, logarithm with 10 as base
```
#### 可以一次导入多个函数
```py
from math import pi, sqrt, pow, floor, ceil, log10
print(pi)                 # 3.141592653589793
print(sqrt(2))            # 1.4142135623730951
print(pow(2, 3))          # 8.0
print(floor(9.81))        # 9
print(ceil(9.81))         # 10
print(math.log10(100))    # 2
```
##### 导入数学模块中的所有函数
```py
from math import *
print(pi)                  # 3.141592653589793, pi constant
print(sqrt(2))             # 1.4142135623730951, square root
print(pow(2, 3))           # 8.0, exponential
print(floor(9.81))         # 9, rounding to the lowest
print(ceil(9.81))          # 10, rounding to the highest
print(math.log10(100))     # 2
```

## string 模块
```py
import string
print(string.ascii_letters) # abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
print(string.digits)        # 0123456789
print(string.punctuation)   # !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
```

## random 模块
:::info
- random():
  - 用途：生成一个[0.0, 1.0)区间内的随机浮点数。
  - 返回值：一个随机浮点数，范围是从 0.0（包含）到 1.0（不包含）
- randint(a, b):
  - 用途：生成一个指定范围[a, b]内的随机整数。
  - 返回值：一个随机整数，范围是从 `a`（包含）到 `b`（包含）
:::

```py
from random import random, randint
print(random())   # it doesn't take any arguments; it returns a value between 0 and 0.9999
print(randint(5, 20)) # it returns a random integer number between [5, 20] inclusive
```