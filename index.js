import { exec } from 'child_process';

exec('git show --summary', (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);
    }
);