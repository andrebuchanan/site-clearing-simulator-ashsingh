import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

import { AppContext } from '../../Context'

export const QuitDialog = () => {
  const { sessionState, updateSession } = useContext(AppContext)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (sessionState.quit) {
      setOpen(true)
      updateSession({ ...sessionState, quit: false })
    }
  }, [sessionState])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Your session has ended.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus data-testid="close-dialog">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default QuitDialog
