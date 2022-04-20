import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

type InvalidFileDialogProps = {
  isOpen: boolean
  handleClick: () => void
}

export const InvalidFileDialog = ({
  isOpen,
  handleClick
}: InvalidFileDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClick}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          The file you have uploaded is invalid. Please reupload file.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} autoFocus data-testid="close-dialog">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default InvalidFileDialog
