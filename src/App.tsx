import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import React from 'react'

import { SiteMap } from './Components'

const data = [
  ['o', 'o', 't', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
  ['o', 'o', 't', 'o', 'o', 'o', 'o', 'T', 'o', 'o'],
  ['r', 'r', 'r', 'o', 'o', 'o', 't', 'T', 'o', 'o'],
  ['r', 'r', 'r', 'r', 'o', 'o', 'o', 'o', 'o', 'o'],
  ['r', 'r', 'r', 'r', 'r', 't', 'o', 'o', 'o', 'o']
]

function App() {
  return (
    <div className="App">
      <h1>Clear Site</h1>
      <SiteMap data={data} />
    </div>
  )
}

export default App

// "start": "ESLINT_NO_DEV_ERRORS='true' react-scripts start",
