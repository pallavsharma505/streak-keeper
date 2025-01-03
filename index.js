import { exec } from 'child_process';
import { writeFileSync } from 'fs';

async function init(){
    writeFileSync('test.txt', 'Hello World!');
    await exec('git stage .', (err, stdout, stderr) => {});
    await exec('git commit -m "Test Commit"', (err, stdout, stderr) => {});
    await exec('git push -u origin main', (err, stdout, stderr) => {});
}

init();