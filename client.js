const dgram = require("dgram");
const socket = dgram.createSocket("udp4");

socket.bind(function () {
  socket.setBroadcast(true);
});

let message = new Buffer("amin`sPi");

socket.send(message, 0, message.length, 6666, '255.255.255.255', function(err, bytes) {
  socket.on('message', function(msg) {
    console.log(msg.toString());
    socket.close();
  })
});