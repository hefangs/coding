# Python
## 1. 数据类型
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
   - `('he', 'Pawel', 'Brook', 'Abraham', 'Lidiya')`
   - `('Earth', 'Jupiter', 'Neptune', 'Mars', 'Venus', 'Saturn', 'Uranus', 'Mercury')`
7. **Set**:集合是类似于列表和元组的数据类型的集合,仅存储唯一项
   - `{2, 4, 3, 5}`
   - `{3.14, 9.81, 2.7}`
:::


#### 检查数据类型
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


#### 强制转换

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



## 2. 运算符

#### 赋值运算符
![pic](/operators1.png "notice")

#### 算术运算符
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

#### 比较运算符
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
print('A in he', 'A' in 'he') # True - A found in the string
print('B in he', 'B' in 'he') # False - there is no uppercase B
print('coding' in 'coding for all') # True - because coding for all has the word coding
print('a in an:', 'a' in 'an')      # True
print('4 is 2 ** 2:', 4 is 2 ** 2)   # True
```

#### 逻辑运算符
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

## 3. Strings

:::tip 字符串中的转义序列
- \n ：换行符
- \t ：水平制表符（Tab）
- \\ ：反斜杠
- \r ：回车
- \" ：双引号
- \' ：单引号
:::


:::tip 字符串格式
- %运算符
  - %s - 字符串（或任何具有字符串表示形式的对象，如数字）
  - %d - Integers %d - 整数
  - %f - 浮点数
- str.format -此格式是在 Python 版本 3 中引入的
- f-Strings -另一种新的字符串格式是字符串插值，即 f-strings（Python 3.6+）
:::

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
challenge = 'thirty days of python 30'
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


## 4. List

#### Create a List
```python
# 使用列表内置函数
list1 = list()
list2 = list() # this is an empty list, no item in the list
print(len(list2)) # 0
```
```python
# 使用方括号:[]
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

lst = ['he', 20, True, {'country':'Finland', 'city':'Helsinki'}] # list containing different data types
print(lst) # ['he', 20, True, {'country': 'Finland', 'city': 'Helsinki'}]
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
```python
# syntax
lst = ['item1', 'item2']
lst_copy = lst.copy()
```
```python
fruits = ['banana', 'orange', 'mango', 'lemon']
fruits_copy = fruits.copy()
print(fruits_copy)       # ['banana', 'orange', 'mango', 'lemon']
```

#### Joining Lists 加入列表
1. Plus Operator (+) 加号运算符 （+）
    ```python
    # syntax
    list3 = list1 + list2
    ```
    ```python
    positive_numbers = [1, 2, 3, 4, 5]
    zero = [0]
    negative_numbers = [-5,-4,-3,-2,-1]
    integers = negative_numbers + zero + positive_numbers
    print(integers) # [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
    fruits = ['banana', 'orange', 'mango', 'lemon']
    vegetables = ['Tomato', 'Potato', 'Cabbage', 'Onion', 'Carrot']
    fruits_and_vegetables = fruits + vegetables
    print(fruits_and_vegetables ) # ['banana', 'orange', 'mango', 'lemon', 'Tomato', 'Potato', 'Cabbage', 'Onion', 'Carrot']
    ```
2. 使用 extend() 方法 
    ```python
    # syntax
    list1 = ['item1', 'item2']
    list2 = ['item3', 'item4', 'item5']
    list1.extend(list2)
    ```
    ```python
    num1 = [0, 1, 2, 3]
    num2= [4, 5, 6]
    num1.extend(num2)
    print('Numbers:', num1) # Numbers: [0, 1, 2, 3, 4, 5, 6]
    negative_numbers = [-5, -4, -3, -2, -1]
    positive_numbers = [1, 2, 3, 4, 5]
    zero = [0]

    negative_numbers.extend(zero)
    negative_numbers.extend(positive_numbers)
    print('Integers:', negative_numbers) # Integers: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
    fruits = ['banana', 'orange', 'mango', 'lemon']
    vegetables = ['Tomato', 'Potato', 'Cabbage', 'Onion', 'Carrot']
    fruits.extend(vegetables)
    print('Fruits and vegetables:', fruits ) # Fruits and vegetables: ['banana', 'orange', 'mango', 'lemon', 'Tomato', 'Potato', 'Cabbage', 'Onion', 'Carrot']
    ```

