import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatInterface from './ChatInterface'

// Mock the RAG system
vi.mock('../utils/ragSystem', () => ({
  ragSystem: {
    search: vi.fn((query) => `Mock response for: ${query}`),
    getTypingDelay: vi.fn(() => 100)
  }
}))

describe('ChatInterface Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Initial Render', () => {
    it('should render the chat interface with welcome message', () => {
      render(<ChatInterface />)
      
      expect(screen.getByText(/Hello! I'm an AI assistant/i)).toBeInTheDocument()
      expect(screen.getByText(/What would you like to know/i)).toBeInTheDocument()
    })

    it('should display suggested questions on initial load', () => {
      render(<ChatInterface />)
      
      expect(screen.getByText('Suggested questions:')).toBeInTheDocument()
      expect(screen.getByText("Tell me about Bruce's experience at Google")).toBeInTheDocument()
      expect(screen.getByText("What projects has Bruce built?")).toBeInTheDocument()
      expect(screen.getByText("What are Bruce's technical skills?")).toBeInTheDocument()
      expect(screen.getByText("How can I contact Bruce?")).toBeInTheDocument()
      expect(screen.getByText("What makes Bruce unique as a candidate?")).toBeInTheDocument()
    })

    it('should render the input area correctly', () => {
      render(<ChatInterface />)
      
      const textarea = screen.getByPlaceholderText(/Ask about Bruce's experience/i)
      expect(textarea).toBeInTheDocument()
      expect(textarea).not.toBeDisabled()
      
      const sendButton = screen.getByRole('button', { name: '' }) // SVG button
      expect(sendButton).toBeInTheDocument()
      expect(sendButton).toBeDisabled() // Disabled when input is empty
    })
  })

  describe('User Interactions', () => {
    it('should enable send button when text is entered', async () => {
      const user = userEvent.setup()
      render(<ChatInterface />)
      
      const textarea = screen.getByPlaceholderText(/Ask about Bruce's experience/i)
      const sendButton = screen.getByRole('button', { name: '' })
      
      expect(sendButton).toBeDisabled()
      
      await user.type(textarea, 'Test question')
      
      expect(sendButton).not.toBeDisabled()
    })

    it('should send message on form submit', async () => {
      const user = userEvent.setup()
      const { ragSystem } = await import('../utils/ragSystem')
      
      render(<ChatInterface />)
      
      const textarea = screen.getByPlaceholderText(/Ask about Bruce's experience/i)
      await user.type(textarea, 'What is Bruce\'s experience?')
      
      const sendButton = screen.getByRole('button', { name: '' })
      await user.click(sendButton)
      
      // Check that the user message appears
      expect(screen.getByText("What is Bruce's experience?")).toBeInTheDocument()
      
      // Check that ragSystem.search was called
      await waitFor(() => {
        expect(ragSystem.search).toHaveBeenCalledWith("What is Bruce's experience?")
      })
      
      // Check that the response appears after delay
      await waitFor(() => {
        expect(screen.getByText(/Mock response for:/)).toBeInTheDocument()
      })
    })

    it('should clear input after sending message', async () => {
      const user = userEvent.setup()
      render(<ChatInterface />)
      
      const textarea = screen.getByPlaceholderText(/Ask about Bruce's experience/i)
      await user.type(textarea, 'Test message')
      
      const sendButton = screen.getByRole('button', { name: '' })
      await user.click(sendButton)
      
      expect(textarea.value).toBe('')
    })

    it('should handle Enter key to send message', async () => {
      const user = userEvent.setup()
      render(<ChatInterface />)
      
      const textarea = screen.getByPlaceholderText(/Ask about Bruce's experience/i)
      await user.type(textarea, 'Test with enter')
      await user.keyboard('{Enter}')
      
      expect(screen.getByText('Test with enter')).toBeInTheDocument()
    })

    it('should not send on Shift+Enter', async () => {
      const user = userEvent.setup()
      render(<ChatInterface />)
      
      const textarea = screen.getByPlaceholderText(/Ask about Bruce's experience/i)
      await user.type(textarea, 'Test message')
      await user.keyboard('{Shift>}{Enter}{/Shift}')
      
      // Message should still be in textarea, not sent as a message
      expect(textarea.value).toBe('Test message\n')
      // Check that no user message was added to the chat
      const messages = screen.queryAllByText('Test message')
      // Should only find it in the textarea, not as a message
      expect(messages.length).toBe(0)
    })

    it('should handle suggested question clicks', async () => {
      const user = userEvent.setup()
      render(<ChatInterface />)
      
      const suggestedButton = screen.getByText("Tell me about Bruce's experience at Google")
      await user.click(suggestedButton)
      
      const textarea = screen.getByPlaceholderText(/Ask about Bruce's experience/i)
      expect(textarea.value).toBe("Tell me about Bruce's experience at Google")
    })

    it('should hide suggested questions after first message', async () => {
      const user = userEvent.setup()
      render(<ChatInterface />)
      
      expect(screen.getByText('Suggested questions:')).toBeInTheDocument()
      
      const textarea = screen.getByPlaceholderText(/Ask about Bruce's experience/i)
      await user.type(textarea, 'First message')
      
      const sendButton = screen.getByRole('button', { name: '' })
      await user.click(sendButton)
      
      await waitFor(() => {
        expect(screen.queryByText('Suggested questions:')).not.toBeInTheDocument()
      })
    })
  })

  describe('Loading State', () => {
    it('should show typing indicator while loading', async () => {
      const user = userEvent.setup()
      render(<ChatInterface />)
      
      const textarea = screen.getByPlaceholderText(/Ask about Bruce's experience/i)
      await user.type(textarea, 'Test loading')
      
      const sendButton = screen.getByRole('button', { name: '' })
      await user.click(sendButton)
      
      // Check for typing indicator
      const typingIndicator = screen.getByTestId('typing-indicator')
      expect(typingIndicator).toBeInTheDocument()
      
      // Wait for response
      await waitFor(() => {
        expect(screen.queryByTestId('typing-indicator')).not.toBeInTheDocument()
      })
    })

    it('should disable input while loading', async () => {
      const user = userEvent.setup()
      render(<ChatInterface />)
      
      const textarea = screen.getByPlaceholderText(/Ask about Bruce's experience/i)
      await user.type(textarea, 'Test')
      
      const sendButton = screen.getByRole('button', { name: '' })
      await user.click(sendButton)
      
      // Both should be disabled during loading
      expect(textarea).toBeDisabled()
      expect(sendButton).toBeDisabled()
      
      // Wait for them to be enabled again
      await waitFor(() => {
        expect(textarea).not.toBeDisabled()
      })
    })
  })

  describe('Message Display', () => {
    it('should display messages with correct styling', async () => {
      const user = userEvent.setup()
      render(<ChatInterface />)
      
      const textarea = screen.getByPlaceholderText(/Ask about Bruce's experience/i)
      await user.type(textarea, 'User message')
      
      const sendButton = screen.getByRole('button', { name: '' })
      await user.click(sendButton)
      
      // Check user message has correct class
      const userMessage = screen.getByText('User message').closest('.message-wrapper')
      expect(userMessage).toHaveClass('user')
      
      // Wait for AI response
      await waitFor(() => {
        const aiMessage = screen.getByText(/Mock response/).closest('.message-wrapper')
        expect(aiMessage).toHaveClass('assistant')
      })
    })

    it('should render markdown in assistant messages', async () => {
      const { ragSystem } = await import('../utils/ragSystem')
      ragSystem.search.mockReturnValue('**Bold text** and *italic text*')
      
      const user = userEvent.setup()
      render(<ChatInterface />)
      
      const textarea = screen.getByPlaceholderText(/Ask about Bruce's experience/i)
      await user.type(textarea, 'Test markdown')
      
      const sendButton = screen.getByRole('button', { name: '' })
      await user.click(sendButton)
      
      await waitFor(() => {
        // React Markdown will render these as actual HTML elements
        expect(screen.getByText('Bold text')).toBeInTheDocument()
        expect(screen.getByText('italic text')).toBeInTheDocument()
      })
    })
  })

  describe('Scroll Behavior', () => {
    it('should scroll to bottom when new messages are added', async () => {
      const scrollIntoViewMock = vi.fn()
      HTMLElement.prototype.scrollIntoView = scrollIntoViewMock
      
      const user = userEvent.setup()
      render(<ChatInterface />)
      
      const textarea = screen.getByPlaceholderText(/Ask about Bruce's experience/i)
      await user.type(textarea, 'Test scroll')
      
      const sendButton = screen.getByRole('button', { name: '' })
      await user.click(sendButton)
      
      await waitFor(() => {
        expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' })
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<ChatInterface />)
      
      const textarea = screen.getByPlaceholderText(/Ask about Bruce's experience/i)
      expect(textarea).toHaveAttribute('rows', '1')
      
      const form = textarea.closest('form')
      expect(form).toBeInTheDocument()
    })

    it('should maintain focus after sending message', async () => {
      const user = userEvent.setup()
      render(<ChatInterface />)
      
      const textarea = screen.getByPlaceholderText(/Ask about Bruce's experience/i)
      await user.type(textarea, 'Test focus')
      
      const sendButton = screen.getByRole('button', { name: '' })
      await user.click(sendButton)
      
      // Textarea should still be in the document and not disabled after loading
      await waitFor(() => {
        expect(textarea).toBeInTheDocument()
        expect(textarea).not.toBeDisabled()
      })
    })
  })
})