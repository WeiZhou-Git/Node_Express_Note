const ffmpeg = require('fluent-ffmpeg');
// https://github.com/BtbN/FFmpeg-Builds/releases/tag/latest
// 使用 fluent-ffmpeg 需要安装并配置全局变量

const path = require('path');
const output = path.join(__dirname, 'output.avi');
const posterPath = path.join('public/images', new Date().getTime() + '.jpg');


// 'https://www.runoob.com/try/demo_source/movie.mp4'
// 压缩 变为 avi格式
const handleVideo = videoPath => {
    ffmpeg(videoPath)
    .output(output) // 输出路径
    .on('end', () => {
        console.log('success !', output)
    })
    .on('error', (err) => {
        console.log('err', err)
    })
    .run();
}


// // 使用 ffmpeg 提取视频第一帧
const videoFirstFrame = videoPath => {
	return new Promise((res, rej) => {
        ffmpeg(videoPath)
		.on('end', () => {
            res(posterPath);
		})
		.on('error', err => {
            rej(err);
		})
		.screenshots({
			count: 1, // 提取第一帧
			folder: path.dirname(posterPath), // 输出图片目录
			filename: path.basename(posterPath), // 输出图片名称
			size: '300x300' // 输出图像大小
		})
    })
}


module.exports = {
    videoFirstFrame
}