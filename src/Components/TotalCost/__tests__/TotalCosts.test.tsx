import React from 'react'
import { render, screen } from '@testing-library/react'

import { AppContext } from '../../../Context'
import TotalCost from '../TotalCost'

const contextValue = {
  itemizedCosts: [1, 5, 3]
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
