import React from 'react'
import cheerio from 'cheerio'
import { promises as fs } from 'fs'
import { renderToString } from 'react-dom/server'
import { App } from '../src/components'
//
;(async () => {
  try {
    const filePath = 'dist/index.html'

    const contents = await fs.readFile(filePath, 'utf-8')

    const $ = cheerio.load(contents)

    $('div#app').html(renderToString(<App />))

    await fs.writeFile(filePath, $.html())
  } catch (e) {
    console.error(e)
  }
})()
