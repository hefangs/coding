

# Error

## SyntaxError

```py
Python 3.12.4 (main, Aug 10 2024, 22:22:31) [Clang 12.0.0 (clang-1200.0.32.29)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> print'hello world'
  File "<stdin>", line 1
    print'hello world'
    ^^^^^^^^^^^^^^^^^^
SyntaxError: Missing parentheses in call to 'print'. Did you mean print(...)?
>>> print('hello world')
hello world
```


## NameError
```py
Python 3.12.4 (main, Aug 10 2024, 22:22:31) [Clang 12.0.0 (clang-1200.0.32.29)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> print(age)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'age' is not defined
>>> age=20
>>> print(age)
20
```


## IndexError
```py
Python 3.12.4 (main, Aug 10 2024, 22:22:31) [Clang 12.0.0 (clang-1200.0.32.29)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> numbers = [1, 2, 3, 4, 5]
>>> numbers[5]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
IndexError: list index out of range
```

## ModuleNotFound

```py
Python 3.12.4 (main, Aug 10 2024, 22:22:31) [Clang 12.0.0 (clang-1200.0.32.29)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import maths
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ModuleNotFoundError: No module named 'maths'
>>> import math
>>> print(math.pi)
3.141592653589793
```

## AttributeError

```py
Python 3.12.4 (main, Aug 10 2024, 22:22:31) [Clang 12.0.0 (clang-1200.0.32.29)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import math
>>> print(math.PI)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: module 'math' has no attribute 'PI'. Did you mean: 'pi'?
```


## KeyError

```py
Python 3.12.4 (main, Aug 10 2024, 22:22:31) [Clang 12.0.0 (clang-1200.0.32.29)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> users = {'name':'he', 'age':25, 'country':'Finland'}
>>> users['name']
'he'
>>> users['county']
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'county'
```

## TypeError

```py
Python 3.12.4 (main, Aug 10 2024, 22:22:31) [Clang 12.0.0 (clang-1200.0.32.29)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> 3 + '3'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unsupported operand type(s) for +: 'int' and 'str'
>>> 3 + int('3')
6
```

## ImportError
```py
Python 3.12.4 (main, Aug 10 2024, 22:22:31) [Clang 12.0.0 (clang-1200.0.32.29)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> from math import power
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ImportError: cannot import name 'power' from 'math' (/Users/hefang/.pyenv/versions/3.12.4/lib/python3.12/lib-dynload/math.cpython-312-darwin.so)
```

## ValueError
```py
Python 3.12.4 (main, Aug 10 2024, 22:22:31) [Clang 12.0.0 (clang-1200.0.32.29)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> int('12a')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: invalid literal for int() with base 10: '12a'
```

## ZeroDivisionError
```py
Python 3.12.4 (main, Aug 10 2024, 22:22:31) [Clang 12.0.0 (clang-1200.0.32.29)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> 10/0
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ZeroDivisionError: division by zero
```