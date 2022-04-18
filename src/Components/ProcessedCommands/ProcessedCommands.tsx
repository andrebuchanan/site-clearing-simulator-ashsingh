import React, { useContext } from 'react'
import uniqid from 'uniqid'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

import { AppContext } from '../../Context'

export const ProcessedCommands = () => {
  const { loggedCommands } = useContext(AppContext)
  return (
    <>
      <Typography variant="h6" component="div" gutterBottom>
        Processed Commands
      </Typography>
      <List>
        {loggedCommands.map((command) => (
          <ListItem key={uniqid()} disablePadding>
            <ListItemText primary={command} />
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default ProcessedCommands
