

# Dictionary
## 创建词典
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

## 词典长度
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

## 访问字典项
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

## 将项目添加到字典
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

## 修改字典中的项目
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
## 检查字典中的键
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

## 从字典中删除键和值对
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

## 将字典更改为项目列表
```python
# items() 方法将字典更改为元组列表
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
dct1 = dct.items()
print(dct1) # dict_items([('key1', 'value1'), ('key2', 'value2'), ('key3', 'value3'), ('key4', 'value4')])
print(type(dct))  # <class 'dict'>
print(type(dct1)) # <class 'dict_items'>
```

###### 清除字典
```python
# clear()
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
print(dct.clear()) # None
```

## 删除字典
```python
# del  完全删除字典
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
del dct
```

## 复制字典
```python
# copy()  复制字典
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
dct_copy = dct.copy() # {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
```

## 以列表的形式获取字典键
```python
# keys() 以列表的形式为我们提供了字典的所有键
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
keys = dct.keys()
print(keys)     # dict_keys(['key1', 'key2', 'key3', 'key4'])
```
## 以列表的形式获取字典值
```python
# values() 方法将字典中的所有值作为列表提供给我们
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
values = dct.values()
print(values)     # dict_values(['value1', 'value2', 'value3', 'value4'])
```