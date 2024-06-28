# unittest

## 1. testcase add to suite
:::danger  :ghost:
```python
# test_case.py
import unittest
class TestString(unittest.TestCase):
  def test_1(self):
      print('test_1')
  def test_2(self):
      print('test_2')
```
```js
// test_suite1.py
import unittest
from test_case import TestString
suite = unittest.TestSuite()
suite.addTest(TestString('test_1')) // [!code focus]
suite.addTest(TestString('test_2')) // [!code focus]
runner = unittest.TextTestRunner()
runner.run(suite)
```
```js
// test_suite2.py
import unittest
from test_case import TestString
suite = unittest.TestSuite()
suite.addTest(unittest.makeSuite(TestString)) // [!code focus]
runner = unittest.TextTestRunner()
runner.run(suite)
```
```js
// test_suite3.py
import unittest
import test_case
suite = unittest.TestSuite()
loader = unittest.TestLoader()
suite.addTests(loader.loadTestsFromModule(test_case)) // [!code focus]
runner = unittest.TextTestRunner()
runner.run(suite)
```
```js
// test_suite4.py
import unittest
from test_case import TestString
suite = unittest.TestSuite()
suite = unittest.defaultTestLoader.loadTestsFromTestCase(TestString)  // [!code focus]
runner.run(suite)
```

:::