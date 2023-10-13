const childProcess = require('child_process');
const os = require('os');
const fs = require('fs');

const osType = os.platform();
console.log(osType);
let command;
if (osType === 'linux') {
    command = 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
} else {
    command = 'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + " " + $_.CPU + " " + $_.WorkingSet }';
}
console.log(command);

const execProcess = (command) => {
    const timestamp = Math.floor(Date.now() / 1000);
    var result;
    childProcess.exec(command, (error, stdout, stderr) => {
        console.log(`top cli: ${stdout}`);
        result = stdout;
        if (error !== null) {
            console.log(`error: ${error}`);
        }
        fs.appendFile('activityMonitor.log', `${timestamp}: ${stdout}`, (err) => {
            if (err) {
                console.error("Error writing in the file");
            }
        });
    });
}

setInterval(() => { execProcess(command) }, 100);
setInterval(() => console.clear(), 100);
