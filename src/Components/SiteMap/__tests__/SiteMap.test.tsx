import React from 'react'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SiteMap from '../SiteMap'
import mocks from '../__mocks__/test.mock'

afterEach(cleanup)

describe('SiteMap', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<SiteMap data={mocks} />)
    expect(screen.getByTestId('go-left').closest('button')).toBeDisabled()
    expect(asFragment()).toMatchSnapshot()
  })

  it('bulldozer enters site', async () => {
    render(<SiteMap data={mocks} />)
    await waitFor(() => userEvent.click(screen.getByTestId('go-advance')))
    expect(screen.getByTestId('ArrowForwardIcon')).toBeDefined()
    expect(screen.getByTestId('go-left').closest('button')).not.toBeDisabled()
  })

  it('bulldozer goes advance', async () => {
    render(<SiteMap data={mocks} />)
    // enter
    await waitFor(() => userEvent.click(screen.getByTestId('go-advance')))

    // go down
    await waitFor(() => userEvent.click(screen.getByTestId('go-right')))
    await waitFor(() => userEvent.click(screen.getByTestId('go-advance')))
    // go right
    await waitFor(() => userEvent.click(screen.getByTestId('go-left')))
    await waitFor(() => userEvent.click(screen.getByTestId('go-advance')))
    // go up
    await waitFor(() => userEvent.click(screen.getByTestId('go-left')))
    await waitFor(() => userEvent.click(screen.getByTestId('go-advance')))
    // go left
    await waitFor(() => userEvent.click(screen.getByTestId('go-left')))
    await waitFor(() => userEvent.click(screen.getByTestId('go-advance')))

    expect(screen.getByTestId('ArrowBackIcon')).toBeDefined()
    expect(
      screen.getByTestId('ArrowBackIcon').closest('div')?.textContent
    ).toEqual('o')
  })

  it('bulldozer goes right', async () => {
    render(<SiteMap data={mocks} />)
    await waitFor(() => userEvent.click(screen.getByTestId('go-advance')))
    await waitFor(() => userEvent.click(screen.getByTestId('go-advance')))

    await waitFor(() => userEvent.click(screen.getByTestId('go-right')))
    await waitFor(() => userEvent.click(screen.getByTestId('go-right')))
    await waitFor(() => userEvent.click(screen.getByTestId('go-right')))
    await waitFor(() => userEvent.click(screen.getByTestId('go-right')))

    expect(screen.getByTestId('ArrowForwardIcon')).toBeDefined()
    expect(
      screen.getByTestId('ArrowForwardIcon').closest('div')?.textContent
    ).toEqual('o')
  })

  it('bulldozer goes left', async () => {
    render(<SiteMap data={mocks} />)
    await waitFor(() => userEvent.click(screen.getByTestId('go-advance')))
    await waitFor(() => userEvent.click(screen.getByTestId('go-advance')))
    await waitFor(() => userEvent.click(screen.getByTestId('go-right')))

    await waitFor(() => userEvent.click(screen.getByTestId('go-left')))
    await waitFor(() => userEvent.click(screen.getByTestId('go-left')))
    await waitFor(() => userEvent.click(screen.getByTestId('go-left')))
    await waitFor(() => userEvent.click(screen.getByTestId('go-left')))

    expect(screen.getByTestId('ArrowDownwardIcon')).toBeDefined()
    expect(
      screen.getByTestId('ArrowDownwardIcon').closest('div')?.textContent
    ).toEqual('o')
  })

  it('exits sitemap gracefully, column', async () => {
    render(<SiteMap data={mocks} />)
    await waitFor(() => userEvent.click(screen.getByTestId('go-advance')))
    await waitFor(() => userEvent.click(screen.getByTestId('go-advance')))
    await waitFor(() => userEvent.click(screen.getByTestId('go-advance')))
    await waitFor(() => userEvent.click(screen.getByTestId('go-advance')))

    expect(screen.getByTestId('go-left').closest('button')).toBeDisabled()
  })

  it('exits sitemap gracefully, row', async () => {
    render(<SiteMap data={mocks} />)
    await waitFor(() => userEvent.click(screen.getByTestId('go-advance')))
    await waitFor(() => userEvent.click(screen.getByTestId('go-left')))

    expect(screen.getByTestId('go-left').closest('button')).toBeDisabled()
  })
})
