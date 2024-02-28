const express = require('express'); 
const bodyParser = require('body-parser')
const multer = require('multer')
const http = require('http');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 82;

// 使用 body-parser 中间件来解析请求体 (Content-Type	application/x-www-form-urlencoded) 格式传递
app.use(bodyParser.urlencoded({extebded: false}))
app.use(bodyParser.json());

// form-data 格式的请求 中间件
// const upload = multer()

app.get('/new/:msg', (req, res) => {
	let arr = [{message: 'new msg'}];
	const msg = req.params.msg
	res.json({message: arr})
})

// get
app.get('/news', (req, res) => {
	const msg = req.query.msg
	res.json({message: `news ${ msg }`});
})


app.post('/users', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	// // res.send('Post 请求成功！');
	res.json({userMsg: {
		username,
		password,
	}})
	// res.json({message: []})
})

// post 上传图片
const uploadImage = (app) => {
	// 设置图片上传的存储目录和文件名
	const storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, 'public/images/')
		},
		filename: function (req, file, cb) {
			cb(null, Date.now() + '_' + file.originalname);
		}
	})
	// 创建一个 multer 实例，用于处理图片上传
	const upload = multer({ storage });
	// 设置静态文件目录，使得上传的图片可以通过 URL 访问
	app.use(express.static(path.join(__dirname, 'public/')));
	// 处理图片上传的路由
	app.post('/uploadImage', upload.single('image'), (req, res) => {
		
		if(!req.file) return res.status(400).json({err: '没有传入file文件'})
		// 构造图片的完整 URL 地址，包括协议、主机和文件名
		const imageUrl = req.protocol + "://" + req.get('host') + '/images/' + req.file.filename;
		
		return res.json({imageUrl, req: {file: req.file}});
	})
}
uploadImage(app)


app.listen(process.env.PORT, () => {
	console.log(__dirname);
	// console.log(process.cwd());
	console.log(`server is running at http://localhost:${ port }`)
})

//process.env.PORT


// 本机调试
// http.createServer(app).listen(port, () => {
// 	console.log(`server is running at http://localhost:${ port }`)
// })


// http.createServer(app).listen(process.env.PORT, () => {
// 	console.log(`server is running at http://localhost:${ port }`)
// })