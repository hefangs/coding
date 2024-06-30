# unittest

## testcase add to suite

```python
# test_case.py
import unittest
class TestString(unittest.TestCase):
  def test_1(self):
      print('test_1')
  def test_2(self):
      print('test_2')
```
```py
# test_suite1.py
import unittest
from test_case import TestString
suite = unittest.TestSuite()
suite.addTest(TestString('test_1')) # [!code focus]
suite.addTest(TestString('test_2')) # [!code focus]
runner = unittest.TextTestRunner()
runner.run(suite)
```
```py
# test_suite2.py
import unittest
from test_case import TestString
suite = unittest.TestSuite()
suite.addTest(unittest.makeSuite(TestString)) # [!code focus]
runner = unittest.TextTestRunner()
runner.run(suite)
```
```py
# test_suite3.py
import unittest
import test_case
suite = unittest.TestSuite()
loader = unittest.TestLoader()
suite.addTests(loader.loadTestsFromModule(test_case)) # [!code focus]
runner = unittest.TextTestRunner()
runner.run(suite)
```
```py
# test_suite4.py
import unittest
from test_case import TestString
suite = unittest.defaultTestLoader.loadTestsFromTestCase(TestString)  # [!code focus]
runner.run(suite)
```


## 命令行参数

:::tip 命令行选项
- `-h` 或 `--help`显示帮助信息并退出。
- `-v` 或 `--verbose`增加输出的详细程度。
- `-q` 或 `--quiet`减少输出的详细程度。
- `-f` 或 `--failfast`在第一次失败后停止测试运行。
- `-c` 或 `--catch`捕获 KeyboardInterrupt 并显示故障信息。
- `-b `或 `--buffer`将 stdout 和 stderr 缓存，只有测试失败时才显示。
- `-k`只运行匹配表达式的测试。
- `-s `或 `--start-directory`指定要开始发现测试的目录（默认是当前目录）。
- `-p`或 `--pattern`指定文件名模式（默认是 test*.py）。
- `-t` 或 `--top-level-directory`指定顶层目录，以便于测试发现。
:::

## 跳过测试和预期失败
```py
import unittest
class MyTestCase(unittest.TestCase):
  # @unittest.skip 装饰器来跳过整个测试方法
  @unittest.skip("skip")   # [!code focus]
  def test_1(self):
    self.assertEqual(1, 1)
  # @unittest.skipIf 是当条件为真时跳过测试
  @unittest.skipIf(1 == 1, "skipIf") # [!code focus]
  def test_2(self):
    self.assertEqual(1, 1)
  # @unittest.skipUnless 是当条件为假时跳过测试
  @unittest.skipUnless(1 > 1, "skipUnless") # [!code focus]
  def test_3(self):
    self.assertEqual(2, 2)
  # @unittest.expectedFailure 装饰器标记预期失败的测试。如果测试失败，不会计入失败计数
  @unittest.expectedFailure # [!code focus]
  def test_4(self):
    self.assertEqual(1, 2)
```

## 断言
| 方法                      |         检查         |
| ------------------------- | :------------------: |
| assertEqual(a, b)         |         a=b          |
| assertNotEqual(a, b)      |        a != b        |
| assertTrue(x)             |   bool(x) is True    |
| assertFalse(x)            |   bool(x) is False   |
| assertIs(a, b)            |        a is b        |
| assertIsNot(a, b)         |      a is not b      |
| assertIsNone(x)           |      x is None       |
| assertIsNotNone(x)        |    x is not None     |
| assertIn(a, b)            |        a in b        |
| assertNotIn(a, b)         |      a not in b      |
| assertIsInstance(a, b)    |   isinstance(a, b)   |
| assertNotIsInstance(a, b) | not isinstance(a, b) |

## 日志配置
```py
# 配置日志记录
logging.basicConfig(
  level=logging.DEBUG,                             # 日志级别
  format='%(asctime)s %(levelname)s %(message)s',  # 日志格式
  datefmt='%Y-%m-%d %H:%M:%S',                     # 日期格式
  filename='test_log.log',                         # 日志文件名
  filemode='w'                                     # 文件写入模式
)     
```


## 输出报告
```py
import unittest
from test_case import TestStringMethods
from HtmlTestRunner import HTMLTestRunner  # type: ignore
suite = unittest.defaultTestLoader.loadTestsFromTestCase(TestStringMethods)

# runner = unittest.TextTestRunner()
# # 运行测试并生成文本报告
# with open('test_report.txt', 'w') as f:
#     runner = unittest.TextTestRunner(stream=f, verbosity=2)
#     runner.run(suite)

# 运行测试并生成 HTML 报告
runner = HtmlTestRunner.HTMLTestRunner(
  output='test_reports',          # 报告输出目录
  report_name='TestReport',       # 报告文件名
  combine_reports=True,           # 合并报告
  descriptions=True,              # 是否包含测试用例描述
  verbosity=2                     # 测试输出详细程度
)
runner.run(suite)

```

