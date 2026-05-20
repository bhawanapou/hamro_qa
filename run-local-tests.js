import { startServer } from './server.js';
import { spawn } from 'child_process';

(async () => {
  const server = await startServer();
  const proc = spawn('npx', ['playwright', 'test', '--project=chromium'], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    server.close(() => {
      process.exit(code ?? 0);
    });
  });
})();
