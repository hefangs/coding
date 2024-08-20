
# 数据类型

## Number
:::info
- Integer：整数（负、零和正）示例:`-1`,`0`,`1`
- float：示例:`-3.15`,`-2.21`,`-1.01`,`0.0`,`1.1`,`2.3`
- Complex：示例:`1 + j`,`2 + 4j`
:::

## String
:::info 表示文本
- "Hello, World!"
:::

## Boolean
:::info
 - True
 - False
:::

## List
:::info 有序的可变序列
- `[0, 1, 2, 3, 4, 5]` 
- `['Banana', 'Orange', 'Mango', 'Avocado']`
- `['Banana', 10, False, 9.81]`
:::

## Tuple 
:::info 有序的不可变序列
- `('he', 'Pawel', 'Brook', 'Abraham', 'Lidiya')`
- `('Earth', 'Jupiter', 'Neptune', 'Mars', 'Venus', 'Saturn', 'Uranus', 'Mercury')`
:::

## Dictionary
:::info 无序的键值对集合
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
:::




## Set
:::info 无序的不重复元素集合
- `{2, 4, 3, 5}`
- `{3.14, 9.81, 2.7}`
:::



###### 检查数据类型
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


###### 强制转换

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

