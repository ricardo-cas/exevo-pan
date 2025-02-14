import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import Header from '..'

describe('<Header />', () => {
  test('aria-current should highlight the current page', () => {
    const { container } = renderWithProviders(<Header />)

    const [logo, currentAuctions, bazaarHistory, statistics, war, about] =
      container.querySelectorAll('a')

    expect(logo).not.toHaveAttribute('aria-current', 'page')
    expect(currentAuctions).toHaveAttribute('aria-current', 'page')
    expect(bazaarHistory).not.toHaveAttribute('aria-current', 'page')
    expect(statistics).not.toHaveAttribute('aria-current', 'page')
    expect(war).not.toHaveAttribute('aria-current', 'page')
    expect(about).not.toHaveAttribute('aria-current', 'page')
  })

  test('should toggle menu open/close', () => {
    const { container } = renderWithProviders(<Header />)

    const menuToggle = container.querySelector('button')

    expect(menuToggle).not.toBeChecked()

    userEvent.click(menuToggle as HTMLElement)

    expect(menuToggle).toBeChecked()

    userEvent.click(menuToggle as HTMLElement)

    expect(menuToggle).not.toBeChecked()
  })
})
