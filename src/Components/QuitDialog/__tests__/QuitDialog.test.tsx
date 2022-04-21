import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { AppContext } from '../../../Context'
import QuitDialog from '../QuitDialog'

const contextValue = {
  sessionState: { quit: false },
  updateSession: jest.fn()
}

describe('Quit Dialog', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <AppContext.Provider value={contextValue}>
          <QuitDialog />
        </AppContext.Provider>
      </BrowserRouter>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders dialog', () => {
    render(
      <BrowserRouter>
        <AppContext.Provider
          value={{ ...contextValue, sessionState: { quit: true } }}
        >
          <QuitDialog />
        </AppContext.Provider>
      </BrowserRouter>
    )
    expect(screen.getByText(/Your session has ended/i)).toBeVisible()
  })

  it('closes dialog', async () => {
    render(
      <BrowserRouter>
        <AppContext.Provider
          value={{ ...contextValue, sessionState: { quit: true } }}
        >
          <QuitDialog />
        </AppContext.Provider>
      </BrowserRouter>
    )
    await waitFor(() => userEvent.click(screen.getByTestId('close-dialog')))
    expect(screen.getByText(/Your session has ended/i)).not.toBeVisible()
  })
})
