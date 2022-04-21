import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import Home from '../Home'

import { AppContext } from '../../Context'

const contextValue = {
  clearCommands: jest.fn(),
  clearCosts: jest.fn(),
  clearSiteData: jest.fn(),
  updateSession: jest.fn()
}

test('renders Home', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <AppContext.Provider value={contextValue}>
        <Home />
      </AppContext.Provider>
    </BrowserRouter>
  )
  expect(asFragment()).toMatchSnapshot()
})
