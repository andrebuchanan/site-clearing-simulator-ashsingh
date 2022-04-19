import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { SiteMapInput } from '../Components'

export const Home = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h3" component="div" gutterBottom>
        Clear Site
      </Typography>
      <SiteMapInput />
    </Box>
  )
}

export default Home