#### Counting Items in a List 对列表中的项目进行计数
```python
# count()方法返回项目在列表中出现的次数
lst = ['item1', 'item2']
lst.count(item)
```
```python
fruits = ['banana', 'orange', 'mango', 'lemon']
print(fruits.count('orange'))   # 1
ages = [22, 19, 24, 25, 26, 24, 25, 24]
print(ages.count(24))           # 3
```

#### Finding Index of an Item 查找项的索引
```python
# index()方法返回列表中项目的索引
lst = ['item1', 'item2']
lst.index(item)
```
```python
fruits = ['banana', 'orange', 'mango', 'lemon']
print(fruits.index('orange'))   # 1
ages = [22, 19, 24, 25, 26, 24, 25, 24]
print(ages.index(24))           # 2, the first occurrence
```

#### Reversing a List 反转列表
```python
# reverse()方法颠倒列表的顺序
lst = ['item1', 'item2']
lst.reverse()
```
```python
fruits = ['banana', 'orange', 'mango', 'lemon']
fruits.reverse()
print(fruits) # ['lemon', 'mango', 'orange', 'banana']
ages = [22, 19, 24, 25, 26, 24, 25, 24]
ages.reverse()
print(ages) # [24, 25, 24, 26, 25, 24, 19, 22]
```


#### Sorting List Items 对列表项进行排序
```python
# sort()此方法修改原始列表
lst = ['item1', 'item2']
lst.sort()                # ascending
lst.sort(reverse=True)    # descending

fruits = ['banana', 'orange', 'mango', 'lemon']
fruits.sort()
print(fruits)             # sorted in alphabetical order, ['banana', 'lemon', 'mango', 'orange']
fruits.sort(reverse=True)
print(fruits) # ['orange', 'mango', 'lemon', 'banana']
ages = [22, 19, 24, 25, 26, 24, 25, 24]
ages.sort()
print(ages) #  [19, 22, 24, 24, 24, 25, 25, 26]

ages.sort(reverse=True)
print(ages) #  [26, 25, 25, 24, 24, 24, 22, 19]
```

```python
# sorted()返回有序列表而不修改原始列表 
fruits = ['banana', 'orange', 'mango', 'lemon']
print(sorted(fruits))   # ['banana', 'lemon', 'mango', 'orange']
# Reverse order
fruits = ['banana', 'orange', 'mango', 'lemon']
fruits = sorted(fruits,reverse=True)
print(fruits)     # ['orange', 'mango', 'lemon', 'banana']
```


## 5. Tuple

#### Creating a Tuple 创建元组
```python
# 创建空元组
empty_tuple = ()
# or using the tuple constructor
empty_tuple = tuple()

# 具有初始值的元组
tpl = ('item1', 'item2','item3')
fruits = ('banana', 'orange', 'mango', 'lemon')
```

#### Tuple length 元组长度
```python
#  len()方法来获取元组的长度
tpl = ('item1', 'item2', 'item3')
len(tpl)
```
#### Accessing Tuple Items 访问元组项
```python
# 正索引
tpl = ('item1', 'item2', 'item3')
first_item = tpl[0]
second_item = tpl[1]

fruits = ('banana', 'orange', 'mango', 'lemon')
first_fruit = fruits[0]
second_fruit = fruits[1]
last_index =len(fruits) - 1
last_fruit = fruits[las_index]
```

```python
# 负索引
tpl = ('item1', 'item2', 'item3','item4')
first_item = tpl[-4]
second_item = tpl[-3]

fruits = ('banana', 'orange', 'mango', 'lemon')
first_fruit = fruits[-4]
second_fruit = fruits[-3]
last_fruit = fruits[-1]
```

