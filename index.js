const http = require('http');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const port = 5500;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "./"))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

const server = http.createServer(function (req, res) {

    if (req.url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end('This is Home Page')
    }
    else if (req.url === "/about") {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end('This is About Page')
    }
    else if (req.url === "/contact") {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end('This is Contact Page')
    }
    else if (req.url === "/file-write") {
        fs.writeFile("demo.txt", "hello world", function (err) {
            if (err) {
                res.end("File Operation Failed");
            }
            else {
                res.end("File Operation Successful");
            }
        })
    }
    else if (req.method === "POST" && req.url === "/upload") {
        const moveFile = upload.single("myFile")(req, res, (err) => {
            if (err) {
                return res.end('Error uploading file.');
            }
            res.end('File uploaded successfully.');
        })
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end('Sorry Wrong Page')
    }




}).listen(port, function () {
    console.log(`Server is running on ${port} port`);
})