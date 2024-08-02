# 高级部分
## Create Table
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
```

## Insert Date
```sql
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
## Users Table
|  id   | LastName | FirstName |     Address      |    City     | Year  |
| :---: | :------: | :-------: | :--------------: | :---------: | :---: |
|   1   |  Adams   |   John    |  Oxford Street   |   London    | 2000  |
|   2   |   Bush   |  George   |   Fifth Avenue   |  New York   | 2001  |
|   3   |  Carter  |  Thomas   |  Changan Street  |   Beijing   | 2002  |
|   4   |  Davis   |   Emily   | Sunset Boulevard | Los Angeles | 2003  |
|   5   |  Evans   |   Sarah   |   Main Street    |   Boston    | 2004  |

## Orders Table
| OrderId | OrderDate  | Amount | UserId |
| :-----: | :--------: | :----: | :----: |
|    1    | 2024-01-01 | 150.00 |   1    |
|    2    | 2024-01-02 | 250.00 |   2    |
|    3    | 2024-01-03 | 350.00 |   3    |
|    4    | 2024-01-04 | 450.00 |   1    |
|    5    | 2024-01-05 | 550.00 |   2    |

## Advanced Query
```sql
-- Top 
SELECT TOP 3 * FROM Users
SELECT TOP 50 PERCENT * FROM Users 

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
SELECT * FROM Users WHERE LastName LIKE '[ABC]%'  

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