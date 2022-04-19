import React, { useContext } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import { AppContext } from '../../Context'

const data = [
  ['o', 'o', 't', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
  ['o', 'o', 't', 'o', 'o', 'o', 'o', 'T', 'o', 'o'],
  ['r', 'r', 'r', 'o', 'o', 'o', 't', 'T', 'o', 'o'],
  ['r', 'r', 'r', 'r', 'o', 'o', 'o', 'o', 'o', 'o'],
  ['r', 'r', 'r', 'r', 'r', 't', 'o', 'o', 'o', 'o']
]

const SiteMapInput = () => {
  const { saveSiteData } = useContext(AppContext)
  const saveData = () => {
    saveSiteData(data)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button data-testid="go-left" variant="contained" onClick={saveData}>
            Load Sitemap
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SiteMapInput

// "start": "ESLINT_NO_DEV_ERRORS='true' react-scripts start",
