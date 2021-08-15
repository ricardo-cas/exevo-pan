import '@testing-library/jest-dom'

jest.mock('utils/debounce', () => ({ debounce: (fn) => fn }))
jest.mock('next/router', () => ({
    __esModule: true,
    useRouter: jest.fn().mockReturnValue(({ pathname: '/' }))
}))

const mockedImageComponent = ({ ...props }) => <img {...props} />
jest.mock('next/image', () => mockedImageComponent)

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
        matches: false,
    })),
})