import React from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import { ItemizedCosts, ProcessedCommands, TotalCost } from '../Components'

export const SitemapResults = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ProcessedCommands />
        </Grid>
        <Grid item xs={6}>
          <ItemizedCosts />
        </Grid>
      </Grid>
      <TotalCost />
    </Box>
  )
}

export default SitemapResults
