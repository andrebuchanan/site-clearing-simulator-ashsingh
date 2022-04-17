import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import React from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { ItemizedCosts, ProcessedCommands, SiteMap } from './Components'

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
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h3" component="div" gutterBottom>
          Clear Site
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <ProcessedCommands />
          </Grid>
          <Grid item xs={6}>
            <SiteMap data={data} />
          </Grid>
          <Grid item xs={3}>
            <ItemizedCosts />
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default App

// "start": "ESLINT_NO_DEV_ERRORS='true' react-scripts start",
