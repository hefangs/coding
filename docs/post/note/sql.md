# SQL
::: tip Postgres 16 + Postico 2.1
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


## 函数部分
::: info CREATE TABLE
```sql
-- 创建 Goods 表
CREATE TABLE Goods (
  Id SERIAL PRIMARY KEY,
  Name VARCHAR(255),
  Price DECIMAL(10, 2),
  Total INT,
  Date DATE
)

-- 插入 6 条数据
INSERT INTO Goods (Name, Price, Total, Date) 
VALUES
  ('Laptop', 999.99, 50, '2023-01-15'),
  ('Smartphone', 699.99, 150, '2023-02-10'),
  ('Tablet', 299.99, 100, '2023-03-05'),
  ('Headphones', 199.99, 200, '2023-04-20'),
  ('Smartwatch', 149.99, 300, '2023-05-25'),
  ('Laptop', 599.99, 50, '2023-06-15')

-- AVG
SELECT AVG(Total) FROM Goods
SELECT AVG(Total) AS AverageTotal FROM Goods

SELECT Total FROM Goods
WHERE Total>(SELECT AVG(Total) FROM Goods)

-- COUNT（DISTINCT ->忽略列中的重复值，只计算唯一值的数量）
SELECT COUNT(*) FROM Goods
SELECT COUNT(*) AS Num FROM Goods
SELECT COUNT(DISTINCT Total) FROM Goods
SELECT COUNT(DISTINCT Total) AS Num FROM Goods

-- FIRST
SELECT FIRST(Total) FROM Goods
SELECT FIRST(Total) AS FirstNum FROM Goods

-- LAST
SELECT LAST(Price) FROM Goods
SELECT LAST(Price) AS FirstNum FROM Goods

-- MAX
SELECT MAX(Price) FROM Goods
SELECT MAX(Price) AS LargestPrice FROM Goods

-- MIN
SELECT MIN(Price) FROM Goods
SELECT MIN(Price) AS SmallestPrice FROM Goods

-- SUM
SELECT SUM(Total) FROM Goods
SELECT SUM(Total) AS AllTotal FROM Goods

-- GROUP BY
SELECT Total, AVG(Price) AS AvgPrice
FROM Goods WHERE Total > 100 GROUP BY Total

SELECT Total,SUM(Price) FROM Goods GROUP BY Total

-- HAVING
SELECT Total,SUM(Price) 
FROM Goods GROUP BY Total HAVING SUM(Price)<200

SELECT Total, SUM(Price) FROM Goods
WHERE Total = 100 OR Total = 200
GROUP BY TotalHAVING SUM(Price) > 200

-- LEN
SELECT LEN(Total) FROM Goods
SELECT LEN(Total) as LengthOfTotal FROM Goods

-- ROUND
SELECT ROUND(Price,0) FROM Goods
SELECT Name,ROUND(Price,0) as UnitPrice FROM Goods




```
