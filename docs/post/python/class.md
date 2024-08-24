


# Class

:::info 类
- Python 是一种面向对象的编程语言
- Python 中的一切都是对象，具有其属性和方法
- 程序中使用的数字、字符串、列表、字典、元组、集合等是相应内置类的对象
- 我们创建类来创建对象。类就像对象构造函数，或创建对象的“蓝图”
- 我们实例化类来创建对象。类定义对象的属性和行为，而对象则代表类
:::
```py
Python 3.12.5 (main, Aug 23 2024, 18:35:32) [Clang 12.0.0 (clang-1200.0.32.29)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> num = 10
>>> type(num)
<class 'int'>
>>> string = 'string'
>>> type(string)
<class 'str'>
>>> boolean = True
>>> type(boolean)
<class 'bool'>
>>> lst = []
>>> type(lst)
<class 'list'>
>>> tpl = ()
>>> type(tpl)
<class 'tuple'>
>>> set1 = set()
>>> type(set1)
<class 'set'>
>>> dct = {}
>>> type(dct)
<class 'dict'>
```

## Creating a Class

```py
class Person:
  pass
print(Person)

<class '__main__.Person'>
```

:::info 调用类来创建一个对象
:::
```py
p = Person()
print(p)

<__main__.Person object at 0x10d365d30>
```

## Class Constructor

:::info
- 在上面的例子中，我们从 Person 类创建了一个对象
- 但是，没有构造函数的类在实际应用中并没有太大用处
- 让我们使用构造函数使我们的类更有用。与 Java 或 JavaScript 中的构造函数一样，Python 也有一个内置的init () 构造函数
- init构造函数具有 self 参数，它是对类的当前实例的引用示例
:::


```py
class Person:
	def __init__ (self, name):
		# self allows to attach parameter to the class
		self.name = name

p = Person('he')
print(p.name)
print(p)

# output
he
<__main__.Person object at 0x2abf46907e80>
```
:::info 向构造函数添加更多参数:tada: :100:
:::




```py
class Person:
	def __init__(self, firstname, lastname, age, country, city):
		self.firstname = firstname
		self.lastname = lastname
		self.age = age
		self.country = country
		self.city = city

p = Person('he', 'fang', 25, 'China', 'Shanghai')
print(p.firstname)
print(p.lastname)
print(p.age)
print(p.country)
print(p.city)

# output
he
fang
25
China
Shanghai
```

