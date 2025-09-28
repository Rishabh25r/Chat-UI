const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);



app.use(express.static(__dirname + '/public')); 


const db = mysql.createPool({
    host: 'localhost',
    user: 'your_user',
    password: 'your_password',
    database: 'chat_app'
});


io.on('connection', (socket) => {
    console.log('A user connected');


    db.query('SELECT * FROM messages ORDER BY timestamp ASC', (err, results) => {
        if (err) throw err;
        socket.emit('past messages', results); 
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg.text);

        
        const newMessage = {
            username: msg.username || 'Anonymous', 
            text: msg.text,
            timestamp: new Date()
        };
        db.query('INSERT INTO messages SET ?', newMessage, (err, result) => {
            if (err) throw err;
            console.log('Message saved to DB');

            io.emit('chat message', newMessage);
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});