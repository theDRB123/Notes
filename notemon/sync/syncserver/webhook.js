const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const { stdout } = require('process');
require('dotenv').config();

const app = express();
const PORT = process.env.WEBHOOK_PORT || 9000;

app.use(bodyParser.json());
app.use(express.json());

app.post('/webhook', (req, res) => {
    console.log('Received webhook event:', req.body);
    exec("git stash && git pull && git stash pop", (error, stdout) => {
        if (error) {
            console.error(`Error pulling changes: ${error.message}`);
            return res.status(500).send('Error pulling changes');
        }
        if (stdout) {
            console.log(`stdout: ${stdout}`);
            res.send(200);
            return;
        }
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ GitHub Webhook listener running on port ${PORT}`);
});