#### Slicing tuples 切片元组

```python
# 正指数范围
tpl = ('item1', 'item2', 'item3','item4')
all_items = tpl[0:4]         # all items
all_items = tpl[0:]         # all items
middle_two_items = tpl[1:3]  # does not include item at index 3
```

```python
# 负指数范围
tpl = ('item1', 'item2', 'item3','item4')
all_items = tpl[-4:]         # all items
middle_two_items = tpl[-3:-1]  # does not include item at index 3 (-1)

fruits = ('banana', 'orange', 'mango', 'lemon')
all_fruits = fruits[-4:]    # all items
orange_mango = fruits[-3:-1]  # doesn't include item at index 3
orange_to_the_rest = fruits[-3:]
```

#### Changing Tuples to Lists 将元组更改为列表
```python
# 将元组更改为列表，将列表更改为元组
# 元组是不可变的，如果我们想修改元组，我们应该将其更改为列表
tpl = ('item1', 'item2', 'item3','item4')
lst = list(tpl)

fruits = ('banana', 'orange', 'mango', 'lemon')
fruits = list(fruits)
fruits[0] = 'apple'
print(fruits)     # ['apple', 'orange', 'mango', 'lemon']
fruits = tuple(fruits)
print(fruits)     # ('apple', 'orange', 'mango', 'lemon')
```

#### Checking an Item in a Tuple 检查元组中的项
```python
# 使用 in 检查元组中是否存在一个项目，它返回一个布尔值
tpl = ('item1', 'item2', 'item3','item4')
'item2' in tpl # True

fruits = ('banana', 'orange', 'mango', 'lemon')
print('orange' in fruits) # True
print('apple' in fruits) # False
fruits[0] = 'apple' # TypeError: 'tuple' object does not support item assignment
```

#### Joining Tuples 联接元组

```python
# 使用 + 运算符连接两个或多个元组
tpl1 = ('item1', 'item2', 'item3')
tpl2 = ('item4', 'item5','item6')
tpl3 = tpl1 + tpl2

fruits = ('banana', 'orange', 'mango', 'lemon')
vegetables = ('Tomato', 'Potato', 'Cabbage','Onion', 'Carrot')
fruits_and_vegetables = fruits + vegetables
```

#### Deleting Tuples 删除元组

```python
# 无法删除元组中的单个项目，但可以使用 del 删除元组本身
tpl1 = ('item1', 'item2', 'item3')
del tpl1

fruits = ('banana', 'orange', 'mango', 'lemon')
del fruits
```


## 6. Set

#### Creating a Set 创建集合
```python
# 创建空集
st = set()
# 创建包含初始项的集合
st = {'item1', 'item2', 'item3', 'item4'}
```

#### Getting Set's Length 获取设置的长度
```python
# len() 方法来找到集合的长度
st = {'item1', 'item2', 'item3', 'item4'}
len(st)

fruits = {'banana', 'orange', 'mango', 'lemon'}
len(fruits)
```

#### Checking an Item 检查项目
```python
# 检查列表中是否存在一个项目，使用 in 运算符
st = {'item1', 'item2', 'item3', 'item4'}
print("Does set st contain item3? ", 'item3' in st) # Does set st contain item3? True

fruits = {'banana', 'orange', 'mango', 'lemon'}
print('mango' in fruits ) # True
```

#### Adding Items to a Set 将项目添加到集合
```python
# add() 添加一个项目
st = {'item1', 'item2', 'item3', 'item4'}
st.add('item5')

fruits = {'banana', 'orange', 'mango', 'lemon'}
fruits.add('lime')

# update() 添加多个项目  update采用列表参数
st = {'item1', 'item2', 'item3', 'item4'}
st.update(['item5','item6','item7'])

fruits = {'banana', 'orange', 'mango', 'lemon'}
vegetables = ('tomato', 'potato', 'cabbage','onion', 'carrot')
fruits.update(vegetables)
```

