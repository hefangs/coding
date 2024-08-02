# 函数部分
## Create Table
```sql
-- 创建 Goods 表
CREATE TABLE Goods (
  Id SERIAL PRIMARY KEY,
  Name VARCHAR(255),
  Price DECIMAL(10, 2),
  Total INT,
  Date DATE
)
```

## Insert Data
```sql
-- 插入 6 条数据
INSERT INTO Goods (Name, Price, Total, Date) 
VALUES
  ('Laptop', 999.99, 50, '2023-01-15'),
  ('Smartphone', 699.99, 150, '2023-02-10'),
  ('Tablet', 299.99, 100, '2023-03-05'),
  ('Headphones', 199.99, 200, '2023-04-20'),
  ('Smartwatch', 149.99, 300, '2023-05-25'),
  ('Laptop', 599.99, 50, '2023-06-15')
```

## Functions
```sql
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
