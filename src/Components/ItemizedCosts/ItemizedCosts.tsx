import React, { useContext } from 'react'
import uniqid from 'uniqid'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

import { AppContext } from '../../Context'

export const ItemizedCosts = () => {
  const { itemizedCosts } = useContext(AppContext)
  return (
    <>
      <Typography variant="h6" component="div" gutterBottom>
        Itemized Costs
      </Typography>
      <List>
        {itemizedCosts.map((cost) => (
          <ListItem key={uniqid()} disablePadding>
            <ListItemText primary={`${cost} credits`} />
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default ItemizedCosts
