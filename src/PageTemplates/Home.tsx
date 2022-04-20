import React, { useContext, useEffect } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { AppContext } from '../Context'
import { SiteMapInput } from '../Components'

export const Home = () => {
  const { clearCommands, clearCosts, clearSiteData, updateSession } =
    useContext(AppContext)

  useEffect(() => {
    clearCommands()
    clearCosts()
    clearSiteData()
    updateSession({ init: true, quit: false })
  }, [])

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
