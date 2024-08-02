# 基础部分

::: tip Postgres 16 + Postico 2.1
:::
## Create Table

```sql
-- 创建 Person 表
CREATE TABLE Person (
  Id SERIAL PRIMARY KEY,
  LastName VARCHAR(50) NOT NULL,
  FirstName VARCHAR(50) NOT NULL,
  Address VARCHAR(100),
  City VARCHAR(50)
)
```
## Insert Data
```sql
-- 插入 3 条 Person 数据
INSERT INTO Person (LastName, FirstName, Address, City)
VALUES ('Adams', 'John', 'Oxford Street', 'London'),
       ('Bush', 'George', 'Fifth Avenue', 'New York'),
       ('Carter', 'Thomas', 'Changan Street', 'Beijing')
```
## Table
|  id   | LastName | FirstName |    Address     |   City   |
| :---: | :------: | :-------: | :------------: | :------: |
|   1   |  Adams   |   John    | Oxford Street  |  London  |
|   2   |   Bush   |  George   |  Fifth Avenue  | New York |
|   3   |  Carter  |  Thomas   | Changan Street | Beijing  |

## Query Table
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
