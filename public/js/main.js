let socket = io();

let quill = new Quill('#editor', {
    modules: {
        toolbar: {
            container: '#toolbar',
            handlers: {}
        }
    },
    theme: 'snow',
    placeholder: 'Add text here...'
});

$('#custom-button').click(function () {
    alert('Clicked!');
});

socket.on('newUser', function (currentState) {
    quill.setContents(currentState);
});

quill.on('text-change', function (delta, oldDelta, source) {
    let changes = {
        change: delta,
        currentState: quill.getContents()
    };

    if (source === 'user') {
        socket.emit('userEdit', changes);
    }
});

socket.on('receiveEdit', function (delta) {
    quill.updateContents(delta);
});
