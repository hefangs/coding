

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