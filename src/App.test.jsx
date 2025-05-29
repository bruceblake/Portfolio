import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// Mock components to simplify testing
vi.mock('./components/ProfessionalHeader', () => ({
  default: ({ theme, toggleTheme, currentMode, onSwitchMode }) => (
    <div data-testid="professional-header">
      <button onClick={toggleTheme} data-testid="theme-toggle">Toggle Theme</button>
      <button onClick={onSwitchMode} data-testid="mode-toggle">
        Switch to {currentMode === 'chat' ? 'Timeline' : 'Chat'}
      </button>
      <div data-testid="current-theme">{theme}</div>
      <div data-testid="current-mode">{currentMode}</div>
    </div>
  )
}))

vi.mock('./components/ChatInterface', () => ({
  default: () => <div data-testid="chat-interface">Chat Interface</div>
}))

vi.mock('./components/Timeline', () => ({
  default: () => <div data-testid="timeline">Timeline</div>
}))

describe('App Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  afterEach(() => {
    // Clean up after each test
    localStorage.clear()
  })

  describe('Initial Render', () => {
    it('should render with chat mode as default', () => {
      render(<App />)
      
      expect(screen.getByTestId('chat-interface')).toBeInTheDocument()
      expect(screen.queryByTestId('timeline')).not.toBeInTheDocument()
      expect(screen.getByTestId('current-mode')).toHaveTextContent('chat')
    })

    it('should not show landing page', () => {
      render(<App />)
      
      // The app should go directly to chat, no landing page
      expect(screen.queryByText(/Choose your experience/i)).not.toBeInTheDocument()
      expect(screen.getByTestId('chat-interface')).toBeInTheDocument()
    })

    it('should load theme from localStorage if available', () => {
      localStorage.setItem('theme', 'dark')
      
      render(<App />)
      
      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    })

    it('should default to light theme if no saved preference', () => {
      render(<App />)
      
      expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
      expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    })
  })

  describe('Theme Toggle', () => {
    it('should toggle between light and dark themes', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      const themeToggle = screen.getByTestId('theme-toggle')
      
      // Initially light
      expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
      
      // Click to switch to dark
      await user.click(themeToggle)
      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
      
      // Click to switch back to light
      await user.click(themeToggle)
      expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
      expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    })

    it('should persist theme preference in localStorage', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      const themeToggle = screen.getByTestId('theme-toggle')
      
      await user.click(themeToggle)
      expect(localStorage.getItem('theme')).toBe('dark')
      
      await user.click(themeToggle)
      expect(localStorage.getItem('theme')).toBe('light')
    })
  })

  describe('Mode Switching', () => {
    it('should switch between chat and timeline modes', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      const modeToggle = screen.getByTestId('mode-toggle')
      
      // Initially in chat mode
      expect(screen.getByTestId('chat-interface')).toBeInTheDocument()
      expect(screen.queryByTestId('timeline')).not.toBeInTheDocument()
      
      // Switch to timeline
      await user.click(modeToggle)
      expect(screen.queryByTestId('chat-interface')).not.toBeInTheDocument()
      expect(screen.getByTestId('timeline')).toBeInTheDocument()
      expect(screen.getByTestId('current-mode')).toHaveTextContent('timeline')
      
      // Switch back to chat
      await user.click(modeToggle)
      expect(screen.getByTestId('chat-interface')).toBeInTheDocument()
      expect(screen.queryByTestId('timeline')).not.toBeInTheDocument()
      expect(screen.getByTestId('current-mode')).toHaveTextContent('chat')
    })
  })

  describe('Layout Structure', () => {
    it('should have correct layout structure', () => {
      render(<App />)
      
      const app = screen.getByTestId('professional-header').closest('.app')
      expect(app).toBeInTheDocument()
      expect(app).toHaveClass('app')
      
      const main = screen.getByTestId('chat-interface').closest('.main-container')
      expect(main).toBeInTheDocument()
      expect(main).toHaveClass('main-container')
    })

    it('should pass correct props to ProfessionalHeader', () => {
      render(<App />)
      
      // Check that the header displays current state
      expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
      expect(screen.getByTestId('current-mode')).toHaveTextContent('chat')
      
      // Check that mode toggle button shows correct text
      expect(screen.getByTestId('mode-toggle')).toHaveTextContent('Switch to Timeline')
    })
  })

  describe('State Management', () => {
    it('should maintain independent theme and mode states', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      const themeToggle = screen.getByTestId('theme-toggle')
      const modeToggle = screen.getByTestId('mode-toggle')
      
      // Change both states
      await user.click(themeToggle) // Switch to dark
      await user.click(modeToggle) // Switch to timeline
      
      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
      expect(screen.getByTestId('current-mode')).toHaveTextContent('timeline')
      
      // Change theme shouldn't affect mode
      await user.click(themeToggle)
      expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
      expect(screen.getByTestId('current-mode')).toHaveTextContent('timeline')
      
      // Change mode shouldn't affect theme
      await user.click(modeToggle)
      expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
      expect(screen.getByTestId('current-mode')).toHaveTextContent('chat')
    })
  })
})