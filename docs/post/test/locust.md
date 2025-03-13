# Locust

## 1. 使用locust进行性能测试

### locustfile.py
```py
from locust import HttpUser, task, between


class MyUser(HttpUser):
    # 模拟用户之间的等待时间：1 到 2 秒之间随机等待
    wait_time = between(1, 2)

    # 测试任务：请求 /playlist/catlist
    @task
    def get_catlist(self):
        self.client.get("/playlist/catlist")

    # 测试任务：请求 /playlist/hot
    @task
    def get_hot_playlists(self):
        self.client.get("/playlist/hot")

```

###  Locust Web UI 配置
:::tip
- Number of users to simulate：模拟的用户数。例如，设置为 100，表示模拟 100 个并发用户
- Spawn rate (users spawned/second)：每秒启动的用户数。比如设置为 10，表示每秒启动 10 个用户，直到模拟的用户数达到 100
- Host：如果你没有在命令行中指定 --host 参数，你可以在这里手动设置目标主机地址:http://106.15.79.229:3000
- Locust 会在 10秒 内创建并启动 100 个用户。接下来，测试会继续执行，模拟这些 100 个用户对系统进行请求，直到你手动停止测试或根据测试配置停止
:::
![pic](/locust-1.png "notice")

### 请求概览

| Type | Name               | # Requests | # Fails | Median (ms) | 95%ile (ms) | 99%ile (ms) | Average (ms) | Min (ms) | Max (ms) | Average size (bytes) | Current RPS | Current Failures/s |
|------|--------------------|------------|---------|-------------|-------------|-------------|--------------|----------|----------|-----------------------|-------------|--------------------|
| GET  | //playlist/catlist  | 10072      | 0       | 17          | 650         | 1100        | 128.18       | 5        | 3343     | 9111.09               | 34.2        | 0                  |
| GET  | //playlist/hot      | 10127      | 0       | 10          | 230         | 640         | 51.18        | 5        | 6839     | 3181                  | 31.3        | 0                  |
| **Aggregated** | **Total**   | **20199**  | **0**   | **12**      | **450**     | **860**     | **89.58**    | **5**    | **6839** | **6137.97**            | **65.5**    | **0**              |



### 总结
:::tip 
- 本次测试中的系统表现良好，所有请求都成功，响应时间保持在较低范围内，吞吐量也比较可观。
- /playlist/catlist 接口在高负载下的响应时间有一定的波动，特别是 99 百分位响应时间达到 1100ms，但仍然在可接受范围内。
- /playlist/hot 接口的响应时间较为稳定，尤其在 95% 和 99% 百分位的响应时间较低，表明该接口的性能较好
:::


## 2. 使用locust进行压力测试


### locustfile.py
```py
from locust import HttpUser, task, between


class StressTestUser(HttpUser):
	wait_time = between(0.5, 1)  # 每个请求后等待时间：0.5到1秒之间随机

	@task
	def catlist_page(self):
		self.client.get("/playlist/catlist")  # 请求接口1

	@task
	def hot_page(self):
		self.client.get("/playlist/hot")  # 请求接口2
```

###  Locust Web UI 配置
:::tip
- Number of users to simulate：模拟的用户数。例如，设置为 100，表示模拟 100 个并发用户
- Spawn rate (users spawned/second)：每秒启动的用户数。比如设置为 10，表示每秒启动 10 个用户，直到模拟的用户数达到 100
- Host：如果你没有在命令行中指定 --host 参数，你可以在这里手动设置目标主机地址:http://106.15.79.229:3000
- run time: 5m
- Locust 会在 10秒 内创建并启动 100 个用户。接下来，测试会继续执行，模拟这些 100 个用户对系统进行请求，持续5分钟
:::
![pic](/locust-2.png "notice")

### 请求概览



| Type | Name              | # Requests | # Fails | Median (ms) | 95%ile (ms) | 99%ile (ms) | Average (ms) | Min (ms) | Max (ms) | Average size (bytes) | Current RPS | Current Failures/s |
|------|-------------------|------------|---------|-------------|-------------|-------------|--------------|----------|----------|----------------------|-------------|--------------------|
| GET  | //playlist/catlist | 9131       | 0       | 840         | 4000        | 7700        | 1298.09      | 7        | 52430    | 9398.41              | 31.1        | 0                  |
| GET  | //playlist/hot     | 9056       | 0       | 230         | 1500        | 3600        | 442.38       | 5        | 9388     | 3181                 | 28.6        | 0                  |
| **Aggregated** | **-**         | **18187**  | **0**   | **440**     | **3300**    | **7000**    | **872**      | **5**    | **52430** | **6302.53**           | **59.7**    | **0**              |



### 总结
:::tip 
- catlist 接口 的响应时间明显高于 hot 接口，尤其是在高百分位（95% 和 99%）的响应时间。catlist 接口表现出较大的波动，尤其是最大响应时间（52,430 ms）。
- hot 接口 的响应时间相对较低，表现较为平稳。
:::

