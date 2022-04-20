import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import { AppContext } from '../Context'
import {
  ItemizedCosts,
  ProcessedCommands,
  SiteMap,
  TotalCost
} from '../Components'

export const SitemapView = () => {
  const { siteData, sessionState, updateSession } = useContext(AppContext)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (sessionState.quit) updateSession({ init: true, quit: true })
  }, [])

  const handleQuit = () => {
    updateSession({ init: true, quit: true })
    navigate('/results')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <ProcessedCommands />
        </Grid>
        <Grid item xs={6}>
          {siteData.length ? (
            <SiteMap />
          ) : (
            <Button variant="contained" onClick={() => navigate('/')}>
              Upload Sitemap
            </Button>
          )}
        </Grid>
        <Grid item xs={3}>
          <ItemizedCosts />
        </Grid>
      </Grid>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TotalCost />
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" onClick={handleQuit}>
              Quit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default SitemapView
