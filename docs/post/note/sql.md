# SQL
::: tip Postgres 16 + Postico
:::
## 基础部分
::: info CREATE TABLE

```sql
-- 创建 Person 表
CREATE TABLE Person (
  Id SERIAL PRIMARY KEY,
  LastName VARCHAR(50) NOT NULL,
  FirstName VARCHAR(50) NOT NULL,
  Address VARCHAR(100),
  City VARCHAR(50)
)
-- 插入 3 条 Person 数据
INSERT INTO Person (LastName, FirstName, Address, City)
VALUES ('Adams', 'John', 'Oxford Street', 'London'),
       ('Bush', 'George', 'Fifth Avenue', 'New York'),
       ('Carter', 'Thomas', 'Changan Street', 'Beijing')
```
|  id   | LastName | FirstName |    Address     |   City   |
| :---: | :------: | :-------: | :------------: | :------: |
|   1   |  Adams   |   John    | Oxford Street  |  London  |
|   2   |   Bush   |  George   |  Fifth Avenue  | New York |
|   3   |  Carter  |  Thomas   | Changan Street | Beijing  |
:::

```sql
-- 查询 Person 表中的所有列和所有行
SELECT * FROM Person

-- 查询 Persons 表中的 LastName 和 FirstName 列的所有行
SELECT LastName,FirstName FROM Person

-- 重命名表
ALTER TABLE Person RENAME TO Persons

-- 插入数据
INSERT INTO Persons (LastName, FirstName, Address, City)
VALUES ('Davis', 'Emily', 'Sunset Boulevard', 'Los Angeles')

-- 删除数据
DELETE FROM Persons WHERE Year = 2003

-- update 数据
UPDATE Persons SET Year = 2005 WHERE Id = 3

-- 新增 Year 字段
ALTER TABLE Persons ADD Year INT

-- 更新 Year 字段数据
UPDATE Persons
SET Year = CASE Id
  WHEN 1 THEN 2000
  WHEN 2 THEN 2001
  WHEN 3 THEN 2002
  WHEN 4 THEN 2003
  END
WHERE Id IN (1, 2, 3,)

-- -- 查询 Year = 2000 的个人信息
SELECT * FROM Persons WHERE Year = 2000

-- AND 运算符
SELECT * FROM Persons WHERE FirstName='Thomas' AND LastName='Carter'

-- OR 运算符
SELECT * FROM Persons WHERE FirstName='Thomas' OR LastName='Carter'

-- ORDER BY
SELECT * FROM Persons ORDER BY Year
SELECT Id,Year FROM Persons ORDER BY Year,Id
SELECT Id,Year FROM Persons ORDER BY Year ASC,Id DESC


```


## 高级部分
::: info CREATE TABLE
```sql{16}
-- 创建 Users 表
CREATE TABLE Users (
  Id SERIAL PRIMARY KEY,
  LastName VARCHAR(50) NOT NULL,
  FirstName VARCHAR(50) NOT NULL,
  Address VARCHAR(100),
  City VARCHAR(50),
  Year VARCHAR(50)
)
-- 创建 Orders 表
CREATE TABLE Orders (
  OrderId SERIAL PRIMARY KEY,
  OrderDate DATE NOT NULL,
  Amount NUMERIC(10, 2) NOT NULL,
  UserId INT,
  FOREIGN KEY (UserId) REFERENCES Users(Id) 
)
-- 插入 5 条 Users 数据
INSERT INTO Users (LastName, FirstName, Address, City, Year)
VALUES 
  ('Adams', 'John', 'Oxford Street', 'London', '2000'),
  ('Bush', 'George', 'Fifth Avenue', 'New York', '2001'),
  ('Carter', 'Thomas', 'Changan Street', 'Beijing', '2002'),
  ('Davis', 'Emily', 'Sunset Boulevard', 'Los Angeles', '2003'),
  ('Evans', 'Sarah', 'Main Street', 'Boston', '2004')

-- 插入5 条 Orders 数据
INSERT INTO Orders (OrderDate, Amount, UserId)
VALUES
  ('2024-01-01', 150.00, 1),
  ('2024-01-02', 200.00, 2),
  ('2024-01-03', 250.00, 3),
  ('2024-01-04', 300.00, 1),
  ('2024-01-05', 350.00, 2)
```
:::info Users
|  id   | LastName | FirstName |     Address      |    City     | Year  |
| :---: | :------: | :-------: | :--------------: | :---------: | :---: |
|   1   |  Adams   |   John    |  Oxford Street   |   London    | 2000  |
|   2   |   Bush   |  George   |   Fifth Avenue   |  New York   | 2001  |
|   3   |  Carter  |  Thomas   |  Changan Street  |   Beijing   | 2002  |
|   4   |  Davis   |   Emily   | Sunset Boulevard | Los Angeles | 2003  |
|   5   |  Evans   |   Sarah   |   Main Street    |   Boston    | 2004  |

Orders

| OrderId | OrderDate  | Amount | UserId |
| :-----: | :--------: | :----: | :----: |
|    1    | 2024-01-01 | 150.00 |   1    |
|    2    | 2024-01-02 | 250.00 |   2    |
|    3    | 2024-01-03 | 350.00 |   3    |
|    4    | 2024-01-04 | 450.00 |   1    |
|    5    | 2024-01-05 | 550.00 |   2    |
:::

