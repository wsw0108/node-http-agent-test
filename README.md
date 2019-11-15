# node-http-agent

## `node-http-agent -i 0`
- `node index.js`, Server -> Client, TIME_WAIT
- `node index.js -H`, Client -> Server, TIME_WAIT
- `node index.js -k`, Client <-> Server, ESTABLISHED(8s); (Windows: None) (Linux: Client -> Server, TIME_WAIT)

## `node-http-agent -i 5`
- `node index.js`, Server -> Client, TIME_WAIT
- `node index.js -H`, Client -> Server, TIME_WAIT
- `node index.js -k`, Client <-> Server, ESTABLISHED(5s); Server -> Client, TIME_WAIT 

## `node-http-agent -i 15`
- `node index.js`, Server -> Client, TIME_WAIT
- `node index.js -H`, Client -> Server, TIME_WAIT
- `node index.js -k`, Client <-> Server, ESTABLISHED(8s); (Windows: None) (Linux: Client -> Server, TIME_WAIT)
