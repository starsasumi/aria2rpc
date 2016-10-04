#!/usr/bin/env node
if (process.argv.length != 4) {
  console.log(`Usage: aria2rpc <token> <uri>`);
  return;
}
console.log(`aria2rpc is about to download: ${process.argv[3]}`);

var http = require("http");

var options = {
  "method": "POST",
  "hostname": "localhost",
  "port": "6800",
  "path": "/jsonrpc",
  "headers": {
    "content-type": "application/json"
  }
};

var body = JSON.stringify({
  jsonrpc: '2.0',
  id: 'qwer',
  method: 'aria2.addUri',
  params: [
    `token:${process.argv[2]}`,
    [ process.argv[3] ]
  ]
});

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
}).end(body);
