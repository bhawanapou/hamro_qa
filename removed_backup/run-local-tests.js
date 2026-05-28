import { startServer } from './server.js';
import { spawn } from 'child_process';

(async () => {
  const server = await startServer();
  const env = { ...process.env, BASE_URL: 'http://localhost:3000' };
  const proc = spawn('npx', ['playwright', 'test', '--project=chromium'], { stdio: 'inherit', shell: true, env });

  proc.on('close', (code) => {
    server.close(() => {
      process.exit(code ?? 0);
    });
  });
})();
