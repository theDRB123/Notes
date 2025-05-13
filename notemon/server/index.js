require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

const { exec } = require('child_process');

// Allow cross-origin requests from React dev server
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8081;
const HOST = process.env.HOST || '0.0.0.0';

const NOTES_DIR = path.resolve(__dirname, '../../Notes/Hosted');

function getMarkdownFiles(dir, base = '') {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    let mdFiles = [];

    for (const file of files) {
        const relPath = path.join(base, file.name);
        const fullPath = path.join(dir, file.name);

        if (file.isDirectory()) {
            mdFiles = mdFiles.concat(getMarkdownFiles(fullPath, relPath));
        } else if (file.isFile() && file.name.endsWith('.md')) {
            mdFiles.push({
                name: file.name.replace('.md', ''),
                path: relPath.replace(/\\/g, '/').replace('.md', ''),
            });
        }
    }

    return mdFiles;
}

app.post('/md/file', (req, res) => {
    const requestedPath = req.body.path;

    if (!requestedPath) {
        return res.status(400).send('Missing "path" in request body');
    }

    const filePath = path.resolve(NOTES_DIR, `${requestedPath}.md`);

    // Prevent directory traversal
    if (!filePath.startsWith(NOTES_DIR)) {
        return res.status(403).send('Access denied');
    }

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found');
    }

    res.sendFile(filePath);
});

app.get('/img/:imageName', (req, res) => {
    const { imageName } = req.params;
    const imagePath = path.resolve(NOTES_DIR, `Images/${imageName}`);
    if (!imagePath.startsWith(NOTES_DIR)) {
        return res.status(403).send('Access denied');
    }

    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(404).send('Image not found.');
        }
    });
});

app.get('test', (req, res) => {
    res.send('test');
});

app.get('update', (req, res) => {
    exec('/app/scripts/gitpull.sh', (err, stdout, stderr) => {
        if (err) {
            console.error('Script failed:', stderr);
        } else {
            console.log('Script output:', stdout);
        }
    });
});



app.get('/md/getDirectory', (req, res) => {
    try {
        const files = getMarkdownFiles(NOTES_DIR);
        res.json(files);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error reading directory');
    }
});

app.listen(PORT, HOST, () => {
    console.log(`✅ Markdown server running at http://${HOST}:${PORT}`);
});

