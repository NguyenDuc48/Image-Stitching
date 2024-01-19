const express = require('express');
const path = require('path');
const cors = require('cors');
const os = require('os');
const { exec } = require('child_process');


const app = express();
const port = 3001;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/get-file', (req, res) => {
  // Use os.homedir() to get the home directory on Linux
  const userDownloadsPath = path.join(os.homedir(), 'Downloads');
  const filePath = path.join(userDownloadsPath, 'result.jpg');
  res.sendFile(filePath);
});

app.post('/runcmd', (req, res) => {
    const command = req.body.command;
  
    // Use Bash to execute the command
    exec(`bash -c "${command}"`, (error, stdout, stderr) => {
      const response = {
        command: command,
        exitCode: error ? error.code : 0,
        output: stdout,
        error: error ? error.message : null,
      };
  
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        res.status(500).json(response);
      } else {
        console.log(`Command output: ${stdout}`);
        res.json(response);
      }
    });
});

app.post('/clearMemory', (req, res) => {
    const command = req.body.command;
  
    // Use Bash to execute the command
    exec(`bash -c "${command}"`, (error, stdout, stderr) => {
      const response = {
        command: command,
        exitCode: error ? error.code : 0,
        output: stdout,
        error: error ? error.message : null,
      };
  
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        res.status(500).json(response);
      } else {
        console.log(`Command output: ${stdout}`);
        res.json(response);
      }
    });
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
