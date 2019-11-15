const http = require("http");
const url = require("url");
const cli = require("cli");

const options = cli.parse({
  keepalive: ["k", "make agent keepalive", true, false],
  setheader: ["H", "set request header Connection ", true, false],
  requests: ["N", "number of requests to send", "int", 1000],
  interval: ["i", "interval to send request", "int", 20]
});

const keepAlive = options.keepalive;
const setHeader = options.setheader;
const requests = options.requests;
const interval = options.interval;

const u = url.parse("http://localhost:9876");
if (keepAlive) {
  console.log("set keepAlive for http agent\n");
  u.agent = new http.Agent({ keepAlive: true });
}
if (setHeader) {
  console.log("set header: Connection: keep-alive\n");
  u.headers = {
    Connection: "keep-alive"
  };
}

const falseFn = () => {};

let count = 0;
const tid = setInterval(() => {
  if (count >= requests) {
    clearInterval(tid);
    console.log(count + " requests sent");
    return;
  }
  http
    .request(u, res => {
      res.on("data", falseFn);
      res.on("end", falseFn);
    })
    .end();
  count++;
}, interval);

setTimeout(falseFn, 8000);
