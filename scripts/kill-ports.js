import { exec } from 'child_process';
import os from 'os';

const isWindows = os.platform() === 'win32';
const ports = [3000, 5173];

function killPort(port) {
  return new Promise((resolve) => {
    if (isWindows) {
      exec(`netstat -ano | findstr :${port}`, (error, stdout) => {
        if (stdout) {
          const lines = stdout.split('\n');
          const pids = lines
            .filter(line => line.includes('LISTENING'))
            .map(line => line.trim().split(/\s+/).pop())
            .filter(pid => pid && !isNaN(pid));
          
          pids.forEach(pid => {
            exec(`taskkill /F /PID ${pid}`, () => {});
          });
        }
        resolve();
      });
    } else {
      exec(`lsof -ti:${port} | xargs kill -9`, () => resolve());
    }
  });
}

async function killAllPorts() {
  console.log('Killing processes on ports:', ports.join(', '));
  await Promise.all(ports.map(killPort));
  console.log('Done! Ports are now free.');
}

killAllPorts();
