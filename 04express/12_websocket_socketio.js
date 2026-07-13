/**
 * 12_websocket_socketio.js
 * هدف: ارتباط دوطرفه实时 با Socket.io (مثل چت)
 * 
 * دستورات: npm install socket.io
 * 
 * تفاوت با HTTP: در HTTP کلاینت درخواست می‌دهد و سرور پاسخ می‌دهد.
 * در WebSocket، سرور می‌تواند بدون درخواست کلاینت، داده بفرستد.
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server); // متصل کردن socket.io به سرور HTTP

// سرو فایل‌های ایستا (برای نمایش یک صفحه چت ساده)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/chat.html');
});

// وقتی یک کلاینت متصل می‌شود
io.on('connection', (socket) => {
  console.log('کاربر جدید متصل شد:', socket.id);

  // گوش دادن به رویداد 'chat message' از کلاینت
  socket.on('chat message', (msg) => {
    console.log('پیام دریافت شد:', msg);
    // ارسال پیام به همه کلاینت‌های متصل (broadcast)
    io.emit('chat message', msg);
  });

  // قطع اتصال
  socket.on('disconnect', () => {
    console.log('کاربر قطع شد:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('سرور Socket.io روی http://localhost:3000');
});

/* 
فایل public/chat.html (ساده):
<!DOCTYPE html>
<html>
<head><title>Chat</title></head>
<body>
  <ul id="messages"></ul>
  <input id="msgInput" autocomplete="off" />
  <button id="sendBtn">Send</button>
  <script src="/socket.io/socket.io.js"></script>
  <script>
    const socket = io();
    const sendBtn = document.getElementById('sendBtn');
    const msgInput = document.getElementById('msgInput');
    const messages = document.getElementById('messages');
    sendBtn.onclick = () => {
      const msg = msgInput.value;
      if(msg) {
        socket.emit('chat message', msg);
        msgInput.value = '';
      }
    };
    socket.on('chat message', (msg) => {
      const li = document.createElement('li');
      li.textContent = msg;
      messages.appendChild(li);
    });
  </script>
</body>
</html>
*/