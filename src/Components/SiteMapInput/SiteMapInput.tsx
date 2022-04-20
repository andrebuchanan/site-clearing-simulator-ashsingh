import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'

import { AppContext } from '../../Context'

import { InvalidFileDialog } from '..'

// const data = [
//   ['o', 'o', 't', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
//   ['o', 'o', 't', 'o', 'o', 'o', 'o', 'T', 'o', 'o'],
//   ['r', 'r', 'r', 'o', 'o', 'o', 't', 'T', 'o', 'o'],
//   ['r', 'r', 'r', 'r', 'o', 'o', 'o', 'o', 'o', 'o'],
//   ['r', 'r', 'r', 'r', 'r', 't', 'o', 'o', 'o', 'o']
// ]

const SiteMapInput = () => {
  const { saveSiteData } = useContext(AppContext)
  const [fileInput, setFileInput] = useState<string[][]>([])
  const [invalid, setInvalid] = useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (fileInput.length) {
      saveSiteData(fileInput)
      navigate('/sitemap')
    }
  }, [fileInput])

  const Input = styled('input')({
    display: 'none'
  })

  const handleFileInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault()
    const files = event.target.files || []
    const file = files[0]

    // return if not text file
    if (!file || file.type !== 'text/plain') return setInvalid(true)

    const reader = new FileReader()

    reader.onload = async (e) => {
      const text = e.target?.result
      if (!text) return setInvalid(true)
      // create 1D Array from text
      const textArr = text?.toString().split('\n')
      if (!textArr) return setInvalid(true)
      // Create 2D Array
      const matrix = textArr?.map((row) => row.split(''))
      if (!matrix) return setInvalid(true)
      // validate 2D Array
      const validMatrix = matrix?.every(
        (row) => row.length === matrix[0].length
      )
      if (!validMatrix) return setInvalid(true)

      return setFileInput(matrix)
    }
    return reader.readAsText(file)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <label htmlFor="contained-button-file">
            <Input
              id="contained-button-file"
              type="file"
              onChange={handleFileInput}
            />
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
          {/* <Button variant="contained" onClick={saveData}>
            Load Sitemap
          </Button> */}
        </Grid>
      </Grid>
      <InvalidFileDialog
        isOpen={invalid}
        handleClick={() => setInvalid(false)}
      />
    </Box>
  )
}

export default SiteMapInput
