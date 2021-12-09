import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import Accordion from '..'

describe('<Accordion />', () => {
  test('should render title correctly', () => {
    const { rerender } = renderWithProviders(
      <Accordion title="string title">content</Accordion>,
    )

    expect(screen.getByText('string title')).toBeInTheDocument()

    rerender(
      <Accordion title={<div role="none">node title</div>}>content</Accordion>,
    )

    expect(screen.getByRole('none')).toHaveTextContent('node title')
  })

  test('should control its own state', () => {
    renderWithProviders(
      <Accordion>
        <div role="none" />
      </Accordion>,
    )

    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toHaveAccessibleName('Open')
    expect(screen.queryByRole('none')).not.toBeInTheDocument()

    userEvent.click(buttonElement)
    expect(buttonElement).toHaveAccessibleName('Close')
    expect(screen.queryByRole('none')).toBeInTheDocument()

    userEvent.click(buttonElement)
    expect(buttonElement).toHaveAccessibleName('Open')
    expect(screen.queryByRole('none')).not.toBeInTheDocument()
  })

  test('should be controlled', () => {
    const { rerender } = renderWithProviders(
      <Accordion open={false}>
        <div role="none" />
      </Accordion>,
    )

    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toHaveAccessibleName('Open')
    expect(screen.queryByRole('none')).not.toBeInTheDocument()

    rerender(
      <Accordion open>
        <div role="none" />
      </Accordion>,
    )

    expect(buttonElement).toHaveAccessibleName('Close')
    expect(screen.queryByRole('none')).toBeInTheDocument()

    rerender(
      <Accordion open={false}>
        <div role="none" />
      </Accordion>,
    )

    expect(buttonElement).toHaveAccessibleName('Open')
    expect(screen.queryByRole('none')).not.toBeInTheDocument()
  })

  test('should be allowed to set an initial value', () => {
    renderWithProviders(
      <Accordion initialValue>
        <div role="none" />
      </Accordion>,
    )

    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toHaveAccessibleName('Close')
    expect(screen.queryByRole('none')).toBeInTheDocument()

    userEvent.click(buttonElement)
    expect(buttonElement).toHaveAccessibleName('Open')
    expect(screen.queryByRole('none')).not.toBeInTheDocument()

    userEvent.click(buttonElement)
    expect(buttonElement).toHaveAccessibleName('Close')
    expect(screen.queryByRole('none')).toBeInTheDocument()
  })
})
