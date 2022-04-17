import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders App', () => {
  render(<App />)
  const hello = screen.getByText(/clear site/i)
  expect(hello).toBeInTheDocument()
})
