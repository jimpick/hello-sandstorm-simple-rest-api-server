const http = require('http')
const fs = require('fs')
const static = require('node-static')

const fileServer = new static.Server('./static')

http
  .createServer((request, response) => {
    console.log('Jim1 request', request.url, request.method)
    if (request.url === '/posts' || request.url === '/posts/') {
      if (request.method === 'GET') {
        response.setHeader('Content-Type', 'application/json')
        try {
          const value = fs.readFileSync('/var/value', 'utf8')
          response.end(JSON.stringify({ value }))
        } catch (e) {
          console.error('Error, returned default', e)
          response.end(JSON.stringify({ value: 'default' }))
        }
      } else if (request.method === 'POST') {
        console.log('Jim2')
        const chunks = []
        request.on('data', chunk => chunks.push(chunk))
        request.on('end', () => {
          const data = Buffer.concat(chunks)
          console.log('Data: ', data)
          try {
            const json = JSON.parse(data.toString())
            console.log('JSON: ', json)
            fs.writeFileSync('/var/value', json.value)
            response.end('Updated')
          } catch (e) {
            console.error('Error', e)
            response.statusCode = 500
            response.end('Exception')
          }
        })
      } else {
        response.statusCode = 404
        response.end('Not Found')
      }
    } else {
      fileServer.serve(request, response)
    }
  })
  .listen(8000)
