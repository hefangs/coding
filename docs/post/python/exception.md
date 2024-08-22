

# Exception

:::info 异常处理
- Python 使用try和except来优雅地处理错误
- 优雅地退出（或优雅地处理）错误是一种简单的编程习惯用法 
- 程序检测到严重错误情况并以受控方式“优雅地退出”
- 通常，程序会在优雅退出时将描述性错误消息打印到终端或日志，这使我们的应用程序更加健壮
- 异常的原因通常来自程序本身的外部。异常的示例可能是输入不正确、文件名错误、无法找到文件、IO 设备故障
- 优雅地处理错误可以防止我们的应用程序崩溃
:::
:::details
![pic](/except.png "notice")
:::
## demo1
```py
try:
	name = input('Enter your name:')
	year_born = input('Year you were born:')
	age = 2019 - year_born
	print(f'You are {name}. And your age is {age}.')
except TypeError:
	print('Type error occured')
except ValueError:
	print('Value error occured')
except ZeroDivisionError:
	print('zero division error occured')
```
```py
# 上面的代码中，输出将是TypeError
Enter your name:he
Year you born:2024
Type error occured
```
## 改进 demo1
```py
try:
	name = input('Enter your name:')
	year_born = input('Year you born:')
	age = 2019 - int(year_born)
	print('You are {name}. And your age is {age}.')
except TypeError:
	print('Type error occur')
except ValueError:
	print('Value error occur')
except ZeroDivisionError:
	print('zero division error occur')
else:
	print('I usually run with the try block')
finally:
	print('I alway run.')
```
```py
Enter your name:he
Year you born:2024
You are he. And your age is 1.
I usually run with the try block
I alway run.
```

## 继续改进 demo1
```py
try:
	name = input('Enter your name:')
	year_born = input('Year you born:')
	age = 2019 - int(year_born)
    print('You are {name}. And your age is {age}.')
except Exception as e:
	print(e)
```