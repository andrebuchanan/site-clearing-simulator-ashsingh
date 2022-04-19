import React from 'react'
import { render, screen } from '@testing-library/react'

import { AppContext } from '../../../Context'
import ItemizedCosts from '../ItemizedCosts'

const contextValue = {
  itemizedCosts: [0, 0, 7]
}

test('renders App', () => {
  const { asFragment } = render(
    <AppContext.Provider value={contextValue}>
      <ItemizedCosts />
    </AppContext.Provider>
  )

  expect(asFragment()).toMatchSnapshot()
  expect(screen.getByText('7 credits')).toBeDefined()
})
