import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import InvalidFileDialog from '../InvalidFileDialog'

describe('Quit Dialog', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <InvalidFileDialog isOpen handleClick={jest.fn()} />
    )
    expect(asFragment()).toMatchSnapshot()
    expect(screen.getByText(/Please reupload file/i)).toBeVisible()
  })

  it('closes dialog', async () => {
    const mockFn = jest.fn()
    render(<InvalidFileDialog isOpen handleClick={mockFn} />)
    await waitFor(() => userEvent.click(screen.getByTestId('close-dialog')))
    expect(mockFn).toHaveBeenCalled()
  })
})
