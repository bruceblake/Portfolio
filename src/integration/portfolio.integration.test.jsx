import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

// Don't mock anything for integration tests
vi.unmock('../components/ProfessionalHeader')
vi.unmock('../components/ChatInterface')
vi.unmock('../components/Timeline')
vi.unmock('../utils/ragSystem')

describe('Portfolio Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Full User Journey', () => {
    it('should allow user to ask questions and receive RAG-based responses', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      // Find the chat input
      const textarea = await screen.findByPlaceholderText(/Ask about Bruce's experience/i)
      expect(textarea).toBeInTheDocument()
      
      // Type a question about Google
      await user.type(textarea, 'Tell me about Bruce\'s experience at Google')
      
      // Submit the question
      await user.keyboard('{Enter}')
      
      // Wait for the response
      await waitFor(() => {
        // Should show the user's question
        expect(screen.getByText("Tell me about Bruce's experience at Google")).toBeInTheDocument()
      }, { timeout: 3000 })
      
      // Wait for AI response containing Google information
      await waitFor(() => {
        const messages = screen.getAllByText(/Google|STEP|Buganizer|Play Books/i)
        expect(messages.length).toBeGreaterThan(0)
      }, { timeout: 5000 })
    })

    it('should provide accurate contact information', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      const textarea = await screen.findByPlaceholderText(/Ask about Bruce's experience/i)
      
      await user.type(textarea, 'How can I contact Bruce?')
      await user.keyboard('{Enter}')
      
      await waitFor(() => {
        expect(screen.getByText(/bruceiiiblake@gmail.com/i)).toBeInTheDocument()
        expect(screen.getByText(/571-393-5615/i)).toBeInTheDocument()
      }, { timeout: 5000 })
    })

    it('should handle suggested questions correctly', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      // Click a suggested question
      const suggestedQuestion = await screen.findByText("What are Bruce's technical skills?")
      await user.click(suggestedQuestion)
      
      // The question should appear in the input
      const textarea = screen.getByPlaceholderText(/Ask about Bruce's experience/i)
      expect(textarea.value).toBe("What are Bruce's technical skills?")
      
      // Submit it
      await user.keyboard('{Enter}')
      
      // Wait for response about skills
      await waitFor(() => {
        const responses = screen.getAllByText(/Python|Java|TypeScript|skill/i)
        expect(responses.length).toBeGreaterThan(0)
      }, { timeout: 5000 })
    })

    it('should maintain conversation history', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      const textarea = await screen.findByPlaceholderText(/Ask about Bruce's experience/i)
      
      // Ask first question
      await user.type(textarea, 'What is Bruce\'s education?')
      await user.keyboard('{Enter}')
      
      await waitFor(() => {
        expect(screen.getByText("What is Bruce's education?")).toBeInTheDocument()
      })
      
      // Wait for first response
      await waitFor(() => {
        expect(screen.getByText(/Virginia Tech/i)).toBeInTheDocument()
      }, { timeout: 5000 })
      
      // Ask second question
      await user.type(textarea, 'What projects has he built?')
      await user.keyboard('{Enter}')
      
      // Both conversations should be visible
      await waitFor(() => {
        expect(screen.getByText("What is Bruce's education?")).toBeInTheDocument()
        expect(screen.getByText("What projects has he built?")).toBeInTheDocument()
      })
      
      // Wait for project response
      await waitFor(() => {
        const projectTexts = screen.getAllByText(/project|engine|physics|iOS/i)
        expect(projectTexts.length).toBeGreaterThan(0)
      }, { timeout: 5000 })
    })
  })

  describe('UI State Management', () => {
    it('should show loading state while processing', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      const textarea = await screen.findByPlaceholderText(/Ask about Bruce's experience/i)
      await user.type(textarea, 'Test question')
      await user.keyboard('{Enter}')
      
      // Should show typing indicator
      const typingIndicator = await screen.findByTestId('typing-indicator')
      expect(typingIndicator).toBeInTheDocument()
      
      // Should disappear after response
      await waitFor(() => {
        expect(screen.queryByTestId('typing-indicator')).not.toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('should disable input during processing', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      const textarea = await screen.findByPlaceholderText(/Ask about Bruce's experience/i)
      const sendButton = screen.getByRole('button', { name: '' })
      
      await user.type(textarea, 'Test question')
      await user.click(sendButton)
      
      // Both should be disabled
      expect(textarea).toBeDisabled()
      expect(sendButton).toBeDisabled()
      
      // Should be enabled after response
      await waitFor(() => {
        expect(textarea).not.toBeDisabled()
      }, { timeout: 3000 })
    })

    it('should hide suggested questions after first message', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      // Suggested questions should be visible initially
      expect(await screen.findByText('Suggested questions:')).toBeInTheDocument()
      
      const textarea = screen.getByPlaceholderText(/Ask about Bruce's experience/i)
      await user.type(textarea, 'First message')
      await user.keyboard('{Enter}')
      
      // Should disappear after sending
      await waitFor(() => {
        expect(screen.queryByText('Suggested questions:')).not.toBeInTheDocument()
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle empty queries gracefully', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      const textarea = await screen.findByPlaceholderText(/Ask about Bruce's experience/i)
      const sendButton = screen.getByRole('button', { name: '' })
      
      // Try to send empty message
      await user.click(textarea)
      await user.keyboard('{Enter}')
      
      // Should not send anything
      const messages = screen.queryAllByText(/Mock response|Please ask a question/i)
      expect(messages.length).toBe(0)
      
      // Button should remain disabled
      expect(sendButton).toBeDisabled()
    })

    it('should handle queries with no relevant information', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      const textarea = await screen.findByPlaceholderText(/Ask about Bruce's experience/i)
      
      await user.type(textarea, 'completely unrelated random query xyz123')
      await user.keyboard('{Enter}')
      
      // Should get a response (not crash)
      await waitFor(() => {
        const allText = document.body.textContent
        expect(allText).toContain('completely unrelated random query xyz123')
      })
      
      // Should get some kind of response
      await waitFor(() => {
        const messages = screen.getAllByRole('paragraph')
        expect(messages.length).toBeGreaterThan(1) // At least the welcome message and a response
      }, { timeout: 5000 })
    })
  })

  describe('Responsive Behavior', () => {
    it('should handle rapid successive messages', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      const textarea = await screen.findByPlaceholderText(/Ask about Bruce's experience/i)
      
      // Send multiple messages quickly
      await user.type(textarea, 'First question')
      await user.keyboard('{Enter}')
      
      // Don't wait for response, send another
      await user.type(textarea, 'Second question')
      await user.keyboard('{Enter}')
      
      // Both should appear
      await waitFor(() => {
        expect(screen.getByText('First question')).toBeInTheDocument()
        expect(screen.getByText('Second question')).toBeInTheDocument()
      })
    })
  })
})