```sql

-- 在 PostgreSQL 中，没有 TOP 关键字来限制查询结果行数 -> LIMIT 来实现 
SELECT TOP 3 * FROM Users -- [!code --]
SELECT * FROM Users LIMIT 3 -- [!code ++]
-- 在 PostgreSQL 中不能使用 PERCENT 关键字来选择前 x% 的数据 -> Users 表中选取 50% 的记录 
SELECT TOP 50 PERCENT * FROM Users -- [!code --]
SELECT * FROM Users ORDER BY Id LIMIT (SELECT COUNT(*) / 2 FROM Users) -- [!code ++]

-- LIKE 关键字来进行模糊匹配的查询
SELECT * FROM Users WHERE LastName LIKE 'E%'
SELECT LastName FROM Users WHERE LastName LIKE 'E%'
SELECT LastName FROM Users WHERE LastName LIKE '%s'
SELECT LastName FROM Users WHERE LastName LIKE 'E%s'
SELECT LastName FROM Users WHERE LastName LIKE '%van%'
SELECT LastName FROM Users WHERE LastName NOT LIKE '%van%'

--  _ 通配符 -> 仅替代一个字符
SELECT * FROM Users WHERE FirstName LIKE '_eorge'
SELECT * FROM Users WHERE LastName LIKE 'C_r_er'

-- [charlist] 通配符 -> 字符列中的任何单一字符
-- 在 PostgreSQL 中，不能直接使用类似 [ABC]% 的语法来作为 LIKE 操作符的模式
-- LIKE 操作符在 PostgreSQL 中主要用于基本的通配符匹配，不支持字符集合的形式作为匹配模式
SELECT * FROM Users WHERE LastName LIKE '[ABC]%'  -- [!code --]
SELECT * FROM Users WHERE LastName LIKE 'A%' OR LastName LIKE 'B%' OR LastName LIKE 'C%' -- [!code ++]

-- IN 操作符
SELECT * FROM Users WHERE LastName IN ('Adams','Carter')
SELECT * FROM Users WHERE LastName NOT IN ('Adams','Carter')

-- BETWEEN 操作符
SELECT * FROM Users WHERE LastName BETWEEN 'Adams' AND 'Carter'
SELECT * FROM Users WHERE LastName NOT BETWEEN 'Adams' AND 'Carter'

-- Alias（别名）-> 列名称 和 表名称 指定别名
SELECT LastName AS ln, FirstName AS fn FROM Users
SELECT u.LastName, u.FirstName FROM Users AS u WHERE u.LastName='Adams' AND u.FirstName='John'

-- JOIN（INNER JOIN）
SELECT Users.LastName, Users.FirstName, Orders.OrderId 
FROM Users 
JOIN Orders ON Users.Id = Orders.UserId

SELECT Users.LastName, Users.FirstName, Orders.OrderId 
FROM Users 
INNER JOIN Orders ON Users.Id = Orders.UserId ORDER BY Orders.orderId

-- LEFT JOIN （LEFT OUTER JOIN）
SELECT Users.LastName, Users.FirstName, Orders.OrderId, Orders.OrderDate, Orders.Amount
FROM Users
LEFT JOIN Orders ON Users.Id = Orders.UserId

SELECT Users.LastName, Users.FirstName, Orders.OrderId, Orders.OrderDate, Orders.Amount
FROM Users
LEFT OUTER JOIN Orders ON Users.Id = Orders.UserId

-- RIGHT JOIN （RIGHT OUTER JOIN）
SELECT Users.LastName, Users.FirstName, Orders.OrderId, Orders.OrderDate, Orders.Amount
FROM Users
RIGHT JOIN Orders ON Users.Id = Orders.UserId

SELECT Users.LastName, Users.FirstName, Orders.OrderId, Orders.OrderDate, Orders.Amount
FROM Users
RIGHT OUTER JOIN Orders ON Users.Id = Orders.UserId

-- FULL JOIN（FULL OUTER JOIN）
SELECT Users.LastName, Users.FirstName, Orders.OrderId, Orders.OrderDate, Orders.Amount
FROM Users
FULL JOIN Orders ON Users.Id = Orders.UserId

SELECT Users.LastName, Users.FirstName, Orders.OrderId, Orders.OrderDate, Orders.Amount
FROM Users
FULL OUTER JOIN Orders ON Users.Id = Orders.UserId

-- SELECT INTO 备份表数据
SELECT * INTO Users_backup FROM Users

-- ALTER TABLE
ALTER TABLE Users ADD CreateTime date
ALTER TABLE Users ADD UpdateTime date

ALTER TABLE Users ALTER COLUMN CreateTime TYPE TIMESTAMP
ALTER TABLE Users ALTER COLUMN UpdateTime TYPE TIMESTAMP

ALTER TABLE Users DROP COLUMN CreateTime
ALTER TABLE Users DROP COLUMN UpdateTime

-- 逐行或根据条件删除表中的数据，并且可以通过回滚事务来撤销删除操作
DELETE FROM Users
DELETE FROM Users WHERE LastName = 'Smith'

-- 快速删除表中的所有数据，并重置表的自增序列，一旦执行就无法恢复删除的数据
TRUNCATE TABLE Users

-- 完全删除表，包括表的结构定义及其包含的所有数据
DROP TABLE Users
```





