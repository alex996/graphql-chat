import React from 'react'
import { hydrate, render } from 'react-dom'
import { App } from './components'

const app = document.getElementById('app')

if (app.hasChildNodes()) {
  hydrate(<App />, app)
} else {
  render(<App />, app)
}
