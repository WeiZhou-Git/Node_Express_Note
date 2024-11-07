
# Node and Express
#### Express 是一个基于 Node.js 平台的 Web 应用开发框架
> 运行 node
```shell
node app.js
```
> 实时运行 node
```shell
nodemon app.js
```
&nbsp;
> expres
> npm 引入 express
```shell
npm install express
```
&nbsp;
> app.js 引入 express
```javascript
const express = require('express'); 
const app = express();
const port = 8080;
```
&nbsp;
> 创建GET 接口
```javascript
app.get('/new/:msg', (req, res) => {
	const msg = req.params.msg // /new/:msg 目录参数获取
	
	const msg = req.query.msg //  /new?msg=1 query参数获取
	
	res.json({message: arr})
})
```
&nbsp;
> 创建POST 接口
```javascript
// # application/x-www-form-urlencoded 格式的请求
// 使用 body-parser 中间件来解析请求体 (Content-Type	application/x-www-form-urlencoded) 格式传递
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extebded: false}))
app.use(bodyParser.json());

app.post('/users, (req, res) => {
	const username = req.body.username; // 获取post 参数
	const password = req.body.password;
	res.json({userMsg: {
		username,
		password,
	}})
})

// #form-data 格式的请求
// 配置 multer 中间件，用于处理 form-data 格式的请求
const multer = require('multer')
const upload = multer();
// 处理 POST 请求的路由，使用 upload.none() 中间件来解析 form-data 格式的请求体
app.post('/users', upload.none(), (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    res.json({userMsg: {
    	username,
    	password,
    }})
});
```

&nbsp;
> 导入 SQL

```cmd
source /path/to/your/setup.sql;
```


&nbsp;
> fs 文件处理
```javascript
const fs = require('fs');

// 创建文件夹
fs.mkdirSync('news');

// 删除文件夹
fs.rmdirSync('news');

// 创建文件
fs.writeFileSync('news/file.txt', 'Hello, world!');

// 删除文件
fs.unlinkSync('news/file.txt');

// 读取文件内容
const content = fs.readFileSync('news/file.txt', 'utf8');

// 写入文件内容
fs.writeFileSync('/path/to/file.txt', 'New content');
```