import readline from "readline";
import { spawn } from "child_process";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Which extension do you want to bundle? (write the extension folder name) ', (extension) => {
  rl.close();

  const rollup = spawn('rollup', ['-c'], {
    stdio: 'inherit',
    env: { ...process.env, EXTENSION: extension },
    shell: true
  });

  rollup.on('close', () => {
    console.log("Extension bundled successfully!");
  });
});