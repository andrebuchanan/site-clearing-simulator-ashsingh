import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import React from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { AppContext, AppContextProvider } from './Context'

import {
  ItemizedCosts,
  ProcessedCommands,
  SiteMap,
  SiteMapInput
} from './Components'

const App = () => {
  return (
    <AppContextProvider>
      <AppContext.Consumer>
        {({ siteData }) => (
          <div className="App">
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h3" component="div" gutterBottom>
                Clear Site
              </Typography>
              <SiteMapInput />
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <ProcessedCommands />
                </Grid>
                <Grid item xs={6}>
                  {siteData.length ? <SiteMap /> : 'Upload Sitemap.'}
                </Grid>
                <Grid item xs={3}>
                  <ItemizedCosts />
                </Grid>
              </Grid>
            </Box>
          </div>
        )}
      </AppContext.Consumer>
    </AppContextProvider>
  )
}

export default App

// "start": "ESLINT_NO_DEV_ERRORS='true' react-scripts start",