## 缓存 session 数据
- 文件系统来缓存 session 数据
- SQLite 来缓存 session 数据

#### 公共部分


```py
# test_user.py
import unittest
from session_manager import load_cached_session, login, save_session_to_cache

class TestUser(unittest.TestCase):
	@classmethod
	def setUpClass(cls):
		cls.session = load_cached_session()
		if cls.session is None:
			cls.session = login()
			save_session_to_cache(cls.session)
	
	def test_user_account(self):
		url = 'http://localhost:3000/user/account'
		response = self.session.get(url)
	
	def test_user_status(self):
		url = 'http://localhost:3000/login/status'
		response = self.session.get(url)
	
	def test_user_level(self):
		url = 'http://localhost:3000/user/level'
		response = self.session.get(url)

if __name__ == '__main__':
	unittest.main()

```

```py
# test_playlist.py
import unittest

from session_manager import load_cached_session, login, save_session_to_cache

class TestPlaylist(unittest.TestCase):
	@classmethod
	def setUpClass(cls):
		cls.session = load_cached_session()
		if cls.session is None:
			cls.session = login()
			save_session_to_cache(cls.session)
	
	def test_playlist_catlist(self):
		url = 'http://localhost:3000/playlist/catlist'
		response = self.session.post(url)
	
	def test_playlist_hot(self):
		url = 'http://localhost:3000/playlist/hot'
		response = self.session.post(url)

if __name__ == '__main__':
	unittest.main()

```

```py
# suite.py
import os
import unittest
import HtmlTestRunner
from test_playlist import TestPlaylist
from test_user import TestUser

# 获取当前文件所在目录的绝对路径
current_dir = os.path.dirname(__file__)

# 创建测试套件
suite = unittest.TestSuite()
suite.addTests(unittest.defaultTestLoader.loadTestsFromTestCase(TestUser))
suite.addTests(unittest.defaultTestLoader.loadTestsFromTestCase(TestPlaylist))

if __name__ == '__main__':
	runner = HtmlTestRunner.HTMLTestRunner(
		output=os.path.abspath(os.path.join(current_dir, '..', 'report')),
		# report_name='TestReport',
		report_name='CombinedTestReport',  
		descriptions=True,
		combine_reports=True,  # 合并报告
		verbosity=2
	)
	runner.run(suite)

```

#### 文件系统来缓存 session 数据

```py
# session_manager.py
import json
import os
import unittest
import requests

CACHE_FILE = '../session_cache.json'

def login():
	session = requests.Session()
	url = 'http://localhost:3000/login/cellphone'
	params = {
		'phone': '15000840699',
		'password': '**********'
	}
	response = session.get(url, params=params)
	
	if response.status_code == 200:
		return session
	else:
		raise Exception("Login failed")

def load_cached_session():
	if os.path.exists(CACHE_FILE):
		with open(CACHE_FILE, 'r') as f:
			session_data = json.load(f)
			session = requests.Session()
			session.cookies.update(session_data)
			return session
	return None

def save_session_to_cache(session):
	with open(CACHE_FILE, 'w') as f:
		json.dump(session.cookies.get_dict(), f)

if __name__ == '__main__':
	unittest.main()
```


#### 使用 SQLite 来缓存 session 数据

```py
# session_manager.py
import json
import os
import sqlite3
import unittest
import requests

CACHE_DB = '../session_cache.db'


def login():
	session = requests.Session()
	url = 'http://localhost:3000/login/cellphone'
	params = {
		'phone': '15000840699',
		'password': 'hf15000840699'
	}
	response = session.get(url, params=params)

	if response.status_code == 200:
		return session
	else:
		raise Exception("Login failed")

def load_cached_session():
	if os.path.exists(CACHE_DB):
		conn = sqlite3.connect(CACHE_DB)
		cursor = conn.cursor()
		cursor.execute("SELECT cookies FROM session_cache WHERE id = 1")
		result = cursor.fetchone()
		conn.close()
		
		if result:
			session_data = json.loads(result[0])
			session = requests.Session()
			session.cookies.update(session_data)
			return session
	return None

def save_session_to_cache(session):
	conn = sqlite3.connect(CACHE_DB)
	cursor = conn.cursor()
	cursor.execute('''CREATE TABLE IF NOT EXISTS session_cache
                      (id INTEGER PRIMARY KEY, cookies TEXT)''')
	cookies = json.dumps(session.cookies.get_dict())
	cursor.execute("REPLACE INTO session_cache (id, cookies) VALUES (1, ?)", (cookies,))
	conn.commit()
	conn.close()

if __name__ == '__main__':
	unittest.main()
```