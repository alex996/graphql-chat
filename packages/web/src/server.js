import React from 'react'
import express from 'express'
import { renderToString } from 'react-dom/server'
import { App } from './components'

const {
  HTTP_PORT = 4000,
  NODE_ENV = 'development',
  API_HOST = 'localhost',
  API_PORT = 3000,
  API_URI = '/graphql'
} = process.env

const IN_DEV = NODE_ENV === 'development'

;(async () => {
  try {
    const app = express()

    app.use(express.static('dist'))

    if (IN_DEV) {
      const { default: proxy } = await import('http-proxy-middleware')

      app.use(
        API_URI,
        proxy({
          target: `http://${API_HOST}:${API_PORT}`,
          changeOrigin: true
        })
      )
    }

    app.get('/', (req, res) => {
      const html = renderToString(<App />)

      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Chat</title>
        </head>
        <body>
          <div id="app">${html}</div>
          <script>
            window.__APOLLO_URL__ = '${API_URI}'
          </script>
          <script defer src="/main.js"></script>
        </body>
        </html>
      `)
    })

    app.listen(HTTP_PORT, () => console.log(`http://localhost:${HTTP_PORT}`))
  } catch (e) {
    console.error(e)
  }
})()
