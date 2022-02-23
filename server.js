const { fstat } = require('fs');
var http = require('http');

http.createServer(function (req, res) {
  fs.readFile('main.js', function (err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end();
    return res.end();
  });
}).listen(8080);