#### Removing Items from a Set 从集合中删除项目

```python
# remove() 方法从集合中删除一个项目,如果未找到该项目,将引发错误

st = {'item1', 'item2', 'item3', 'item4'}
st.remove('item2')
st.remove('item5')  # KeyError

# discard() 方法不会引发任何错误
st = {'item1', 'item2', 'item3', 'item4'}
st.discard('item2')
st.remove('item5')  

# pop() 方法从列表中删除一个随机项目，并返回已删除的项目
fruits = {'banana', 'orange', 'mango', 'lemon'}
fruits.pop()  # removes a random item from the set
```

#### Clearing Items in a Set 清除集合中的项目
```python
# clear() 方法清除或清空集合
st = {'item1', 'item2', 'item3', 'item4'}
st.clear()

fruits = {'banana', 'orange', 'mango', 'lemon'}
fruits.clear()
print(fruits) # set()
```

#### Deleting a Set 删除集合
```python
# del 删除集合本身
st = {'item1', 'item2', 'item3', 'item4'}
del st

fruits = {'banana', 'orange', 'mango', 'lemon'}
del fruits
```

#### Converting List to Set 将列表转换为集合
```python
# 可以将列表转换为设置，并将设置转换为列表
# 将列表转换为设置会删除重复项，并且只会保留唯一项
lst = ['item1', 'item2', 'item3', 'item4', 'item1']
st = set(lst)  # {'item2', 'item4', 'item1', 'item3'} - the order is random, because sets in general are unordered

fruits = ['banana', 'orange', 'mango', 'lemon','orange', 'banana']
fruits = set(fruits) # {'mango', 'lemon', 'banana', 'orange'}
```

#### Joining Sets 连接集合
```python
# union() 方法返回一个新集合
st1 = {'item1', 'item2', 'item3', 'item4'}
st2 = {'item5', 'item6', 'item7', 'item8'}
st3 = st1.union(st2)

fruits = {'banana', 'orange', 'mango', 'lemon'}
vegetables = {'tomato', 'potato', 'cabbage','onion', 'carrot'}
print(fruits.union(vegetables)) # {'lemon', 'carrot', 'tomato', 'banana', 'mango', 'orange', 'cabbage', 'potato', 'onion'}
```
```python
# update() 方法将集合插入到给定集合中
st1 = {'item1', 'item2', 'item3', 'item4'}
st2 = {'item5', 'item6', 'item7', 'item8'}
st1.update(st2) # st2 contents are added to st1

fruits = {'banana', 'orange', 'mango', 'lemon'}
vegetables = {'tomato', 'potato', 'cabbage','onion', 'carrot'}
fruits.update(vegetables)
print(fruits) # {'lemon', 'carrot', 'tomato', 'banana', 'mango', 'orange', 'cabbage', 'potato', 'onion'}
```

#### Finding Intersection Items 查找交集集合

```python
# Intersection() 方法返回一组items，这些 items 位于两个集合中
st1 = {'item1', 'item2', 'item3', 'item4'}
st2 = {'item3', 'item2'}
st1.intersection(st2) # {'item3', 'item2'}

whole_numbers = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
even_numbers = {0, 2, 4, 6, 8, 10}
whole_numbers.intersection(even_numbers) # {0, 2, 4, 6, 8, 10}

python = {'p', 'y', 't', 'h', 'o','n'}
dragon = {'d', 'r', 'a', 'g', 'o','n'}
python.intersection(dragon)     # {'o', 'n'}
```

#### Checking Subset and Super Set 检查子集和超级集

