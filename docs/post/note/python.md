# Python
## 数据类型
::: tip Data types
1. **Number**
   - Integer：整数（负、零和正）示例:`-1`,`0`,`1`
   - float：示例:`-3.15`,`-2.21`,`-1.01`,`0.0`,`1.1`,`2.3`
   - Complex：示例:`1 + j`,`2 + 4j`
2. **String**:示例:`'I love Python'` 
3. **Boolean**
   - True
   - False
4. **List**
   - `[0, 1, 2, 3, 4, 5]` 
   - `['Banana', 'Orange', 'Mango', 'Avocado']`
   - `['Banana', 10, False, 9.81]`
5. **Dictionary**:字典对象是键值对格式的无序数据集合
    ```python
    {
      'first_name': 'he',
      'last_name': 'fang',
      'country': 'China', 
      'age': 100, 
      'is_married': False,
      'skills': ['JS', 'Vue', 'Node', 'Python']
    }
    ```
6. **Tuple**:元组是不同数据类型（如列表）的有序集合，但元组一旦创建就无法修改。它们是不可变的
   - `('Asabeneh', 'Pawel', 'Brook', 'Abraham', 'Lidiya')`
   - `('Earth', 'Jupiter', 'Neptune', 'Mars', 'Venus', 'Saturn', 'Uranus', 'Mercury')`
7. **Set**:集合是类似于列表和元组的数据类型的集合,仅存储唯一项
   - `{2, 4, 3, 5}`
   - `{3.14, 9.81, 2.7}`
:::


## 检查数据类型

```python
# Checking data types
print(type(10))                  # Int
print(type(3.14))                # Float
print(type(1 + 3j))              # Complex number
print(type('he'))                # String
print(type(True))                # Boolean
print(type([1, 2, 3]))           # List
print(type({'name':'fang'}))     # Dictionary
print(type((9.8, 3.14, 2.7)))    # Tuple
print(type({9.8, 3.14, 2.7}))    # Set
```

## 强制转换
**强制转换：将一种数据类型转换为另一种数据类型**
```python
# int to float
num_int = 10
print('num_int',num_int)         # 10
num_float = float(num_int)
print('num_float:', num_float)   # 10.0

# float to int
gravity = 9.81
print(int(gravity))             # 9

# int to str
num_int = 10
print(num_int)                  # 10  <class 'int'>
num_str = str(num_int)
print(num_str)                  # 10  <class 'str'>

# str to int or float
num_str = '10.6'
print('num_float', float(num_str))  # 10.6
print('num_int', int(num_str))      # 10 ValueError:invalid literal for int() with base 10: '10.6'

# str to list
first_name = 'he'
print(first_name)               # 'he'
first_name_to_list = list(first_name)
print(first_name_to_list)            # ['h','e']
```

## 赋值运算符
![pic](/operators1.png "notice")

## 算术运算符
![pic](/operators2.png "notice")
```python
# Integers
print('Addition: ', 1 + 2)        # 3
print('Subtraction: ', 2 - 1)     # 1
print('Multiplication: ', 2 * 3)  # 6
print ('Division: ', 4 / 2)       # 2.0  Division in Python gives floating number
print('Division: ', 6 / 2)        # 3.0         
print('Division: ', 7 / 2)        # 3.5
print('Division without the remainder: ', 7 // 2)   # 3,  gives without the floating number or without the remaining
print ('Division without the remainder: ', 7 // 3)   # 2
print('Modulus: ', 3 % 2)         # 1, Gives the remainder
print('Exponentiation: ', 2 ** 3) # 8 it means 2 * 2 * 2

# Floating numbers
print('Floating Point Number, PI', 3.14)
print('Floating Point Number, gravity', 9.81)

# Complex numbers
print('Complex number: ', 1 + 1j)
print('Multiplying complex numbers: ',(1 + 1j) * (1 - 1j))
```

## 比较运算符
![pic](/operators3.png "notice")
```python
print(3 > 2)     # True, because 3 is greater than 2
print(3 >= 2)    # True, because 3 is greater than 2
print(3 < 2)     # False,  because 3 is greater than 2
print(2 < 3)     # True, because 2 is less than 3
print(2 <= 3)    # True, because 2 is less than 3
print(3 == 2)    # False, because 3 is not equal to 2
print(3 != 2)    # True, because 3 is not equal to 2
print(len('mango') == len('avocado'))  # False
print(len('mango') != len('avocado'))  # True
print(len('mango') < len('avocado'))   # True
print(len('milk') != len('meat'))      # False
print(len('milk') == len('meat'))      # True
print(len('tomato') == len('potato'))  # True
print(len('python') > len('dragon'))   # False

# Comparing something gives either a True or False
print('True == True: ', True == True)
print('True == False: ', True == False)
print('False == False:', False == False)

#is,is not and in,not in
print('1 is 1', 1 is 1)                   # True - because the data values are the same
print('1 is not 2', 1 is not 2)           # True - because 1 is not 2
print('A in Asabeneh', 'A' in 'Asabeneh') # True - A found in the string
print('B in Asabeneh', 'B' in 'Asabeneh') # False - there is no uppercase B
print('coding' in 'coding for all') # True - because coding for all has the word coding
print('a in an:', 'a' in 'an')      # True
print('4 is 2 ** 2:', 4 is 2 ** 2)   # True
```

