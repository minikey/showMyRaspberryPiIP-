const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const os = require('os');
const secret = 'amin`sPi'; // 接头暗号

function getMyIps() {
    let info = os.networkInterfaces();
    let ips = Object.values(info).reduce((rt, list) => {
        list.every((v) => {
            if (v.family === 'IPv4') {
                rt.push(v.address);
            }
            return true;
        });
        return rt;
    }, []);
    return ips;
}

console.log(getMyIps());

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  if (msg.toString() === secret) {
    server.send(JSON.stringify(getMyIps()), rinfo.port, rinfo.address);
  }
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(6666);