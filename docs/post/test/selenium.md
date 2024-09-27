# Selenium

## 1
::: code-group
```py [原生]
from selenium import webdriver
from selenium.webdriver.common.by import By

def test_eight_components():
    driver = setup()

    title = driver.title
    assert title == "Web form"

    driver.implicitly_wait(0.5)

    text_box = driver.find_element(by=By.NAME, value="my-text")
    submit_button = driver.find_element(by=By.CSS_SELECTOR, value="button")

    text_box.send_keys("Selenium")
    submit_button.click()

    message = driver.find_element(by=By.ID, value="message")
    value = message.text
    assert value == "Received!"

    teardown(driver)

def setup():
    driver = webdriver.Chrome()
    driver.get("https://www.selenium.dev/selenium/web/web-form.html")
    return driver

def teardown(driver):
    driver.quit()

```

```py [unitest]
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By

class TestWebForm(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("https://www.selenium.dev/selenium/web/web-form.html")

    def tearDown(self):
        self.driver.quit()

    def test_eight_components(self):
        driver = self.driver

        title = driver.title
        self.assertEqual(title, "Web form")

        driver.implicitly_wait(0.5)

        text_box = driver.find_element(by=By.NAME, value="my-text")
        submit_button = driver.find_element(by=By.CSS_SELECTOR, value="button")

        text_box.send_keys("Selenium")
        submit_button.click()

        message = driver.find_element(by=By.ID, value="message")
        value = message.text
        self.assertEqual(value, "Received!")

if __name__ == "__main__":
    unittest.main()

```
```py [pytest]
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By

@pytest.fixture
def driver():
    driver = webdriver.Chrome()
    driver.get("https://www.selenium.dev/selenium/web/web-form.html")
    yield driver
    driver.quit()

def test_eight_components(driver):
    title = driver.title
    assert title == "Web form"

    driver.implicitly_wait(0.5)

    text_box = driver.find_element(by=By.NAME, value="my-text")
    submit_button = driver.find_element(by=By.CSS_SELECTOR, value="button")

    text_box.send_keys("Selenium")
    submit_button.click()

    message = driver.find_element(by=By.ID, value="message")
    value = message.text
    assert value == "Received!"

```
:::