# Changes to server:
We added the folowing lines to chatserver.js:
70: socket.emit('channellist', users[socket.username].channels);
108: socket.emit('channellist', users[socket.username].channels);
