# Changes to server:
We added the folowing lines to chatserver.js:
70: socket.emit('channellist', users[socket.username].channels);
108: socket.emit('channellist', users[socket.username].channels);
248: delete rooms[banObj.room].ops[banObj.user];

We change a socket.emit('userlist') to io.sockets.emit('userlist').
