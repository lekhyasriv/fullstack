const math = require('./math');
const os = require('os');
const path = require('path');
const dns = require('dns');
const net = require('net');
const domain = require('domain');
const fs = require('fs');
let a = 10;
let b = 5;

console.log("Addition:", math.add(a, b));
console.log("Multiplication:", math.multiply(a, b));


console.log("Operating System:", os.platform());
console.log("CPU Architecture:", os.arch());
console.log("Total Memory:", os.totalmem());
console.log("Free Memory:", os.freemem());


let filePath = '/Users/student/Documents/test.txt';

console.log("File Name:", path.basename(filePath));
console.log("Directory:", path.dirname(filePath));
console.log("Extension:", path.extname(filePath));


dns.lookup('google.com', (err, address) => {
    if (err) {
        console.log(err);
    } else {
        console.log("IP Address:", address);
    }
});


const server = net.createServer((socket) => {
    socket.write("Hello from NodeJS Server!");
    socket.end();
});

server.listen(5001, () => {
    console.log("Server running on port 5000");
});

const d = domain.create();

d.on('error', (err) => {
    console.log("Error:", err.message);
});

d.run(() => {
    throw new Error("Something went wrong");
});


fs.writeFileSync('sample.txt', 'Hello NodeJS');

let data = fs.readFileSync('sample.txt', 'utf8');

console.log("File Content:", data);