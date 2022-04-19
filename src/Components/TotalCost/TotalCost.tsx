import React, { useContext } from 'react'

import Typography from '@mui/material/Typography'

import { AppContext } from '../../Context'

export const TotalCost = () => {
  const { itemizedCosts } = useContext(AppContext)
  const totalCost = itemizedCosts.reduce((acc, i) => acc + i, 0)
  return (
    <Typography variant="h6" component="div" gutterBottom>
      Total Cost: {totalCost} Credits
    </Typography>
  )
}

export default TotalCost