## 逻辑运算符
![pic](/operators4.png "notice")
```python
print(3 > 2 and 4 > 3) # True - because both statements are true
print(3 > 2 and 4 < 3) # False - because the second statement is false
print(3 < 2 and 4 < 3) # False - because both statements are false
print('True and True: ', True and True)
print(3 > 2 or 4 > 3)  # True - because both statements are true
print(3 > 2 or 4 < 3)  # True - because one of the statements is true
print(3 < 2 or 4 < 3)  # False - because both statements are false
print('True or False:', True or False)
print(not 3 > 2)     # False - because 3 > 2 is true, then not True gives False
print(not True)      # False - Negation, the not operator turns true to false
print(not False)     # True
print(not not True)  # True
print(not not False) # False
```

## Strings
#### 字符串中的转义序列
- \n ：换行符
- \t ：水平制表符（Tab）
- \\ ：反斜杠
- \r ：回车
- \" ：双引号
- \' ：单引号
#### 字符串格式
- %运算符
  - %s - 字符串（或任何具有字符串表示形式的对象，如数字）
  - %d - Integers %d - 整数
  - %f - 浮点数
- str.format -此格式是在 Python 版本 3 中引入的
- f-Strings -另一种新的字符串格式是字符串插值，即 f-strings（Python 3.6+）
```python
# %运算符
first_name = 'he'
last_name = 'fang'
language = 'Python'
formated_string = 'I am %s %s. I teach %s' %(first_name, last_name, language)
print(formated_string)

# str.format
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

# f-Strings
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
####  字符串作为字符序列
```python
# unpacking sequence characters into variables
# 解包字符串
name = 'he'
x,y = name 
print(x) # h
print(y) # e
```
#### 字符串切片
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

#### String Methods
```python
# capitalize():将字符串的第一个字符转换为大写字母
challenge = 'thirty days of python'
print(challenge.capitalize()) # 'Thirty days of python'

# count(): 用于计算子字符串在目标字符串中出现的次数，count（substring， start=..， end=..）。start 是用于计数的起始索引，end 是要计数的最后一个索引
challenge = 'thirty days of python'
print(challenge.count('y')) # 3
print(challenge.count('y', 7, 14)) # 1
print(challenge.count('th')) # 2


# find():返回子字符串第一次出现的索引，如果未找到，则返回 -1
challenge = 'thirty days of python'
print(challenge.find('y'))  # 5
print(challenge.find('th')) # 0
print(challenge.find('b'))  # -1

# rfind():返回子字符串最后一次出现的索引，如果未找到，则返回 -1
challenge = 'thirty days of python'
print(challenge.rfind('y'))  # 16
print(challenge.rfind('th')) # 17
print(challenge.rfind('b'))  # -1

# index():返回子字符串在目标字符串中的首次出现位置,如果未找到，则 ValueError
challenge = 'thirty days of python'
sub_string = 'da'
print(challenge.index(sub_string))  # 7
print(challenge.index(sub_string, 9)) # ValueError: substring not found

# rindex():返回子字符串在目标字符串中的最后一次出现位置,如果未找到，则 ValueError
challenge = 'thirty days of python'
sub_string = 'da'
print(challenge.index(sub_string))  # 7
print(challenge.index(sub_string, 9)) # ValueError: substring not found

# isalnum():检查字母数字字符
challenge = 'ThirtyDaysPython'
print(challenge.isalnum()) # True
challenge = '30DaysPython'
print(challenge.isalnum()) # True
challenge = 'thirty days of python'
print(challenge.isalnum()) # False, space is not an alphanumeric character
challenge = 'thirty days of python 2019'
print(challenge.isalnum()) # False

# isalpha():检查所有字符串元素是否都是字母字符（a-z 和 A-Z）
challenge = 'thirty days of python'
print(challenge.isalpha()) # False, space is once again excluded
challenge = 'ThirtyDaysPython'
print(challenge.isalpha()) # True
num = '123'
print(num.isalpha())      # False

