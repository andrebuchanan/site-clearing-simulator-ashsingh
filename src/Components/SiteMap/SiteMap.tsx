import * as React from 'react'
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
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

export type SiteMapProps = {
  data: string[][]
}

export const SiteMap = ({ data }: SiteMapProps) => {
  const [begin, setBegin] = React.useState(true)
  const [active, setActive] = React.useState({ row: -1, column: 0 })
  const [direction, setDirection] = React.useState(Direction.Right)

  console.log('active', active.row, active.column)
  console.log('direction', direction)

  React.useEffect(() => {
    const { row, column } = active
    if (!begin && (data[row] || [])[column] === undefined) {
      alert('Quit')
      setActive({ row: -1, column: 0 })
      setBegin(true)
    }
  }, [active])

  const grid = []

  const enterSite = () => {
    setActive((prevState) => ({
      ...prevState,
      row: 0
    }))
    setDirection(Direction.Right)
    setBegin(false)
  }

  const goAdvance = () => {
    if (begin) {
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
    return undefined
  }

  const goLeft = () => {
    switch (direction) {
      case Direction.Down:
        setActive((prevState) => ({
          ...prevState,
          column: prevState.column + 1
        }))
        setDirection(Direction.Right)
        break
      case Direction.Left:
        setActive((prevState) => ({
          ...prevState,
          row: prevState.row + 1
        }))
        setDirection(Direction.Down)
        break
      case Direction.Right:
        setActive((prevState) => ({
          ...prevState,
          row: prevState.row - 1
        }))
        setDirection(Direction.Up)
        break
      case Direction.Up:
        setActive((prevState) => ({
          ...prevState,
          column: prevState.column - 1
        }))
        setDirection(Direction.Left)
        break
      default:
    }
  }

  const goRight = () => {
    console.log('right', active)
    switch (direction) {
      case Direction.Down:
        setActive((prevState) => ({
          ...prevState,
          column: prevState.column - 1
        }))
        setDirection(Direction.Left)
        break
      case Direction.Left:
        setActive((prevState) => ({
          ...prevState,
          row: prevState.row - 1
        }))
        setDirection(Direction.Up)
        break
      case Direction.Right:
        setActive((prevState) => ({
          ...prevState,
          row: prevState.row + 1
        }))
        setDirection(Direction.Down)
        break
      case Direction.Up:
        setActive((prevState) => ({
          ...prevState,
          column: prevState.column + 1
        }))
        setDirection(Direction.Right)
        break
      default:
    }
  }

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

  return (
    <Box sx={{ width: '100%' }}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        columns={data[0].length}
      >
        {grid}
      </Grid>
      <Button
        data-testid="go-left"
        disabled={begin}
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
        disabled={begin}
        variant="contained"
        onClick={goRight}
      >
        Right
      </Button>
    </Box>
  )
}

export default SiteMap
