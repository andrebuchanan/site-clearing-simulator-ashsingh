import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

test('renders App', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
  expect(asFragment()).toMatchSnapshot()
})
