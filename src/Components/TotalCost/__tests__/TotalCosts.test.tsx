import React from 'react'
import { render, screen } from '@testing-library/react'

import { AppContext } from '../../../Context'
import TotalCost from '../TotalCost'

const contextValue = {
  itemizedCosts: [1, 5, 3],
  sessionState: { quit: false },
  siteData: [
    ['o', 't', 't'],
    ['o', 'o', 't']
  ]
}

test('renders TotalCost', () => {
  const { asFragment } = render(
    <AppContext.Provider value={contextValue}>
      <TotalCost />
    </AppContext.Provider>
  )

  expect(asFragment()).toMatchSnapshot()
  expect(screen.getByText(/9 Credits/i)).toBeDefined()
})

test('handles quit state', () => {
  const { asFragment } = render(
    <AppContext.Provider
      value={{ ...contextValue, sessionState: { quit: true } }}
    >
      <TotalCost />
    </AppContext.Provider>
  )

  expect(screen.getByText(/18 Credits/i)).toBeDefined()
})
