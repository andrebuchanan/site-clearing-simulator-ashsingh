import React, { useContext, useEffect, useState } from 'react'
import uniqid from 'uniqid'

import { styled } from '@mui/material/styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

import { AppContext } from '../../Context'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 40,
  width: 40
}))

enum Direction {
  Down = 'Down',
  Left = 'Left',
  Right = 'Right',
  Up = 'Up'
}

const bulldozer = (direction: string) => {
  switch (direction) {
    case Direction.Down:
      return <ArrowDownwardIcon />
    case Direction.Left:
      return <ArrowBackIcon />
    case Direction.Right:
      return <ArrowForwardIcon />
    case Direction.Up:
      return <ArrowUpwardIcon />
    default:
      return null
  }
}

export const SiteMap = () => {
  const {
    logCommand,
    saveSiteData,
    sessionState,
    siteData: data,
    updateCost,
    updateSession
  } = useContext(AppContext)

  const [active, setActive] = useState({ row: -1, column: 0 })
  const [direction, setDirection] = useState(Direction.Right)

  const gridElement = () => {
    const grid = []

    for (let i = 0; i < data.length; i += 1) {
      for (let j = 0; j < data[0].length; j += 1) {
        grid.push(
          <Grid item xs={1} key={uniqid()}>
            <Item
              sx={{
                backgroundColor:
                  active.row === i && active.column === j ? 'green' : '#fff'
              }}
            >
              <>
                {data[i][j]}
                {active.row === i && active.column === j
                  ? bulldozer(direction)
                  : bulldozer('default')}
              </>
            </Item>
          </Grid>
        )
      }
    }

    return grid
  }

  const quit = () => {
    updateSession({ init: true, quit: true })
    setActive({ row: -1, column: 0 })
  }

  const updateTerrain = () => {
    const { row, column } = active
    switch (data[row][column]) {
      case 'r':
      case 't': {
        const changedData = [...data]
        changedData[row][column] = 'o'
        saveSiteData(changedData)
        updateCost(2)
        break
      }
      case 'T':
        // quit
        quit()
        break
      default: {
        updateCost(1)
      }
    }
    return undefined
  }

  useEffect(() => {
    const { row, column } = active
    const { init } = sessionState
    if (!init) {
      if ((data[row] || [])[column] === undefined) {
        quit()
      } else {
        // Update Land
        updateTerrain()
      }
    }
  }, [active])

  const enterSite = () => {
    setActive((prevState) => ({
      ...prevState,
      row: 0
    }))
    logCommand('Advance: Bulldozer goes Right.')
    setDirection(Direction.Right)
    updateSession({ ...sessionState, init: false })
  }

  const goAdvance = () => {
    if (sessionState.init) {
      return enterSite()
    }

    switch (direction) {
      case Direction.Down:
        setActive((prevState) => ({
          ...prevState,
          row: prevState.row + 1
        }))
        break
      case Direction.Left:
        setActive((prevState) => ({
          ...prevState,
          column: prevState.column - 1
        }))
        break
      case Direction.Right:
        setActive((prevState) => ({
          ...prevState,
          column: prevState.column + 1
        }))
        break
      case Direction.Up:
        setActive((prevState) => ({
          ...prevState,
          row: prevState.row - 1
        }))
        break
      default:
    }

    logCommand(`Advance: Bulldozer goes ${direction}`)

    return undefined
  }

  const goLeft = () => {
    let message = 'Left: Bulldozer goes '
    switch (direction) {
      case Direction.Down:
        setActive((prevState) => ({
          ...prevState,
          column: prevState.column + 1
        }))
        setDirection(Direction.Right)
        message += Direction.Right
        break
      case Direction.Left:
        setActive((prevState) => ({
          ...prevState,
          row: prevState.row + 1
        }))
        setDirection(Direction.Down)
        message += Direction.Down
        break
      case Direction.Right:
        setActive((prevState) => ({
          ...prevState,
          row: prevState.row - 1
        }))
        setDirection(Direction.Up)
        message += Direction.Up
        break
      case Direction.Up:
        setActive((prevState) => ({
          ...prevState,
          column: prevState.column - 1
        }))
        setDirection(Direction.Left)
        message += Direction.Left
        break
      default:
    }
    logCommand(message)
  }

  const goRight = () => {
    let message = 'Right: Bulldozer goes '
    switch (direction) {
      case Direction.Down:
        setActive((prevState) => ({
          ...prevState,
          column: prevState.column - 1
        }))
        setDirection(Direction.Left)
        message += Direction.Left
        break
      case Direction.Left:
        setActive((prevState) => ({
          ...prevState,
          row: prevState.row - 1
        }))
        setDirection(Direction.Up)
        message += Direction.Up
        break
      case Direction.Right:
        setActive((prevState) => ({
          ...prevState,
          row: prevState.row + 1
        }))
        setDirection(Direction.Down)
        message += Direction.Down
        break
      case Direction.Up:
        setActive((prevState) => ({
          ...prevState,
          column: prevState.column + 1
        }))
        setDirection(Direction.Right)
        message += Direction.Right
        break
      default:
    }
    logCommand(message)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        columns={data[0].length}
      >
        {gridElement()}
      </Grid>
      <Button
        data-testid="go-left"
        disabled={sessionState.init}
        variant="contained"
        onClick={goLeft}
      >
        Left
      </Button>
      <Button data-testid="go-advance" variant="contained" onClick={goAdvance}>
        Advance
      </Button>
      <Button
        data-testid="go-right"
        disabled={sessionState.init}
        variant="contained"
        onClick={goRight}
      >
        Right
      </Button>
    </Box>
  )
}

export default SiteMap