```python
# 集合可以是其他集合的子集或超集
# 子集:issubset()
# 超集:issuperset()
st1 = {'item1', 'item2', 'item3', 'item4'}
st2 = {'item2', 'item3'}
st2.issubset(st1) # True
st1.issuperset(st2) # True

whole_numbers = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
even_numbers = {0, 2, 4, 6, 8, 10}
whole_numbers.issubset(even_numbers) # False, because it is a super set
whole_numbers.issuperset(even_numbers) # True

python = {'p', 'y', 't', 'h', 'o','n'}
dragon = {'d', 'r', 'a', 'g', 'o','n'}
python.issubset(dragon)     # False
```

#### Checking the Difference Between Two Sets 检查两组集合之间的差异
```python
# 它返回两个集合之间的差值
st1 = {'item1', 'item2', 'item3', 'item4'}
st2 = {'item2', 'item3'}
st2.difference(st1) # set()
st1.difference(st2) # {'item1', 'item4'} => st1\st2

whole_numbers = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
even_numbers = {0, 2, 4, 6, 8, 10}
whole_numbers.difference(even_numbers) # {1, 3, 5, 7, 9}

python = {'p', 'y', 't', 'o','n'}
dragon = {'d', 'r', 'a', 'g', 'o','n'}
python.difference(dragon)     # {'p', 'y', 't'}  - the result is unordered (characteristic of sets)
dragon.difference(python)     # {'d', 'r', 'a', 'g'}
```

#### Finding Symmetric Difference Between Two Sets 求两个集合之间的对称差
```python
# 它返回两个集合之间的对称差,返回一个集合
# 该集合包含两个集合中的所有项目，但两个集合中存在的项目除外
st1 = {'item1', 'item2', 'item3', 'item4'}
st2 = {'item2', 'item3'}
# it means (A\B)∪(B\A)
st2.symmetric_difference(st1) # {'item1', 'item4'}

whole_numbers = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
some_numbers = {1, 2, 3, 4, 5}
whole_numbers.symmetric_difference(some_numbers) # {0, 6, 7, 8, 9, 10}

python = {'p', 'y', 't', 'h', 'o','n'}
dragon = {'d', 'r', 'a', 'g', 'o','n'}
python.symmetric_difference(dragon)  # {'r', 't', 'p', 'y', 'g', 'a', 'd', 'h'}
```

#### Joining Set 连接集合
```python
#  isdisjoint() 方法检查两组是并列的还是不相交的
st1 = {'item1', 'item2', 'item3', 'item4'}
st2 = {'item2', 'item3'}
st2.isdisjoint(st1) # False

even_numbers = {0, 2, 4 ,6, 8}
even_numbers = {1, 3, 5, 7, 9}
even_numbers.isdisjoint(odd_numbers) # True, because no common item

python = {'p', 'y', 't', 'h', 'o','n'}
dragon = {'d', 'r', 'a', 'g', 'o','n'}
python.isdisjoint(dragon)  # False, there are common items {'o', 'n'}
```


## 7. Dictionary
#### Creating a Dictionary 创建词典
```python
# {} 或 dict() 内置函数来创建空字典
empty_dict = {}      # 输出: {}
empty_dict2 = dict() # 输出: {}
# Dictionary with data values
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}

# 值可以是任何数据类型：字符串，布尔值，列表，元组，集合或字典
person = {
  'first_name':'he',
  'last_name':'fang',
  'age':20,
  'country':'Finland',
  'is_marred':Flase,
  'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],
  'address':{
    'street':'Space street',
    'zipcode':'02210'
  }
}
```

#### Dictionary Length 词典长度
```python
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
print(len(dct)) # 4

person = {
  'first_name':'he',
  'last_name':'fang',
  'age':20,
  'country':'Finland',
  'is_marred':Flase,
  'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],
  'address':{
    'street':'Space street',
    'zipcode':'02210'
  }
}
print(len(person)) # 7

```

