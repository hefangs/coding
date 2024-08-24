


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



## Object Methods

```py
class Person:
	def __init__(self, firstname, lastname, age, country, city):
		self.firstname = firstname
		self.lastname = lastname
		self.age = age
		self.country = country
		self.city = city
	def person_info(self):
		return f'{self.firstname} {self.lastname} is {self.age} years old. He lives in {self.city}, {self.country}'

p = Person('he', 'fang', 25, 'China', 'Shanghai')
print(p.person_info())
```

## Object Default Methods

:::info
如果我们为构造函数中的参数提供默认值，则可以避免在调用或实例化不带参数的类时出现错误
:::
```py
class Person:
	def __init__(self, firstname='he', lastname='fang', age=25, country='China', city='Shanghai'):
		self.firstname = firstname
		self.lastname = lastname
		self.age = age
		self.country = country
		self.city = city

	def person_info(self):
		return f'{self.firstname} {self.lastname} is {self.age} years old. He lives in {self.city}, {self.country}.'

p1 = Person()
print(p1.person_info())
p2 = Person('John', 'Doe', 30, 'China', 'Beijing')
print(p2.person_info())
```

## Method to Modify Class Default Values
:::info
- 在Person 类，所有构造函数参数都有默认值。
- 除此之外，我们还有 skills 参数，我们可以使用方法访问它。让我们创建 add_skill 方法将技能添加到技能列表中
:::

```py
class Person:
	def __init__(self, firstname='he', lastname='fang', age=25, country='China', city='Shanghai'):
		self.firstname = firstname
		self.lastname = lastname
		self.age = age
		self.country = country
		self.city = city
		self.skills = []

	def person_info(self):
		return f'{self.firstname} {self.lastname} is {self.age} years old. He lives in {self.city}, {self.country}.'
	def add_skill(self, skill):
		self.skills.append(skill)

p1 = Person()
print(p1.person_info())
p1.add_skill('HTML')
p1.add_skill('CSS')
p1.add_skill('JavaScript')
p2 = Person('John', 'Doe', 30, 'China', 'Beijing')
print(p2.person_info())
print(p1.skills)
print(p2.skills)
```

## Inheritance

:::info
- 使用继承，我们可以重用父类代码
- 继承允许我们定义一个从父类继承所有方法和属性的类
- 父类或超类或基类是提供所有方法和属性的类
- 子类是从另一个或父类继承的类
- 让我们通过从 Person 类继承来创建一个 Student 类
:::
```py
class Student(Person):
	pass

s1 = Student('he', 'fang1', 25, 'China', 'Shanghai')
s2 = Student('he', 'fang2', 26, 'China', 'Beijing')
print(s1.person_info())
s1.add_skill('JavaScript')
s1.add_skill('React')
s1.add_skill('Python')
print(s1.skills)

print(s2.person_info())
s2.add_skill('Organizing')
s2.add_skill('Marketing')
s2.add_skill('Digital Marketing')
print(s2.skills)
```

## Overriding parent method
:::info 覆盖父类中的方法
- 重新在子类中（Student）定义了 person_info 方法，会覆盖父类中的 person_info 方法
:::
```py
class Student(Person):
	def __init__ (self, firstname='he', lastname='fang',age=25, country='China', city='Shanghai', gender='male'):
		self.gender = gender
		super().__init__(firstname, lastname,age, country, city)
	def person_info(self):
		gender = 'He' if self.gender =='male' else 'She'
		return f'{self.firstname} {self.lastname} is {self.age} years old. {gender} lives in {self.city}, {self.country}.'

s1 = Student('Eyob', 'Yetayeh', 30, 'Finland', 'Helsinki','male')
s2 = Student('Lidiya', 'Teklemariam', 28, 'Finland', 'Espoo', 'female')
print(s1.person_info())
s1.add_skill('JavaScript')
s1.add_skill('React')
s1.add_skill('Python')
print(s1.skills)

print(s2.person_info())
s2.add_skill('Organizing')
s2.add_skill('Marketing')
s2.add_skill('Digital Marketing')
print(s2.skills)
```