# Postman
## 参数传递

```bash
# 编写脚本提取需要的数据并保存为全局变量或环境变量
let data = pm.response.json()  // 获取响应 JSON 数据
pm.environment.set("token", data.token)  // 保存为环境变量
# 在下一个接口中使用变量
# 在 Headers 中使用
Authorization: Bearer {{token}
```

## Pre-request Script
```javascript
let name =`3208歌单`
let privacy = pm.environment.get('privacy')
let type = pm.environment.get('type')

let defaultPrivacy = 0
let defaultType = 'NORMAL'

let url =`http://localhost:3000/playlist/create?name=${name}`

if(privacy !== "" && privacy !== null && privacy !== undefined){
  url += `&privacy=${privacy}`
}else{
  url += `&privacy=${defaultPrivacy}`
}
if(type !== "" && type !== null && type !== undefined){
  url += `&type=${type}`
}else{
  url += `&type=${defaultType}`
}

pm.request.url = url
```
```javascript

let keywords = '张学友'
let type = pm.environment.get('type')
let limit = pm.environment.get('limit')
let offset = pm.environment.get('offset')

defaultLimit = 30
defaultOffset = 0
defaultType = [1,10,100,1000,1002,1004,1006,1009,1014,1018,2000]

romdomType = defaultType[Math.floor(Math.random() * defaultType.length)]

let url = `http://localhost:3000/search?keywords=${keywords}`

if(limit!=="" && limit!== null && limit!==undefined){
  url +=`&limit=${limit}`
}else{
  url +=`&limit=${defaultLimit}`
}
if(offset!=="" && offset!== null && offset!==undefined){
  url +=`&offset=${offset}`
}else{
  url +=`&offset=${defaultOffset}`
}
if(type!=="" && type!== null && type!==undefined){
  url +=`&type=${type}`
}else{
  url +=`&type=${romdomType}`
}

pm.request.url = url
```
```javascript
let limit = pm.environment.get('limit')
let offset = pm.environment.get('offset')
let area = pm.environment.get('area')

defaultArea = ['ALL','ZH','EA','KR','JP']
let romdomArea = defaultArea[Math.floor(Math.random() * defaultArea.length)]

let params = []

// 仅在环境变量中有值时添加参数到数组中

if (area !== undefined && area !== null && area !== "") {
  params.push(`area=${area}`)
} else {
  params.push(`area=${romdomArea}`)
}
if (limit !== undefined && limit !== null && limit !== "") {
  params.push(`limit=${limit}`)
} else {
  params.push(`limit=30`)
}
if (offset !== undefined && offset !== null && offset !== "") {
  params.push(`offset=${offset}`)
} else {
  params.push(`offset=0`)
}

let url = `http://localhost:3000/album/new?${params.join('&')}`

pm.request.url = url

```

## Post-response Script
```javascript
// 验证响应状态码
pm.test("Status code is 200", function () {
  pm.response.to.have.status(200)
})

// 验证响应时间
pm.test("Response time is less than 500ms", function () {
  pm.expect(pm.response.responseTime).to.be.below(500)
})

// 验证响应头
pm.test("Content-Type is application/json", function () {
  pm.response.to.have.header("Content-Type", "application/json")
})
// 提取响应中的 JSON 数据并保存为环境变量
let data = pm.response.json()
pm.environment.set("userId", data.user.id)

// 检查响应体中是否包含特定字段
pm.test("Response has user data", function () {
  let data = pm.response.json()
  pm.expect(data).to.have.property("user")
})

// 验断言响应 JSON 结构
pm.test("Check JSON structure", function () {
  let data = pm.response.json()
  pm.expect(data).to.have.keys(["id", "name", "email"])
})

// 检查特定 JSON 字段的值
pm.test("Check if user is active", function () {
  let data = pm.response.json()
  pm.expect(data.user.active).to.be.true
})

// 循环处理响应数据
let data = pm.response.json()
data.items.forEach(function(item) {
  pm.test("Item has valid ID", function() {
    pm.expect(item.id).to.be.a("number")
  })
})

// 处理嵌套 JSON 数据
let data = pm.response.json()
pm.test("Verify nested JSON data", function () {
  pm.expect(data.user.address.city).to.eql("Beijing")
})

```

## 导出 Collection
## 导出 Environments
  
## 命令行执行
```bash
# install newman
yarn global add -g newman
# 全局安装后执行
newman run test-demo.postman_collection.json -e env-dev.postman_environment.json
# -r html,cli:-r 表示报告生成器
# html:生成 HTML 格式的测试报告，通常用于生成详细的测试结果报告文件
# cli:在命令行界面输出报告，提供实时的测试结果反馈
# 需要安装 newman-reporter-htmlextra
# yarn global add newman-reporter-htmlextra
newman run test-demo.postman_collection.json -e env-dev.postman_environment.json -r htmlextra,cli
# 运行指定的 Collection，并重复执行 5 次
newman run test-demo.postman_collection.json -e env-dev.postman_environment.json -n 5

```


