'use strict';

const os = require('os');
const nodeStatic = require('node-static');
const socketIO = require('socket.io');
const cors = require('cors');
const path = require('path');
const https = require('https');
const fs = require('fs');
const express = require('express');
const PORT = 3000;

// Express를 사용하여 서버를 생성합니다
const app = express();

// CORS 허용
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}));

// SSL 인증서 파일 경로 설정
const options = {
    key: fs.readFileSync('./src/ssl/private.pem'),
    cert: fs.readFileSync('./src/ssl/public.pem'),
};

// static 파일 서빙 설정
const fileServer = new nodeStatic.Server();

// 모든 요청을 처리하기 위해 Express 미들웨어로 fileServer를 사용합니다
app.use((req, res) => {
    fileServer.serve(req, res);
});

// HTTPS 서버 생성
const server = https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS Server is running on port ${PORT}`);
});

// socket.io 서버를 HTTPS 서버에 연결
const io = new socketIO.Server(server, {
    cors:{
        origin:"http://localhost:3000",
        methods:['GET', 'POST']
    }
});

io.on('connection', function(socket) {
    // convenience function to log server messages on the client
    function log() {
        const array = ['Message from server:'];
        array.push.apply(array, arguments);
        socket.emit('log', array);
    }

    socket.on('message', function(message) {
        log('Client said: ', message);

        if (message === "bye" && socket.rooms.has('foo')) {
            io.in('foo').clients((error, clients) => {
                if (error) throw error;

                clients.forEach(clientId => {
                    const clientSocket = io.sockets.sockets.get(clientId);
                    if (clientSocket) {
                        clientSocket.leave('foo');
                    }
                });
            });
        }

        // Broadcast message to all clients except the sender
        socket.broadcast.emit('message', message);
    });

    // 채팅방 생성 / 참가
    socket.on('create or join', function(room) {
        log('Received request to create or join room ' + room);

        const clientsInRoom = io.sockets.adapter.rooms.get(room);
        const numClients = clientsInRoom ? clientsInRoom.size : 0;
        log('Room ' + room + ' now has ' + numClients + ' client(s)');

        if (numClients === 0) {             // 채팅방 생성(호스트)
            socket.join(room);
            log('Client ID ' + socket.id + ' created room ' + room);
            socket.emit('created', room, socket.id);
        } else if (numClients === 1) {      // 채팅방 참가(참가자)
            log('Client ID ' + socket.id + ' joined room ' + room);
            io.in(room).emit('join', room);
            socket.join(room);
            socket.emit('joined', room, socket.id);
            io.in(room).emit('ready');
        } else {                            // 채팅방 허용 인원 초과 시(1:1 채팅이 원칙)
            socket.emit('full', room);
        }
    });

    // Client IP 주소 획득
    socket.on('ipaddr', function() {
        const ifaces = os.networkInterfaces();
        for (const dev in ifaces) {
            ifaces[dev].forEach(function(details) {
                if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
                    socket.emit('ipaddr', details.address);
                }
            });
        }
    });

    // Client 가 채팅방을 나갈때
    socket.on('bye', function(){
        console.log('received bye');
    });

    // Client 로부터 전달받은 채팅(context) 내용
    socket.on('context', function(e) {
        console.log("클라이언트로부터 받은 채팅 기록 : ",e);
    })
});
