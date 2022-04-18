import React from 'react'
import { render, screen } from '@testing-library/react'

import { AppContext } from '../../../Context'
import ProcessedCommands from '../ProcessedCommands'

const contextValue = {
  loggedCommands: ['ash', 'wini'],
  logCommand: () => undefined
}

test('renders App', () => {
  const { asFragment } = render(
    <AppContext.Provider value={contextValue}>
      <ProcessedCommands />
    </AppContext.Provider>
  )

  expect(asFragment()).toMatchSnapshot()
  expect(screen.getByText('ash')).toBeDefined()
})