# isdigit():检查字符串中的所有字符是否都是数字（0-9 和其他一些 Unicode 数字字符）
challenge = 'Thirty'
print(challenge.isdigit()) # False
challenge = '30'
print(challenge.isdigit())   # True
challenge = '\u00B2'
print(challenge.isdigit())   # True

# islower():检查字符串中的所有字母字符是否都是小写的
challenge = 'thirty days of python'
print(challenge.islower()) # True
challenge = 'Thirty days of python'
print(challenge.islower()) # False

# isupper():检查字符串中的所有字母字符是否都是大写的
challenge = 'thirty days of python'
print(challenge.isupper()) #  False
challenge = 'THIRTY DAYS OF PYTHON'
print(challenge.isupper()) # True

#join():用于将序列中的元素连接成一个字符串
words = ["Hello", "world", "Python"]
sentence = " ".join(words)
print(sentence)  # 输出: Hello world Python

# strip():用于移除字符串开头和结尾的指定字符（默认为空格）
s = "  Hello, World!  "
trimmed_s = s.strip()
print(f"'{s}' -> '{trimmed_s}'")  # 输出: '  Hello, World!  ' -> 'Hello, World!'

# replace():用给定的字符串替换子字符串
challenge = 'thirty days of python'
print(challenge.replace('python', 'coding')) # 'thirty days of coding'

#split():用于将字符串拆分为子字符串列表，基于指定的分隔符
challenge = 'thirty days of python'
print(challenge.split()) # ['thirty', 'days', 'of', 'python']
challenge = 'thirty, days, of, python'
print(challenge.split(', ')) # ['thirty', 'days', 'of', 'python']
```


## List

#### Create a List
1. 使用列表内置函数
    ```python
    # syntax
    list1 = list()
    list2 = list() # this is an empty list, no item in the list
    print(len(list2)) # 0
    ```
2. 使用方括号:[]
    ```python
    # syntax
    list1 = []
    list2 = [] # this is an empty list, no item in the list
    print(len(list2)) # 0
    ```
#### Use len() to find the length of a list
```python
fruits = ['banana', 'orange', 'mango', 'lemon']                     # list of fruits
vegetables = ['Tomato', 'Potato', 'Cabbage','Onion', 'Carrot']      # list of vegetables
animal_products = ['milk', 'meat', 'butter', 'yoghurt']             # list of animal products
web_techs = ['HTML', 'CSS', 'JS', 'React','Redux', 'Node', 'MongDB'] # list of web technologies
countries = ['Finland', 'Estonia', 'Denmark', 'Sweden', 'Norway']

# Print the lists and its length
print('Fruits:', fruits)
print('Number of fruits:', len(fruits))
print('Vegetables:', vegetables)
print('Number of vegetables:', len(vegetables))
print('Animal products:',animal_products)
print('Number of animal products:', len(animal_products))
print('Web technologies:', web_techs)
print('Number of web technologies:', len(web_techs))
print('Countries:', countries)
print('Number of countries:', len(countries))

lst = ['Asabeneh', 250, True, {'country':'Finland', 'city':'Helsinki'}] # list containing different data types
print(lst) # ['Asabeneh', 250, True, {'country': 'Finland', 'city': 'Helsinki'}]
```
#### Unpacking List Items 解包List
```python
lst = ['item1','item2','item3', 'item4', 'item5']
first_item, second_item, third_item, *rest = lst
print(first_item)     # item1
print(second_item)    # item2
print(third_item)     # item3
print(rest)           # ['item4', 'item5']


