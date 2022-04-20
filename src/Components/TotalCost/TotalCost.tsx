import React, { useContext } from 'react'

import Typography from '@mui/material/Typography'

import { AppContext } from '../../Context'

export const TotalCost = () => {
  const { itemizedCosts, sessionState, siteData } = useContext(AppContext)

  // calculate cost of visited squares
  let totalCost = itemizedCosts.reduce((acc, i) => acc + i, 0)

  // calculate cost of uncleared squares
  if (sessionState.quit) {
    for (let i = 0; i < siteData.length; i += 1) {
      for (let j = 0; j < siteData[0].length; j += 1) {
        const terrainType = siteData[i][j]
        if (terrainType === 'r' || terrainType === 't') totalCost += 3
      }
    }
  }

  return (
    <Typography variant="h6" component="div" gutterBottom>
      Total Cost: {totalCost} Credits
    </Typography>
  )
}

export default TotalCost
