const express = require('express'); 
const bodyParser = require('body-parser');
const multer = require('multer')
const http = require('http');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2');

const app = express();
const port = 82;

const uploadFileFun = require('./src/uploadFile/uploadFile.js');

// 设置默认目录
app.use(express.static(path.join(__dirname ,'public/')));

// 使用 body-parser 中间件来解析请求体 (Content-Type	application/x-www-form-urlencoded) 格式传递
// app.use(bodyParser.urlencoded({extebded: false}))
// app.use(bodyParser.json());

// form-data 格式的请求 中间件
// const upload = multer()


const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'user_mysql'
})

connection.connect((err) => {
	if(err) {
		console.error('err');
		return;
	}
})


// get
app.get('/news', (req, res) => {
	const msg = req.query.id;
	let sql = msg ? `SELECT * FROM t_student where no = ${ msg }` : `SELECT * FROM t_student`;
	connection.query(sql, (err, result, fields) => {
		if(err) res.json({message: "err"});
		// res.json({message: data.userData()});
		res.json({message: result});

	})
})

// get (query)
app.get('/new/:msg', (req, res) => {
	const msg = req.params.msg
	let arr = [{message: `new ${ 1122 }`}];
	res.json({message: arr})
})

// post 
const upload = multer();
app.post('/setUser', upload.none(), (req, res) => {

	const { no, name, sex, classno, birth } = req.body || {};

	
	let sql = `INSERT INTO \`t_student\` (\`no\`, \`name\`, \`sex\`, \`classno\`, \`birth\`) VALUES (?, ?, ?, ?, ?)`
	// // res.send('Post 请求成功！');

	connection.query(sql, [no, name, sex, classno, birth], (err, result, fields) => {
		if(err) {
			return res.json({message: err.message});
		}
		// res.json({message: data.userData()});
		res.json({message: { no, name, sex, classno, birth }});

	})
	// res.json({message: []})
})


// 上传多图片/视频
uploadFileFun.uploadFile(app, '/upload')


	
// 服务执行
// app.listen(process.env.PORT, () => {
// 	console.log(__dirname);
// 	// console.log(process.cwd());
// 	console.log(`server is running at http://localhost:${ port }`)
// })

//process.env.PORT


// 本机调试
http.createServer(app).listen(port, () => {
	console.log(`server is running at http://localhost:${ port }`)
})


// http.createServer(app).listen(process.env.PORT, () => {
// 	console.log(`server is running at http://localhost:${ port }`)
// })