#### Accessing Dictionary Items 访问字典项
```python
# 通过引用它的键名来访问字典项
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
print(dct['key1']) # value1
print(dct['key4']) # value4

person = {
  'first_name':'he',
  'last_name':'fang',
  'age':20,
  'country':'Finland',
  'is_marred':Flase,
  'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],
  'address':{
    'street':'Space street',
    'zipcode':'02210'
  }
}
print(person['first_name']) # he
print(person['country'])    # Finland
print(person['skills'])     # ['JavaScript', 'React', 'Node', 'MongoDB', 'Python']
print(person['skills'][0])  # JavaScript
print(person['address']['street']) # Space street
print(person['city'])       # Error

```

#### Adding Items to a Dictionary 将项目添加到字典
```python
# 我们可以向字典中添加新的键值对
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
dct['key5'] = 'value5'

person = {
  'first_name':'he',
  'last_name':'fang',
  'age':20,
  'country':'Finland',
  'is_marred':Flase,
  'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],
  'address':{
    'street':'Space street',
    'zipcode':'02210'
  }
}
person['job_title'] = 'Instructor'
person['skills'].append('HTML')
print(person)
```

#### Modifying Items in a Dictionary 修改字典中的项目
```python
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
dct['key1'] = 'value-one'

person = {
  'first_name':'he',
  'last_name':'fang',
  'age':20,
  'country':'Finland',
  'is_marred':Flase,
  'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],
  'address':{
    'street':'Space street',
    'zipcode':'02210'
  }
}
person['first_name'] = 'Eyob'
person['age'] = 252
```
#### Checking Keys in a Dictionary 检查字典中的键
```python
# 我们使用in操作符来检查字典中是否存在键
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
print('key2' in dct) # True
print('key5' in dct) # False

# 使用get方法 检查键是否存在
# 如果键不存在，get方法返回None，这是NoneType对象数据类型
person = {
  'first_name':'he',
  'last_name':'fang',
  'age':20,
  'country':'Finland',
  'is_marred':Flase,
  'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],
  'address':{
    'street':'Space street',
    'zipcode':'02210'
    }
  }
print(person.get('first_name')) # he
print(person.get('country'))    # Finland
print(person.get('skills')) #['HTML','CSS','JavaScript', 'React', 'Node', 'MongoDB', 'Python']
print(person.get('city'))   # None
```

#### Removing Key and Value Pairs from a Dictionary 从字典中删除键和值对
```python
# pop(key) 删除指定键值的项
# popitem(key) 删除最后一项
# del 删除指定键值的项

dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
dct.pop('key1') # removes key1 item
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
dct.popitem() # removes the last item
del dct['key2'] # removes key2 item

person = {
  'first_name':'he',
  'last_name':'fang',
  'age':20,
  'country':'Finland',
  'is_marred':False,
  'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],
  'address':{
    'street':'Space street',
    'zipcode':'02210'
  }
}
person.pop('first_name')        # Removes the firstname item
person.popitem()                # Removes the address item
del person['is_married']        # Removes the is_married item
```

#### Changing Dictionary to a List of Items 将字典更改为项目列表
```python
# items() 方法将字典更改为元组列表
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
dct1 = dct.items()
print(dct1) # dict_items([('key1', 'value1'), ('key2', 'value2'), ('key3', 'value3'), ('key4', 'value4')])
print(type(dct))  # <class 'dict'>
print(type(dct1)) # <class 'dict_items'>
```

#### Clearing a Dictionary 清除字典
```python
# clear()
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
print(dct.clear()) # None
```

#### Deleting a Dictionary 删除字典
```python
# del  完全删除字典
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
del dct
```

#### Copy a Dictionary 复制字典
```python
# copy()  复制字典
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
dct_copy = dct.copy() # {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
```

#### Getting Dictionary Keys as a List 以列表的形式获取字典键
```python
# keys() 以列表的形式为我们提供了字典的所有键
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
keys = dct.keys()
print(keys)     # dict_keys(['key1', 'key2', 'key3', 'key4'])
```
#### Getting Dictionary Values as a List 以列表的形式获取字典值
```python
# values() 方法将字典中的所有值作为列表提供给我们
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
values = dct.values()
print(values)     # dict_values(['value1', 'value2', 'value3', 'value4'])
```