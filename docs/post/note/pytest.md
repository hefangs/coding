# pytest

## requirements.txt
```txt
# requirements.txt
# pip3 install -r requirements.txt
allure-pytest
pytest-html
pytest-rerunfailures
pytest-xdist
pytest-ordering
pytest
PyYAML
requests
jsonpath-ng
```


## pytest.ini
```ini
# pytest.ini
[pytest]
addopts = -vs --alluredir ./temp --clean-alluredir
# 然后手动执行
# allure generate ./temp -o ./allure-report --clean
# 或者：这会在 /var/folder 临时目录下新建的，每次执行serve都会新建的
# allure serve ./report
testpaths = testApi
python_files = test_*.py
python_classes = Test*
python_functions = test
markers =
    smoke: test environment
    uat:uat environment
# log日志配置
log_cli = true
log_cli_level = info
addopts = -s
log_cli_format = %(asctime)s [%(levelname)s] %(message)s (%(filename)s:%(lineno)s)
log_cli_date_format = %Y-%m-%d %H:%M:%S
log_file = ./logs/test.log
log_file_level = info
log_file_format = %(asctime)s [%(levelname)s] %(message)s (%(filename)s:%(lineno)s)
log_file_date_format = %Y-%m-%d %H:%M:%S

# log_file = ./logs/test.log 重新在conftest.py 里面定义
def pytest_configure(config):
	# 配置 pytest设置日志文件名
	current_time = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
	log_file = f"./logs/{current_time}.log"
	config.option.log_file = log_file

```
## 命令行参数
- `-v`, `--verbose`：增加测试运行的冗长程度，显示每个测试函数的名称和结果
- `-q`, `--quiet`：减少测试运行的冗长程度
- `-k` `EXPRESSION`：仅运行与表达式匹配的测试。表达式可以是测试函数名称的一部分
- `--disable-warnings`：禁止显示警告信息
- `-x`, `--exitfirst`：遇到第一个错误或失败就停止测试
- `--maxfail=num`：当失败的测试达到指定数量时停止运行
- `-s`, `--capture=no`：不捕获测试中的输出（例如print语句的输出）
- `--ignore=path`：忽略指定路径下的测试文件
- `--durations=N`：显示N个最慢的测试用例和它们的执行时间
- `--html=report.html`：生成一个HTML格式的测试报告（需要安装`pytest-html`插件）
- `-n NUM`：并行运行测试，需要安装pytest-xdist插件
- `pytest -m slow` 将运行所有用装饰器修饰的测试@pytest.mark.slow
- `pytest --cache-show`查看缓存的内容 
- `pytest --cache-show example/*`采用可选参数来指定用于过滤的 glob 模式
- `pytest --cache-clear`清除所有缓存文件和值



## setup and teardown
```py
# Module-level
# 在整个模块开始前执行一次
def setup_module():
  print("setup_module")
# 在整个模块的所有测试执行完后执行一次
def teardown_module():
  print("teardown_module")

def test_example1():
  print("Executing test_example1")

def test_example2():
  print("Executing test_example2")
```

```py
# Class-level
class TestExample:
  @classmethod
  def setup_class(cls):
    """在类的所有测试开始前执行一次"""
    print("Class setup")

  @classmethod
  def teardown_class(cls):
    """在类的所有测试执行完后执行一次"""
    print("Class teardown")

  def test_method1(self):
    print("Executing test_method1")

  def test_method2(self):
    print("Executing test_method2")
```

```py{2}
# Method-level
# setup_method和teardown_method：针对类中的每个测试方法
class TestExampleMethod:
  def setup_method(self, method):
    """在每个测试方法执行前执行"""
    print("Method setup for", method.__name__)

  def teardown_method(self, method):
    """在每个测试方法执行后执行"""
    print("Method teardown for", method.__name__)

  def test_example1(self):
    print("Executing test_example1")

  def test_example2(self):
    print("Executing test_example2")
```

```py{2}
# Function-level
# setup_function和teardown_function：针对模块级别的独立的测试函数（类里的方法不生效）
def setup_function():
  # 每个测试函数执行前调用
  print("setup_function called")

def teardown_function():
  # 每个测试函数执行后调用
  print("teardown_function called")

def test_one():
  print("Test 1 executing")

def test_two():
  print("Test 2 executing")
```

## fixture
#### `scope`:(function(default),class,module,session,package)
```py
# Function Scope 
import pytest

@pytest.fixture(scope='function')
def function_scope_fixture():
  print("\nSetup for function scope fixture")
  yield
  print("\nTeardown for function scope fixture")

def test_function_scope_1(function_scope_fixture):
  print("Running test 1 with function scope fixture")

def test_function_scope_2(function_scope_fixture):
  print("Running test 2 with function scope fixture")

```

