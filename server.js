let express = require('express');
let app = express();
let server = app.listen(process.env.PORT || 8080);
let io = require('socket.io')(server);
let doc = {
    state: ''
};
let numClients = 100;

//For res.render() default path. Not necessary, technically.
app.set('views', __dirname + '/views');

//Specifies the structure of output document.
app.set('view engine', 'ejs');

//Serves static files from /public, from /public's perspective (first parameter).
//Use routers later? If we're building off of this.
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('index.ejs');
});

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
