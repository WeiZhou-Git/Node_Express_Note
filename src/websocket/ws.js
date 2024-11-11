const WebSocket = require('ws');

// 创建 websockect 服务器
const wss = new WebSocket.Server({ port: 8080 });


// ws 连接监听
wss.on('connection', (ws) => {
    console.log('新连接 new connection');

    ws.on('message', msg => {
        let bf = Buffer.from(msg, 'hex');
        console.log('接受消息:', bf.toString());

        // 群发 消息  
        wss.clients.forEach(client => {
            if(client.readyState === WebSocket.OPEN) {
                client.send("群发消息：" + bf.toString());
            }
        })
    })

    ws.on('close', () => {
        console.log('client disconnected');
    })
})

console.log('WebSocket server is running on ws://localhost:8080');