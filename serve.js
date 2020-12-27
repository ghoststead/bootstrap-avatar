const path = require('path');
const fs = require('fs');
const parseurl = require('parseurl')

const express = require('express');
const app = express();

const JSDELIVR = /https:\/\/cdn.jsdelivr.net\/npm\/bootstrap-avatar@latest/g;

function docs(req, res) {
    let pathname = parseurl(req).pathname;
    if (pathname.substr(-1) === '/') {
        pathname += 'index.html';
    }
    const fullPath = path.join(__dirname, 'docs', pathname);
    if (!fullPath.endsWith('.html')) {
        res.sendFile(fullPath);
        return;
    }

    let contents = fs.readFileSync(fullPath, 'utf8');
    contents = contents.replace(JSDELIVR, '');

    res.set('Content-Type', 'text/html');
    res.send(contents);
}

app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.use('/', docs);

app.listen(8080, function(){
  console.log("Listening on port 8080")
});
