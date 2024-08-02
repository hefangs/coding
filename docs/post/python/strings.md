# String

## 字符串中的转义序列

:::info 
- `\n` ：换行符
- `\t` ：水平制表符（Tab）
- `\\` ：反斜杠
- `\r` ：回车
- `\"` ：双引号
- `\'` ：单引号
:::

## 字符串格式
:::info 
- `%运算符`
  - `%s` - 字符串（或任何具有字符串表示形式的对象，如数字）
  - `%d` - 整数
  - `%f` - 浮点数
- `str.format` -此格式是在 Python 版本 3 中引入的
- `f-Strings`-另一种新的字符串格式是字符串插值，即 f-strings（Python 3.6+）
:::

```python
# %运算符        第一种方法
first_name = 'he'
last_name = 'fang'
language = 'Python'
formated_string = 'I am %s %s. I teach %s' %(first_name, last_name, language)
print(formated_string)
```
```python
# str.format     第二种方法
first_name = 'he'
last_name = 'fang'
language = 'Python'
formated_string = 'I am {} {}. I teach {}'.format(first_name, last_name, language)
print(formated_string)

a = 4
b = 3
print('{} + {} = {}'.format(a, b, a + b))
print('{} - {} = {}'.format(a, b, a - b))
print('{} * {} = {}'.format(a, b, a * b))
print('{} / {} = {:.2f}'.format(a, b, a / b)) # limits it to two digits after decimal
print('{} % {} = {}'.format(a, b, a % b))
print('{} // {} = {}'.format(a, b, a // b))
print('{} ** {} = {}'.format(a, b, a ** b))
```

```python
# f-Strings        第三种方法
a = 4
b = 3
print(f'{a} + {b} = {a +b}')
print(f'{a} - {b} = {a - b}')
print(f'{a} * {b} = {a * b}')
print(f'{a} / {b} = {a / b:.2f}')
print(f'{a} % {b} = {a % b}')
print(f'{a} // {b} = {a // b}')
print(f'{a} ** {b} = {a ** b}')
```
##  字符串作为字符序列
```python
# 解包字符串
name = 'he'
x,y = name 
print(x) # h
print(y) # e
```
## 字符串切片
```python
language = 'Python'
first_three = language[0:3] # starts at zero index and up to 3 but not include 3
print(first_three) #Pyt
last_three = language[3:6]
print(last_three) # hon
# Another way
last_three = language[-3:]
print(last_three)   # hon
last_three = language[3:]
print(last_three)   # hon
new_name =language[0:6:2]      # step 是步长，表示每次从序列中获取元素时的间隔
print(new_name)     # Pto   
reverse_name = language[::-1]  # step 为 -1，表示以步长为 -1 从后向前遍历字符串，即逆序
print(reverse_name) # nohtyP
```

## capitalize
```python
# capitalize():将字符串的第一个字符转换为大写字母
challenge = 'thirty days of python'
print(challenge.capitalize()) # 'Thirty days of python'
```
## count
```python
# count(): 用于计算子字符串在目标字符串中出现的次数，count（substring， start=..， end=..）。start 是用于计数的起始索引，end 是要计数的最后一个索引
challenge = 'thirty days of python'
print(challenge.count('y')) # 3
print(challenge.count('y', 7, 14)) # 1
print(challenge.count('th')) # 2
```
## find
```python
# find():返回子字符串第一次出现的索引，如果未找到，则返回 -1
challenge = 'thirty days of python'
print(challenge.find('y'))  # 5
print(challenge.find('th')) # 0
print(challenge.find('b'))  # -1
```

## rfind
```python
# rfind():返回子字符串最后一次出现的索引，如果未找到，则返回 -1
challenge = 'thirty days of python'
print(challenge.rfind('y'))  # 16
print(challenge.rfind('th')) # 17
print(challenge.rfind('b'))  # -1
```


## index
```python
# index():返回子字符串在目标字符串中的首次出现位置,如果未找到，则 ValueError
challenge = 'thirty days of python'
sub_string = 'da'
print(challenge.index(sub_string))  # 7
print(challenge.index(sub_string, 9)) # ValueError: substring not found
```


## rindex
```python
# rindex():返回子字符串在目标字符串中的最后一次出现位置,如果未找到，则 ValueError
challenge = 'thirty days of python'
sub_string = 'da'
print(challenge.index(sub_string))  # 7
print(challenge.index(sub_string, 9)) # ValueError: substring not found
```
## isalnum
```python
# isalnum():检查字母数字字符
challenge = 'ThirtyDaysPython'
print(challenge.isalnum()) # True
challenge = '30DaysPython'
print(challenge.isalnum()) # True
challenge = 'thirty days of python'
print(challenge.isalnum()) # False, space is not an alphanumeric character
challenge = 'thirty days of python 30'
print(challenge.isalnum()) # False
```
## isalpha
```python
# isalpha():检查所有字符串元素是否都是字母字符（a-z 和 A-Z）
challenge = 'thirty days of python'
print(challenge.isalpha()) # False, space is once again excluded
challenge = 'ThirtyDaysPython'
print(challenge.isalpha()) # True
num = '123'
print(num.isalpha())      # False
```
## isdigit
```python
# isdigit():检查字符串中的所有字符是否都是数字（0-9 和其他一些 Unicode 数字字符）
challenge = 'Thirty'
print(challenge.isdigit()) # False
challenge = '30'
print(challenge.isdigit())   # True
challenge = '\u00B2'
print(challenge.isdigit())   # True
```
## islower
```python
# islower():检查字符串中的所有字母字符是否都是小写的
challenge = 'thirty days of python'
print(challenge.islower()) # True
challenge = 'Thirty days of python'
print(challenge.islower()) # False
```
## isupper
```python
# isupper():检查字符串中的所有字母字符是否都是大写的
challenge = 'thirty days of python'
print(challenge.isupper()) #  False
challenge = 'THIRTY DAYS OF PYTHON'
print(challenge.isupper()) # True
```
## join
```python
#join():用于将序列中的元素连接成一个字符串
words = ["Hello", "world", "Python"]
sentence = " ".join(words)
print(sentence)  # 输出: Hello world Python
```
## strip
```python
# strip():用于移除字符串开头和结尾的指定字符（默认为空格）
s = "  Hello, World!  "
trimmed_s = s.strip()
print(f"'{s}' -> '{trimmed_s}'")  # 输出: '  Hello, World!  ' -> 'Hello, World!'


```
## replace
```python
# replace():用给定的字符串替换子字符串
challenge = 'thirty days of python'
print(challenge.replace('python', 'coding')) # 'thirty days of coding'


```
## split
```python
#split():用于将字符串拆分为子字符串列表，基于指定的分隔符
challenge = 'thirty days of python'
print(challenge.split()) # ['thirty', 'days', 'of', 'python']
challenge = 'thirty, days, of, python'
print(challenge.split(', ')) # ['thirty', 'days', 'of', 'python']
```
