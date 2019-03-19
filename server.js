var express = require('express');
var app = express();
var server = require('http').Server(app);
app.use(express.static('public'));
server.listen(8080);

var io = require('socket.io')(server);
let socket;

console.log('Server listening on port 8080');

io.on('connection', connection);

var text = {
    text: ''
};

function connection(socket) {
    console.log('a new user with id ' + socket.id + " has entered");
    socket.emit('newUser', text);
    socket.on('test', function(data) {
      console.log(data);
    });

    socket.on('text', handleTextSent);

    function handleTextSent(data){
        console.log('handleTextSent');
        text.text = data.text
        io.sockets.emit('text', data);
    }
}

function setup(socket){
    //socket = io.connect('http://localhost:8080');
    console.log('donesos');
    socket.emit('mainTest', 'setup running');

    $("#text").on("froalaEditor.keyup", function(){
        var html = $(this).froalaEditor('html.get');
        var data = {
            text: html
        };
        socket.emit('text', data);
    });
    $('#text').froalaEditor({
        toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'help', 'html', '|', 'undo', 'redo'],
        fullPage: true
    });
    socket.on('text', handleRecievedText);
    socket.on('newUser', updateText);
}

function updateText(data){
    text.text = data.text;
    $("#text").froalaEditor('html.set', data.text);
    var editor = $('#text').data('froala.editor');
    editor.selection.setAtEnd(editor.$el.get(0));
    editor.selection.restore();
}

function handleRecievedText(data){
    console.log(data);
    text.text = data.text;
    $("#text").froalaEditor('html.set', data.text);
    var editor = $('#text').data('froala.editor');
    editor.selection.setAtEnd(editor.$el.get(0));
    editor.selection.restore();
}