```py
# Class Scope
import pytest

@pytest.fixture(scope='class')
def class_scope_fixture():
  print("\nSetup for class scope fixture")
  yield
  print("\nTeardown for class scope fixture")

class TestClassScope:
  def test_class_scope_1(self, class_scope_fixture):
    print("Running test 1 with class scope fixture")

  def test_class_scope_2(self, class_scope_fixture):
    print("Running test 2 with class scope fixture")

```
```py
# Module Scope
import pytest

@pytest.fixture(scope='module')
def module_scope_fixture():
  print("\nSetup for module scope fixture")
  yield
  print("\nTeardown for module scope fixture")

def test_module_scope_1(module_scope_fixture):
  print("Running test 1 with module scope fixture")

def test_module_scope_2(module_scope_fixture):
  print("Running test 2 with module scope fixture")
  print("Running test 2 with class scope fixture")

```

```py
# Session Scope
import pytest

@pytest.fixture(scope='session')
def session_scope_fixture():
    print("\nSetup for session scope fixture")
    yield
    print("\nTeardown for session scope fixture")

def test_session_scope_1(session_scope_fixture):
    print("Running test 1 with session scope fixture")

def test_session_scope_2(session_scope_fixture):
    print("Running test 2 with session scope fixture")

```

#### `params`: 用于参数化 fixture，使得每个测试函数可以使用不同的参数集
```py{9}
import pytest

@pytest.fixture(params=[1, 2, 3])
def param_fixture(request):
  return request.param

def test_param_fixture(param_fixture):
  print(f"Running test with param {param_fixture}")
  # 在这个示例中，test_param_fixture 将运行三次，分别使用参数 1, 2, 3
```
#### `autouse`: 用于自动使用 fixture 而不需要在测试函数中显式地传递
```py
import pytest

@pytest.fixture(autouse=True)
def autouse_fixture():
  print("\nSetup for autouse fixture")
  yield
  print("\nTeardown for autouse fixture")

def test_autouse_1():
  print("Running test 1 with autouse fixture")

def test_autouse_2():
  print("Running test 2 with autouse fixture")

```
#### `ids`: 用于为参数化的 fixture 提供自定义的 ID，便于在测试报告中识别
```py
import pytest

@pytest.fixture(params=[1, 2, 3], ids=["one", "two", "three"])
def id_fixture(request):
  return request.param

def test_id_fixture(id_fixture):
  print(f"Running test with param {id_fixture}")
  # 测试报告中将显示自定义的 ID one, two, 和 three，而不是原始参数值 1, 2, 和 3
  ```

#### `name`:用于重命名 fixture

```py
import pytest

@pytest.fixture(name='custom_name_fixture')
def original_name_fixture():
  return "fixture value"

def test_custom_name(custom_name_fixture):
  assert custom_name_fixture == "fixture value"

```

## parametrize
@pytest.mark.parametrize 装饰器允许你为测试函数提供多个参数集。它接收两个主要参数
- 参数名的字符串，多个参数名用逗号分隔
- 参数值的列表或列表的列表，每个列表元素是一个参数集
```py
import pytest

@pytest.mark.parametrize("input, expected", [(1, 2),(2, 3),(3, 4),])
def test(input, expected):
  assert input + 1 == expected
# 在这个示例中,test函数将运行三次，分别使用参数 (1, 2),(2, 3),(3, 4)
```
#### 参数组合
```py
# 参数组合
import pytest

@pytest.mark.parametrize("x", [1, 2])
@pytest.mark.parametrize("y", [10, 20])
def test(x, y):
  print(f"Running test with x={x} and y={y}")
# test 函数将运行四次，分别使用 (1, 10),(1, 20),(2, 10),(2, 20)
```
#### 自定义参数 ID
```py
# 自定义参数 ID
import pytest

@pytest.mark.parametrize("input, expected", [
  (1, 2),
  (2, 3),
  (3, 4),
], ids=["one_plus_one", "two_plus_one", "three_plus_one"])
def test_increment_with_ids(input, expected):
  assert input + 1 == expected
#在这个示例中，测试报告中将显示自定义的ID one_plus_one,two_plus_one,three_plus_one
```
#### 使用生成器参数化
```py
# 使用生成器参数化
import pytest

def generate_params():
  for i in range(5):
    yield (i, i + 1)

@pytest.mark.parametrize("input, expected", generate_params())
def test_with_generator(input, expected):
  assert input + 1 == expected
# test_with_generator 函数将运行五次，分别使用生成器生成的参数集
```
#### 参数化与fixture结合
```py
# 参数化与fixture结合
import pytest

@pytest.fixture
def base_value():
  return 10

@pytest.mark.parametrize("multiplier", [1, 2, 3])
def test_with_fixture_and_param(base_value, multiplier):
  result = base_value * multiplier
  assert result in [10, 20, 30]
# 在这个示例中，test_with_fixture_and_param 函数将运行三次
# 分别使用 multiplier 的值 1,2,3，并且每次都使用 base_value fixture 的返回值 10

```