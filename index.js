const http = require('http')
const url = require('url')

const argv = process.argv.slice(2)
const keepAlive = argv.length > 0 && argv[0] === '-k'
const setHeader = argv.length > 0 && argv[0] === '-H'

const u = url.parse('http://localhost:9876')
if (keepAlive) {
    console.log('set keepAlive for http agent\n')
    u.agent = new http.Agent({keepAlive: true})
}
if (setHeader) {
    console.log('set header: Connection: keep-alive\n')
    u.headers = {
        'Connection': 'keep-alive'
    }
}

const req = http.request(u, res => {
    const data = []
    res.on('data', chunk => {
        data.push(chunk)
    })
    res.on('end', () => {
        console.log('Response(Headers of Request): ')
        console.log(Buffer.concat(data).toString())
    })
})
req.end()

setTimeout(() => {
}, 8000)