# First Example
fruits = ['banana', 'orange', 'mango', 'lemon','lime','apple']
first_fruit, second_fruit, third_fruit, *rest = fruits 
print(first_fruit)     # banana
print(second_fruit)    # orange
print(third_fruit)     # mango
print(rest)           # ['lemon','lime','apple']
# Second Example about unpacking list
first, second, third,*rest, tenth = [1,2,3,4,5,6,7,8,9,10]
print(first)          # 1
print(second)         # 2
print(third)          # 3
print(rest)           # [4,5,6,7,8,9]
print(tenth)          # 10
# Third Example about unpacking list
countries = ['Germany', 'France','Belgium','Sweden','Denmark','Finland','Norway','Iceland','Estonia']
gr, fr, bg, sw, *scandic, es = countries
print(gr)          # Germany
print(fr)          # France
print(bg)          # Belgium
print(sw)          # Sweden
print(scandic)     # ['Denmark', 'Finland', 'Norway', 'Iceland']
print(es)          # Estonia
```

#### Slicing Items from a List 从列表中切片
```python
# Positive Indexing 正索引
fruits = ['banana', 'orange', 'mango', 'lemon']
all_fruits = fruits[0:4] # it returns all the fruits
# this will also give the same result as the one above
all_fruits = fruits[0:] # if we don't set where to stop it takes all the rest
orange_and_mango = fruits[1:3] # it does not include the first index
orange_mango_lemon = fruits[1:] # ['orange', 'mango', 'lemon']
orange_and_lemon = fruits[::2] # here we used a 3rd argument, step. It will take every 2cnd item - ['banana', 'mango']
```
```python
# Negative Indexing 负索引
fruits = ['banana', 'orange', 'mango', 'lemon']
all_fruits = fruits[-4:] # it returns all the fruits
orange_and_mango = fruits[-3:-1] # it does not include the last index,['orange', 'mango']
orange_mango_lemon = fruits[-3:] # this will give starting from -3 to the end,['orange', 'mango', 'lemon']
reverse_fruits = fruits[::-1] # a negative step will take the list in reverse order,['lemon', 'mango', 'orange', 'banana']
```

#### Modifying Lists 修改列表
```python
fruits = ['banana', 'orange', 'mango', 'lemon']
fruits[0] = 'avocado'
print(fruits)       #  ['avocado', 'orange', 'mango', 'lemon']
fruits[1] = 'apple'
print(fruits)       #  ['avocado', 'apple', 'mango', 'lemon']
last_index = len(fruits) - 1
fruits[last_index] = 'lime'
print(fruits)        #  ['avocado', 'apple', 'mango', 'lime']
```

#### Checking Items in a List 检查列表中的项目
```python
fruits = ['banana', 'orange', 'mango', 'lemon']
does_exist = 'banana' in fruits
print(does_exist)  # True
does_exist = 'lime' in fruits
print(does_exist)  # False
```

#### Adding Items to a List 向列表添加项目
```python
# syntax
lst = list()
lst.append(item)
```
```python
fruits = ['banana', 'orange', 'mango', 'lemon']
fruits.append('apple')
print(fruits)           # ['banana', 'orange', 'mango', 'lemon', 'apple']
fruits.append('lime')   
print(fruits)           # ['banana', 'orange', 'mango', 'lemon', 'apple', 'lime']
```

#### Inserting Items into a List 将项目插入到列表中
```python
# syntax
lst = ['item1', 'item2']
lst.insert(index, item)
```
```python
fruits = ['banana', 'orange', 'mango', 'lemon']
fruits.insert(2, 'apple') # insert apple between orange and mango
print(fruits)             # ['banana', 'orange', 'apple', 'mango', 'lemon']
fruits.insert(3, 'lime')   
print(fruits)             # ['banana', 'orange', 'apple', 'lime', 'mango', 'lemon']
```

#### Removing Items from a List 从列表中删除项目
```python
# syntax
lst = ['item1', 'item2']
lst.remove(item)
```
```python
fruits = ['banana', 'orange', 'mango', 'lemon', 'banana']
fruits.remove('banana')
print(fruits)  # ['orange', 'mango', 'lemon', 'banana'] - this method removes the first occurrence of the item in the list
fruits.remove('lemon')
print(fruits)  # ['orange', 'mango', 'banana']
```
#### Removing Items Using Pop 使用 Pop 删除项目
```python
# syntax
pop()方法删除指定的索引（如果未指定索引，则删除最后一项）
lst = ['item1', 'item2']
lst.pop()       # last item
lst.pop(index)
```
```python
fruits = ['banana', 'orange', 'mango', 'lemon']
fruits.pop()
print(fruits)       # ['banana', 'orange', 'mango']
fruits.pop(0)
print(fruits)       # ['orange', 'mango']
```

#### Removing Items Using Del 使用 Del 删除项目
```python
# syntax
# del 关键字用于删除指定的索引，也可用于删除索引范围内的项目。它也可以完全删除列表
lst = ['item1', 'item2']
del lst[index] # only a single item
del lst        # to delete the list completely
```
```python
fruits = ['banana', 'orange', 'mango', 'lemon', 'kiwi', 'lime']
del fruits[0]
print(fruits)       # ['orange', 'mango', 'lemon', 'kiwi', 'lime']
del fruits[1]
print(fruits)       # ['orange', 'lemon', 'kiwi', 'lime']
del fruits[1:3]     # this deletes items between given indexes, so it does not delete the item with index 3!
print(fruits)       # ['orange', 'lime']
del fruits
print(fruits)       # This should give: NameError: name 'fruits' is not defined
```

#### Clearing List Items 清除列表项
```python
# syntax
# clear()方法清空列表
lst = ['item1', 'item2']
lst.clear()
```
```python
fruits = ['banana', 'orange', 'mango', 'lemon']
fruits.clear()
print(fruits)       # []
```
#### Copying a List 复制列表