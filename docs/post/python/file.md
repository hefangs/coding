

# File


:::tip 文件处理
- `r` - 读取 - 默认值。打开文件进行读取，如果文件不存在则返回错误
- `a` – 附加 – 打开文件进行附加，如果文件不存在则创建该文件
- `w` – 写入——打开文件进行写入，如果文件不存在则创建该文件
- `x` – 创建——创建指定文件，如果文件存在则返回错误
- `t` - 文本-默认值。文本模式
- `b` – 二进制 – 二进制模式（例如图像）
:::




## 打开文件进行阅读


:::info read()
- 将整个文本读取为字符串
- 如果我们想限制要读取的字符数，我们可以通过将 int 值传递给read(number)方法来限制它
:::
```py
f = open('./files/demo.txt')
txt = f.read()
print(type(txt))
print(txt)
f.close()

# output
<class 'str'>
This is an example to show how to open a file and read.
This is the second line of the text.
```

```py
f = open('./files/demo.txt')
txt = f.read(10)
print(type(txt))
print(txt)
f.close()

# output
<class 'str'>
This is an
```

:::info readline()
- 只读取第一行
:::

```py
f = open('./files/demo.txt')
line = f.readline()
print(type(line))
print(line)
f.close()

# output
<class 'str'>
This is an example to show how to open a file and read.
```

:::info readlines()
- 逐行读取所有文本并返回行列表
:::

```py
f = open('./files/demo.txt')
lines = f.readlines()
print(type(lines))
print(lines)
f.close()

# output
<class 'list'>
['This is an example to show how to open a file and read.\n', 'This is the second line of the text.']
```

:::info splitlines()
- 将所有行作为列表获取
:::
```py
f = open('./files/demo.txt')
lines = f.read().splitlines()
print(type(lines))
print(lines)
f.close()

# output
<class 'list'>
['This is an example to show how to open a file and read.', 'This is the second line of the text.']
```

:::tip with
- 打开文件的新方法 - 它会自动关闭文件
:::
```py
with open('./files/demo.txt') as f:
    lines = f.read().splitlines()
    print(type(lines))
    print(lines)

# output
<class 'list'>
['This is an example to show how to open a file and read.', 'This is the second line of the text.']
```


## 打开文件进行写入和更新

:::info open()函数添加写入模式
- `a`- 附加——将附加到文件末尾，如果文件没有，则会创建一个新文件
- `w`- 写入——将覆盖任何现有内容，如果文件不存在则会创建
:::

```py
with open('./files/demo.txt','a') as f:
	f.write('This text has to be appended at the end')

with open('./files/demo.txt','w') as f:
	f.write('This text will be written in a newly created file')
```

## 删除文件

```py
import os
os.remove('./files/demo.txt')
```
```py
import os
if os.path.exists('./files/demo.txt'):
	os.remove('./files/demo.txt')
else:
	print('The file does not exist')
```


## 文件类型
:::tip
- txt
- json
- csv
- xlsx
- xml
:::

:::info 带 json 扩展名的文件
- JSON 代表 JavaScript 对象表示法
- 实际上，它是一个字符串化的 JavaScript 对象或 Python 字典
:::
```py
# dictionary
person_dct= {
	"name":"he",
	"country":"China",
	"city":"Shanghai",
	"skills":["JavaScrip", "React","Python"]
}
# JSON: A string form a dictionary
person_json = "{'name': 'he', 'country': 'China', 'city': 'Shanghai', 'skills': ['JavaScrip', 'React', 'Python']}"

# we use three quotes and make it multiple line to make it more readable
person_json = '''{
	"name":"he",
	"country":"China",
	"city":"Shanghai",
	"skills":["JavaScrip", "React","Python"]
}'''
```
:::info 将 JSON 转换为字典
- 要将 JSON 转换为字典，首先我们导入 json 模块，然后使用loads方法
:::
```py
import json
# JSON
person_json = '''{
	"name": "he",
	"country": "China",
	"city": "Shanghai",
	"skills": ["JavaScrip", "React", "Python"]
}'''
# let's change JSON to dictionary
person_dct = json.loads(person_json)
print(type(person_dct))
print(person_dct)
print(person_dct['name'])

# output
<class 'dict'>
{'name': 'he', 'country': 'China', 'city': 'Shanghai', 'skills': ['JavaScrip', 'React', 'Python']}
he
```

:::info 将字典转换为 JSON
- 要将字典更改为 JSON，我们使用 json 模块中的 dumps 方法
:::
```py
import json
# python dictionary
person = {
	"name": "he",
	"country": "China",
	"city": "Shanghai",
	"skills": ["JavaScrip", "React", "Python"]
}
# let's convert it to  json
person_json = json.dumps(person, indent=4) # indent could be 2, 4, 8. It beautifies the json
print(type(person_json))
print(person_json)

# output
# when you print it, it does not have the quote, but actually it is a string
# JSON does not have type, it is a string type.
<class 'str'>
{
	"name": "he",
	"country": "China",
	"city": "Shanghai",
	"skills": [
		"JavaScrip",
		"React",
		"Python"
	]
}
```

:::info 另存为 JSON 文件
- CSV 代表逗号分隔值
- CSV 是一种用于存储表格数据（例如电子表格或数据库）的简单文件格式
- CSV 是数据科学中非常常见的数据格式
```py
"name","country","city","skills"
"he","China","Shanghai","JavaScript"
```
:::
```py
import csv
with open('./files/demo.csv') as f:
	csv_reader = csv.reader(f, delimiter=',') # w use, reader method to read csv
	line_count = 0
	for row in csv_reader:
		if line_count == 0:
			print(f'Column names are :{", ".join(row)}')
			line_count += 1
		else:
			print(
				f'\t{row[0]} is a teachers. He lives in {row[1]}, {row[2]}.')
			line_count += 1
	print(f'Number of lines:  {line_count}')

# output:
Column names are :name, country, city, skills
	he is a teacher. He lives in China, Shanghai.
Number of lines:  2
```

:::info 扩展名为 xlsx 的文件
- 要读取 excel 文件，我们需要安装xlrd包
:::
```py
import xlrd
excel_book = xlrd.open_workbook('sample.xls)
print(excel_book.nsheets)
print(excel_book.sheet_names)
```

:::info 扩展名为 xml 的文件
- XML 是另一种结构化数据格式,类似于 HTML
- 在 XML 中，标签不是预定义的
- 第一行是 XML 声明
- person 标签是 XML 的根
- person 具有性别属性
:::
```xml
<?xml version="1.0"?>
<person gender="female">
  <name>Asabeneh</name>
  <country>Finland</country>
  <city>Helsinki</city>
  <skills>
    <skill>JavaScrip</skill>
    <skill>React</skill>
    <skill>Python</skill>
  </skills>
</person>
```
```py
import xml.etree.ElementTree as ET
tree = ET.parse('./files/demo.xml')
root = tree.getroot()
print('Root tag:', root.tag)
print('Attribute:', root.attrib)
for child in root:
	print('field: ', child.tag)

# output
Root tag: person
Attribute: {'gender': 'male'}
field: name
field: country
field: city
field: skills
```