#!/usr/bin/env node

'use strict';

var http         = require('http'),
    httpProxy    = require('http-proxy'),
    finalhandler = require('finalhandler'),
    program      = require('commander'),
    serveStatic  = require('serve-static');

var serve = serveStatic('./');
var proxy = httpProxy.createProxyServer({});

program
  .version('1.0.0')
  .option('-s, --static <static path>', 'Set static folder path', './')
  .option('-P, --port <port>', 'Local port', 5000)
  .option('-p, --path <api path>', 'API redirect path', '/api')
  .option('-r, --remote <http address>', 'Remote address')
  .parse(process.argv);

var staticPath = program.static;
var target = program.remote;
var api = program.path;
var port = program.port;

if(!target){
  console.log('No remote. Ending...');
  return 1;
}

console.log('Running CORS PROXY for %s on %s for %s at %s', target, port, api, staticPath)

var server = http.createServer(function(req, res) {
  if (req.url.indexOf(api) !== -1) {
    console.log('Going Proxy %s', req.url);
    proxy.web(req, res, {
      target: target
    });
  } else {
    console.log('Local Server');
    var done = finalhandler(req, res);
    serve(req, res, done);
  }
});
server.listen(port);
