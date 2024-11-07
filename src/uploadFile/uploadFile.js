
const express = require('express');
const multer = require('multer');
const path = require('path');
const handleVideo = require('../handleVideo/handleVideo.js')

const hasFile = (file, fileStr) => file.mimetype.startsWith(fileStr);

// 设置图片上传的存储目录和文件名
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		if(hasFile(file, 'video/')) {
			cb(null, 'public/videos/')
		} else if (hasFile(file, 'image/')) {
			cb(null, 'public/images/')
		} else {
			cb(new Error('Unsupported file type'), false)
		}
 		
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
		cb(null, uniqueSuffix + '_' + file.originalname);
	}
})

// 过滤文件类型
const filterFlie = function (req, file, cb) {
	if(file.mimetype.startsWith("video/") || file.mimetype.startsWith("image/")) {
		cb(null, true)
	} else {
		cb(new Error('file type err'), false)
	}
}

// 创建一个 multer 实例，用于处理图片上传
const upload = multer({ storage, filterFlie }).fields([
	{name: 'videos', maxCount: 3}, // 视频文件，最大3个
	{name: 'images', maxCount: 3}  // 图片文件，最大3个
])



// post 上传多 图片/视频
const uploadFile = (app, url) => {
	console.log(__dirname)
	// 设置静态文件目录，使得上传的图片可以通过 URL 访问
	// 处理图片上传的路由
	app.post(url, (req, res) => {
		upload(req, res, async err => {
			if(err) {
				return res.status(500).send({msg: err.message})
			}
			try {
				// for(key in req.files) {
				// 	req.files[key].forEach(async (ele, i) => {
				// 		const fileUrl = req.protocol + "://" + req.get('host') + "/" + ele.destination.replace("public", "") + ele.filename;
				// 		let poster = await handleVideo.videoFirstFrame(fileUrl); // 取第一帧为封面
				// 		var ele = { ...ele,  fileUrl, poster};
				// 		files.push(ele)
				// 	})
				// }
				// const files = await Promise.all()

				const files = req.files.videos

				// console.log(req.files.videos)
				res.status(200).json({files})
			} catch(error) {
				return res.status(500).send({msg: error.message})
			}
		})
	})
}

module.exports = {
    uploadFile
}
