import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { AppContext } from '../../../Context'
import SiteMapInput from '../SiteMapInput'

const contextValue = {
  saveSiteData: jest.fn()
}

test('renders SiteMapInput', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <AppContext.Provider value={contextValue}>
        <SiteMapInput />
      </AppContext.Provider>
    </BrowserRouter>
  )

  expect(asFragment()).toMatchSnapshot()
})

test('uploads text file', async () => {
  const file = new File(['oootoo\noootoo'], 'input.txt', { type: 'text/plain' })
  render(
    <BrowserRouter>
      <AppContext.Provider value={contextValue}>
        <SiteMapInput />
      </AppContext.Provider>
    </BrowserRouter>
  )
  const uploadButton = screen.getByTestId('contained-button-file')

  await waitFor(() => userEvent.upload(uploadButton, file))

  const textFile = document.getElementById('contained-button-file')

  expect(textFile.files[0].name).toBe('input.txt')
  expect(textFile.files.length).toBe(1)
})

test('saves file data', async () => {
  const file = new File(['oootoo\noootoo'], 'input.txt', { type: 'text/plain' })
  const mockFn = jest.fn()
  render(
    <BrowserRouter>
      <AppContext.Provider value={{ saveSiteData: mockFn }}>
        <SiteMapInput />
      </AppContext.Provider>
    </BrowserRouter>
  )
  const uploadButton = screen.getByTestId('contained-button-file')

  await waitFor(() => userEvent.upload(uploadButton, file))

  const textFile = document.getElementById('contained-button-file')

  expect(textFile.files[0].name).toBe('input.txt')
  expect(textFile.files.length).toBe(1)
  await tick()
  // expect(mockFn).toHaveBeenCalled()
})

function tick() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}
