const { spawn } = require('child_process');

// Start Next.js server
const next = spawn('npm', ['run', 'start']);

next.stdout.on('data', (data) => {
    console.log(`Next.js: ${data}`);
});

next.stderr.on('data', (data) => {
    console.error(`Next.js: ${data}`);
});

next.on('close', (code) => {
    console.log(`Next.js exited with code ${code}`);
});

// Start Node.js server
const server = spawn('npm', ['run', 'server']);

server.stdout.on('data', (data) => {
    console.log(`Node.js: ${data}`);
});

server.stderr.on('data', (data) => {
    console.error(`Node.js: ${data}`);
});

server.on('close', (code) => {
    console.log(`Node.js exited with code ${code}`);
});
