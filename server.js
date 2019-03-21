let express = require('express');
let app = express();
let server = app.listen(process.env.PORT || 8080);
let io = require('socket.io')(server);
let doc = {
    state: ''
};
let numClients = 0;

app.use(express.static('public'));

console.log('Server is now listening on port 8080.');
io.sockets.on('connection', connection);

function connection(socket) {
    console.log('A new user with id ' + socket.id + ' has entered.');
    numClients++;

    socket.emit('newUser', doc.state);

    socket.on('userEdit', handleTextSent);

    function handleTextSent(data) {
        socket.broadcast.emit('receiveEdit', data.change);
        doc.state = data.currentState;
    }

    socket.on('disconnect', function () {
        console.log('Client with id ' + socket.id + ' has disconnected.');
        numClients--;
    });
}
